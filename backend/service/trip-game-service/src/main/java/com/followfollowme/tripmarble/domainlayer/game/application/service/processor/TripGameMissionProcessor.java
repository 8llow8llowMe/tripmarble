package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMoveLogRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
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

    public MissionResultInfo skipMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        return updateMission(tripGameId, tripGameMoveLogId, memberId, MissionResult.SKIPPED);
    }

    public MissionResultInfo successMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        return updateMission(tripGameId, tripGameMoveLogId, memberId, MissionResult.SUCCESS);
    }

    public MissionResultInfo failMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        return updateMission(tripGameId, tripGameMoveLogId, memberId, MissionResult.FAILED);
    }

    private MissionResultInfo updateMission(long tripGameId, long tripGameMoveLogId, long memberId, MissionResult result) {
        // 1. 게임 조회 (존재 여부 검증)
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 게임 상태 검증 (진행 가능 여부)
        game.play();

        // 3. 이동 로그 조회
        TripGameMoveLog log = tripGameMoveLogRepositoryPort.findById(tripGameMoveLogId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MOVE_LOG_NOT_FOUND));

        // 4. 게임 참여자 조회 및 권한 검증
        TripGameMember gameMember = tripGameMemberRepositoryPort.findByTripGameIdAndMemberId(tripGameId, memberId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MEMBER_NOT_FOUND));

        if (log.tripGameMemberId() != gameMember.id()) {
            throw new TripGameException(TripGameErrorCode.MISSION_NOT_OWNER);
        }

        // 5. 미션 상태 변경
        TripGameMoveLog updated = log.updateMissionResult(result);

        // 6. 타일 조회 및 게임 컨텍스트 검증
        TripGameTile tripGameTile = tripGameTileRepositoryPort.findById(updated.tripGameTileId())
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.TILE_NOT_FOUND));

        if (tripGameTile.tripGameId() != game.id()) {
            throw new TripGameException(TripGameErrorCode.INVALID_GAME_CONTEXT);
        }

        // 7. 저장 (업데이트)
        TripGameMoveLog saved = tripGameMoveLogRepositoryPort.save(updated, tripGameTile, gameMember);

        return MissionResultInfo.of(saved);
    }
}
