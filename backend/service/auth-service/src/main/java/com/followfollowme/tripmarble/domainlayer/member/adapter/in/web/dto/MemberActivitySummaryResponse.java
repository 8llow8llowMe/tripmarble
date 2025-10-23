package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "나의 활동 요약 조회 응답 DTO")
public record MemberActivitySummaryResponse(

    @Schema(description = "회원 ID", example = "202507110001")
    String memberId,

    @Schema(description = "참여한 여행 게임 수", example = "23")
    int tripGameCount,

    @Schema(description = "작성한 여행 리뷰 수", example = "40")
    int tripSpotReviewCount,

    @Schema(description = "업로드한 리뷰 사진 수", example = "200")
    int tripSpotReviewPhotoCount
) {

}
