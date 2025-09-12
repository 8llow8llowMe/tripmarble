package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.QTripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.QTripSpotReviewPhotoEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewSummaryProjection;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TripSpotReviewCustomRepositoryImpl implements TripSpotReviewCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<TripSpotReviewSummaryProjection> findSummaryByTripSpotId(long tripSpotId) {
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;

        TripSpotReviewSummaryProjection result = queryFactory
            .select(Projections.constructor(TripSpotReviewSummaryProjection.class,
                r.count(),
                r.rating.avg().coalesce(0.0)
            ))
            .from(r)
            .where(r.tripSpot.id.eq(tripSpotId))
            .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public List<TripSpotReviewRatingDistributionProjection> findRatingDistributionByTripSpotId(long tripSpotId) {
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;
        return queryFactory
            .select(Projections.constructor(TripSpotReviewRatingDistributionProjection.class,
                r.rating,
                r.count()
            ))
            .from(r)
            .where(r.tripSpot.id.eq(tripSpotId))
            .groupBy(r.rating)
            .orderBy(r.rating.asc())
            .fetch();
    }

    @Override
    public List<TripSpotReviewPhotoProjection> findSamplePhotosByTripSpotId(long tripSpotId, int limit) {
        QTripSpotReviewPhotoEntity p = QTripSpotReviewPhotoEntity.tripSpotReviewPhotoEntity;
        return queryFactory
            .select(Projections.constructor(TripSpotReviewPhotoProjection.class,
                p.id,
                p.photoUrl
            ))
            .from(p)
            .where(p.tripSpotReview.tripSpot.id.eq(tripSpotId))
            .orderBy(p.createdAt.desc())
            .limit(limit)
            .fetch();
    }

    @Override
    public Slice<TripSpotReviewEntity> findReviewsNoOffsetByTripSpotId(long tripSpotId, long lastReviewId, int size) {
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;

        List<TripSpotReviewEntity> rows = queryFactory
            .selectFrom(r)
            .where(
                r.tripSpot.id.eq(tripSpotId)
                    .and(lastReviewId > 0 ? r.id.lt(lastReviewId) : null) // No Offset 조건
            )
            .orderBy(r.id.desc()) // 최신순
            .limit(size + 1)
            .fetch();

        boolean hasNext = rows.size() > size;
        if (hasNext) {
            // 초과분 하나 제거
            rows.removeLast();
        }

        return new SliceImpl<>(rows, Pageable.unpaged(), hasNext);
    }
}
