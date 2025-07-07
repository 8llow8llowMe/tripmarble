package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.QTripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TripSpotCustomRepositoryImpl implements TripSpotCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<TripSpotEntity> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(List<Integer> ldongSignguCodes,
        long lastTripSpotId, int size, Integer contentTypeId) {

        QTripSpotEntity t = QTripSpotEntity.tripSpotEntity;

        // 1. 동적 조건 빌더
        BooleanBuilder where = new BooleanBuilder();
        where.and(t.ldongSignguCd.in(ldongSignguCodes));

        if (lastTripSpotId > 0) {
            where.and(t.id.lt(lastTripSpotId));
        }
        if (contentTypeId != null && contentTypeId > 0) {
            where.and(t.contentTypeId.eq(contentTypeId));
        }

        // 2. limit + 1로 가져와서 hasNext 판단
        List<TripSpotEntity> results = queryFactory
            .selectFrom(t)
            .where(where)
            .orderBy(t.id.desc())
            .limit(size + 1)
            .fetch();

        // 3. hasNext 체크 및 초과 아이템 제거
        boolean hasNext = results.size() > size;
        if (hasNext) {
            // 초과분 하나 제거
            results.removeLast();
        }

        // 4. SliceImpl로 포장하여 반환
        return new SliceImpl<>(results, Pageable.unpaged(), hasNext);
    }
}
