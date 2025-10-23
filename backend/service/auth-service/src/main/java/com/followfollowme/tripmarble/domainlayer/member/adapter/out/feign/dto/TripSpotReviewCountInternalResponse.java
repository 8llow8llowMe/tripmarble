package com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto;

public record TripSpotReviewCountInternalResponse(
    long memberId,
    int tripSpotReviewCount,
    int photoCount
) {
    
}
