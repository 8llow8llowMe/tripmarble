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
    name = "sigungu",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_sigungu_region_id_sigungu_code", columnNames = {"region_id", "sigungu_code"})
    }
)
public class SigunguEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("시군구 ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    @Comment("시도 (region) 외래 키")
    private RegionEntity region;

    @Comment("TourAPI 시군구 코드 (자연키)")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer sigunguCode;

    @Comment("시군구명")
    @Column(nullable = false, length = 30)
    private String sigunguName;
}
