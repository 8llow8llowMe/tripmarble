package com.followfollowme.tripmarble.apigateway.config;

import com.followfollowme.tripmarble.apigateway.jwt.properties.JwtVerificationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(JwtVerificationProperties.class)
public class JwtVerificationPropertiesConfig {

}
