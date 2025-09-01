package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TripContentTypePresenter {

    public TripContentTypeResponse toResponse(TripContentType tripContentType) {
        return TripContentTypeResponse.builder()
            .contentTypeId(String.valueOf(tripContentType.contentTypeId()))
            .contentTypeName(tripContentType.contentTypeName())
            .build();
    }

    public List<TripContentTypeResponse> toResponseList(List<TripContentType> tripContentTypes) {
        return tripContentTypes.stream()
            .map(this::toResponse)
            .toList();
    }
}
