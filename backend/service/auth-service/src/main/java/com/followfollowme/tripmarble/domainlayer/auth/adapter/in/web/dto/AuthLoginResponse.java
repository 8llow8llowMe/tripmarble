package com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "로그인 성공 응답 DTO")
public record AuthLoginResponse(

    @Schema(description = "JWT 액세스 토큰", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    String accessToken,

    @Schema(description = "회원 아이디", example = "1")
    String memberId
) {

}
