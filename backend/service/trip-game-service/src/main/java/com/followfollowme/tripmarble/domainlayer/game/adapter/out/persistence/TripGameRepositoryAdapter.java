package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.TripGameRepository;
import com.followfollowme.tripmarble.domainlayer.game.application.mapper.TripGameMapper;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGameRepositoryAdapter implements TripGameRepositoryPort {

    private final TripGameRepository tripGameRepository;
    private final TripGameMapper tripGameMapper;

    @Override
    public TripGame save(TripGame domain) {
        TripGameEntity entity = tripGameMapper.toEntityFromDomain(domain);
        TripGameEntity savedEntity = tripGameRepository.save(entity);
        return tripGameMapper.toDomainFromEntity(savedEntity);
    }
}
