package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 생성 응답 DTO")
public record TripGameCreateResponse(

    @Schema(description = "생성된 여행 게임 ID", example = "202507110001")
    String tripGameId,

    @Schema(description = "게임 제목", example = "여름 제주도 여행")
    String title,

    @Schema(description = "게임 상태", example = "WAITING")
    String gameStatus,

    @Schema(description = "게임 상태 설명", example = "시작 전")
    String gameStatusDescription,

    @Schema(description = "게임 난이도", example = "NORMAL")
    String difficultyCode,

    @Schema(description = "게임 난이도 설명", example = "보통")
    String difficultyDescription,

    @Schema(description = "여행 시작일", example = "2025-07-15")
    LocalDate startedAt,

    @Schema(description = "여행 종료일", example = "2025-07-20")
    LocalDate endedAt,

    @Schema(description = "대표 여행지 이름", example = "제주")
    String representativeRegionName,

    @Schema(description = "여행 테마 이름들", example = "[\"관광\", \"전시\", \"축제/공연\"]")
    List<String> tripThemeNames,

    @Schema(description = "방장 여부", example = "true")
    boolean isHost,

    @Schema(description = "준비 여부", example = "false")
    boolean isReady
) {

}
