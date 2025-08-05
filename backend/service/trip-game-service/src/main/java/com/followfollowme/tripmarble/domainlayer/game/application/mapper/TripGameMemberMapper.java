package com.followfollowme.tripmarble.domainlayer.game.application.mapper;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMemberEntity;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = TripGameMapper.class)
public interface TripGameMemberMapper {

    // 엔티티 -> 도메인
    @Mapping(target = "tripGameId", source = "tripGame.id")
    TripGameMember toDomainFromEntity(TripGameMemberEntity entity);

    // 엔티티 리스트 -> 도메인 리스트
    List<TripGameMember> toDomainListFromEntityList(List<TripGameMemberEntity> entities);

    // 도메인 -> 엔티티
    @Mapping(target = "tripGame", source = "tripGame")
    @Mapping(target = "id", source = "domain.id")
    @Mapping(target = "memberId", source = "domain.memberId")
    @Mapping(target = "isReady", source = "domain.isReady")
    @Mapping(target = "isHost", source = "domain.isHost")
    @Mapping(target = "turnOrder", source = "domain.turnOrder")
    TripGameMemberEntity toEntityFromDomain(TripGameMember domain, TripGame tripGame);

    // 도메인 리스트 -> 엔티티 리스트
    default List<TripGameMemberEntity> toEntityListFromDomainList(List<TripGameMember> domains, TripGame tripGame) {
        return domains.stream()
            .map(domain -> toEntityFromDomain(domain, tripGame))
            .toList();
    }
}
