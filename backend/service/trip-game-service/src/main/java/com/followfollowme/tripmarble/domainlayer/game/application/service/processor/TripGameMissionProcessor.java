package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalRequest;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.command.ReviewMissionCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.context.MissionContext;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMoveLogRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripSpotReviewClientPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameMissionProcessor {

    private final TripGameRepositoryPort tripGameRepositoryPort;
    private final TripGameMoveLogRepositoryPort tripGameMoveLogRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;
    private final TripGameMemberRepositoryPort tripGameMemberRepositoryPort;
    private final TripSpotReviewClientPort tripSpotReviewClientPort;

    public MissionResultInfo processReviewMission(long tripGameId, long tripGameMoveLogId, long memberId, ReviewMissionCommand command) {
        // 1. 미션 컨텍스트 로딩 및 검증
        MissionContext context = loadMissionContext(tripGameId, tripGameMoveLogId, memberId);

        // 2. 내부 서비스 호출 -> 리뷰 생성
        TripSpotReviewCreateInternalRequest request = TripSpotReviewCreateInternalRequest.builder()
            .tripSpotId(command.tripSpotId())
            .memberId(memberId)
            .content(command.content())
            .rating(command.rating())
            .photoUrls(command.photoUrls())
            .build();

        TripSpotReviewCreateInternalResponse response = tripSpotReviewClientPort.createTripSpotReview(request);

        // 3. 성공 처리 후 MoveLog 업데이트 (리뷰 ID 참조 저장)
        TripGameMoveLog updated = context.moveLog().updateMissionResultWithReference(MissionResult.SUCCESS, response.tripSpotReviewId());
        TripGameMoveLog saved = tripGameMoveLogRepositoryPort.save(updated, context.gameTile(), context.gameMember());

        // 4. 결과 반환
        return MissionResultInfo.of(saved);
    }

    public MissionResultInfo skipMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        MissionContext context = loadMissionContext(tripGameId, tripGameMoveLogId, memberId);
        TripGameMoveLog updated = context.moveLog().updateMissionResultWithReference(MissionResult.SKIPPED, null);
        TripGameMoveLog saved = tripGameMoveLogRepositoryPort.save(updated, context.gameTile(), context.gameMember());
        return MissionResultInfo.of(saved);
    }

    public MissionResultInfo failMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        MissionContext context = loadMissionContext(tripGameId, tripGameMoveLogId, memberId);
        TripGameMoveLog updated = context.moveLog().updateMissionResultWithReference(MissionResult.FAILED, null);
        TripGameMoveLog saved = tripGameMoveLogRepositoryPort.save(updated, context.gameTile(), context.gameMember());
        return MissionResultInfo.of(saved);
    }

    private MissionContext loadMissionContext(long tripGameId, long tripGameMoveLogId, long memberId) {
        // 1. 게임 조회
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 이동 로그 조회
        TripGameMoveLog moveLog = tripGameMoveLogRepositoryPort.findById(tripGameMoveLogId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MOVE_LOG_NOT_FOUND));

        // 3. 게임 참여자 조회 및 권한 검증
        TripGameMember member = tripGameMemberRepositoryPort.findByTripGameIdAndMemberId(tripGameId, memberId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MEMBER_NOT_FOUND));

        if (moveLog.tripGameMemberId() != member.id()) {
            throw new TripGameException(TripGameErrorCode.MISSION_NOT_OWNER);
        }

        // 타일 조회 및 컨텍스트 검증
        TripGameTile tile = tripGameTileRepositoryPort.findById(moveLog.tripGameTileId())
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.TILE_NOT_FOUND));

        if (tile.tripGameId() != game.id()) {
            throw new TripGameException(TripGameErrorCode.INVALID_GAME_CONTEXT);
        }

        return MissionContext.builder()
            .game(game)
            .moveLog(moveLog)
            .gameMember(member)
            .gameTile(tile)
            .build();
    }

}
