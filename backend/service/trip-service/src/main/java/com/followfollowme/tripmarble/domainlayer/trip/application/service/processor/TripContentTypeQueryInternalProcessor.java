package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter.TripContentTypeInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripContentTypeRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripContentTypeQueryInternalProcessor {

    private final TripContentTypeRepositoryPort tripContentTypeRepositoryPort;
    private final TripContentTypeInternalPresenter tripContentTypeInternalPresenter;

    public List<TripContentTypeQueryInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds) {
        List<TripContentType> tripContentTypes = tripContentTypeRepositoryPort.findAllById(tripContentTypeIds);
        return tripContentTypeInternalPresenter.toQueryResponseList(tripContentTypes);
    }
}
