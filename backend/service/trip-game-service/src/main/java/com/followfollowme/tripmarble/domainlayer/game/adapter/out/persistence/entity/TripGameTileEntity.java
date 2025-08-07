package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.TileType;
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
    name = "trip_game_tile"
)
public class TripGameTileEntity extends BaseEntity {

    @Id
    @Comment("게임 내 블록 아이디")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_game_id", nullable = false)
    @Comment("여행 게임(계획) 아이디")
    private TripGameEntity tripGame;

    @Comment("여행지 정보 아이디")
    @Column(nullable = false)
    private Long tripSpotId;

    @Comment("보드판 내 순서")
    @Column(nullable = false)
    private Integer stepNo;

    @Comment("블록 특성 (기본/출발점/미션/도착점 등)")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TileType tileType;
}
