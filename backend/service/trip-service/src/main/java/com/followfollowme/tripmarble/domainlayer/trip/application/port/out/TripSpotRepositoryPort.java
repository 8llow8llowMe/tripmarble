package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.Optional;

public interface TripSpotRepositoryPort {

    Optional<TripSpot> findById(long tripSpotId);
}
