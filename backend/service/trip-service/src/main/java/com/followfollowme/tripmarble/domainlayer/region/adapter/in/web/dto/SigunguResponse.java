package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record SigunguResponse(
    long sigunguId,
    int sigunguCode,
    String sigunguName
) {
}
