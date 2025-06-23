package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripContentTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TripContentTypeRepository extends JpaRepository<TripContentTypeEntity, Long> {

    @Query("select t.contentTypeName from TripContentTypeEntity t where t.contentTypeId = :contentTypeId")
    Optional<String> findNameByContentTypeId(int contentTypeId);
}
