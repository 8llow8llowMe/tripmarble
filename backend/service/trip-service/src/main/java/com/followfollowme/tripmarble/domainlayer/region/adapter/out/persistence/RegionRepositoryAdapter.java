package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository.RegionRepository;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.RegionMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

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
}
