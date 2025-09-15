package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewAndPhotosInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewPhotoCreateInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewSummaryInfo;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import java.util.List;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

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

    public TripSpotReviewSummaryResponse toSummaryResponse(TripSpotReviewSummaryInfo info) {
        return TripSpotReviewSummaryResponse.builder()
            .totalCount(info.totalCount())
            .averageRating(info.averageRating())
            .ratingDistributions(info.ratingDistributions().stream()
                .map(d -> TripSpotReviewSummaryResponse.RatingDistributionResponse.builder()
                    .rating(d.rating())
                    .count(d.count())
                    .build())
                .toList())
            .samplePhotos(info.samplePhotos().stream()
                .map(p -> TripSpotReviewSummaryResponse.PhotoResponse.builder()
                    .tripSpotReviewPhotoId(p.photoId())
                    .photoUrl(p.photoUrl())
                    .build())
                .toList())
            .build();
    }

    public TripSpotReviewAndPhotosResponse toReviewAndPhotosResponse(TripSpotReviewAndPhotosInfo info) {
        return TripSpotReviewAndPhotosResponse.builder()
            .tripSpotReviewId(info.tripSpotReviewId())
            .tripSpotId(info.tripSpotId())
            .memberId(info.memberId())
            .content(info.content())
            .rating(info.rating())
            .reviewSourceTypeCode(info.sourceType().name())
            .reviewSourceTypeDescription(info.sourceType().getDescription())
            .photos(info.photos().stream()
                .map(p -> TripSpotReviewAndPhotosResponse.PhotoResponse.builder()
                    .photoId(p.photoId())
                    .photoUrl(p.photoUrl())
                    .orderNo(p.orderNo())
                    .build())
                .toList())
            .build();
    }

    public SliceResponse<TripSpotReviewAndPhotosResponse> toReviewAndPhotosSliceResponse(Slice<TripSpotReviewAndPhotosInfo> infos) {
        return SliceResponse.of(infos.map(this::toReviewAndPhotosResponse));
    }
}
