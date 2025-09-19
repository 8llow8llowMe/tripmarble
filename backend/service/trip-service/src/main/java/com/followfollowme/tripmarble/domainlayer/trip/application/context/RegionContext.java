package com.followfollowme.tripmarble.domainlayer.trip.application.context;

import java.util.List;
import lombok.Builder;

@Builder
public record RegionContext(
    int regionCode,
    List<Integer> sigunguCodes
) {

}
