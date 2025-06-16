package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
    name = "trip_spot",
    indexes = {
        @Index(name = "idx_tripspot_ldong", columnList = "ldong_regn_cd, ldong_signgu_cd"),
        @Index(name = "idx_tripspot_content_id", columnList = "content_id")
    }
)
public class TripSpotEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("여행지 정보 ID")
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_content_type_id", nullable = false)
    @Comment("여행 콘텐츠 타입 ID (FK)")
    private TripContentTypeEntity tripContentType;

    @Comment("여행 콘텐츠 아이디")
    @Column(columnDefinition = "BIGINT UNSIGNED", nullable = false)
    private Long contentId;

    @Comment("제목")
    @Column(nullable = false)
    private String title;

    @Comment("전화번호")
    private String tel;

    @Comment("우편번호")
    private String zipcode;

    @Comment("주소")
    private String addr1;

    @Comment("상세주소")
    private String addr2;

    @Comment("X좌표 (경도)")
    @Column(nullable = false)
    private Double mapX;

    @Comment("Y좌표 (위도)")
    @Column(nullable = false)
    private Double mapY;

    @Comment("지도 레벨")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer mlevel;

    @Comment("지역 코드")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer areaCode;

    @Comment("시군구 코드")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer sigunguCode;

    @Comment("법정동 시도 코드")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer ldongRegnCd;

    @Comment("법정동 시군구 코드")
    @Column(columnDefinition = "INT UNSIGNED", nullable = false)
    private Integer ldongSignguCd;

    @Comment("서비스 분류 코드 대분류")
    private String cat1;

    @Comment("서비스 분류 코드 중분류")
    private String cat2;

    @Comment("서비스 분류 코드 소분류")
    private String cat3;

    @Comment("분류체계 1Depth")
    private String lclsSystm1;

    @Comment("분류체계 2Depth")
    private String lclsSystm2;

    @Comment("분류체계 3Depth")
    private String lclsSystm3;

    @Comment("대표 이미지 원본")
    private String firstImage;

    @Comment("대표 이미지 썸네일")
    private String firstImage2;

    @Comment("저작권 유형")
    private String cpyrhtDivCd;
}
