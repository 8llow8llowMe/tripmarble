package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Slice;

public interface TripSpotRepositoryPort {

    Optional<TripSpot> findById(long tripSpotId);

    Slice<TripSpot> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
        int ldongRegnCd, List<Integer> ldongSignguCodes, long lastTripSpotId, int size, Integer contentTypeId);

    List<TripSpot> findRandomTripSpotsBySigunguCodesAndContentTypeIds(int ldongRegnCd, List<Integer> ldongSignguCodes,
        List<Integer> contentTypeIds, int limit);
}
