package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter.TripContentTypePresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripContentTypeInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripContentTypeQueryProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripContentTypeFacade implements TripContentTypeWebUseCase {

    private final TripContentTypeQueryProcessor tripContentTypeQueryProcessor;
    private final TripContentTypePresenter tripContentTypePresenter;

    @Override
    @Transactional(readOnly = true)
    public List<TripContentTypeResponse> getAllTripContentTypes() {
        List<TripContentTypeInfo> tripContentTypeInfos = tripContentTypeQueryProcessor.getAllTripContentTypes();
        return tripContentTypePresenter.toResponseList(tripContentTypeInfos);
    }
}
