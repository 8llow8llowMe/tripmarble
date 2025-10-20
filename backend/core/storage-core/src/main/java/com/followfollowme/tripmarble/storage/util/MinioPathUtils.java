package com.followfollowme.tripmarble.storage.util;

import com.followfollowme.tripmarble.storage.exception.MinioErrorCode;
import com.followfollowme.tripmarble.storage.exception.MinioException;

public final class MinioPathUtils {

    private MinioPathUtils() {
    }

    public static String extractObjectPath(String fileUrl, String bucketName) {
        String prefix = "/" + bucketName + "/";
        int idx = fileUrl.indexOf(prefix);
        if (idx == -1) {
            throw new MinioException(MinioErrorCode.INVALID_FILE_URL);
        }
        return fileUrl.substring(idx + prefix.length());
    }
}
