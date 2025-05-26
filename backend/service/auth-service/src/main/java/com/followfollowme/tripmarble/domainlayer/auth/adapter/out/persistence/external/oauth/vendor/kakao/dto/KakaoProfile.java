package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence.external.oauth.vendor.kakao.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(SnakeCaseStrategy.class)
public record KakaoProfile(
    String nickname,
    String thumbnailImageUrl,
    String profileImageUrl,
    boolean isDefaultImage
) {

}
