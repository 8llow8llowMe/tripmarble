package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository.RepresentativeRegionSigunguMappingRepository;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionSigunguMappingRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RepresentativeRegionSigunguMappingRepositoryAdapter implements RepresentativeRegionSigunguMappingRepositoryPort {

    private final RepresentativeRegionSigunguMappingRepository representativeRegionSigunguMappingRepository;

    @Override
    public List<Long> findSigunguIdsByRepresentativeRegionId(long representativeRegionId) {
        return representativeRegionSigunguMappingRepository.findSigunguIdsByRepresentativeRegionId(representativeRegionId);
    }
}
