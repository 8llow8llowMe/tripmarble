package com.followfollowme.tripmarble.security.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthFilter;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthProperties;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthProvider;
import com.followfollowme.tripmarble.security.common.handler.CustomAccessDeniedHandler;
import com.followfollowme.tripmarble.security.common.handler.CustomAuthenticationEntryPoint;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class AuthSecurityConfig {

    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthProvider jwtAuthProvider)
        throws Exception {

        http
            // CORS(Cross-Origin Resource Sharing) 설정을 적용합니다.
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // CSRF 설정 비활성화
            .csrf(AbstractHttpConfigurer::disable)

            // HTTP Basic 인증 방식을 비활성화합니다. (ID/PW 기반 인증 사용하지 않음)
            .httpBasic(AbstractHttpConfigurer::disable)

            // X-Frame-Options 비활성화 (H2 Console 접근 등 필요시 사용)
            .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))

            // 모든 HTTP 요청에 대해 접근을 허용합니다.
            // 인증이 필요한 요청은 JwtAuthFilter에서 직접 토큰 검증을 수행하며,
            // @PreAuthorize 등 메서드 수준의 인가 처리는 EnableMethodSecurity에 의해 적용됩니다.
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )

            // Spring Security 기본 로그인/로그아웃 기능 비활성화
            .formLogin(AbstractHttpConfigurer::disable)
            .logout(AbstractHttpConfigurer::disable)
            .addFilterBefore(new JwtAuthFilter(jwtAuthProvider, objectMapper),
                UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(ex -> ex
                // Auth‐Service 에서도 권한 체크(@PreAuthorize) 시 403 을 JSON으로 내려줌
                // (인증 실패는 JwtAuthFilter 안에서 처리 -> 커스텀 응답)
                .accessDeniedHandler(new CustomAccessDeniedHandler(objectMapper))
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint(objectMapper))
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = getCorsConfiguration(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        CorsConfiguration config = getCorsConfiguration(6000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(
            new CorsFilter(source));
        filterBean.setOrder(0);
        return filterBean;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthProvider jwtAuthProvider(JwtAuthProperties jwtAuthProperties) {
        return new JwtAuthProvider(jwtAuthProperties);
    }

    @Bean
    public JwtAuthFilter jwtAuthFilter(JwtAuthProvider jwtAuthProvider) {
        return new JwtAuthFilter(jwtAuthProvider, objectMapper);
    }

    private CorsConfiguration getCorsConfiguration(long maxAge) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of(
            "http://localhost:5173", // 프론트엔드 개발자가 로컬에서 실행한 Vite(Next.js) 앱에서 백엔드로 API 요청할 수 있도록 허용
            // 로컬에서 API Gateway 실행 시, Swagger UI 통한 요청 등 CORS 허용 (Aggregation된 API 호출용) -> 하이브리드 인증/인가 패턴 때문에
            "http://localhost:8000",
            "https://www.tripmarble.com" // 운영 배포된 프론트가 실제 API 서버로 요청할 때 CORS 허용
        ));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setMaxAge(maxAge);
        return config;
    }
}
