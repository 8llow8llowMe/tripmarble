package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(SnakeCaseStrategy.class)
public record NaverAccount(
    String id,
    String nickname,
    String name,
    String email,
    String gender,
    String age,
    String birthday,
    String profileImage,
    String birthyear,
    String mobile
) {
}
