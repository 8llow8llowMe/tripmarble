package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.SigunguEntity;
import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository.SigunguRepository;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.SigunguMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SigunguRepositoryAdapter implements SigunguRepositoryPort {

    private final SigunguRepository sigunguRepository;
    private final SigunguMapper sigunguMapper;

    @Override
    public List<Sigungu> findAllByRegionId(long regionId) {
        List<SigunguEntity> entities = sigunguRepository.findAllByRegionId(regionId);
        return sigunguMapper.toDomainListFromEntityList(entities);
    }
}
