package com.followfollowme.tripmarble.domainlayer.review.application.service;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewDetailResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewPhotoUploadResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.presenter.TripSpotReviewPresenter;
import com.followfollowme.tripmarble.domainlayer.review.application.command.TripSpotReviewCreateCommand;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewAndPhotosInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewDetailInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewPhotoCreateInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewPhotoUploadInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewSummaryInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.port.in.TripSpotReviewWebUseCase;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.TripSpotReviewCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.TripSpotReviewPhotoCreateProcessor;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.TripSpotReviewPhotoUploadProcessor;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.TripSpotReviewQueryProcessor;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TripSpotReviewFacade implements TripSpotReviewWebUseCase {

    private final TripSpotReviewCreateProcessor tripSpotReviewCreateProcessor;
    private final TripSpotReviewPhotoCreateProcessor tripSpotReviewPhotoCreateProcessor;
    private final TripSpotReviewQueryProcessor tripSpotReviewQueryProcessor;
    private final TripSpotReviewPhotoUploadProcessor tripSpotReviewPhotoUploadProcessor;
    private final TripSpotReviewPresenter tripSpotReviewPresenter;

    @Override
    @Transactional
    public TripSpotReviewCreateResponse createGeneralReviewAndPhotos(long tripSpotId, long memberId, TripSpotReviewCreateCommand command) {
        // 1. 리뷰 저장
        TripSpotReviewCreateInfo reviewCreateInfo = tripSpotReviewCreateProcessor.createGeneralReview(tripSpotId, memberId,
            command.content(), command.rating());

        // 2. temp -> real 변환
        List<String> realPhotoUrls = tripSpotReviewPhotoUploadProcessor.promoteToReal(command.photoUrls());

        // 3. 사진 저장
        List<TripSpotReviewPhotoCreateInfo> photoCreateInfos = tripSpotReviewPhotoCreateProcessor.createPhotos(
            reviewCreateInfo.tripSpotReviewId(), realPhotoUrls);

        // 4. Presenter 변환
        return tripSpotReviewPresenter.toCreateResponse(reviewCreateInfo, photoCreateInfos);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotReviewSummaryResponse getTripSpotReviewSummary(long tripSpotId, int photoLimit) {
        TripSpotReviewSummaryInfo tripSpotReviewSummaryInfo = tripSpotReviewQueryProcessor.getTripSpotReviewSummary(tripSpotId, photoLimit);
        return tripSpotReviewPresenter.toSummaryResponse(tripSpotReviewSummaryInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponse<TripSpotReviewAndPhotosResponse> getTripSpotReviews(long tripSpotId, long lastTripSpotReviewId, int size) {
        Slice<TripSpotReviewAndPhotosInfo> tripSpotReviewAndPhotosInfoSlice =
            tripSpotReviewQueryProcessor.getTripSpotReviews(tripSpotId, lastTripSpotReviewId, size);
        return tripSpotReviewPresenter.toReviewAndPhotosSliceResponse(tripSpotReviewAndPhotosInfoSlice);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotReviewDetailResponse getTripSpotReviewDetail(long tripSpotId, long tripSpotReviewId) {
        TripSpotReviewDetailInfo tripSpotReviewDetailInfo =
            tripSpotReviewQueryProcessor.getTripSpotReviewDetail(tripSpotId, tripSpotReviewId);
        return tripSpotReviewPresenter.toDetailResponse(tripSpotReviewDetailInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotReviewPhotoUploadResponse> uploadTempReviewPhotos(long tripSpotId, List<MultipartFile> imageFiles) {
        List<TripSpotReviewPhotoUploadInfo> tripSpotReviewPhotoUploadInfos =
            tripSpotReviewPhotoUploadProcessor.uploadTempReviewPhotos(tripSpotId, imageFiles);
        return tripSpotReviewPresenter.toUploadResponses(tripSpotReviewPhotoUploadInfos);
    }
}
