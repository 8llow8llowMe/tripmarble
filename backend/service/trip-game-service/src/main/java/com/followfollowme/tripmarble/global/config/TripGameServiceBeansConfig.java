package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfigurer;
import com.followfollowme.tripmarble.persistence.config.QuerydslConfigurer;
import com.followfollowme.tripmarble.persistence.config.SnowflakeConfigurer;
import com.followfollowme.tripmarble.security.resourceserver.config.ResourceServerSecurityConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfigurer.class,
    SnowflakeConfigurer.class,
    ResourceServerSecurityConfigurer.class,
    QuerydslConfigurer.class
})
public class TripGameServiceBeansConfig {

}
