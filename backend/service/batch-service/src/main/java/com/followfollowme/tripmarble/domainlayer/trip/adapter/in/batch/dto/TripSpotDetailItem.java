package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.batch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TripSpotDetailItem(
    @JsonProperty("contentid")
    String contentId,

    @JsonProperty("contenttypeid")
    String contentTypeId,
    String title,

    @JsonProperty("createdtime")
    String createdTime,

    @JsonProperty("modifiedtime")
    String modifiedTime,
    String tel,

    @JsonProperty("telname")
    String telName,
    String homepage,

    @JsonProperty("firstimage")
    String firstImage,

    @JsonProperty("firstimage2")
    String firstImage2,

    String cpyrhtDivCd,

    @JsonProperty("areacode")
    String areaCode,

    @JsonProperty("sigungucode")
    String sigunguCode,
    String lDongRegnCd,
    String lDongSignguCd,
    String lclsSystm1,
    String lclsSystm2,
    String lclsSystm3,
    String cat1,
    String cat2,
    String cat3,
    String addr1,
    String addr2,

    @JsonProperty("zipcode")
    String zipCode,

    @JsonProperty("mapx")
    String mapX,

    @JsonProperty("mapy")
    String mapY,

    @JsonProperty("mlevel")
    String mLevel,
    String overview
) {
}
