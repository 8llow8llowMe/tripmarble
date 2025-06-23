package com.followfollowme.tripmarble.global.infra.tourapi.eums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TourApi {

    REGION_CODE("ldong-code2", "region-code", "법정동 코드 조회 [지역코드(시도코드) 조회]"),
    SIGUNGU_CODE("ldong-code2", "sigungu-code", "법정동 코드 조회 [시군구코드 조회]"),
    REGION_BASED_TRIP_SPOT_LIST("area-based-list2", "region-based-trip-spot-list", "지역기반 관광정보 조회");

    private final String category;
    private final String name;
    private final String description;
}
