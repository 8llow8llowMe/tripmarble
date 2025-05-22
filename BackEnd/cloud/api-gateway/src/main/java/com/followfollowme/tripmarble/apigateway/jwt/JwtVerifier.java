package com.followfollowme.tripmarble.apigateway.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtVerifier {

    private final JwtVerificationProperties jwtVerificationProperties;

    public void validate(String token) {
        Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor(jwtVerificationProperties.accessKey().getBytes()))
            .build()
            .parseSignedClaims(token);
    }
}
