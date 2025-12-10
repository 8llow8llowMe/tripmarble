package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.config.SwaggerSecurityConfigurer;
import com.followfollowme.tripmarble.common.properties.SwaggerProperties;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("!prod")
@Import(SwaggerSecurityConfigurer.class)
public class AuthServiceSwaggerConfig {

    @Bean
    public OpenAPI authOpenAPI(Components components, SwaggerProperties properties) {
        return new OpenAPI()
            .components(components)
            .info(new Info()
                .title("트립마블(TripMarble) 회원 및 인증/인가 서비스 관련 API 명세서")
                .description("Auth Service 전용")
                .version("v1")
            )
            .servers(List.of(
                new Server().url(properties.serverUrl()).description("Auth Service (실제 호출용)")
            ));
    }
}
