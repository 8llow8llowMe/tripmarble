package com.followfollowme.tripmarble.apigateway.controller;

import com.followfollowme.tripmarble.apigateway.jwt.exception.JwtErrorCode;
import com.followfollowme.tripmarble.common.dto.ErrorCodeInfo;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Hidden
@RestController
@RequestMapping("/internal/api-gateway/error-codes")
@Tag(name = "에러코드 (api-gateway)", description = "API Gateway 내부 시스템 에러 코드 전용 API 입니다.")
public class ApiGatewayErrorCodeInternalController {

    // Gateway 자신은 버전 관리 불필요
    // 이유: Gateway는 인프라이므로 에러코드 구조가 거의 안 바뀜

    private static final String SERVICE_NAME = "API-GATEWAY";

    @GetMapping
    public ResponseEntity<List<ErrorCodeInfo>> getErrorCodes() {
        List<ErrorCodeInfo> errorCodes = Arrays.stream(JwtErrorCode.values())
            .map(code -> ErrorCodeInfo.from(
                SERVICE_NAME,
                code.getCode(),
                code.getMessage(),
                code.getHttpStatus()
            ))
            .toList();

        return ResponseEntity.ok(errorCodes);
    }
}
