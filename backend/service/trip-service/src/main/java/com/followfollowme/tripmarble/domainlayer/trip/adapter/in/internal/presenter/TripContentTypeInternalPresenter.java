package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripContentTypeInternalPresenter {

    public TripContentTypeQueryInternalResponse toQueryResponse(TripContentType tripContentType) {
        return TripContentTypeQueryInternalResponse.builder()
            .tripContentTypeId(tripContentType.id())
            .contentTypeId(tripContentType.contentTypeId())
            .build();
    }

    public List<TripContentTypeQueryInternalResponse> toQueryResponseList(List<TripContentType> tripContentTypes) {
        return tripContentTypes.stream()
            .map(this::toQueryResponse)
            .toList();
    }
}
