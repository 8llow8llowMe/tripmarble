package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.presenter.TripSpotReviewInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.trip.application.command.TripSpotReviewCreateInternalCommand;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewPhotoCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotReviewInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotReviewCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotReviewPhotoCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripSpotReviewPhotoUploadProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripSpotReviewInternalFacade implements TripSpotReviewInternalUseCase {

    private final TripSpotReviewCreateProcessor tripSpotReviewCreateProcessor;
    private final TripSpotReviewPhotoCreateProcessor tripSpotReviewPhotoCreateProcessor;
    private final TripSpotReviewPhotoUploadProcessor tripSpotReviewPhotoUploadProcessor;
    private final TripSpotReviewInternalPresenter tripSpotReviewInternalPresenter;

    @Override
    @Transactional
    public TripSpotReviewCreateInternalResponse createMissionReview(
        long tripSpotId, long memberId, TripSpotReviewCreateInternalCommand command) {
        // 1. 리뷰 저장
        TripSpotReviewCreateInfo reviewCreateInfo = tripSpotReviewCreateProcessor.createMissionReview(tripSpotId, memberId,
            command.content(), command.rating());

        // 2. temp -> real 변환
        List<String> realPhotoUrls = tripSpotReviewPhotoUploadProcessor.promoteToReal(command.photoUrls());

        // 3. 사진 저장
        List<TripSpotReviewPhotoCreateInfo> photoCreateInfos = tripSpotReviewPhotoCreateProcessor.createPhotos(
            reviewCreateInfo.tripSpotReviewId(), realPhotoUrls);

        return tripSpotReviewInternalPresenter.toCreateResponse(reviewCreateInfo, photoCreateInfos);
    }
}
