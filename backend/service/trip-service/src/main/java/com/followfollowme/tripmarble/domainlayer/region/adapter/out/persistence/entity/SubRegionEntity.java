package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
    name = "sub_region",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_sigungu_code", columnNames = "sigungu_code")
    }
)
public class SubRegionEntity {

    @Id
    @Comment("서브 지역(시군구) 아이디")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    @Comment("상위 지역 아이디")
    private RegionEntity region;

    @Comment("시군구 코드")
    @Column(nullable = false)
    private String sigunguCode;

    @Comment("시군구명")
    @Column(nullable = false)
    private String sigunguName;
}
