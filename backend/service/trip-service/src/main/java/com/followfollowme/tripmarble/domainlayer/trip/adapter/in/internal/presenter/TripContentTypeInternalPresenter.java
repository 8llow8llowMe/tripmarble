package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripContentTypeInternalPresenter {

    public TripContentTypeInternalResponse toResponse(TripContentType tripContentType) {
        return TripContentTypeInternalResponse.builder()
            .tripContentTypeId(tripContentType.id())
            .contentTypeId(tripContentType.contentTypeId())
            .build();
    }

    public List<TripContentTypeInternalResponse> toResponseList(List<TripContentType> tripContentTypes) {
        return tripContentTypes.stream()
            .map(this::toResponse)
            .toList();
    }
}
