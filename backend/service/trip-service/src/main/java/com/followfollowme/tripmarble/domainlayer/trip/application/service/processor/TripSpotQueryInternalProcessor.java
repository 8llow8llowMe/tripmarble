package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter.TripSpotInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotWithContentTypeName;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripSpotQueryInternalProcessor {

    private final TripSpotRepositoryPort tripSpotRepositoryPort;
    private final TripSpotInternalPresenter tripSpotInternalPresenter;

    public List<TripSpotQueryInternalResponse> getTripSpotsByIds(List<Long> tripSpotIds) {
        List<TripSpotWithContentTypeName> readModels = tripSpotRepositoryPort.findAllWithContentTypeNameByIds(tripSpotIds);
        return tripSpotInternalPresenter.toQueryResponseList(readModels);
    }
}
