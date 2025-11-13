package com.followfollowme.tripmarble.apigateway.service;

import com.followfollowme.tripmarble.common.dto.ErrorCodeInfo;
import java.util.List;
import java.util.Map;
import reactor.core.publisher.Mono;

public interface ErrorCodeInternalUseCase {

    Mono<Map<String, List<ErrorCodeInfo>>> aggregateAllErrorCodes();

    int calculateTotalCount(Map<String, List<ErrorCodeInfo>> errorCodes);
}
