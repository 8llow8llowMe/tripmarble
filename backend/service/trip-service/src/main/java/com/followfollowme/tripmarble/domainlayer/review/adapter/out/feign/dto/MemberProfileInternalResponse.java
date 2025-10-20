package com.followfollowme.tripmarble.domainlayer.review.adapter.out.feign.dto;

public record MemberProfileInternalResponse(
    long memberId,
    String nickname,
    String profileImageUrl
) {

}
