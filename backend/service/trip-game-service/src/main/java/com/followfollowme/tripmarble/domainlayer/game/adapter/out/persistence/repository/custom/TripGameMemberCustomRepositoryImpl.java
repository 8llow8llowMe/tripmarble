package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.QTripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.projection.TripGameMemberCountProjection;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TripGameMemberCustomRepositoryImpl implements TripGameMemberCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<TripGameMemberCountProjection> countByTripGameIds(List<Long> tripGameIds) {
        if (tripGameIds == null || tripGameIds.isEmpty()) {
            return List.of();
        }
        QTripGameMemberEntity gameMember = QTripGameMemberEntity.tripGameMemberEntity;

        return queryFactory
            .select(Projections.constructor(
                TripGameMemberCountProjection.class,
                gameMember.tripGame.id,
                gameMember.id.count()
            ))
            .from(gameMember)
            .where(gameMember.tripGame.id.in(tripGameIds))
            .groupBy(gameMember.tripGame.id)
            .fetch();
    }
}
