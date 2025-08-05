package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 생성 응답 DTO")
public record TripGameCreateResponse(
    TripGameView tripGameView,
    List<TripGameTileView> tripGameTileViews
) {

}
