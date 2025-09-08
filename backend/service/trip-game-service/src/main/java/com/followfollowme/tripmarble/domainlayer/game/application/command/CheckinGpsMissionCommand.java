package com.followfollowme.tripmarble.domainlayer.game.application.command;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.CheckinGpsMissionRequest;
import lombok.Builder;

@Builder
public record CheckinGpsMissionCommand(
    double latitude,
    double longitude
) {

    public static CheckinGpsMissionCommand from(CheckinGpsMissionRequest request) {
        return CheckinGpsMissionCommand.builder()
            .latitude(request.latitude())
            .longitude(request.longitude())
            .build();
    }
}
