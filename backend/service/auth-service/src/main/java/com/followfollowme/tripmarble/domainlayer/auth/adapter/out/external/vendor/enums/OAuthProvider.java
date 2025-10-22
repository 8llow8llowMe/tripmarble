package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OAuthProvider {

    KAKAO("카카오"),
    NAVER("네이버");

    private final String description;

    public static OAuthProvider fromName(String providerName) {
        return Arrays.stream(values())
            .filter(d -> d.name().equalsIgnoreCase(providerName))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 OAuth 제공자입니다: " + providerName));
    }
}
