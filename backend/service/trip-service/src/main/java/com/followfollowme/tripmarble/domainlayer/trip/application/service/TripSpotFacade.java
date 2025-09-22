package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter.TripSpotPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotSimpleInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotWithDetailViewInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotQueryProcessor;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotFacade implements TripSpotWebUseCase {

    private final TripSpotQueryProcessor tripSpotQueryProcessor;
    private final TripSpotPresenter tripSpotPresenter;

    @Override
    @Transactional(readOnly = true)
    public SliceResponse<TripSpotSimpleResponse> getTripSpotsByRepresentativeRegionId(
        long representativeRegionId, long lastTripSpotId, int size, Integer contentTypeId) {
        Slice<TripSpotSimpleInfo> tripSpotSimpleInfoSlice =
            tripSpotQueryProcessor.getTripSpotsByRepresentativeRegionId(representativeRegionId, lastTripSpotId, size, contentTypeId);
        return tripSpotPresenter.toSimpleSliceResponse(tripSpotSimpleInfoSlice);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId) {
        TripSpotWithDetailViewInfo tripSpotWithDetailViewInfo = tripSpotQueryProcessor.getTripSpotDetailWithContentTypeName(tripSpotId);
        return tripSpotPresenter.toDetailViewResponse(tripSpotWithDetailViewInfo);
    }
}
