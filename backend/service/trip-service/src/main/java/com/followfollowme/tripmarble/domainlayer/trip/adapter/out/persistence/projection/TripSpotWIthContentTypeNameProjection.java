package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection;

public record TripSpotWIthContentTypeNameProjection(
    long tripSpotId,
    String contentTypeName,
    String tripSpotName,
    double longitude,
    double latitude
) {

}
