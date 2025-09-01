package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfig;
import com.followfollowme.tripmarble.persistence.config.JpaAuditConfig;
import com.followfollowme.tripmarble.persistence.config.SnowflakeConfig;
import com.followfollowme.tripmarble.redis.config.RedisConfig;
import com.followfollowme.tripmarble.security.auth.config.AuthSecurityConfig;
import com.followfollowme.tripmarble.storage.config.MinioConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfig.class,
    JpaAuditConfig.class,
    SnowflakeConfig.class,
    AuthSecurityConfig.class,
    RedisConfig.class,
    MinioConfig.class
})
public class AuthServiceInfraConfig {

}
