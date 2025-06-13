package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripContentTypeFacade implements TripContentTypeWebUseCase {

    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;

    @Override
    public List<TripContentTypeResponse> getAllTripContentTypes() {
        return tripContentTypeRepositoryPort.findAll().stream()
            .map(tripContentType -> TripContentTypeResponse.builder()
                .contentTypeId(tripContentType.contentTypeId())
                .contentTypeName(tripContentType.contentTypeName())
                .build())
            .toList();
    }
}
