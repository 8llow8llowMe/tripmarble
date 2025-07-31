package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameThemeMappingEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.TripGameThemeMappingRepository;
import com.followfollowme.tripmarble.domainlayer.game.application.mapper.TripGameThemeMappingMapper;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameThemeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameThemeMapping;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGameThemeMappingRepositoryAdapter implements TripGameThemeMappingRepositoryPort {

    private final TripGameThemeMappingRepository tripGameThemeMappingRepository;
    private final TripGameThemeMappingMapper tripGameThemeMappingMapper;

    @Override
    public List<TripGameThemeMapping> saveAll(List<TripGameThemeMapping> mappings, TripGame tripGame,
        List<TripTheme> tripThemes) {
        List<TripGameThemeMappingEntity> entities = tripGameThemeMappingMapper.toEntityListFromDomainList(mappings,
            tripGame, tripThemes);
        List<TripGameThemeMappingEntity> saved = tripGameThemeMappingRepository.saveAll(entities);
        return tripGameThemeMappingMapper.toDomainListFromEntityList(saved);
    }
}
