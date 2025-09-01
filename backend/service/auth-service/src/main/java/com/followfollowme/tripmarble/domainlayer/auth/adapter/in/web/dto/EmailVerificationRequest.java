package com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "이메일 인증코드 검증 요청 DTO")
public record EmailVerificationRequest(

    @Schema(description = "이메일 주소", example = "user@example.com")
    String email,

    @Schema(description = "인증 코드", example = "AbcD1234")
    String code
) {

}
