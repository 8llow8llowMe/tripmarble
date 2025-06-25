package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TripSpotRepositoryAdapter implements TripSpotRepositoryPort {

    private final TripSpotRepository tripSpotRepository;
    private final TripSpotMapper tripSpotMapper;

    @Override
    public List<TripSpot> findAllByLdongSignguCdIn(List<Integer> ldongSignguCodes) {
        List<TripSpotEntity> entities = tripSpotRepository.findAllByLdongSignguCdIn(ldongSignguCodes);
        return tripSpotMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public Optional<TripSpot> findById(long tripSpotId) {
        return tripSpotRepository.findById(tripSpotId)
            .map(tripSpotMapper::toDomainFromEntity);
    }
}
