package com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SigunguItem(
    @JsonProperty("lDongRegnCd")
    String regionCode,

    @JsonProperty("lDongRegnNm")
    String regionName,

    @JsonProperty("lDongSignguCd")
    String sigunguCode,

    @JsonProperty("lDongSignguNm")
    String sigunguName
) {

}
