package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfigurer;
import com.followfollowme.tripmarble.persistence.config.SnowflakeConfigurer;
import com.followfollowme.tripmarble.redis.config.RedisConfigurer;
import com.followfollowme.tripmarble.security.auth.config.AuthSecurityConfigurer;
import com.followfollowme.tripmarble.storage.config.MinioConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfigurer.class,
    SnowflakeConfigurer.class,
    AuthSecurityConfigurer.class,
    RedisConfigurer.class,
    MinioConfigurer.class
})
public class AuthServiceBeansConfig {

}
