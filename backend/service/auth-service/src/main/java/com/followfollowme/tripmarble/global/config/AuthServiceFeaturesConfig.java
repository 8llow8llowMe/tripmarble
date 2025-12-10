package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.persistence.config.JpaAuditConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JpaAuditConfig.class
})
public class AuthServiceFeaturesConfig {

}
