package com.followfollowme.tripmarble.storage.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MinioErrorCode {

    FILE_UPLOAD_FAILED("MINIO_001", "파일(사진) 업로드에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    FILE_DELETE_FAILED("MINIO_002", "파일(사진) 삭제에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    FILE_COPY_FAILED("MINIO_003", "파일(사진) 복사에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_FILE_URL("MINIO_004", "잘못된 파일(사진) URL 입니다.", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}
