package com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewCountInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewPhotoCreateInfo;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripSpotReviewInternalPresenter {

    public TripSpotReviewCreateInternalResponse toCreateResponse(
        TripSpotReviewCreateInfo reviewInfo, List<TripSpotReviewPhotoCreateInfo> photoInfos) {
        List<String> photoUrls = photoInfos.stream()
            .map(TripSpotReviewPhotoCreateInfo::photoUrl)
            .toList();

        return TripSpotReviewCreateInternalResponse.builder()
            .tripSpotReviewId(reviewInfo.tripSpotReviewId())
            .tripSpotId(reviewInfo.tripSpotId())
            .memberId(reviewInfo.memberId())
            .content(reviewInfo.content())
            .rating(reviewInfo.rating())
            .reviewSourceTypeCode(reviewInfo.sourceType().name())
            .reviewSourceTypeDescription(reviewInfo.sourceType().getDescription())
            .photoUrls(photoUrls)
            .build();
    }

    public TripSpotReviewCountInternalResponse toCountResponse(TripSpotReviewCountInfo info) {
        return TripSpotReviewCountInternalResponse.builder()
            .memberId(info.memberId())
            .tripSpotReviewCount(info.tripSpotReviewCount())
            .photoCount(info.photoCount())
            .build();
    }
}
