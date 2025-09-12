package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter.TripSpotReviewPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.command.TripSpotReviewCreateCommand;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewPhotoCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewSummaryInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotReviewWebUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotReviewCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotReviewPhotoCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotReviewQueryProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotReviewFacade implements TripSpotReviewWebUseCase {

    private final TripSpotReviewCreateProcessor tripSpotReviewCreateProcessor;
    private final TripSpotReviewPhotoCreateProcessor tripSpotReviewPhotoCreateProcessor;
    private final TripSpotReviewQueryProcessor tripSpotReviewQueryProcessor;
    private final TripSpotReviewPresenter tripSpotReviewPresenter;

    @Override
    @Transactional
    public TripSpotReviewCreateResponse createGeneralReviewAndPhotos(long tripSpotId, long memberId, TripSpotReviewCreateCommand command) {
        // 1. 리뷰 저장
        TripSpotReviewCreateInfo reviewCreateInfo = tripSpotReviewCreateProcessor.createGeneralReview(tripSpotId, memberId,
            command.content(), command.rating());

        // 2. 사진 저장
        List<TripSpotReviewPhotoCreateInfo> photoCreateInfos = tripSpotReviewPhotoCreateProcessor.createPhotos(
            reviewCreateInfo.tripSpotReviewId(), command.photoUrls());

        return tripSpotReviewPresenter.toCreateResponse(reviewCreateInfo, photoCreateInfos);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotReviewSummaryResponse getTripSpotReviewSummary(long tripSpotId, int photoLimit) {
        TripSpotReviewSummaryInfo tripSpotReviewSummaryInfo = tripSpotReviewQueryProcessor.getTripSpotReviewSummary(tripSpotId, photoLimit);
        return tripSpotReviewPresenter.toSummaryResponse(tripSpotReviewSummaryInfo);
    }
}
