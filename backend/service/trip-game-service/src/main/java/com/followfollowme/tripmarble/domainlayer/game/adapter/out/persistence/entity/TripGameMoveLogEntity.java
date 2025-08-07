package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.persistence.entity.BaseEntity;
import jakarta.persistence.Entity;
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

    @Comment("도착 인증 여부 (ex. 방문 체크)")
    private Boolean isVisited;

    @Comment("도착 시간 (게임 내 이동이 실제 일어난 시간)")
    private LocalDateTime arrivedAt;

    @Comment("이번 턴에 굴린 주사위 값")
    private Integer dice;

    @Comment("당시 턴 순서 (0부터 시작)")
    private Integer turnOrder;

    @Comment("이동 결과 또는 특수 효과 결과 (ex. 미션 성공, 점수 획득 등)")
    private String effectResult;
}
