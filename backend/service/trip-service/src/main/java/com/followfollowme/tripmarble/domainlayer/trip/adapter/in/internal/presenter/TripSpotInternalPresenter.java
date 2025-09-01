package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotWithContentTypeName;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripSpotInternalPresenter {

    public TripSpotRandomInternalResponse toRandomResponse(TripSpot tripSpot) {
        return TripSpotRandomInternalResponse.builder()
            .tripSpotId(tripSpot.id())
            .tripSpotName(tripSpot.title())
            .build();
    }

    public List<TripSpotRandomInternalResponse> toRandomResponseList(List<TripSpot> tripSpots) {
        return tripSpots.stream()
            .map(this::toRandomResponse)
            .toList();
    }

    public TripSpotQueryInternalResponse toQueryResponse(TripSpotWithContentTypeName tripSpotWithContentTypeName) {
        return TripSpotQueryInternalResponse.builder()
            .tripSpotId(tripSpotWithContentTypeName.tripSpotId())
            .contentTypeName(tripSpotWithContentTypeName.contentTypeName())
            .tripSpotName(tripSpotWithContentTypeName.tripSpotName())
            .longitude(tripSpotWithContentTypeName.longitude())
            .latitude(tripSpotWithContentTypeName.latitude())
            .build();
    }

    public List<TripSpotQueryInternalResponse> toQueryResponseList(List<TripSpotWithContentTypeName> tripSpotWithContentTypeNames) {
        return tripSpotWithContentTypeNames.stream()
            .map(this::toQueryResponse)
            .toList();
    }
}
