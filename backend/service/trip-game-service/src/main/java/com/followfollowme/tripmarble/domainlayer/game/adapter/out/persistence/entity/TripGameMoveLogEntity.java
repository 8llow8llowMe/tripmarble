package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import com.followfollowme.tripmarble.persistence.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
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
    name = "trip_game_move_log"
)
public class TripGameMoveLogEntity extends BaseEntity {

    @Id
    @Comment("게임 이동 로그 (타임라인) 아이디")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_game_tile_id", nullable = false)
    @Comment("게임 내 블록 아이디")
    private TripGameTileEntity tripGameTile;

    @Comment("도착 시간 (게임 내 이동이 실제 일어난 시간)")
    private LocalDateTime arrivedAt;

    @Comment("이번 턴에 굴린 주사위 값")
    @Column(nullable = false)
    private Integer dice;

    @Comment("당시 턴 순서 (주사위 던진 당시 턴)")
    @Column(nullable = false)
    private Integer turnOrder;

    @Comment("미션 수행 결과 (성공/실패/스킵/대기중)")
    @Enumerated(EnumType.STRING)
    private MissionResult missionResult;
}
