package com.followfollowme.tripmarble.security.resourceserver.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security.oauth2.resource-server.jwt")
public record JwtResourceServerProperties(
    String accessKey
) {

}
