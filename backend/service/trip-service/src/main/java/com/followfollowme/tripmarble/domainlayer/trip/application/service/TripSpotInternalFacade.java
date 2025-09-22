package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter.TripSpotInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotRandomInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotWithContentTypeNameInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotQueryProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotInternalFacade implements TripSpotInternalUseCase {

    private final TripSpotQueryProcessor tripSpotQueryProcessor;
    private final TripSpotInternalPresenter tripSpotInternalPresenter;

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotRandomInternalResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds, int limit) {
        List<TripSpotRandomInfo> tripSpotRandomInfos =
            tripSpotQueryProcessor.getRandomTripSpots(representativeRegionId, contentTypeIds, limit);
        return tripSpotInternalPresenter.toRandomResponseList(tripSpotRandomInfos);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotQueryInternalResponse> getTripSpotsByIds(List<Long> tripSpotIds) {
        List<TripSpotWithContentTypeNameInfo> tripSpotWithContentTypeNameInfos = tripSpotQueryProcessor.getTripSpotsByIds(tripSpotIds);
        return tripSpotInternalPresenter.toQueryResponseList(tripSpotWithContentTypeNameInfos);
    }
}
