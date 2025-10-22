package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.converter.NaverMemberResponseConverter;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.dto.NaverMemberResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.dto.NaverToken;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.properties.NaverOAuthProperties;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.OAuthMemberFetcher;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class NaverOAuthMemberFetcher implements OAuthMemberFetcher {

    private final NaverApiClient naverApiClient;
    private final NaverOAuthProperties naverOAuthProperties;
    private final NaverMemberResponseConverter naverMemberResponseConverter;

    @Override
    public OAuthProvider supports() {
        return OAuthProvider.NAVER;
    }

    @Override
    public Member fetchMember(OAuthProvider oAuthProvider, String authCode) {
        // 1. 네이버 액세스 토큰 요청
        NaverToken token = naverApiClient.fetchToken(buildTokenRequestParams(authCode));

        // 2. 사용자 정보 요청
        NaverMemberResponse memberResponse = naverApiClient.fetchMember("Bearer " + token.accessToken());

        // 3. Converter를 통해 Domain 변환
        return naverMemberResponseConverter.toDomain(memberResponse);
    }

    private MultiValueMap<String, String> buildTokenRequestParams(String authCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", naverOAuthProperties.clientId());
        params.add("code", authCode);
        params.add("state", "");
        params.add("client_secret", naverOAuthProperties.clientSecret());
        return params;
    }
}
