package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.property.SwaggerProperties;
import com.followfollowme.tripmarble.common.support.SwaggerSecurityCommon;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
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
public class AuthServiceSwaggerConfig {

    private final SwaggerProperties properties;

    @Bean
    public OpenAPI authOpenAPI(Components components, SecurityRequirement securityRequirement) {
        return new OpenAPI()
            .components(components)
            .addSecurityItem(securityRequirement)
            .info(new io.swagger.v3.oas.models.info.Info()
                .title("트립마블(TripMarble) 회원 및 인증/인가 서비스 관련 API 명세서")
                .description("Auth Service 전용")
                .version("v1")
            )
            .servers(List.of(new Server().url(properties.serverUrl())));
    }
}
