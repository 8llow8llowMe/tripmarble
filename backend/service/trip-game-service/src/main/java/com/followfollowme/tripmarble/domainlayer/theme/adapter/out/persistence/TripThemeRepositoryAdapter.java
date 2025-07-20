package com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeEntity;
import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.repository.TripThemeRepository;
import com.followfollowme.tripmarble.domainlayer.theme.application.mapper.TripThemeMapper;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TripThemeRepositoryAdapter implements TripThemeRepositoryPort {

    private final TripThemeRepository tripThemeRepository;
    private final TripThemeMapper tripThemeMapper;

    @Override
    public List<TripTheme> findAll() {
        List<TripThemeEntity> entities = tripThemeRepository.findAll();
        return tripThemeMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public Optional<TripTheme> findById(Long tripThemeId) {
        return tripThemeRepository.findById(tripThemeId)
            .map(tripThemeMapper::toDomainFromEntity);
    }

    @Override
    public List<TripTheme> findByIdIn(List<Long> tripThemeIds) {
        List<TripThemeEntity> entities = tripThemeRepository.findByIdIn(tripThemeIds);
        return tripThemeMapper.toDomainListFromEntityList(entities);
    }
}
