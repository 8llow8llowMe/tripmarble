package com.followfollowme.tripmarble.domainlayer.trip.domain.model;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record TripSpotDetail(
    long id,
    long contentId,
    String homepage,
    String overview,
    LocalDateTime createdTime,
    LocalDateTime modifiedTime
) {

}
