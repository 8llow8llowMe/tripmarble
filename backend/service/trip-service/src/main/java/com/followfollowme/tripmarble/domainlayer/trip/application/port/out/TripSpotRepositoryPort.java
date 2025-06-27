package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Slice;

public interface TripSpotRepositoryPort {

    Optional<TripSpot> findById(long tripSpotId);

    Slice<TripSpot> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(List<Integer> ldongSignguCodes,
        long lastTripSpotId, int size);
}
