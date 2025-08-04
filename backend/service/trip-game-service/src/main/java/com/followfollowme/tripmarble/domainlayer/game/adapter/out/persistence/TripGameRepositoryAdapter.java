package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.TripGameRepository;
import com.followfollowme.tripmarble.domainlayer.game.application.mapper.TripGameMapper;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGameRepositoryAdapter implements TripGameRepositoryPort {

    private final TripGameRepository tripGameRepository;
    private final TripGameMapper tripGameMapper;

    @Override
    public TripGame save(TripGame tripGame) {
        TripGameEntity entity = tripGameMapper.toEntityFromDomain(tripGame);
        TripGameEntity savedEntity = tripGameRepository.save(entity);
        return tripGameMapper.toDomainFromEntity(savedEntity);
    }

    @Override
    public Optional<TripGame> findById(long tripGameId) {
        return tripGameRepository.findById(tripGameId)
            .map(tripGameMapper::toDomainFromEntity);
    }
}
