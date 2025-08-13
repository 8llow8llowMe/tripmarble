package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.QTripGameThemeMappingEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.projection.TripGameThemeNamesProjection;
import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.QTripThemeEntity;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TripGameThemeMappingCustomRepositoryImpl implements TripGameThemeMappingCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<TripGameThemeNamesProjection> findThemeNamesByTripGameIds(List<Long> tripGameIds) {
        if (tripGameIds == null || tripGameIds.isEmpty()) {
            return List.of();
        }

        QTripGameThemeMappingEntity mapping = QTripGameThemeMappingEntity.tripGameThemeMappingEntity;
        QTripThemeEntity theme = QTripThemeEntity.tripThemeEntity;

        return queryFactory
            .select(Projections.constructor(
                TripGameThemeNamesProjection.class,
                mapping.tripGame.id,
                theme.name
            ))
            .from(mapping)
            .join(mapping.tripTheme, theme)
            .where(mapping.tripGame.id.in(tripGameIds))
            .fetch();
    }
}
