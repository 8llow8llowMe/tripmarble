package com.followfollowme.tripmarble.domainlayer.trip.application.command;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateRequest;
import lombok.Builder;

import java.util.List;

@Builder
public record TripSpotReviewCreateCommand(
    String content,
    double rating,
    List<String> photoUrls
) {

    public static TripSpotReviewCreateCommand from(TripSpotReviewCreateRequest request) {
        return TripSpotReviewCreateCommand.builder()
            .content(request.content())
            .rating(request.rating())
            .photoUrls(request.photoUrls())
            .build();
    }
}
