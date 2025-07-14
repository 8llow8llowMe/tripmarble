package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptPropertiesConfig;
import com.followfollowme.tripmarble.persistence.config.SnowflakePropertiesConfig;
import com.followfollowme.tripmarble.security.resourceserver.config.JwtResourceServerPropertiesConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptPropertiesConfig.class,
    JwtResourceServerPropertiesConfig.class,
    SnowflakePropertiesConfig.class
})
public class TripGameServicePropertiesConfig {

}
