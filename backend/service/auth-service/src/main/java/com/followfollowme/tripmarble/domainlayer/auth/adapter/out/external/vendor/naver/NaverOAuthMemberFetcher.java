package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
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

    @Override
    public OAuthProvider supports() {
        return OAuthProvider.NAVER;
    }

    @Override
    public Member fetchMember(OAuthProvider oAuthProvider, String authCode) {
        NaverToken token = naverApiClient.fetchToken(buildTokenRequestParams(authCode));
        NaverMemberResponse memberResponse = naverApiClient.fetchMember("Bearer " + token.accessToken());

        return memberResponse.toDomain();
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
