package com.followfollowme.tripmarble.security.common.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.security.common.exception.SecurityErrorCode;
import com.followfollowme.tripmarble.security.resourceserver.resolver.SecurityAuthenticationErrorResolver;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
        throws IOException, ServletException {
        log.warn("[인증 실패] 인증되지 않은 요청 - {}", authException.getMessage());

        SecurityErrorCode errorCode = SecurityAuthenticationErrorResolver.resolve(authException);

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Response<Void> errorResponse = Response.fail(errorCode.getCode(), errorCode.getMessage());
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
