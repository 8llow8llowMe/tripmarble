package com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeContentTypeMappingEntity;
import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.repository.TripThemeContentTypeMappingRepository;
import com.followfollowme.tripmarble.domainlayer.theme.application.mapper.TripThemeContentTypeMappingMapper;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.out.TripThemeContentTypeMappingRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripThemeContentTypeMapping;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripThemeContentTypeMappingRepositoryAdapter implements TripThemeContentTypeMappingRepositoryPort {

    private final TripThemeContentTypeMappingRepository tripThemeContentTypeMappingRepository;
    private final TripThemeContentTypeMappingMapper tripThemeContentTypeMappingMapper;

    @Override
    public List<TripThemeContentTypeMapping> findByTripThemeIds(List<Long> tripThemeIds) {
        List<TripThemeContentTypeMappingEntity> entities = tripThemeContentTypeMappingRepository.findByTripThemeIdIn(
            tripThemeIds);
        return tripThemeContentTypeMappingMapper.toDomainListFromEntityList(entities);
    }
}
