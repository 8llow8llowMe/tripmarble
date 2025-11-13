package com.followfollowme.tripmarble.apigateway.controller;

import com.followfollowme.tripmarble.apigateway.service.ErrorCodeInternalUseCase;
import io.swagger.v3.oas.annotations.Hidden;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.reactive.result.view.Rendering;
import reactor.core.publisher.Mono;

@Hidden
@Controller
@RequiredArgsConstructor
@RequestMapping("/docs")
public class ErrorCodeDocumentController {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final ErrorCodeInternalUseCase errorCodeInternalUseCase;

    @GetMapping("/error-codes")
    public Mono<Rendering> viewErrorCodePage() {
        return errorCodeInternalUseCase.aggregateAllErrorCodes()
            .map(allErrorCodes -> {
                int totalCount = errorCodeInternalUseCase.calculateTotalCount(allErrorCodes);

                return Rendering.view("error-codes")
                    .modelAttribute("errorCodes", allErrorCodes)
                    .modelAttribute("totalCount", totalCount)
                    .modelAttribute("serviceCount", allErrorCodes.size())
                    .modelAttribute("lastUpdated", LocalDateTime.now().format(FORMATTER))
                    .build();
            });
    }
}
