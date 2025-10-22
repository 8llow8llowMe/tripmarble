package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(SnakeCaseStrategy.class)
public record NaverMemberResponse(
    String resultCode,
    String message,
    NaverAccount response
) {

}
