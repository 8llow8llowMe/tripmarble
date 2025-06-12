package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
    name = "trip_content_type",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_content_type_id", columnNames = "content_type_id")
    }
)
public class TripContentTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("여행 콘텐츠 타입 ID")
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Comment("공공 API 연동용 관광 타입 ID (자연키)")
    @Column(name = "content_type_id", nullable = false)
    private String contentTypeId;

    @Comment("관광 타입 명칭")
    @Column(length = 20, nullable = false)
    private String contentTypeName;
}
