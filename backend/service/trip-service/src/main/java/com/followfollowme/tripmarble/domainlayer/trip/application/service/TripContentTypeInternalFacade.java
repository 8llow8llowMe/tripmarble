package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TripContentTypeInternalFacade implements TripContentTypeInternalUseCase {

    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;

    @Override
    public List<TripContentTypeInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds) {
        return tripContentTypeRepositoryPort.findAllById(tripContentTypeIds).stream()
            .map(type -> TripContentTypeInternalResponse
                .builder()
                .tripContentTypeId(type.id())
                .contentTypeId(type.contentTypeId())
                .build()
            )
            .toList();
    }
}
