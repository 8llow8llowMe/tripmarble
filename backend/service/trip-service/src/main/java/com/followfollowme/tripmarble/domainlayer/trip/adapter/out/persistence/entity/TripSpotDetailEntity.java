package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
    name = "trip_spot_detail",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_tripspot_detail_content_id", columnNames = "content_id")
    }
)
public class TripSpotDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("여행지 상세 정보 ID")
    private Long id;

    @Comment("여행 콘텐츠 ID (trip_spot의 content_id와 동일)")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer contentId;

    @Comment("홈페이지 URL")
    private String homepage;

    @Comment("상세 설명")
    @Column(columnDefinition = "TEXT")
    private String overview;
}
