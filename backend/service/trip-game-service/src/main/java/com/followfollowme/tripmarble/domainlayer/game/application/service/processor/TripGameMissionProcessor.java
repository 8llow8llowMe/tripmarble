package com.followfollowme.tripmarble.domainlayer.game.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMoveLogRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGameMissionProcessor {

    private final TripGameMoveLogRepositoryPort tripGameMoveLogRepositoryPort;
    private final TripGameTileRepositoryPort tripGameTileRepositoryPort;

    public MissionResultInfo skipMission(long tripGameMoveLogId) {
        return updateMission(tripGameMoveLogId, MissionResult.SKIPPED);
    }

    public MissionResultInfo successMission(long tripGameMoveLogId) {
        return updateMission(tripGameMoveLogId, MissionResult.FAILED);
    }

    public MissionResultInfo failMission(long tripGameMoveLogId) {
        return updateMission(tripGameMoveLogId, MissionResult.FAILED);
    }

    private MissionResultInfo updateMission(long tripGameMoveLogId, MissionResult result) {
        TripGameMoveLog log = tripGameMoveLogRepositoryPort.findById(tripGameMoveLogId)
            .orElseThrow(() -> new TripGameException(TripGameErrorCode.MOVE_LOG_NOT_FOUND));

        TripGameMoveLog updated = log.updateMissionResult(result);

        // TODO: tile 복원

        TripGameMoveLog saved = tripGameMoveLogRepositoryPort.save(updated, null);

        return MissionResultInfo.of(saved);
    }

}
