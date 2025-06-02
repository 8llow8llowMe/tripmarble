package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.global.infra.tourapi.properties.TourApiRegistryProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(TourApiRegistryProperties.class)
public class TourApiRegistryPropertiesConfig {

}
