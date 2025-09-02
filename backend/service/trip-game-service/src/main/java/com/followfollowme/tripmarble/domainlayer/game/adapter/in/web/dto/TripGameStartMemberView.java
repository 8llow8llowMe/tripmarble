package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "게임 참여자 정보 View DTO")
public record TripGameStartMemberView(

    @Schema(description = "참여자 회원 ID", example = "202507110001")
    String memberId,

    @Schema(description = "참여자 닉네임", example = "여행왕동근")
    String nickname,

    @Schema(description = "참여자 프로필 이미지 URL", example = "https://cdn.tripmarble.com/profile/101.png")
    String profileImageUrl,

    @Schema(description = "게임 내 순서 (턴 순서)", example = "1")
    int turnOrder,

    @Schema(description = "해당 참여자가 방장인지 여부", example = "true")
    boolean isHost
) {

}
