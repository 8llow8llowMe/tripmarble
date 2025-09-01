package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripContentTypeFetchProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripContentTypeFacade implements TripContentTypeWebUseCase {

    private final TripContentTypeFetchProcessor tripContentTypeFetchProcessor;

    @Override
    @Transactional(readOnly = true)
    public List<TripContentTypeResponse> getAllTripContentTypes() {
        return tripContentTypeFetchProcessor.fetchAllTripContentTypes();
    }
}
