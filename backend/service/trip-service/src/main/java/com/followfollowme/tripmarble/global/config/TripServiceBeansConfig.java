package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfigurer;
import com.followfollowme.tripmarble.persistence.config.QuerydslConfigurer;
import com.followfollowme.tripmarble.persistence.config.SnowflakeConfigurer;
import com.followfollowme.tripmarble.redis.config.RedisConfigurer;
import com.followfollowme.tripmarble.security.resourceserver.config.ResourceServerSecurityConfigurer;
import com.followfollowme.tripmarble.storage.config.MinioConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfigurer.class,
    QuerydslConfigurer.class,
    SnowflakeConfigurer.class,
    ResourceServerSecurityConfigurer.class,
    MinioConfigurer.class,
    RedisConfigurer.class
})
public class TripServiceBeansConfig {

}
