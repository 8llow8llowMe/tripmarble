package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository.RegionRepository;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.RegionMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegionRepositoryAdapter implements RegionRepositoryPort {

    private final RegionRepository regionRepository;
    private final RegionMapper regionMapper;

    @Override
    public List<Region> findAll() {
        List<RegionEntity> entities = regionRepository.findAll();
        return regionMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public Optional<Region> findById(long regionId) {
        return regionRepository.findById(regionId)
            .map(regionMapper::toDomainFromEntity);
    }
}
