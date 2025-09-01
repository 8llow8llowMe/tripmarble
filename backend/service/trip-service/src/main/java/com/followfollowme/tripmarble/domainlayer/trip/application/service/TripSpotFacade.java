package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotDetailProcessor;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotSearchProcessor;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotFacade implements TripSpotWebUseCase {

    private final TripSpotSearchProcessor tripSpotSearchProcessor;
    private final TripSpotDetailProcessor tripSpotDetailProcessor;

    @Override
    @Transactional(readOnly = true)
    public SliceResponse<TripSpotSimpleResponse> getTripSpotsByRepresentativeRegionId(
        long representativeRegionId, long lastTripSpotId, int size, Integer contentTypeId) {
        return tripSpotSearchProcessor.searchByRepresentativeRegion(representativeRegionId, lastTripSpotId, size, contentTypeId);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId) {
        return tripSpotDetailProcessor.readDetail(tripSpotId);
    }
}
