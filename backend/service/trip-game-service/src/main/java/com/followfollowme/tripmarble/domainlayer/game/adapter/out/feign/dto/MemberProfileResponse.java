package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

public record MemberProfileResponse(
    long memberId,
    String nickname,
    String profileImage
) {

}
