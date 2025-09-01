package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameTileEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.TripGameTileRepository;
import com.followfollowme.tripmarble.domainlayer.game.application.mapper.TripGameTileMapper;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameTileRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGameTileRepositoryAdapter implements TripGameTileRepositoryPort {

    private final TripGameTileRepository tripGameTileRepository;
    private final TripGameTileMapper tripGameTileMapper;

    @Override
    public List<TripGameTile> saveAll(List<TripGameTile> tripGameTiles, TripGame tripGame) {
        List<TripGameTileEntity> entities = tripGameTileMapper.toEntityListFromDomainList(tripGameTiles, tripGame);
        List<TripGameTileEntity> saved = tripGameTileRepository.saveAll(entities);
        return tripGameTileMapper.toDomainListFromEntityList(saved);
    }

    @Override
    public int findMaxStepNoByTripGameId(long tripGameId) {
        return tripGameTileRepository.findMaxStepNoByTripGameId(tripGameId);
    }

    @Override
    public Optional<TripGameTile> findByTripGameIdAndStepNo(long tripGameId, int stepNo) {
        return tripGameTileRepository.findByTripGameIdAndStepNo(tripGameId, stepNo)
            .map(tripGameTileMapper::toDomainFromEntity);
    }

    @Override
    public List<TripGameTile> findAllByTripGameId(long tripGameId) {
        List<TripGameTileEntity> entities = tripGameTileRepository.findAllByTripGameId(tripGameId);
        return tripGameTileMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public Optional<TripGameTile> findById(long tripGameTileId) {
        return tripGameTileRepository.findById(tripGameTileId)
            .map(tripGameTileMapper::toDomainFromEntity);
    }
}
