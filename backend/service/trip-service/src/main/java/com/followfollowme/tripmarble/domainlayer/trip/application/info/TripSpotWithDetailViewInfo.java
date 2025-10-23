package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotDetail;
import lombok.Builder;

@Builder
public record TripSpotWithDetailViewInfo(
    long tripSpotId,
    String tripSpotName,
    String contentTypeName,
    String description,
    String homepageUrl,
    String phoneNumber,
    String address,
    String addressDetail,
    double longitude,
    double latitude,
    String originalImageUrl
) {

    public static TripSpotWithDetailViewInfo of(TripSpot tripSpot, TripSpotDetail tripSpotDetail, String contentTypeName) {
        return TripSpotWithDetailViewInfo.builder()
            .tripSpotId(tripSpot.id())
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

    // 임시
    public static TripSpotWithDetailViewInfo of(TripSpot tripSpot, String contentTypeName) {
        return TripSpotWithDetailViewInfo.builder()
            .tripSpotId(tripSpot.id())
            .tripSpotName(tripSpot.title())
            .contentTypeName(contentTypeName)
            .description(null)
            .homepageUrl(null)
            .phoneNumber(tripSpot.tel())
            .address(tripSpot.addr1())
            .addressDetail(tripSpot.addr2())
            .longitude(tripSpot.mapX())
            .latitude(tripSpot.mapY())
            .originalImageUrl(tripSpot.firstImage())
            .build();
    }
}
