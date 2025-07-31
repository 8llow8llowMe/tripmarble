package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(hidden = true, description = "내부 서비스 통신 전용 ~~~ 응답 DTO")
public record TripSpotRandomResponse(

    @Schema(description = "여행지 정보 아이디", example = "1")
    long tripSpotId,

    @Schema(description = "TourAPI 콘텐츠 타입 ID (자연키)", example = "12")
    int contentTypeId,

    @Schema(description = "여행지 정보 이름 (제목)", example = "가림상회")
    String tripSpotName
) {

}
