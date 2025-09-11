package com.followfollowme.tripmarble.storage.bucket;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MinioBucket {

    PROFILE_REAL_IMAGES("tripmarble", "profiles/real/images", "실제 프로필 이미지"),
    PROFILE_TEMP_IMAGES("tripmarble", "profiles/temp/images", "임시 프로필 이미지"),
    REPRESENTATIVE_REGION_IMAGES("tripmarble", "representative-regions/images", "대표 여행지 이미지"),
    UPLOADS_TEMP("tripmarble", "uploads/temp/files", "임시 업로드 파일");

    private final String bucketName;
    private final String pathPrefix;
    private final String description;

    public String objectPath(String objectName) {
        if (pathPrefix.isEmpty()) {
            return objectName;
        }
        return pathPrefix + "/" + objectName;
    }
}