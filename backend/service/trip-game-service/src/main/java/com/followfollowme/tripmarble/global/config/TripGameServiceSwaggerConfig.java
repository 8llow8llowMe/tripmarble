package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.property.SwaggerProperties;
import com.followfollowme.tripmarble.common.support.SwaggerSecurityCommon;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
@Profile("!prod")
@RequiredArgsConstructor
@Import(SwaggerSecurityCommon.class)
public class TripGameServiceSwaggerConfig {

    private final SwaggerProperties properties;

    @Bean
    public OpenAPI tripGameOpenAPI(Components components, SecurityRequirement securityRequirement) {
        return new OpenAPI()
            .components(components)
            .addSecurityItem(securityRequirement)
            .info(new Info()
                .title("트립마블(TripMarble) 여행 게임(계획) 서비스 관련 API 명세서")
                .description("Trip Game Service 전용")
                .version("v1")
            )
            .servers(List.of(new Server().url(properties.serverUrl())));
    }
}
