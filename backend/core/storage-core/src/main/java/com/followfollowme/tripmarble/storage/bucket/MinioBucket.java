package com.followfollowme.tripmarble.storage.bucket;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MinioBucket {

    REAL_PROFILE_IMAGE("profile-images", "real", "사용하는 프로필 이미지"),
    TEMP_PROFILE_IMAGE("profile-images", "temp", "임시 프로필 이미지");

    private final String name;
    private final String pathPrefix;
    private final String description;

    public String fullName(String prefix) {
        return prefix + "-" + name;
    }

    public String objectPath(String objectName) {
        return pathPrefix + "/" + objectName;
    }
}
