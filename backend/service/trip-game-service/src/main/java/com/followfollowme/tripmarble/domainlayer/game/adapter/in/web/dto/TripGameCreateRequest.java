package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Schema(description = "여행 게임 생성 요청 DTO")
public record TripGameCreateRequest(

    @Schema(description = "여행 제목", example = "여름 제주도 여행")
    @NotNull(message = "여행 제목은 필수입니다.")
    @Size(min = 1, max = 100, message = "여행 제목은 1자 이상 100자 이하로 입력해주세요.")
    String title,

    @Schema(description = "게임 난이도", example = "NORMAL")
    @NotNull(message = "게임 난이도는 필수입니다.")
    Difficulty difficulty,

    @Schema(description = "여행 시작일", example = "2025-07-15")
    @NotNull(message = "여행 시작일은 필수입니다.")
    @FutureOrPresent(message = "여행 시작일은 오늘 이후여야 합니다.")
    LocalDate startedAt,

    @Schema(description = "여행 종료일", example = "2025-07-20")
    @NotNull(message = "여행 종료일은 필수입니다.")
    @FutureOrPresent(message = "여행 종료일은 오늘 이후여야 합니다.")
    LocalDate endedAt,

    @Schema(description = "대표 여행지 아이디", example = "10")
    @NotNull(message = "대표 여행지 선택은 필수입니다.")
    long representativeRegionId,

    @Schema(description = "여행 테마 아이디 목록", example = "[1, 2, 3, 4]")
    @NotEmpty(message = "여행 테마는 1개 이상 선택해야 합니다.")
    List<Long> tripThemeIds
) {

}
