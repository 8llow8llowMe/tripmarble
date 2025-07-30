package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "임시 프로필 이미지 업로드 응답 DTO")
public record MemberProfileUploadResponse(

    @Schema(description = "업로드된 임시 이미지 URL", example = "https://cdn.tripmarble.com/profile_abc123.jpg")
    String tempImageUrl
) {

}
