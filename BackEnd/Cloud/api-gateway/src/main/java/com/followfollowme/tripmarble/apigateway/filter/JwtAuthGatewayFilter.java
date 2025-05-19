package com.followfollowme.tripmarble.apigateway.filter;

import com.followfollowme.tripmarble.apigateway.jwt.JwtVerifier;
import com.followfollowme.tripmarble.apigateway.jwt.exception.JwtErrorCode;
import com.followfollowme.tripmarble.apigateway.jwt.exception.JwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SecurityException;
import io.jsonwebtoken.security.SignatureException;
import java.io.ObjectInputFilter.Config;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class JwtAuthGatewayFilter extends AbstractGatewayFilterFactory<Config> {

    private static final String BEARER_PREFIX = "Bearer ";
    private final JwtVerifier jwtVerifier;

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            String jwt = getJwtFrom(request);

            try {
                jwtVerifier.validate(jwt);
            } catch (ExpiredJwtException e) {
                throw new JwtException(JwtErrorCode.TOKEN_EXPIRED);
            } catch (SignatureException e) {
                throw new JwtException(JwtErrorCode.TOKEN_SIGNATURE_INVALID);
            } catch (MalformedJwtException e) {
                throw new JwtException(JwtErrorCode.TOKEN_MALFORMED);
            } catch (SecurityException | IllegalArgumentException e) {
                throw new JwtException(JwtErrorCode.TOKEN_INVALID);
            }

            return chain.filter(exchange);
        };
    }

    private String getJwtFrom(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }
        return null;
    }
}
