package com.followfollowme.tripmarble.apigateway.controller;

import com.followfollowme.tripmarble.apigateway.service.ErrorCodeInternalUseCase;
import com.followfollowme.tripmarble.common.dto.ErrorCodeInfo;
import io.swagger.v3.oas.annotations.Hidden;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@Hidden
@RestController
@RequiredArgsConstructor
@RequestMapping("/docs")
public class ErrorCodeWebController {

    private final ErrorCodeInternalUseCase errorCodeInternalUseCase;

    @GetMapping("/error-codes/json")
    public Mono<Map<String, List<ErrorCodeInfo>>> getErrorCodesJson() {
        return errorCodeInternalUseCase.aggregateAllErrorCodes();
    }
}
