package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "회원정보 수정 요청 DTO")
public record MemberUpdateRequest(

    @Schema(description = "회원 닉네임", example = "길동짱")
    @NotBlank(message = "닉네임은 필수입니다.")
    @Size(max = 10, message = "닉네임은 10자 이하만 가능합니다.")
    String nickname,

    @Schema(description = "프로필 이미지 URL", example = "https://cdn.tripmarble.com/profile_abc123.jpg")
    String profileImage
) {

}
