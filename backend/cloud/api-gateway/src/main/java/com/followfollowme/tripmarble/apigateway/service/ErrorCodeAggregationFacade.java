package com.followfollowme.tripmarble.apigateway.service;

import com.followfollowme.tripmarble.common.dto.ErrorCodeInfo;
import java.time.Duration;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ErrorCodeAggregationFacade implements ErrorCodeInternalUseCase {

    private static final Map<String, String> SERVICE_PATHS = Map.of(
        "API-GATEWAY", "/internal/api-gateway/error-codes",
        "AUTH-SERVICE", "/internal/auth-service/error-codes"
    );

    private final WebClient errorCodeWebClient;

    @Override
    public Mono<Map<String, List<ErrorCodeInfo>>> aggregateAllErrorCodes() {
        log.info("[ErrorCodeAggregationFacade] 전체 서비스 에러코드 수집 시작 (Reactive)");

        // 모든 서비스를 병렬로 조회
        return Flux.fromIterable(SERVICE_PATHS.entrySet())
            .flatMap(entry ->
                fetchErrorCodes(entry.getKey(), entry.getValue())
                    .map(errorCodes -> Map.entry(entry.getKey(), errorCodes))
            )
            .collectMap(Map.Entry::getKey, Map.Entry::getValue, LinkedHashMap::new)
            .doOnSuccess(this::logAggregationResult);
    }

    @Override
    public int calculateTotalCount(Map<String, List<ErrorCodeInfo>> errorCodes) {
        return errorCodes.values().stream()
            .mapToInt(List::size)
            .sum();
    }

    private Mono<List<ErrorCodeInfo>> fetchErrorCodes(String serviceName, String path) {
        log.debug("{} 에러코드 조회 시작: {}", serviceName, path);

        return errorCodeWebClient.get()
            .uri(path)
            .retrieve()
            .bodyToFlux(ErrorCodeInfo.class)
            .collectList()
            .timeout(Duration.ofSeconds(5))
            .doOnSuccess(list ->
                log.info("[ErrorCodeAggregationFacade] {} - {}개 에러코드 수집 완료", serviceName, list.size())
            )
            .onErrorResume(e -> {
                log.error("[ErrorCodeAggregationFacade] {} - 에러코드 수집 실패: {}", serviceName, e.getMessage());
                return Mono.just(Collections.emptyList());
            });
    }

    private void logAggregationResult(Map<String, List<ErrorCodeInfo>> allErrorCodes) {
        int totalCount = allErrorCodes.values().stream()
            .mapToInt(List::size)
            .sum();

        log.info("[ErrorCodeAggregationFacade] 에러코드 수집 완료: {}개 서비스, 총 {}개 에러코드",
            allErrorCodes.size(), totalCount);

        allErrorCodes.forEach((service, codes) ->
            log.info(" - {}: {}개", service, codes.size())
        );
    }
}