package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfig;
import com.followfollowme.tripmarble.persistence.config.JpaAuditConfig;
import com.followfollowme.tripmarble.persistence.config.SnowflakeConfig;
import com.followfollowme.tripmarble.security.auth.config.AuthSecurityConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfig.class,
    JpaAuditConfig.class,
    SnowflakeConfig.class,
    AuthSecurityConfig.class
})
public class AuthServiceModuleConfig {

}
