package com.followfollowme.tripmarble.domainlayer.member.application.info;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripGameCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripSpotReviewCountInternalResponse;
import lombok.Builder;

@Builder
public record MemberActivitySummaryInfo(
    long memberId,
    int tripGameCount,
    int tripSpotReviewCount,
    int tripSpotReviewPhotoCount
) {

    public static MemberActivitySummaryInfo of(
        TripGameCountInternalResponse gameResponse, TripSpotReviewCountInternalResponse reviewResponse
    ) {
        return MemberActivitySummaryInfo.builder()
            .memberId(gameResponse.memberId())
            .tripGameCount(gameResponse.tripGameCount())
            .tripSpotReviewCount(reviewResponse.tripSpotReviewCount())
            .tripSpotReviewPhotoCount(reviewResponse.photoCount())
            .build();
    }
}
