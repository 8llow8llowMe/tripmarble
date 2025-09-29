package com.followfollowme.tripmarble.domainlayer.review.application.service;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.presenter.TripSpotReviewPresenter;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewAndPhotosInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.port.in.MyReviewWebUseCase;
import com.followfollowme.tripmarble.domainlayer.review.application.service.processor.MyReviewQueryProcessor;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MyReviewFacade implements MyReviewWebUseCase {

    private final MyReviewQueryProcessor myReviewQueryProcessor;
    private final TripSpotReviewPresenter tripSpotReviewPresenter;

    @Override
    @Transactional(readOnly = true)
    public SliceResponse<TripSpotReviewAndPhotosResponse> getMyTripSpotReviews(
        long memberId, long lastTripSpotReviewId, int size, OrderType orderType) {
        // 1. Query Processor를 통해 내가 작성한 리뷰 및 사진 정보 조회
        Slice<TripSpotReviewAndPhotosInfo> tripSpotReviewAndPhotosInfoSlice =
            myReviewQueryProcessor.getMyTripSpotReviews(memberId, lastTripSpotReviewId, size, orderType);

        // 2. Presenter를 통해 Info -> Response 반환
        return tripSpotReviewPresenter.toReviewAndPhotosSliceResponse(tripSpotReviewAndPhotosInfoSlice);
    }
}
