package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity;


import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.persistence.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    name = "trip_spot_review",
    indexes = {
        @Index(name = "idx_trip_spot_review_trip_spot_id", columnList = "trip_spot_id"),
        @Index(name = "idx_trip_spot_review_member_id", columnList = "member_id")
    }
)
public class TripSpotReviewEntity extends BaseEntity {

    @Id
    @Comment("여행지 리뷰 ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_spot_id", nullable = false)
    @Comment("여행지 정보 ID")
    private TripSpotEntity tripSpot;

    @Comment("회원 (작성자) ID")
    @Column(nullable = false)
    private Long memberId;

    @Comment("리뷰 내용")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Comment("별점 (1~5)")
    @Column(nullable = false)
    private Double rating;

    @Enumerated(EnumType.STRING)
    @Comment("리뷰 출처 타입 (일반/게임 미션)")
    @Column(nullable = false, length = 20)
    private ReviewSourceType sourceType;
}
