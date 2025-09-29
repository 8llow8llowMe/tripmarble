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
import com.followfollowme.tripmarble.persistence.enums.OrderType;
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

        // 2. temp -> real 변환 (MinIO 경로 이동)
        List<String> realPhotoUrls = tripSpotReviewPhotoUploadProcessor.promoteToReal(command.photoUrls());

        // 3. 리뷰 사진 저장
        List<TripSpotReviewPhotoCreateInfo> photoCreateInfos = tripSpotReviewPhotoCreateProcessor.createPhotos(
            reviewCreateInfo.tripSpotReviewId(), realPhotoUrls);

        // 4. Presenter를 통해 Info -> Response 반환
        return tripSpotReviewPresenter.toCreateResponse(reviewCreateInfo, photoCreateInfos);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotReviewSummaryResponse getTripSpotReviewSummary(long tripSpotId, int photoLimit) {
        // 1. 요약 데이터 조회 (평균 평점, 리뷰 개수, 샘플 사진 등)
        TripSpotReviewSummaryInfo tripSpotReviewSummaryInfo = tripSpotReviewQueryProcessor.getTripSpotReviewSummary(tripSpotId, photoLimit);

        // 2. Presenter를 통해 Info -> Response 반환
        return tripSpotReviewPresenter.toSummaryResponse(tripSpotReviewSummaryInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponse<TripSpotReviewAndPhotosResponse> getTripSpotReviews(
        long tripSpotId, long lastTripSpotReviewId, int size, OrderType orderType) {
        // 1. 리뷰 목록 + 사진 정보 조회 (No-Offset 방식)
        Slice<TripSpotReviewAndPhotosInfo> tripSpotReviewAndPhotosInfoSlice =
            tripSpotReviewQueryProcessor.getTripSpotReviews(tripSpotId, lastTripSpotReviewId, size, orderType);

        // 2. Presenter를 통해 Info -> Response 반환
        return tripSpotReviewPresenter.toReviewAndPhotosSliceResponse(tripSpotReviewAndPhotosInfoSlice);
    }

    @Override
    @Transactional(readOnly = true)
    public TripSpotReviewDetailResponse getTripSpotReviewDetail(long tripSpotId, long tripSpotReviewId) {
        // 1. 단일 리뷰 상세 정보 + 사진 + 작성자 프로필 조회
        TripSpotReviewDetailInfo tripSpotReviewDetailInfo =
            tripSpotReviewQueryProcessor.getTripSpotReviewDetail(tripSpotId, tripSpotReviewId);

        // 2. Presenter를 통해 Info -> Response 반환
        return tripSpotReviewPresenter.toDetailResponse(tripSpotReviewDetailInfo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TripSpotReviewPhotoUploadResponse> uploadTempReviewPhotos(long tripSpotId, List<MultipartFile> imageFiles) {
        // 1. 사진들을 MinIO Temp 저장소에 업로드
        List<TripSpotReviewPhotoUploadInfo> tripSpotReviewPhotoUploadInfos =
            tripSpotReviewPhotoUploadProcessor.uploadTempReviewPhotos(tripSpotId, imageFiles);

        // 2. Presenter 변환 → 응답 DTO 리스트 생성
        return tripSpotReviewPresenter.toUploadResponses(tripSpotReviewPhotoUploadInfos);
    }
}
