package com.followfollowme.tripmarble.domainlayer.review.application.port.in;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewDetailResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewPhotoUploadResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.review.application.command.TripSpotReviewCreateCommand;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface TripSpotReviewWebUseCase {

    TripSpotReviewCreateResponse createGeneralReviewAndPhotos(long tripSpotId, long memberId, TripSpotReviewCreateCommand command);

    TripSpotReviewSummaryResponse getTripSpotReviewSummary(long tripSpotId, int photoLimit);

    SliceResponse<TripSpotReviewAndPhotosResponse> getTripSpotReviews(
        long tripSpotId, long lastTripSpotReviewId, int size, OrderType orderType);

    TripSpotReviewDetailResponse getTripSpotReviewDetail(long tripSpotId, long tripSpotReviewId);

    List<TripSpotReviewPhotoUploadResponse> uploadTempReviewPhotos(long tripSpotId, List<MultipartFile> imageFiles);
}
