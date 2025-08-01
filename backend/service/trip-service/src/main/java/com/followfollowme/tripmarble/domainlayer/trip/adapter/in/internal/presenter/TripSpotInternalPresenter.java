package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripSpotInternalPresenter {

    public TripSpotRandomResponse toRandomResponse(TripSpot tripSpot) {
        return TripSpotRandomResponse.builder()
            .tripSpotId(tripSpot.id())
            .tripSpotName(tripSpot.title())
            .build();
    }

    public List<TripSpotRandomResponse> toRandomResponseList(List<TripSpot> tripSpots) {
        return tripSpots.stream()
            .map(this::toRandomResponse)
            .toList();
    }
}
