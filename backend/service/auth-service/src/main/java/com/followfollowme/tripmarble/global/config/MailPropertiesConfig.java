package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.global.properties.MailProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(MailProperties.class)
public class MailPropertiesConfig {
}
