package com.followfollowme.tripmarble.apigateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
        org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {
        // 요청 로깅
        logRequest(exchange);

        long startTime = System.currentTimeMillis();

        return chain.filter(exchange)
            .doFinally(signalType -> logResponse(exchange, startTime));
    }

    private void logRequest(ServerWebExchange exchange) {
        var request = exchange.getRequest();
        log.info("[REQ] {} {} headers={}", request.getMethod(), request.getURI(),
            request.getHeaders());
    }

    private void logResponse(ServerWebExchange exchange, long startTime) {
        var response = exchange.getResponse();
        HttpStatusCode status = response.getStatusCode();  // nullable

        long duration = System.currentTimeMillis() - startTime;

        log.info("[RES] status={} duration={}ms", status.value(),
            duration);
    }

    @Override
    public int getOrder() {
        return -1; // 가장 먼저 동작
    }
}
