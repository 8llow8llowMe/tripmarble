package com.followfollowme.tripmarble.security.resourceserver.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.security.common.handler.CustomAccessDeniedHandler;
import com.followfollowme.tripmarble.security.common.handler.CustomAuthenticationEntryPoint;
import com.followfollowme.tripmarble.security.resourceserver.jwt.JwtResourceServerProperties;
import com.followfollowme.tripmarble.security.resourceserver.jwt.JwtToMemberConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class ResourceServerSecurityConfig {

    private final ObjectMapper objectMapper;
    private final JwtResourceServerProperties properties;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // CORS, CSRF 비활성화
            .cors(AbstractHttpConfigurer::disable) // CORS는 Gateway에서 처리
            .csrf(AbstractHttpConfigurer::disable)

            // 세션, 폼, 기본 인증 비활성화
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable)
            .logout(AbstractHttpConfigurer::disable)

            // 인가 규칙 (추후에 화이트 리스트 설정)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            // 리소스 서버 설정
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(new JwtToMemberConverter()))
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint(objectMapper))
                .accessDeniedHandler(new CustomAccessDeniedHandler(objectMapper))
            );

        return http.build();
    }

    @Bean
    public JwtToMemberConverter jwtToMemberConverter() {
        return new JwtToMemberConverter();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKey secretKey = new SecretKeySpec(properties.accessKey().getBytes(), "HmacSHA512");
        return NimbusJwtDecoder
            .withSecretKey(secretKey)
            .macAlgorithm(MacAlgorithm.HS512)
            .build();
    }
}
