package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;

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

    @Comment("게임 상태 여부 (시작 전/진행 중/종료")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

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
}
