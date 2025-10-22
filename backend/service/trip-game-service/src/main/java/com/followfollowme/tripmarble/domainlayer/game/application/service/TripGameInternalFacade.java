package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.dto.TripGameCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.presenter.TripGameInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCountInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameQueryProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameInternalFacade implements TripGameInternalUseCase {

    private final TripGameQueryProcessor tripGameQueryProcessor;
    private final TripGameInternalPresenter tripGameInternalPresenter;

    @Override
    @Transactional(readOnly = true)
    public TripGameCountInternalResponse getTripGameCountByMember(long memberId) {
        TripGameCountInfo tripGameCountInfo = tripGameQueryProcessor.getTripGameCountByMember(memberId);
        return tripGameInternalPresenter.toCountResponse(tripGameCountInfo);
    }
}
