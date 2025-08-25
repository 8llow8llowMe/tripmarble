package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
public class TripSpotPresenter {

    public TripSpotSimpleResponse toSimpleResponse(TripSpot tripSpot) {
        return TripSpotSimpleResponse.builder()
            .tripSpotId(String.valueOf(tripSpot.id()))
            .tripSpotName(tripSpot.title())
            .originalImageUrl(tripSpot.firstImage())
            .build();
    }

    public SliceResponse<TripSpotSimpleResponse> toSimpleSliceResponse(Slice<TripSpot> tripSpots) {
        return SliceResponse.of(tripSpots.map(this::toSimpleResponse));
    }

    public TripSpotWithDetailViewResponse toDetailViewResponse(TripSpot tripSpot, TripSpotDetail tripSpotDetail, String contentTypeName) {
        return TripSpotWithDetailViewResponse.builder()
            .tripSpotId(String.valueOf(tripSpot.id()))
            .tripSpotName(tripSpot.title())
            .contentTypeName(contentTypeName)
            .description(tripSpotDetail.overview())
            .homepageUrl(tripSpotDetail.homepage())
            .phoneNumber(tripSpot.tel())
            .address(tripSpot.addr1())
            .addressDetail(tripSpot.addr2())
            .longitude(tripSpot.mapX())
            .latitude(tripSpot.mapY())
            .originalImageUrl(tripSpot.firstImage())
            .build();
    }
}
