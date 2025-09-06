package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameMoveLogResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter.TripGameMoveLogPresenter;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameMoveLogQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameMoveLogWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameMissionProcessor;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameMoveLogQueryProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripGameMoveLogFacade implements TripGameMoveLogWebUseCase {

    private final TripGameMissionProcessor tripGameMissionProcessor;
    private final TripGameMoveLogQueryProcessor tripGameMoveLogQueryProcessor;
    private final TripGameMoveLogPresenter tripGameMoveLogPresenter;

    @Override
    @Transactional
    public MissionResultResponse skipMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        MissionResultInfo missionResultInfo = tripGameMissionProcessor.skipMission(tripGameId, tripGameMoveLogId, memberId);
        return tripGameMoveLogPresenter.toMissionResultResponse(missionResultInfo);
    }

    @Override
    @Transactional
    public MissionResultResponse successMission(long tripGameId, long tripGameMoveLogId, long memberId) {
        MissionResultInfo missionResultInfo = tripGameMissionProcessor.successMission(tripGameId, tripGameMoveLogId, memberId);
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
