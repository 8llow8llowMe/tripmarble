package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.QTripGameEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.QTripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TripGameCustomRepositoryImpl implements TripGameCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<TripGameEntity> findMyGamesNoOffset(long memberId, long lastTripGameId, int size, GameStatus status) {
        QTripGameEntity game = QTripGameEntity.tripGameEntity;
        QTripGameMemberEntity gameMember = QTripGameMemberEntity.tripGameMemberEntity;

        BooleanBuilder where = new BooleanBuilder();
        // 내가 속한 게임인지 EXISTS로 필터 (조인 X)
        where.and(JPAExpressions.selectOne()
            .from(gameMember)
            .where(gameMember.tripGame.eq(game).and(gameMember.memberId.eq(memberId)))
            .exists());

        if (lastTripGameId > 0) {
            where.and(game.id.lt(lastTripGameId));
        }
        if (status != null) {
            where.and(game.status.eq(status));
        }

        List<TripGameEntity> rows = queryFactory
            .selectFrom(game)
            .where(where)
            .orderBy(game.id.desc())
            .limit(size + 1)
            .fetch();

        // hasNext 체크 및 초과 아이템 제거
        boolean hasNext = rows.size() > size;
        if (hasNext) {
            // 초과분 하나 제거
            rows.removeLast();
        }

        // SliceImpl로 포장하여 반환
        return new SliceImpl<>(rows, Pageable.unpaged(), hasNext);
    }
}
