package com.followfollowme.tripmarble.domainlayer.region.domain.model;

import lombok.Builder;

@Builder
public record Sigungu(
    long id,
    long regionId,
    int sigunguCode,
    String sigunguName
) {
}
