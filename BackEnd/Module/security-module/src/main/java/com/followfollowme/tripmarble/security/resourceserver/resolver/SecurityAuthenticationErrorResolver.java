package com.followfollowme.tripmarble.security.resourceserver.resolver;

import com.followfollowme.tripmarble.security.common.exception.SecurityErrorCode;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

public class SecurityAuthenticationErrorResolver {

    private SecurityAuthenticationErrorResolver() {
    }

    public static SecurityErrorCode resolve(Throwable ex) {
        // Spring OAuth2AuthenticationException (Resource Server) 처리
        if (ex instanceof OAuth2AuthenticationException oauth2Ex) {
            String description = oauth2Ex.getError().getDescription();
            if (description != null) {
                String lower = description.toLowerCase();
                if (lower.contains("expired")) {
                    return SecurityErrorCode.TOKEN_EXPIRED;
                }
                if (lower.contains("signature") || lower.contains("invalid signature")) {
                    return SecurityErrorCode.TOKEN_SIGNATURE_INVALID;
                }
                if (lower.contains("malformed")) {
                    return SecurityErrorCode.TOKEN_MALFORMED;
                }
                // invalid_token 등
                if (lower.contains("invalid")) {
                    return SecurityErrorCode.TOKEN_INVALID;
                }
            }
        }

        // 그 외 기본 인증 실패
        return SecurityErrorCode.UNAUTHORIZED;
    }
}
