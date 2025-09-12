package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewSummaryInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotReviewQueryProcessor {

    private final TripSpotReviewRepositoryPort tripSpotReviewRepositoryPort;

    public TripSpotReviewSummaryInfo getTripSpotReviewSummary(long tripSpotId, int photoLimit) {
        TripSpotReviewSummary summary = tripSpotReviewRepositoryPort.findSummaryByTripSpotId(tripSpotId, photoLimit);
        return TripSpotReviewSummaryInfo.of(summary);
    }
}
