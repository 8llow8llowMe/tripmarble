package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotRandomSelectInternalProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotInternalFacade implements TripSpotInternalUseCase {

    private final TripSpotRandomSelectInternalProcessor tripSpotRandomSelectInternalProcessor;

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotRandomResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds, int limit) {
        return tripSpotRandomSelectInternalProcessor.selectRandomTripSpots(representativeRegionId, contentTypeIds, limit);
    }
}
