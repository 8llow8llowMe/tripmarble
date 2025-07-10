package com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripThemeResponse(
    long tripThemeId,
    String tripThemeName
) {

}
