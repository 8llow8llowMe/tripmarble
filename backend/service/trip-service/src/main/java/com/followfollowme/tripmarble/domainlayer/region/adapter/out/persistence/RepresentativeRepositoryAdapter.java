package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository.RepresentativeRegionRepository;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RepresentativeRepositoryAdapter implements RepresentativeRegionRepositoryPort {

    private final RepresentativeRegionRepository representativeRegionRepository;

    @Override
    public List<RepresentativeRegion> findAll() {
        return representativeRegionRepository.findAll().stream()
            .map(entity -> RepresentativeRegion.builder()
                .id(entity.getId())
                .name(entity.getName())
                .imageUrl(entity.getImageUrl())
                .regionId(entity.getRegion() != null ? entity.getRegion().getId() : null)
                .sigunguId(entity.getSigungu() != null ? entity.getSigungu().getId() : null)
                .build())
            .toList();
    }
}
