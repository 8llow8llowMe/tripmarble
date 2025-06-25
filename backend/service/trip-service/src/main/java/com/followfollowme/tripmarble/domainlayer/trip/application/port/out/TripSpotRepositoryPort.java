package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;

import java.util.List;
import java.util.Optional;

public interface TripSpotRepositoryPort {

    List<TripSpot> findAllByLdongSignguCdIn(List<Integer> ldongSignguCodes);

    Optional<TripSpot> findById(long tripSpotId);
}
