package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMoveLogEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.TripGameMoveLogRepository;
import com.followfollowme.tripmarble.domainlayer.game.application.mapper.TripGameMoveLogMapper;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMoveLogRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGameMoveLogRepositoryAdapter implements TripGameMoveLogRepositoryPort {

    private final TripGameMoveLogRepository tripGameMoveLogRepository;
    private final TripGameMoveLogMapper tripGameMoveLogMapper;

    @Override
    public TripGameMoveLog save(TripGameMoveLog tripGameMoveLog, TripGameTile tripGameTile) {
        TripGameMoveLogEntity entity = tripGameMoveLogMapper.toEntityFromDomain(tripGameMoveLog, tripGameTile);
        TripGameMoveLogEntity savedEntity = tripGameMoveLogRepository.save(entity);
        return tripGameMoveLogMapper.toDomainFromEntity(savedEntity);
    }
}
