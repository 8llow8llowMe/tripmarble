package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotQueryInternalProcessor;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotRandomSelectInternalProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotInternalFacade implements TripSpotInternalUseCase {

    private final TripSpotRandomSelectInternalProcessor tripSpotRandomSelectInternalProcessor;
    private final TripSpotQueryInternalProcessor tripSpotQueryInternalProcessor;

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotRandomInternalResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds, int limit) {
        return tripSpotRandomSelectInternalProcessor.getRandomTripSpots(representativeRegionId, contentTypeIds, limit);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotQueryInternalResponse> getTripSpotsByIds(List<Long> tripSpotIds) {
        return tripSpotQueryInternalProcessor.getTripSpotsByIds(tripSpotIds);
    }
}
