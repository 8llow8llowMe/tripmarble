package com.followfollowme.tripmarble.domainlayer.game.adapter.in.internal.dto;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Hidden
@Schema(description = "해당 회원의 참여한 여행 게임 개수 조회 응답 DTO")
public record TripGameCountInternalResponse(

    @Schema(description = "회원 ID", example = "1234")
    long memberId,

    @Schema(description = "참여한 여행 게임 개수", example = "20")
    int tripGameCount
) {

}