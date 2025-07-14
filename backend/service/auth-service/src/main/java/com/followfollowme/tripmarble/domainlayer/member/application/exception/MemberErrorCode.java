package com.followfollowme.tripmarble.domainlayer.member.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberErrorCode {

    EXIST_MEMBER_EMAIL("MEM001", "이미 가입된 이메일 (%s)입니다.", HttpStatus.CONFLICT),
    NOT_FOUND_MEMBER("MEM002", "존재하지 않는 회원입니다", HttpStatus.NOT_FOUND),
    NOT_MATCH_PASSWORD("MEM003", "비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    UPLOAD_PROFILE_IMAGE_FAILED("MEM004", "프로필 이미지 업로드에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String errorMessage;
    private final HttpStatus httpStatus;
}
