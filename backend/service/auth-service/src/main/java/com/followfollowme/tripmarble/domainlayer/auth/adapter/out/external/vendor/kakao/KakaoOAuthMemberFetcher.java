package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.converter.KakaoMemberResponseConverter;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.dto.KakaoMemberResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.dto.KakaoToken;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.properties.KakaoOAuthProperties;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.OAuthMemberFetcher;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class KakaoOAuthMemberFetcher implements OAuthMemberFetcher {

    private final KakaoApiClient kakaoApiClient;
    private final KakaoOAuthProperties kakaoOAuthProperties;
    private final KakaoMemberResponseConverter kakaoMemberResponseConverter;

    @Override
    public OAuthProvider supports() {
        return OAuthProvider.KAKAO;
    }

    @Override
    public Member fetchMember(OAuthProvider oAuthProvider, String authCode) {
        // 1. 카카오 액세스 토큰 발급
        KakaoToken token = kakaoApiClient.fetchToken(buildTokenRequestParams(authCode));

        // 2. 사용자 정보 조회
        KakaoMemberResponse memberResponse = kakaoApiClient.fetchMember(
            "Bearer " + token.accessToken());

        // 3. Converter를 통해 외부 응답 -> 도메인 변환
        return kakaoMemberResponseConverter.toDomain(memberResponse);
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
