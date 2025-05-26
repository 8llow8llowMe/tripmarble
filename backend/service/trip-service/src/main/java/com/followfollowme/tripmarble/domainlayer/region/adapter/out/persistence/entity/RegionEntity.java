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
    name = "region",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_area_code", columnNames = "area_code")
    }
)
public class RegionEntity {

    @Id
    @Comment("지역 아이디")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("지역 코드")
    @Column(nullable = false, length = 5)
    private String areaCode;

    @Comment("지역명")
    @Column(nullable = false, length = 30)
    private String areaName;
}
