package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
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
        @Index(name = "idx_tripspot_ldong", columnList = "ldong_regn_cd, ldong_signgu_cd")
    }
)
public class TripSpotEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("여행지 정보 ID")
    @Column(name = "trip_spot_id", columnDefinition = "BIGINT UNSIGNED")
    private Long id;

//    @Comment("관광 타입 ID")
//    @Column(name = "trip_content_type_id")
//    private String contentTypeId;

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
    @Column(name = "map_x")
    private String mapX;

    @Comment("Y좌표 (위도)")
    @Column(name = "map_y")
    private String mapY;

    @Comment("지도 레벨")
    private String mlevel;

    @Comment("지역 코드")
    @Column(name = "area_code")
    private String areaCode;

    @Comment("시군구 코드")
    @Column(name = "sigungu_code")
    private String sigunguCode;

    @Comment("법정동 시도 코드")
    @Column(name = "ldong_regn_cd")
    private String ldongRegnCd;

    @Comment("법정동 시군구 코드")
    @Column(name = "ldong_signgu_cd")
    private String ldongSignguCd;

    @Comment("서비스 분류 코드 대분류")
    private String cat1;

    @Comment("서비스 분류 코드 중분류")
    private String cat2;

    @Comment("서비스 분류 코드 소분류")
    private String cat3;

    @Comment("분류체계 1Depth")
    @Column(name = "lcls_systm1")
    private String lclsSystm1;

    @Comment("분류체계 2Depth")
    @Column(name = "lcls_systm2")
    private String lclsSystm2;

    @Comment("분류체계 3Depth")
    @Column(name = "lcls_systm3")
    private String lclsSystm3;

    @Comment("대표 이미지 원본")
    @Column(name = "first_image")
    private String firstImage;

    @Comment("대표 이미지 썸네일")
    @Column(name = "first_image2")
    private String firstImage2;

    @Comment("저작권 유형")
    @Column(name = "cpyrht_div_cd")
    private String cpyrhtDivCd;
}
