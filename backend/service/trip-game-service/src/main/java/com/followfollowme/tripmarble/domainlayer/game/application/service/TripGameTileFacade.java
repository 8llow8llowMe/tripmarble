package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter.TripGameTilePresenter;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileQueryInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameTileWebUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameTileQueryProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameTileFacade implements TripGameTileWebUseCase {

    private final TripGameTileQueryProcessor tripGameTileQueryProcessor;
    private final TripGameTilePresenter tripGameTilePresenter;

    @Override
    @Transactional(readOnly = true)
    public List<TripGameTileResponse> getTilesByTripGameId(long tripGameId, long requesterMemberId) {
        TripGameTileQueryInfo tileQueryInfo = tripGameTileQueryProcessor.getTilesByTripGameId(tripGameId, requesterMemberId);
        return tripGameTilePresenter.toGameTileResponses(tileQueryInfo);
    }
}
