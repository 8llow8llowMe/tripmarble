package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripContentTypeRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripContentTypeRepositoryAdapter implements TripContentTypeRepositoryPort {

    private final TripContentTypeRepository tripContentTypeRepository;

    @Override
    public List<TripContentType> findAll() {
        return tripContentTypeRepository.findAll().stream()
            .map(entity -> TripContentType.builder()
                .id(entity.getId())
                .contentTypeId(entity.getContentTypeId())
                .contentTypeName(entity.getContentTypeName())
                .build())
            .toList();
    }
}
