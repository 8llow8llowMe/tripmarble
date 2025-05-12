package com.followfollowme.tripmarble.common.config;

import com.followfollowme.tripmarble.common.property.JasyptProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(JasyptProperties.class)
public class CommonModuleConfig {
}
