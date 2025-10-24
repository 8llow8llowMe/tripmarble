package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "representative_region")
public class RepresentativeRegionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("대표 여행지 ID")
    private Long id;

    @Comment("대표 여행지 이름 (ex. 서울, 부산)")
    @Column(nullable = false, length = 30)
    private String name;

    @Comment("썸네일 이미지 URL")
    private String imageUrl;

    @Comment("대표 여행지 설명")
    @Column(columnDefinition = "TEXT")
    private String description;

    @Comment("위도")
    @Column(nullable = false)
    private Double latitude;

    @Comment("경도")
    @Column(nullable = false)
    private Double longitude;

    @Comment("지도 테두리(Polygon/MultiPolygon) GeoJSON 데이터")
    @Column(columnDefinition = "JSON")
    private String boundaryGeoJson;
}
