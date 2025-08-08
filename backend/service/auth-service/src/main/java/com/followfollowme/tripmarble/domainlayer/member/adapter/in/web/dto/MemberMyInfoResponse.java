package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "나의 회원 정보 조회 응답 DTO")
public record MemberMyInfoResponse(

    @Schema(description = "회원 아이디", example = "202507110001")
    long memberId,

    @Schema(description = "이메일 주소", example = "user@example.com")
    String email,

    @Schema(description = "회원 실명", example = "홍길동")
    String name,

    @Schema(description = "회원 닉네임", example = "길동짱")
    String nickname,

    @Schema(description = "프로필 이미지 URL", example = "https://cdn.tripmarble.com/profile.jpg")
    String profileImageUrl,

    @Schema(description = "회원 권한", example = "USER")
    SecurityRole role,

    @Schema(description = "소셜 로그인 제공업체 (OAuth 제공자)", example = "KAKAO")
    OAuthProvider provider
) {

}
