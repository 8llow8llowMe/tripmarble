package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    @Comment("시도 연관 외래키 (nullable 가능)")
    private RegionEntity region;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sigungu_id")
    @Comment("시군구 연관 외래키 (nullable 가능)")
    private SigunguEntity sigungu;
}
