package com.followfollowme.tripmarble.global.exception;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class AuthServiceGlobalExceptionHandler {

    @ExceptionHandler(MemberException.class)
    public ResponseEntity<Response<Void>> memberException(MemberException e) {
        log.error("회원 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(Response.fail(e.getErrorCode().getCode(), e.getErrorCode().getErrorMessage()));
    }

}
