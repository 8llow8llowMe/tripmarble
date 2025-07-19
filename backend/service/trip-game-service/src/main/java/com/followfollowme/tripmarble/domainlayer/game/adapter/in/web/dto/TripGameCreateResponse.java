package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
@Schema(description = "여행 게임 생성 응답 DTO")
public record TripGameCreateResponse(

    @Schema(description = "생성된 여행 게임 ID", example = "202507110001")
    long tripGameId,

    @Schema(description = "게임 상태", example = "WAITING")
    Status status,

    @Schema(description = "게임 상태 메시지", example = "시작 전")
    String statusMessage,

    @Schema(description = "게임 난이도", example = "NORMAL")
    Difficulty difficulty,

    @Schema(description = "게임 난이도 메시지", example = "보통")
    String difficultyMessage,

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
