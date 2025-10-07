package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotSimpleInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotWithDetailViewInfo;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
public class TripSpotPresenter {

    public TripSpotSimpleResponse toSimpleResponse(TripSpotSimpleInfo info) {
        return TripSpotSimpleResponse.builder()
            .tripSpotId(String.valueOf(info.tripSpotId()))
            .contentId(String.valueOf(info.contentId()))
            .tripSpotName(info.tripSpotName())
            .originalImageUrl(info.originalImageUrl())
            .longitude(info.longitude())
            .latitude(info.latitude())
            .build();
    }

    public SliceResponse<TripSpotSimpleResponse> toSimpleSliceResponse(Slice<TripSpotSimpleInfo> infos) {
        return SliceResponse.of(infos.map(this::toSimpleResponse));
    }

    public TripSpotWithDetailViewResponse toDetailViewResponse(TripSpotWithDetailViewInfo info) {
        return TripSpotWithDetailViewResponse.builder()
            .tripSpotId(String.valueOf(info.tripSpotId()))
            .tripSpotName(info.tripSpotName())
            .contentTypeName(info.contentTypeName())
            .description(info.description())
            .homepageUrl(info.homepageUrl())
            .phoneNumber(info.phoneNumber())
            .address(info.address())
            .addressDetail(info.addressDetail())
            .longitude(info.longitude())
            .latitude(info.latitude())
            .originalImageUrl(info.originalImageUrl())
            .build();
    }
}
