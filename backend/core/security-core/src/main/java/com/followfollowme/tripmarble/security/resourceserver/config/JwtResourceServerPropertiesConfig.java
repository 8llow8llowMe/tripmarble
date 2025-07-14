package com.followfollowme.tripmarble.security.resourceserver.config;

import com.followfollowme.tripmarble.security.resourceserver.jwt.JwtResourceServerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(JwtResourceServerProperties.class)
public class JwtResourceServerPropertiesConfig {

}
