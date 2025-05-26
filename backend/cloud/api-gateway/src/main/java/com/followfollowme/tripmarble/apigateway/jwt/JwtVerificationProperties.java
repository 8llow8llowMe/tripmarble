package com.followfollowme.tripmarble.apigateway.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtVerificationProperties(
    String accessKey
) {

}
