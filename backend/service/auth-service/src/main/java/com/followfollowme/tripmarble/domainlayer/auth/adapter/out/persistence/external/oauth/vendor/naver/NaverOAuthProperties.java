package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence.external.oauth.vendor.naver;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth.naver")
public record NaverOAuthProperties(
    String redirectUri,
    String clientId,
    String clientSecret,
    String state
) {

}
