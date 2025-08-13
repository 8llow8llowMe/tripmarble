package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

public record MemberProfileInternalResponse(
    long memberId,
    String nickname,
    String profileImage
) {

}
