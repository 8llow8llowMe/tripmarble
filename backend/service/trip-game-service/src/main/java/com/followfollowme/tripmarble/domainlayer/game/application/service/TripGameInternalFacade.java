package com.followfollowme.tripmarble.domainlayer.game.application.service;

import com.followfollowme.tripmarble.domainlayer.game.application.port.in.TripGameInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.game.application.service.processor.TripGameQueryProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripGameInternalFacade implements TripGameInternalUseCase {

    private final TripGameQueryProcessor tripGameQueryProcessor;

    @Override
    @Transactional(readOnly = true)
    public int getTripGameCountByMember(long memberId) {
        return tripGameQueryProcessor.getTripGameCountByMember(memberId);
    }
}
