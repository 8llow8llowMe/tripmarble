package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripContentTypeInfo;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripContentTypePresenter {

    public TripContentTypeResponse toResponse(TripContentTypeInfo info) {
        return TripContentTypeResponse.builder()
            .contentTypeId(String.valueOf(info.contentTypeId()))
            .contentTypeName(info.contentTypeName())
            .build();
    }

    public List<TripContentTypeResponse> toResponseList(List<TripContentTypeInfo> infos) {
        return infos.stream()
            .map(this::toResponse)
            .toList();
    }
}
