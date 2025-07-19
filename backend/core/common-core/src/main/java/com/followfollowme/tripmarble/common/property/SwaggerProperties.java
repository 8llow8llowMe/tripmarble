package com.followfollowme.tripmarble.common.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "swagger")
public record SwaggerProperties(
    String serverUrl
) {
}
