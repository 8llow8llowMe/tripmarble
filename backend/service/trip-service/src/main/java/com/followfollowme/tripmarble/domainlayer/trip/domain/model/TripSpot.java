package com.followfollowme.tripmarble.domainlayer.trip.domain.model;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TripSpot(
    long id,
    int contentTypeId,
    int contentId,
    String title,
    String tel,
    String zipcode,
    String addr1,
    String addr2,
    double mapX,
    double mapY,
    int mlevel,
    int areaCode,
    int sigunguCode,
    int ldongRegnCd,
    int ldongSignguCd,
    String cat1,
    String cat2,
    String cat3,
    String lclsSystm1,
    String lclsSystm2,
    String lclsSystm3,
    String firstImage,
    String firstImage2,
    String cpyrhtDivCd,
    LocalDateTime createdTime,
    LocalDateTime modifiedTime
) {

}
