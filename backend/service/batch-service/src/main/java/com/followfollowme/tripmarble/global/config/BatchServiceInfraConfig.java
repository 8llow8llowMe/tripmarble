package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfig.class
})
public class BatchServiceInfraConfig {
}
