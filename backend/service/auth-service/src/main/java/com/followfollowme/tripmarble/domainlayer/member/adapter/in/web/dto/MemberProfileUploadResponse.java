package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record MemberProfileUploadResponse(
    String tempImageUrl
) {

}
