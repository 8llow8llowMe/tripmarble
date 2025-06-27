package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.QTripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
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
        long lastTripSpotId, int size) {

        QTripSpotEntity t = QTripSpotEntity.tripSpotEntity;

        // limit + 1로 가져와서 hasNext 판단
        List<TripSpotEntity> results = queryFactory
            .selectFrom(t)
            .where(t.ldongSignguCd.in(ldongSignguCodes))
            .orderBy(t.id.desc())
            .limit(size + 1)
            .fetch();

        boolean hasNext = results.size() > size;
        if (hasNext) {
            // 초과분 하나 제거
            results.removeLast();
        }

        return new SliceImpl<>(results, Pageable.unpaged(), hasNext);
    }
}
