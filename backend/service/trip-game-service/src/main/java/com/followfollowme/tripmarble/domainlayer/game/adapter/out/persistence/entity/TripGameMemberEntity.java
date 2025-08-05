package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.persistence.entity.BaseEntity;
import jakarta.persistence.Column;
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
    name = "trip_game_member"
)
public class TripGameMemberEntity extends BaseEntity {

    @Id
    @Comment("여행 게임(계획) 참여자 아이디")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_game_id", nullable = false)
    @Comment("여행 게임(계획) 아이디")
    private TripGameEntity tripGame;

    @Comment("참여 회원 아이디")
    @Column(nullable = false)
    private Long memberId;

    @Comment("준비 여부")
    @Column(nullable = false)
    private Boolean isReady;

    @Comment("방장 여부")
    @Column(nullable = false)
    private Boolean isHost;

    @Comment("턴 순서")
    @Column(nullable = false)
    private Integer turnOrder;
}
