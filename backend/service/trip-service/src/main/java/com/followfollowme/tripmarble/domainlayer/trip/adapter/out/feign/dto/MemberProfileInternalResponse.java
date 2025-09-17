package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.feign.dto;

public record MemberProfileInternalResponse(
    long memberId,
    String nickname,
    String profileImageUrl
) {

}
