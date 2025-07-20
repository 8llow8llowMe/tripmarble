package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptPropertiesConfig;
import com.followfollowme.tripmarble.common.config.SwaggerPropertiesConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptPropertiesConfig.class,
    SwaggerPropertiesConfig.class
})
public class TripServicePropertiesConfig {

}
