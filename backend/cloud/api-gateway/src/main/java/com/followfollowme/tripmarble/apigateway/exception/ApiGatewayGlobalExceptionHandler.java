package com.followfollowme.tripmarble.apigateway.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.followfollowme.tripmarble.apigateway.jwt.exception.JwtErrorCode;
import com.followfollowme.tripmarble.apigateway.jwt.exception.JwtException;
import com.followfollowme.tripmarble.common.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@Order(-1) // 우선순위를 높게 설정하여 다른 핸들러보다 먼저 실행
@RequiredArgsConstructor
public class ApiGatewayGlobalExceptionHandler implements ErrorWebExceptionHandler {

    private final ObjectMapper objectMapper;

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        log.error("[ApiGatewayGlobalExceptionHandler] 예외 발생: {}", ex.getMessage(), ex);

        if (ex instanceof JwtException jwtException) {
            return handleJwtException(exchange, jwtException);
        }

        // 그 외 예외는 일반 에러로 처리
        return handleGenericException(exchange, ex);
    }

    private Mono<Void> handleJwtException(ServerWebExchange exchange, JwtException ex) {
        JwtErrorCode errorCode = ex.getErrorCode();

        log.error("[ApiGatewayGlobalExceptionHandler] JWT 검증 실패: code={}, message={}, uri={}",
            errorCode.getCode(),
            errorCode.getMessage(),
            exchange.getRequest().getURI()
        );

        Response<Void> errorResponse = Response.fail(errorCode.getCode(), errorCode.getMessage());

        return writeErrorResponse(exchange, errorCode.getHttpStatus(), errorResponse);
    }

    private Mono<Void> handleGenericException(ServerWebExchange exchange, Throwable ex) {
        log.error("[ApiGatewayGlobalExceptionHandler] 예상치 못한 에러 발생: uri={}",
            exchange.getRequest().getURI(), ex);

        Response<Void> errorResponse = Response.fail(
            "GATEWAY_500",
            "게이트웨이에서 오류가 발생했습니다"
        );

        return writeErrorResponse(exchange, HttpStatus.INTERNAL_SERVER_ERROR, errorResponse);
    }

    private Mono<Void> writeErrorResponse(ServerWebExchange exchange, HttpStatus status, Response<Void> errorResponse) {
        exchange.getResponse().setStatusCode(status);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

        try {
            byte[] bytes = objectMapper.writeValueAsBytes(errorResponse);
            DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);
            return exchange.getResponse().writeWith(Mono.just(buffer));
        } catch (JsonProcessingException e) {
            log.error("[ApiGatewayGlobalExceptionHandler] JSON 변환 실패", e);
            return exchange.getResponse().setComplete();
        }
    }
}
