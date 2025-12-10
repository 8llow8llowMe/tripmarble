package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.JasyptConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    JasyptConfigurer.class
})
public class BatchServiceBeansConfig {

}
