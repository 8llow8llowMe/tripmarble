package com.followfollowme.tripmarble.global.exception;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.common.exception.ValidationErrorCode;
import com.followfollowme.tripmarble.domainlayer.theme.application.exception.TripThemeException;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class TripGameServiceGlobalExceptionHandler {

    @ExceptionHandler(TripThemeException.class)
    public ResponseEntity<Response<Void>> tripThemeException(TripThemeException e) {
        log.error("여행 테마 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(Response.fail(e.getErrorCode().getCode(), e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName + "Error", message);
        });

        ValidationErrorCode errorCode = ValidationErrorCode.VALIDATION_ERROR;
        log.warn("Validation 오류: {}", errors);

        return ResponseEntity.status(errorCode.getHttpStatus())
            .body(Response.fail(errorCode.getCode(), errors));
    }
}
