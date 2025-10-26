package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.QTripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.QTripSpotReviewPhotoEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection.TripSpotReviewSummaryProjection;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TripSpotReviewCustomRepositoryImpl implements TripSpotReviewCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<TripSpotReviewSummaryProjection> findSummaryByTripSpotId(long tripSpotId, ReviewSourceType sourceType) {
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;

        TripSpotReviewSummaryProjection result = queryFactory
            .select(Projections.constructor(TripSpotReviewSummaryProjection.class,
                r.count(),
                r.rating.avg().coalesce(0.0)
            ))
            .from(r)
            .where(
                r.tripSpot.id.eq(tripSpotId),
                eqSourceType(r, sourceType)
            )
            .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public List<TripSpotReviewRatingDistributionProjection> findRatingDistributionByTripSpotId(long tripSpotId,
                                                                                               ReviewSourceType sourceType) {
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;
        return queryFactory
            .select(Projections.constructor(TripSpotReviewRatingDistributionProjection.class,
                r.rating,
                r.count()
            ))
            .from(r)
            .where(
                r.tripSpot.id.eq(tripSpotId),
                eqSourceType(r, sourceType)
            )
            .groupBy(r.rating)
            .orderBy(r.rating.asc())
            .fetch();
    }

    @Override
    public List<TripSpotReviewPhotoProjection> findSamplePhotosByTripSpotId(long tripSpotId, ReviewSourceType sourceType, int limit) {
        QTripSpotReviewPhotoEntity p = QTripSpotReviewPhotoEntity.tripSpotReviewPhotoEntity;
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;

        return queryFactory
            .select(Projections.constructor(TripSpotReviewPhotoProjection.class,
                p.id,
                p.photoUrl
            ))
            .from(p)
            .join(p.tripSpotReview, r)
            .where(
                r.tripSpot.id.eq(tripSpotId),
                eqSourceType(r, sourceType)
            )
            .orderBy(p.createdAt.desc())
            .limit(limit)
            .fetch();
    }

    @Override
    public Slice<TripSpotReviewEntity> findReviewsNoOffsetByTripSpotId(
        long tripSpotId, ReviewSourceType sourceType, long lastReviewId, int size, OrderType orderType) {
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;

        // 1. No-Offset 조건 준비
        BooleanExpression noOffsetCondition = null;
        if (lastReviewId > 0) {
            if (orderType == OrderType.DESC) {
                noOffsetCondition = r.id.lt(lastReviewId);
            } else {
                noOffsetCondition = r.id.gt(lastReviewId);
            }
        }

        // 2. 최종 where 조건
        BooleanExpression whereCondition = r.tripSpot.id.eq(tripSpotId)
            .and(eqSourceType(r, sourceType))
            .and(noOffsetCondition);

        // 3. 정렬 조건
        OrderSpecifier<Long> orderSpecifier =
            (orderType == OrderType.DESC) ? r.id.desc() : r.id.asc();

        // 4. 조회 실행
        List<TripSpotReviewEntity> rows = queryFactory
            .selectFrom(r)
            .where(whereCondition)
            .orderBy(orderSpecifier)
            .limit(size + 1)
            .fetch();

        // 5. hasNext 처리
        boolean hasNext = rows.size() > size;
        if (hasNext) {
            rows.removeLast(); // 초과분 하나 제거
        }

        return new SliceImpl<>(rows, Pageable.unpaged(), hasNext);
    }

    @Override
    public Slice<TripSpotReviewEntity> findReviewsNoOffsetByMemberId(long memberId, ReviewSourceType sourceType, long lastReviewId,
                                                                     int size, OrderType orderType) {
        QTripSpotReviewEntity r = QTripSpotReviewEntity.tripSpotReviewEntity;

        // 1. No-Offset 조건 준비
        BooleanExpression noOffsetCondition = null;
        if (lastReviewId > 0) {
            if (orderType == OrderType.DESC) {
                noOffsetCondition = r.id.lt(lastReviewId);
            } else {
                noOffsetCondition = r.id.gt(lastReviewId);
            }
        }

        // 2. 최종 where 조건
        BooleanExpression whereCondition = r.memberId.eq(memberId)
            .and(eqSourceType(r, sourceType))
            .and(noOffsetCondition);

        // 3. 정렬 조건
        OrderSpecifier<Long> orderSpecifier = (orderType == OrderType.DESC) ? r.id.desc() : r.id.asc();

        // 4. 조회 실행
        List<TripSpotReviewEntity> rows = queryFactory
            .selectFrom(r)
            .where(whereCondition)
            .orderBy(orderSpecifier)
            .limit(size + 1)
            .fetch();

        boolean hasNext = rows.size() > size;
        if (hasNext) {
            // 초과분 하나 제거
            rows.removeLast();
        }

        return new SliceImpl<>(rows, Pageable.unpaged(), hasNext);
    }


    private BooleanExpression eqSourceType(QTripSpotReviewEntity r, ReviewSourceType sourceType) {
        // sourceType 필터링 조건 생성 (null인 경우 전체 조회)
        return sourceType != null ? r.sourceType.eq(sourceType) : null;
    }
}
