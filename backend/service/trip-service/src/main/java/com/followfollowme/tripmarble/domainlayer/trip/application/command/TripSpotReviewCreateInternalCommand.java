package com.followfollowme.tripmarble.domainlayer.trip.application.command;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotReviewCreateInternalRequest;
import java.util.List;
import lombok.Builder;

@Builder
public record TripSpotReviewCreateInternalCommand(
    String content,
    double rating,
    List<String> photoUrls
) {

    public static TripSpotReviewCreateInternalCommand from(TripSpotReviewCreateInternalRequest request) {
        return TripSpotReviewCreateInternalCommand.builder()
            .content(request.content())
            .rating(request.rating())
            .photoUrls(request.photoUrls())
            .build();
    }
}
