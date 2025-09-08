package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameMoveLogResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter.TripGameMoveLogPresenter;
import com.followfollowme.tripmarble.domainlayer.game.application.command.ReviewMissionCommand;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameMoveLogQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameMoveLogWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameMissionProcessor;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameMoveLogQueryProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameMoveLogFacade implements TripGameMoveLogWebUseCase {

    private final TripGameMissionProcessor tripGameMissionProcessor;
    private final TripGameMoveLogQueryProcessor tripGameMoveLogQueryProcessor;
    private final TripGameMoveLogPresenter tripGameMoveLogPresenter;

    @Override
    @Transactional
    public MissionResultResponse processReviewMission(
        long tripGameId, long tripGameMoveLogId, long memberId, ReviewMissionCommand command) {
        MissionResultInfo missionResultInfo =
            tripGameMissionProcessor.processReviewMission(tripGameId, tripGameMoveLogId, memberId, command);
        return tripGameMoveLogPresenter.toMissionResultResponse(missionResultInfo);
    }

    @Override
    @Transactional
    public MissionResultResponse skipMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        MissionResultInfo missionResultInfo = tripGameMissionProcessor.skipMission(tripGameId, tripGameMoveLogId, memberId);
        return tripGameMoveLogPresenter.toMissionResultResponse(missionResultInfo);
    }

    @Override
    @Transactional
    public MissionResultResponse failMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        MissionResultInfo missionResultInfo = tripGameMissionProcessor.failMission(tripGameId, tripGameMoveLogId, memberId);
        return tripGameMoveLogPresenter.toMissionResultResponse(missionResultInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripGameMoveLogResponse> getMoveLogsByTripGameId(long tripGameId) {
        List<TripGameMoveLogQueryInfo> tripGameMoveLogQueryInfos = tripGameMoveLogQueryProcessor.getMoveLogsByTripGameId(tripGameId);
        return tripGameMoveLogPresenter.toMoveLogResponses(tripGameMoveLogQueryInfos);
    }
}
