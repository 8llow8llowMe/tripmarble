package com.followfollowme.tripmarble.domainlayer.review.application.service;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.presenter.TripSpotReviewInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.review.application.command.TripSpotReviewCreateInternalCommand;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewCountInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewPhotoCreateInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.port.in.TripSpotReviewInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.MyReviewQueryProcessor;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.TripSpotReviewCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.TripSpotReviewPhotoCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.TripSpotReviewPhotoUploadProcessor;
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
    private final MyReviewQueryProcessor myReviewQueryProcessor;
    private final TripSpotReviewInternalPresenter tripSpotReviewInternalPresenter;

    @Override
    @Transactional
    public TripSpotReviewCreateInternalResponse createMissionReview(
        long tripSpotId, long memberId, TripSpotReviewCreateInternalCommand command) {
        // 1. 리뷰 저장
        TripSpotReviewCreateInfo reviewCreateInfo = tripSpotReviewCreateProcessor.createMissionReview(tripSpotId, memberId,
            command.content(), command.rating());

        // 2. temp -> real 변환 (MinIO 경로 이동)
        List<String> realPhotoUrls = tripSpotReviewPhotoUploadProcessor.promoteToReal(command.photoUrls());

        // 3. 사진 저장
        List<TripSpotReviewPhotoCreateInfo> photoCreateInfos = tripSpotReviewPhotoCreateProcessor.createPhotos(
            reviewCreateInfo.tripSpotReviewId(), realPhotoUrls);

        // 4. Presenter를 통해 Info -> Response 반환
        return tripSpotReviewInternalPresenter.toCreateResponse(reviewCreateInfo, photoCreateInfos);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotReviewCountInternalResponse getMyTripSpotReviewAndPhotoCount(long memberId) {
        TripSpotReviewCountInfo tripSpotReviewCountInfo = myReviewQueryProcessor.getMyTripSpotReviewAndPhotoCount(memberId);
        return tripSpotReviewInternalPresenter.toCountResponse(tripSpotReviewCountInfo);
    }
}
