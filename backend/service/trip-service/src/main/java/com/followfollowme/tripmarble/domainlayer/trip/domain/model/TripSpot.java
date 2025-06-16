package com.followfollowme.tripmarble.domainlayer.trip.domain.model;

import lombok.Builder;

@Builder
public record TripSpot(
    long id,
    long tripContentTypeId,
    long contentId,
    String title,
    String tel,
    String zipCode,
    String addr1,
    String mapX,
    String mapY,
    String mlevel,
    String areaCode,
    String sigunguCode,
    String ldongRegnCd,
    String ldongSignguCd,
    String cat1,
    String cat2,
    String cat3,
    String lclsSystm1,
    String lclsSystm2,
    String lclsSystm3,
    String firstImage,
    String firstImage12,
    String cpyrhtDivCd
) {

}
