package com.tripmarble.commonmodule.config;

import com.tripmarble.commonmodule.property.JasyptProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(JasyptProperties.class)
public class CommonModuleConfig {
}
