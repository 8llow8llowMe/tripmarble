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
        QTripGameMemberEntity gm = QTripGameMemberEntity.tripGameMemberEntity;

        return queryFactory
            .select(Projections.constructor(
                TripGameMemberCountProjection.class,
                gm.tripGame.id,
                gm.id.count()
            ))
            .from(gm)
            .where(gm.tripGame.id.in(tripGameIds))
            .groupBy(gm.tripGame.id)
            .fetch();
    }
}
