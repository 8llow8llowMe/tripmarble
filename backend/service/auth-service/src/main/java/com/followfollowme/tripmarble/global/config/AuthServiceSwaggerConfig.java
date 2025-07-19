package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.common.support.SwaggerSecurityCommon;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(SwaggerSecurityCommon.class)
@OpenAPIDefinition(
    info = @Info(
        title = "트립마블(TripMarble) 회원 및 인증/인가 서비스 관련 API 명세서",
        description = "Auth Service 전용",
        version = "v1"
    )
)
public class AuthServiceSwaggerConfig {

}
