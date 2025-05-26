package com.followfollowme.tripmarble.security.auth.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import com.followfollowme.tripmarble.security.common.exception.SecurityErrorCode;
import com.followfollowme.tripmarble.security.common.exception.SecurityJwtException;
import com.followfollowme.tripmarble.security.common.jwt.JwtAuthentication;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";
    private final JwtAuthProvider jwtAuthProvider;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String accessToken = getJwtFrom(request);

        if (StringUtils.hasText(accessToken)) {
            try {
                MemberLoginActive member = jwtAuthProvider.parseAccessToken(accessToken);

                SecurityContextHolder.getContext()
                    .setAuthentication(createAuthenticationToken(member));
            } catch (SecurityJwtException e) {
                SecurityContextHolder.clearContext();
                sendError(response, e);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFrom(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }

        return null;
    }

    private JwtAuthentication createAuthenticationToken(MemberLoginActive member) {
        return new JwtAuthentication(member, "",
            List.of(new SimpleGrantedAuthority(member.role().name())));
    }

    private void sendError(HttpServletResponse response, SecurityJwtException e)
        throws IOException {
        SecurityErrorCode code = e.getErrorCode();
        response.setStatus(e.getErrorCode().getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        Response<Void> errorResponse = Response.fail(code.getCode(), code.getMessage());
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
