package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptPropertiesConfig;
import com.followfollowme.tripmarble.common.config.SwaggerPropertiesConfig;
import com.followfollowme.tripmarble.persistence.config.SnowflakePropertiesConfig;
import com.followfollowme.tripmarble.redis.config.RedisPropertiesConfig;
import com.followfollowme.tripmarble.security.resourceserver.config.JwtResourceServerPropertiesConfig;
import com.followfollowme.tripmarble.storage.config.MinioPropertiesConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptPropertiesConfig.class,
    SwaggerPropertiesConfig.class,
    SnowflakePropertiesConfig.class,
    JwtResourceServerPropertiesConfig.class,
    MinioPropertiesConfig.class,
    RedisPropertiesConfig.class
})
public class TripServicePropertiesConfig {

}
