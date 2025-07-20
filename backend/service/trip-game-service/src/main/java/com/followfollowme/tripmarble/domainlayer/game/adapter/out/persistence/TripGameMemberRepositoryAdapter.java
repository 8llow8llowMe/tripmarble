package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.TripGameMemberRepository;
import com.followfollowme.tripmarble.domainlayer.game.application.mapper.TripGameMemberMapper;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripGameMemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
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
}
