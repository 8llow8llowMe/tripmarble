package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth.naver")
public record NaverOAuthProperties(
    String redirectUri,
    String clientId,
    String clientSecret,
    String[] scope // 없어도 되지만 명시
) {

}
