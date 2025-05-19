package com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.kakao;

import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.kakao.dto.KakaoMemberResponse;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.kakao.dto.KakaoToken;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.kakao.properties.KakaoOAuthProperties;
import com.followfollowme.tripmarble.core.auth.application.port.out.OAuthMemberFetcher;
import com.followfollowme.tripmarble.core.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class KakaoOAuthMemberFetcher implements OAuthMemberFetcher {

    private final KakaoApiClient kakaoApiClient;
    private final KakaoOAuthProperties kakaoOAuthProperties;

    @Override
    public OAuthProvider supports() {
        return OAuthProvider.KAKAO;
    }

    @Override
    public Member fetchMember(OAuthProvider oAuthProvider, String authCode) {
        KakaoToken token = kakaoApiClient.fetchToken(buildTokenRequestParams(authCode));
        KakaoMemberResponse memberResponse = kakaoApiClient.fetchMember(
            "Bearer " + token.accessToken());

        return memberResponse.toDomain();
    }

    private MultiValueMap<String, String> buildTokenRequestParams(String authCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoOAuthProperties.clientId());
        params.add("redirect_uri", kakaoOAuthProperties.redirectUri());
        params.add("code", authCode);
        params.add("client_secret", kakaoOAuthProperties.clientSecret());
        return params;
    }
}
