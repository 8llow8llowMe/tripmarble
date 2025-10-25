package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.persistence.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
    name = "trip_spot_review_photo",
    indexes = {
        @Index(name = "idx_trip_spot_review_photo_trip_spot_review_id", columnList = "trip_spot_review_id"),
        @Index(name = "idx_trip_spot_review_photo_order_no", columnList = "order_no")
    }
)
public class TripSpotReviewPhotoEntity extends BaseEntity {

    @Id
    @Comment("여행지 리뷰 사진 ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_spot_review_id", nullable = false)
    @Comment("리뷰 ID")
    private TripSpotReviewEntity tripSpotReview;

    @Comment("사진 URL")
    @Column(nullable = false)
    private String photoUrl;

    @Comment("사진 순서 (1~5)")
    @Column(nullable = false)
    private Integer orderNo;
}
