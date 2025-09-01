package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
@Schema(description = "여행 게임 재개 응답 DTO")
public record TripGameResumeResponse(

    @Schema(description = "여행 게임 ID", example = "202507110001")
    String tripGameId,

    @Schema(description = "게임 제목", example = "여름 제주도 여행")
    String title,

    @Schema(description = "게임 상태 코드", example = "ONGOING")
    String gameStatus,

    @Schema(description = "게임 상태 설명", example = "게임 진행 중")
    String gameStatusDescription,

    @Schema(description = "게임 난이도 코드", example = "NORMAL")
    String difficultyCode,

    @Schema(description = "게임 난이도 설명", example = "보통")
    String difficultyDescription,

    @Schema(description = "여행 시작일", example = "2025-07-15")
    LocalDate startedAt,

    @Schema(description = "여행 종료일", example = "2025-07-20")
    LocalDate endedAt,

    @Schema(description = "현재 턴 순서", example = "2")
    int currentTurnOrder,

    @Schema(description = "현재 진행 스텝 번호", example = "5")
    int currentStepNo,

    @Schema(description = "대표 여행지 이름", example = "제주")
    String representativeRegionName,

    @Schema(description = "여행 테마 이름들", example = "[\"관광\", \"전시\", \"축제/공연\"]")
    List<String> tripThemeNames
) {

}
