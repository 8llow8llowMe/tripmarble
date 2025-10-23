package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.projection.TripGameMemberCountProjection;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.TripGameMemberRepository;
import com.followfollowme.tripmarble.domainlayer.game.application.mapper.TripGameMemberMapper;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.application.readmodel.TripGameMemberCount;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGameMemberRepositoryAdapter implements TripGameMemberRepositoryPort {

    private final TripGameMemberRepository tripGameMemberRepository;
    private final TripGameMemberMapper tripGameMemberMapper;

    @Override
    public TripGameMember save(TripGameMember tripGameMember, TripGame tripGame) {
        TripGameMemberEntity entity = tripGameMemberMapper.toEntityFromDomain(tripGameMember, tripGame);
        TripGameMemberEntity savedEntity = tripGameMemberRepository.save(entity);
        return tripGameMemberMapper.toDomainFromEntity(savedEntity);
    }

    @Override
    public Optional<TripGameMember> findHostMemberInGame(long tripGameId, long memberId) {
        return tripGameMemberRepository.findHostMemberInGame(tripGameId, memberId)
            .map(tripGameMemberMapper::toDomainFromEntity);
    }

    @Override
    public List<TripGameMember> findAllByTripGameId(long tripGameId) {
        List<TripGameMemberEntity> entities = tripGameMemberRepository.findAllByTripGameId(tripGameId);
        return tripGameMemberMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public List<TripGameMember> saveAll(List<TripGameMember> tripGameMembers, TripGame tripGame) {
        List<TripGameMemberEntity> entities = tripGameMemberMapper.toEntityListFromDomainList(tripGameMembers, tripGame);
        List<TripGameMemberEntity> savedEntities = tripGameMemberRepository.saveAll(entities);
        return tripGameMemberMapper.toDomainListFromEntityList(savedEntities);
    }

    @Override
    public List<TripGameMemberCount> countByTripGameIds(List<Long> gameIds) {
        List<TripGameMemberCountProjection> rows = tripGameMemberRepository.countByTripGameIds(gameIds);
        return rows.stream()
            .map(p -> TripGameMemberCount.builder()
                .tripGameId(p.tripGameId())
                .memberCount(p.memberCount())
                .build())
            .toList();
    }

    @Override
    public boolean existsByTripGameIdAndMemberId(long tripGameId, long memberId) {
        return tripGameMemberRepository.existsByTripGameIdAndMemberId(tripGameId, memberId);
    }

    @Override
    public List<TripGameMember> findAllByTripGameIdAndMemberId(List<Long> tripGameIds, long memberId) {
        List<TripGameMemberEntity> entities = tripGameMemberRepository.findAllByTripGameIdAndMemberId(tripGameIds, memberId);
        return tripGameMemberMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public Optional<TripGameMember> findByTripGameIdAndMemberId(long tripGameId, long memberId) {
        return tripGameMemberRepository.findByTripGame_IdAndMemberId(tripGameId, memberId)
            .map(tripGameMemberMapper::toDomainFromEntity);
    }

    @Override
    public int countTripGameByMemberId(long memberId) {
        return tripGameMemberRepository.countTripGameByMemberId(memberId);
    }
}
