package com.followfollowme.tripmarble.domainlayer.game.application.command;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.ReviewMissionRequest;
import java.util.List;
import lombok.Builder;

@Builder
public record ReviewMissionCommand(
    long tripSpotId,
    String content,
    double rating,
    List<String> photoUrls
) {

    public static ReviewMissionCommand from(ReviewMissionRequest request) {
        return ReviewMissionCommand.builder()
            .tripSpotId(Long.parseLong(request.tripSpotId()))
            .content(request.content())
            .rating(request.rating())
            .photoUrls(request.photoUrls())
            .build();
    }
}
