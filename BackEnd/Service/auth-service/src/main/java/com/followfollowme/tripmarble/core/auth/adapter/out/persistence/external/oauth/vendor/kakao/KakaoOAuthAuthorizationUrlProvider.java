package com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.kakao;

import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.kakao.properties.KakaoOAuthProperties;
import com.followfollowme.tripmarble.core.auth.application.port.out.OAuthAuthorizationUrlProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class KakaoOAuthAuthorizationUrlProvider implements OAuthAuthorizationUrlProvider {

    private final KakaoOAuthProperties kakaoOAuthProperties;

    @Override
    public OAuthProvider supports() {
        return OAuthProvider.KAKAO;
    }

    @Override
    public String generateUrl(OAuthProvider oAuthProvider) {
        return UriComponentsBuilder
            .fromUriString("https://kauth.kakao.com/oauth/authorize")
            .queryParam("response_type", "code")
            .queryParam("client_id", kakaoOAuthProperties.clientId())
            .queryParam("redirect_uri", kakaoOAuthProperties.redirectUri())
            .queryParam("scope", String.join(",", kakaoOAuthProperties.scope()))
            .toUriString();
    }
}
