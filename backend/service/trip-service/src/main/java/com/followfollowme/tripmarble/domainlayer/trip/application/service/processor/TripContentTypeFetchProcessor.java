package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter.TripContentTypePresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripContentTypeFetchProcessor {

    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;
    private final TripContentTypePresenter tripContentTypePresenter;

    public List<TripContentTypeResponse> fetchAllTripContentTypes() {
        List<TripContentType> tripContentTypes = tripContentTypeRepositoryPort.findAll();
        return tripContentTypePresenter.toResponseList(tripContentTypes);
    }
}
