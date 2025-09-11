package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.EndType;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import com.followfollowme.tripmarble.persistence.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
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
    name = "trip_game",
    indexes = {
        @Index(name = "idx_trip_game_representative_region_id", columnList = "representative_region_id"),
        @Index(name = "idx_trip_game_status_id", columnList = "status, id")
    }
)
public class TripGameEntity extends BaseEntity {

    @Id
    @Comment("여행 게임(계획) ID")
    private Long id;

    @Comment("대표 여행지 연관 외래키")
    @Column(nullable = false)
    private Long representativeRegionId;

    @Comment("여행 게임(계획) 제목")
    private String title;

    @Comment("게임 상태 여부 (시작 전/진행 중/종료")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GameStatus status;

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

    @Column(nullable = false)
    @Comment("현재 턴 순서 (1부터 시작)")
    private Integer currentTurnOrder;

    @Column(nullable = false)
    @Comment("현재 말이 위치한 블럭 번호")
    private Integer currentStepNo;

    @Comment("게임 종료 사유 (NORMAL, FORCED)")
    @Enumerated(EnumType.STRING)
    private EndType endType;
}
