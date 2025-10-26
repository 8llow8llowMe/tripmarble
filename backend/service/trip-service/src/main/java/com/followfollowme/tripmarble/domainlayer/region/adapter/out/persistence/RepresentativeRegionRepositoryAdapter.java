package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository.RepresentativeRegionRepository;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.RepresentativeRegionMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RepresentativeRegionRepositoryAdapter implements RepresentativeRegionRepositoryPort {

    private final RepresentativeRegionRepository representativeRegionRepository;
    private final RepresentativeRegionMapper representativeRegionMapper;

    @Override
    public List<RepresentativeRegion> findAll() {
        List<RepresentativeRegionEntity> entities = representativeRegionRepository.findAll();
        return representativeRegionMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public Optional<RepresentativeRegion> findById(long representativeRegionId) {
        return representativeRegionRepository.findById(representativeRegionId)
            .map(representativeRegionMapper::toDomainFromEntity);
    }

    @Override
    public List<RepresentativeRegion> findAllByIdIn(List<Long> representativeRegionIds) {
        List<RepresentativeRegionEntity> entities = representativeRegionRepository.findAllByIdIn(representativeRegionIds);
        return representativeRegionMapper.toDomainListFromEntityList(entities);
    }
}
