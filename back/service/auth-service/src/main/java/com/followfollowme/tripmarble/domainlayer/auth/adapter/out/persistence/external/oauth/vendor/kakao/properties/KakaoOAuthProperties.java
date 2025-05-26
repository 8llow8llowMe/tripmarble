package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence.external.oauth.vendor.kakao.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth.kakao")
public record KakaoOAuthProperties(
    String redirectUri,
    String clientId,
    String clientSecret,
    String[] scope
) {

}
