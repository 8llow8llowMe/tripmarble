package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    name = "representative_region_sigungu_mapping",
    indexes = {
        @Index(name = "idx_rrsm_representative_region_id", columnList = "representative_region_id"),
        @Index(name = "idx_rrsm_sigungu_id", columnList = "sigungu_id")
    }
)
public class RepresentativeRegionSigunguMappingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("대표 여행지_시군구_매핑 ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "representative_region_id", nullable = false)
    @Comment("대표 여행지 ID")
    private RepresentativeRegionEntity representativeRegion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sigungu_id", nullable = false)
    @Comment("시군구 ID")
    private SigunguEntity sigungu;
}
