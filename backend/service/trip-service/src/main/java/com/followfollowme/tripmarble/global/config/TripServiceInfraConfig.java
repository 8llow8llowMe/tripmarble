package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfig;
import com.followfollowme.tripmarble.persistence.config.JpaAuditConfig;
import com.followfollowme.tripmarble.persistence.config.QuerydslConfig;
import com.followfollowme.tripmarble.persistence.config.SnowflakeConfig;
import com.followfollowme.tripmarble.redis.config.RedisConfig;
import com.followfollowme.tripmarble.security.resourceserver.config.ResourceServerSecurityConfig;
import com.followfollowme.tripmarble.storage.config.MinioConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfig.class,
    JpaAuditConfig.class,
    QuerydslConfig.class,
    SnowflakeConfig.class,
    ResourceServerSecurityConfig.class,
    MinioConfig.class,
    RedisConfig.class
})
public class TripServiceInfraConfig {

}
