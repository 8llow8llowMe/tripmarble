package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripSpotRepositoryAdapter implements TripSpotRepositoryPort {

    private final TripSpotRepository tripSpotRepository;
    private final TripSpotMapper tripSpotMapper;

    @Override
    public Optional<TripSpot> findById(long tripSpotId) {
        return tripSpotRepository.findById(tripSpotId)
            .map(tripSpotMapper::toDomainFromEntity);
    }

    @Override
    public Slice<TripSpot> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(List<Integer> ldongSignguCodes,
        long lastTripSpotId, int size) {

        Slice<TripSpotEntity> entitySlice = tripSpotRepository.findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
            ldongSignguCodes, lastTripSpotId, size);

        return entitySlice.map(tripSpotMapper::toDomainFromEntity);
    }
}
