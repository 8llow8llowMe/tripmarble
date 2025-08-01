package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripContentTypeEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripContentTypeRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripContentTypeMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripContentTypeRepositoryAdapter implements TripContentTypeRepositoryPort {

    private final TripContentTypeRepository tripContentTypeRepository;
    private final TripContentTypeMapper tripContentTypeMapper;

    @Override
    public List<TripContentType> findAll() {
        List<TripContentTypeEntity> entities = tripContentTypeRepository.findAll();
        return tripContentTypeMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public Optional<String> findNameByContentTypeId(int contentTypeId) {
        return tripContentTypeRepository.findNameByContentTypeId(contentTypeId);
    }

    @Override
    public List<TripContentType> findAllById(List<Long> tripContentTypeIds) {
        List<TripContentTypeEntity> entities = tripContentTypeRepository.findAllById(tripContentTypeIds);
        return tripContentTypeMapper.toDomainListFromEntityList(entities);
    }
}
