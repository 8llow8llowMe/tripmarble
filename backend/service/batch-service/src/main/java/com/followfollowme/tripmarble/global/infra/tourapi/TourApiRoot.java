package com.followfollowme.tripmarble.global.infra.tourapi;

public record TourApiRoot<T>(
    TourApiGenericResponse<T> response
) {

}
