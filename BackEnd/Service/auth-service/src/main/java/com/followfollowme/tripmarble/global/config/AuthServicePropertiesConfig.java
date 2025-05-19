package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptPropertiesConfig;
import com.followfollowme.tripmarble.persistence.config.SnowflakePropertiesConfig;
import com.followfollowme.tripmarble.redis.config.RedisPropertiesConfig;
import com.followfollowme.tripmarble.security.auth.config.JwtAuthPropertiesConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptPropertiesConfig.class,
    JwtAuthPropertiesConfig.class,
    SnowflakePropertiesConfig.class,
    RedisPropertiesConfig.class
})
public class AuthServicePropertiesConfig {

}
