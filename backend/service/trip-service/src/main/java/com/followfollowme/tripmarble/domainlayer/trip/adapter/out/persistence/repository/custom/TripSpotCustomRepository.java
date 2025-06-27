package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import java.util.List;
import org.springframework.data.domain.Slice;

public interface TripSpotCustomRepository {

    Slice<TripSpotEntity> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(List<Integer> ldongSignguCodes,
        long lastTripSpotId, int size);
}
