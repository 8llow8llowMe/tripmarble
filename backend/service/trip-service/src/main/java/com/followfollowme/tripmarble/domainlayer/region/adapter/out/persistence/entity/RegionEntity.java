package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity;

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
    name = "region",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_region_region_code", columnNames = "region_code")
    }
)
public class RegionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("시도 ID (지역 ID)")
    private Long id;

    @Comment("TourAPI 시도 코드 (자연키)")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer regionCode;

    @Comment("시도명")
    @Column(length = 30)
    private String regionName;
}
