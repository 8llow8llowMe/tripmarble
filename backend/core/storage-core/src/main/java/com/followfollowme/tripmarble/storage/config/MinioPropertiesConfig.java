package com.followfollowme.tripmarble.storage.config;

import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(MinioProperties.class)
public class MinioPropertiesConfig {

}
