package com.followfollowme.tripmarble.global.internal.controller;

import com.followfollowme.tripmarble.common.dto.ErrorCodeInfo;
import com.followfollowme.tripmarble.common.exception.ValidationErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.theme.application.exception.TripThemeErrorCode;
import com.followfollowme.tripmarble.security.common.exception.SecurityErrorCode;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Hidden
@RestController
@RequestMapping("/internal/v1/error-codes")
@Tag(name = "에러코드 (trip-game-service)", description = "Trip Game Service 내부 시스템 에러 코드 전용 API 입니다.")
public class TripGameServiceErrorCodeInternalController {

    private static final String SERVICE_NAME = "TRIP-GAME-SERVICE";

    @GetMapping
    @Operation(summary = "에러코드 목록 조회", description = "현재 서비스의 모든 에러코드를 반환합니다.")
    public ResponseEntity<List<ErrorCodeInfo>> getErrorCodes() {
        List<ErrorCodeInfo> errorCodes = new ArrayList<>();

        Arrays.stream(SecurityErrorCode.values())
            .forEach(code -> errorCodes.add(
                ErrorCodeInfo.from(
                    SERVICE_NAME,
                    code.getCode(),
                    code.getMessage(),
                    code.getHttpStatus()
                )
            ));

        Arrays.stream(TripThemeErrorCode.values())
            .forEach(code -> errorCodes.add(
                ErrorCodeInfo.from(
                    SERVICE_NAME,
                    code.getCode(),
                    code.getMessage(),
                    code.getHttpStatus()
                )
            ));

        Arrays.stream(TripGameErrorCode.values())
            .forEach(code -> errorCodes.add(
                ErrorCodeInfo.from(
                    SERVICE_NAME,
                    code.getCode(),
                    code.getMessage(),
                    code.getHttpStatus()
                )
            ));

        Arrays.stream(ValidationErrorCode.values())
            .forEach(code -> errorCodes.add(
                ErrorCodeInfo.from(
                    SERVICE_NAME,
                    code.getCode(),
                    code.getMessage(),
                    code.getHttpStatus()
                )
            ));

        return ResponseEntity.ok().body(errorCodes);
    }
}
