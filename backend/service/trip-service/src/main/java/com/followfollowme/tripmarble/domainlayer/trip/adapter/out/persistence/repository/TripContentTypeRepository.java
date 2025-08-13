package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripContentTypeEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TripContentTypeRepository extends JpaRepository<TripContentTypeEntity, Long> {

    @Query("select t.contentTypeName from TripContentTypeEntity t where t.contentTypeId = :contentTypeId")
    Optional<String> findNameByContentTypeId(int contentTypeId);

    List<TripContentTypeEntity> findByContentTypeIdIn(List<Integer> contentTypeIds);
}
