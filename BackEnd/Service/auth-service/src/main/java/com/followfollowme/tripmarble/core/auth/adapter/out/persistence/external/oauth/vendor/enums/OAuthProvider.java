package com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums;

import java.util.Arrays;

public enum OAuthProvider {
    KAKAO, NAVER;

    public static OAuthProvider fromName(String providerName) {
        return Arrays.stream(values())
            .filter(d -> d.name().equalsIgnoreCase(providerName))
            .findFirst()
            .orElseThrow(
                () -> new IllegalArgumentException("지원하지 않는 OAuth 제공자입니다: " + providerName));
    }
}
