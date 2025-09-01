package com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity;

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
@Table(
    name = "trip_theme_content_type_mapping"
)
public class TripThemeContentTypeMappingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("여행 테마_콘텐츠 타입_매핑 ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_theme_id", nullable = false)
    @Comment("여행 테마 ID (외래키)")
    private TripThemeEntity tripTheme;

    @Comment("여행 콘텐츠 타입 ID (외래키)")
    @Column(nullable = false)
    private Long tripContentTypeId;

    @Comment("콘텐츠 타입 가중치 (0.0 ~ 1.0)")
    @Column(nullable = false)
    private Double weight;
}
