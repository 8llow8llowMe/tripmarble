package com.followfollowme.tripmarble.security.resourceserver.config;

import com.followfollowme.tripmarble.security.resourceserver.jwt.JwtResourceServerProperties;
import com.followfollowme.tripmarble.security.resourceserver.jwt.JwtToMemberConverter;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
@RequiredArgsConstructor
public class ResourceServerSecurityConfig {

    private final JwtResourceServerProperties properties;

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
