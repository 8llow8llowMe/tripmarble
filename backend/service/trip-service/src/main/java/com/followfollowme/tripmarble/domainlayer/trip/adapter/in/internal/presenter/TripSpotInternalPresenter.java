package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotWithContentTypeNameInfo;
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

    public TripSpotQueryInternalResponse toQueryResponse(TripSpotWithContentTypeNameInfo info) {
        return TripSpotQueryInternalResponse.builder()
            .tripSpotId(info.tripSpotId())
            .contentTypeName(info.contentTypeName())
            .tripSpotName(info.tripSpotName())
            .longitude(info.longitude())
            .latitude(info.latitude())
            .build();
    }

    public List<TripSpotQueryInternalResponse> toQueryResponseList(List<TripSpotWithContentTypeNameInfo> infos) {
        return infos.stream()
            .map(this::toQueryResponse)
            .toList();
    }
}
