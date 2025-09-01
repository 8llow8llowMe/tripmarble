package com.followfollowme.tripmarble.global.infra.tourapi.properties;

import java.util.Map;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "tourapi")
public record TourApiRegistryProperties(
    String serviceKey, // 공통 서비스 키
    Map<String, String> defaultParams,
    Map<String, TourApiCategory> categories
) {

    public record TourApiCategory(
        Map<String, TourApiSpec> apis
    ) {

    }

    public record TourApiSpec(
        String url,
        Map<String, String> params // API별 개별 쿼리 파라미터
    ) {

    }
}
