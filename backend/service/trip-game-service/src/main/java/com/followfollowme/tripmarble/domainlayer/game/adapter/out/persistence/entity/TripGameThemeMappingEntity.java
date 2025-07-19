package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
    name = "trip_game_theme_mapping"
)
public class TripGameThemeMappingEntity {

    @Id
    @Comment("여행 게임_테마_매핑 아이디")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_game_id", nullable = false)
    private TripGameEntity tripGame;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_theme_id", nullable = false)
    private TripThemeEntity tripTheme;
}
