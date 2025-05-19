package com.followfollowme.tripmarble.core.auth.application.port.in;

import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.auth.application.command.AuthLoginCommand;

public interface AuthUseCase {

    // 일반(자체) 로그인
    AuthLoginResponse login(AuthLoginCommand command);

    // 로그아웃
    void logout(long memberId);

    // 소셜 로그인: OAuth 인증 URL 제공 (ex. kakao 인가 요청 URL 생성)
    String generateOAuthAuthorizationUrl(OAuthProvider provider);

    // 소셜 로그인: OAuth 인증 코드 기반 로그인 처리
    AuthLoginResponse loginWithOAuthCode(OAuthProvider provider, String authCode);
}
