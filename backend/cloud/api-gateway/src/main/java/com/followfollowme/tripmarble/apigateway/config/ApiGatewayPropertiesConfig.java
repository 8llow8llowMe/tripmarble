package com.followfollowme.tripmarble.apigateway.config;

import com.followfollowme.tripmarble.common.config.JasyptPropertiesConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(JasyptPropertiesConfig.class)
public class ApiGatewayPropertiesConfig {

}
