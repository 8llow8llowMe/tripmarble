package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;

public interface TripContentTypeRepositoryPort {

    List<TripContentType> findAll();
}
