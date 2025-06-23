package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;

import java.util.List;
import java.util.Optional;

public interface TripSpotRepositoryPort {

    List<TripSpot> findAllBySigunguCodeIn(List<Integer> sigunguCodes);

    Optional<TripSpot> findById(long tripSpotId);
}
