package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewPhotoCreateInfo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TripSpotReviewPresenter {

    public TripSpotReviewCreateResponse toCreateResponse(
        TripSpotReviewCreateInfo reviewInfo, List<TripSpotReviewPhotoCreateInfo> photoInfos) {
        List<String> photoUrls = photoInfos.stream()
            .map(TripSpotReviewPhotoCreateInfo::photoUrl)
            .toList();

        return TripSpotReviewCreateResponse.builder()
            .tripSpotReviewId(String.valueOf(reviewInfo.tripSpotReviewId()))
            .tripSpotId(String.valueOf(reviewInfo.tripSpotId()))
            .reviewerId(String.valueOf(reviewInfo.memberId()))
            .content(reviewInfo.content())
            .rating(reviewInfo.rating())
            .reviewSourceTypeCode(reviewInfo.sourceType().name())
            .reviewSourceTypeDescription(reviewInfo.sourceType().getDescription())
            .photoUrls(photoUrls)
            .build();
    }
}
