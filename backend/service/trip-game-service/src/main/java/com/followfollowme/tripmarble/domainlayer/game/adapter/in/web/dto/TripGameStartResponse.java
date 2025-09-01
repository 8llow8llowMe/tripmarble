package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "여행 게임 시작 응답 DTO")
public record TripGameStartResponse(

    @Schema(description = "여행 게임 ID", example = "1001")
    String tripGameId,

    @Schema(description = "게임 상태 코드", example = "ONGOING")
    String gameStatusCode,

    @Schema(description = "게임 상태 설명", example = "게임 진행 중")
    String gameStatusDescription,

    @Schema(description = "게임 참여자 목록 (순서 및 정보 포함)")
    List<TripGameStartMemberView> members
) {

}
