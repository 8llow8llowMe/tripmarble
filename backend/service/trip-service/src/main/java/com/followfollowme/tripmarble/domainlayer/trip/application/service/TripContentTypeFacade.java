package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripContentTypeMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripContentTypeFacade implements TripContentTypeWebUseCase {

    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;
    private final TripContentTypeMapper tripContentTypeMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TripContentTypeResponse> getAllTripContentTypes() {
        List<TripContentType> tripContentTypes = tripContentTypeRepositoryPort.findAll();
        return tripContentTypeMapper.toResponseListFromDomainList(tripContentTypes);
    }
}
