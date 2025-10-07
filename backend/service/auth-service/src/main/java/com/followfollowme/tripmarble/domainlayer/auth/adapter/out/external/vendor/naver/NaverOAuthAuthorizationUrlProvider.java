package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.properties.NaverOAuthProperties;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.OAuthAuthorizationUrlProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class NaverOAuthAuthorizationUrlProvider implements OAuthAuthorizationUrlProvider {

    private final NaverOAuthProperties naverOAuthProperties;

    @Override
    public OAuthProvider supports() {
        return OAuthProvider.NAVER;
    }

    @Override
    public String generateUrl(OAuthProvider oAuthProvider) {

        return UriComponentsBuilder
            .fromUriString("https://nid.naver.com/oauth2.0/authorize")
            .queryParam("response_type", "code")
            .queryParam("client_id", naverOAuthProperties.clientId())
            .queryParam("redirect_uri", naverOAuthProperties.redirectUri())
            .queryParam("state", "")
            .toUriString();
    }
}
