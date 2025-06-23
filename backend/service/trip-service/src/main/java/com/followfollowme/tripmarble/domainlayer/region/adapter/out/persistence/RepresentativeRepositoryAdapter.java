package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository.RepresentativeRegionRepository;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.RepresentativeRegionMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RepresentativeRepositoryAdapter implements RepresentativeRegionRepositoryPort {

    private final RepresentativeRegionRepository representativeRegionRepository;
    private final RepresentativeRegionMapper representativeRegionMapper;

    @Override
    public List<RepresentativeRegion> findAll() {
        List<RepresentativeRegionEntity> entities = representativeRegionRepository.findAll();
        return representativeRegionMapper.toDomainListFromEntityList(entities);
    }
}
