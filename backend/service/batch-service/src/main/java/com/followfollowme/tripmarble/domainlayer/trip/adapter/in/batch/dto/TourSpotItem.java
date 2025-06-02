package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TourSpotItem(
    String addr1,
    String addr2,

    @JsonProperty("areacode")
    String areaCode,
    String cat1,
    String cat2,
    String cat3,

    @JsonProperty("contentid")
    String contentId,

    @JsonProperty("contenttypeid")
    String contentTypeId,

    @JsonProperty("createdtime")
    String createdTime,

    @JsonProperty("firstimage")
    String firstImage,

    @JsonProperty("firstimage2")
    String firstImage2,

    @JsonProperty("cpyrhtDivCd")
    String cpyrhtDivCd,

    String mapX,
    String mapY,

    @JsonProperty("mlevel")
    String mLevel,

    @JsonProperty("modifiedtime")
    String modifiedTime,

    @JsonProperty("sigungucode")
    String sigunguCode,

    String tel,
    String title,

    @JsonProperty("zipcode")
    String zipCode,
    String lDongRegnCd,
    String lDongSignguCd,
    String lclsSystm1,
    String lclsSystm2,
    String lclsSystm3
) {

}
