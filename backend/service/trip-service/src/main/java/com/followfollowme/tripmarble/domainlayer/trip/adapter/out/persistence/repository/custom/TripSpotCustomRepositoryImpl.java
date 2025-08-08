package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.QTripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
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
    public Slice<TripSpotEntity> findTripSpotsNoOffsetBySigunguCodesAndLastTripSpotId(
        int ldongRegnCd, List<Integer> ldongSignguCodes, long lastTripSpotId, int size, Integer contentTypeId) {
        QTripSpotEntity t = QTripSpotEntity.tripSpotEntity;

        // 1. 동적 조건 빌더 구성
        BooleanBuilder where = new BooleanBuilder();
        // 1-1. 법정동 시도 코드 (ex: 서울시: 11, 부산시: 26)
        where.and(t.ldongRegnCd.eq(ldongRegnCd));
        // 1-2. 법정동 시군구 코드 리스트 (ex: 강남구: 680, 송파구: 740)
        where.and(t.ldongSignguCd.in(ldongSignguCodes));

        if (lastTripSpotId > 0) {
            where.and(t.id.lt(lastTripSpotId));
        }
        if (contentTypeId != null && contentTypeId > 0) {
            where.and(t.contentTypeId.eq(contentTypeId));
        }

        // 2. limit + 1로 가져와서 hasNext 판단
        List<TripSpotEntity> rows = queryFactory
            .selectFrom(t)
            .where(where)
            .orderBy(t.id.desc())
            .limit(size + 1)
            .fetch();

        // 3. hasNext 체크 및 초과 아이템 제거
        boolean hasNext = rows.size() > size;
        if (hasNext) {
            // 초과분 하나 제거
            rows.removeLast();
        }

        // 4. SliceImpl로 포장하여 반환
        return new SliceImpl<>(rows, Pageable.unpaged(), hasNext);
    }

    @Override
    public List<TripSpotEntity> findRandomTripSpotsBySigunguCodesAndContentTypeIds(
        int ldongRegnCd, List<Integer> ldongSignguCodes, List<Integer> contentTypeIds, int limit) {
        QTripSpotEntity t = QTripSpotEntity.tripSpotEntity;

        // 1. 동적 조건 빌더 구성
        BooleanBuilder where = new BooleanBuilder();
        // 1-1. 법정동 시도 코드 (ex: 서울시: 11, 부산시: 26)
        where.and(t.ldongRegnCd.eq(ldongRegnCd));
        // 1-2. 법정동 시군구 코드 리스트 (ex: 강남구: 680, 송파구: 740)
        where.and(t.ldongSignguCd.in(ldongSignguCodes));
        // 1-3. TourAPI 콘텐츠 타입 ID 리스트 (ex: 관광지, 음식점 등)
        where.and(t.contentTypeId.in(contentTypeIds));

        // 2. 무작위 정렬 + 최대 개수 제한
        return queryFactory
            .selectFrom(t)
            .where(where)
            .orderBy(Expressions.numberTemplate(Double.class, "RAND()").asc()) // MySQL 기준 RAND()
            .limit(limit)
            .fetch();
    }
}
