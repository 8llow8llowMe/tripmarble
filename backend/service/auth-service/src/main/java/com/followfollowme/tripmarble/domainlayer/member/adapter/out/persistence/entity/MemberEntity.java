package com.followfollowme.tripmarble.domainlayer.member.adapter.out.persistence.entity;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.enums.MemberStatus;
import com.followfollowme.tripmarble.persistence.entity.BaseEntity;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    name = "member",
    indexes = {
        @Index(name = "idx_member_email", columnList = "email")
    })
public class MemberEntity extends BaseEntity {

    @Id
    @Comment("회원 아이디")
    private Long id;

    @Comment("이메일")
    @Column(length = 100, nullable = false)
    private String email;

    @Comment("비밀번호")
    @Column(length = 80)
    private String password;

    @Comment("이름")
    @Column(length = 30, nullable = false)
    private String name;

    @Comment("닉네임")
    @Column(length = 30, nullable = false)
    private String nickname;

    @Comment("프로필 이미지 URL")
    private String profileImageUrl;

    @Comment("권한")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SecurityRole role;

    @Comment("소셜 로그인 제공업체")
    @Enumerated(EnumType.STRING)
    private OAuthProvider provider;

    @Comment("회원 상태")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberStatus status;
}
