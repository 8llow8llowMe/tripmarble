package com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(hidden = true, description = "내부 서비스 통신 전용 회원 프로필 조회 응답 DTO")
public record MemberProfileInternalResponse(

    @Schema(description = "회원 아이디", example = "202507110001")
    long memberId,

    @Schema(description = "닉네임", example = "여행왕동근")
    String nickname,

    @Schema(description = "프로필 이미지 URL", example = "https://cdn.tripmarble.com/profile.jpg")
    String profileImageUrl
) {

}
