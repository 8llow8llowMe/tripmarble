package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMoveLogRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
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

    public MissionResultInfo skipMission(long tripGameId, long tripGameMoveLogId) {
        return updateMission(tripGameId, tripGameMoveLogId, MissionResult.SKIPPED);
    }

    public MissionResultInfo successMission(long tripGameId, long tripGameMoveLogId) {
        return updateMission(tripGameId, tripGameMoveLogId, MissionResult.SUCCESS);
    }

    public MissionResultInfo failMission(long tripGameId, long tripGameMoveLogId) {
        return updateMission(tripGameId, tripGameMoveLogId, MissionResult.FAILED);
    }

    private MissionResultInfo updateMission(long tripGameId, long tripGameMoveLogId, MissionResult result) {
        // 1. 게임 조회 (존재 여부 검증)
        TripGame game = tripGameRepositoryPort.findById(tripGameId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.GAME_NOT_FOUND));

        // 2. 이동 로그 조회
        TripGameMoveLog log = tripGameMoveLogRepositoryPort.findById(tripGameMoveLogId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MOVE_LOG_NOT_FOUND));

        // 3. 미션 결과 업데이트
        TripGameMoveLog updated = log.updateMissionResult(result);

        // 4. 타일 조회 및 게임 컨텍스트 검증
        TripGameTile tripGameTile = tripGameTileRepositoryPort.findById(updated.tripGameTileId())
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.TILE_NOT_FOUND));

        if (tripGameTile.tripGameId() != game.id()) {
            throw new TripGameException(TripGameErrorCode.INVALID_GAME_CONTEXT);
        }

        // 5. 저장 (업데이트)
        TripGameMoveLog saved = tripGameMoveLogRepositoryPort.save(updated, tripGameTile);

        return MissionResultInfo.of(saved);
    }
}
