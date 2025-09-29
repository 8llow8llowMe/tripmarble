package com.followfollowme.tripmarble.domainlayer.review.application.command;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewCreateRequest;
import java.util.List;
import lombok.Builder;

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
