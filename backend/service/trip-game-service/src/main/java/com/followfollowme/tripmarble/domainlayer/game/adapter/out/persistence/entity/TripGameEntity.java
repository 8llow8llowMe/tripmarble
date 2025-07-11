package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
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
    name = "trip_game"
)
public class TripGameEntity {

    @Id
    @Comment("여행 게임(계획) 아이디")
    private Long id;

    @Comment("여행 게임(계획) 제목")
    private String title;

    @Comment("난이도")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Comment("여행 계획 시작 날짜")
    @Column(nullable = false)
    private LocalDate startedAt;

    @Comment("여행 계획 종료 날짜")
    @Column(nullable = false)
    private LocalDate endedAt;

    @Comment("대표 여행지 연관 외래키")
    @Column(nullable = false)
    private Long representativeRegionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_theme_id", nullable = false)
    @Comment("여행 테마 연관 외래키")
    private TripThemeEntity tripTheme;
}
