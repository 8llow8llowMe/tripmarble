package com.followfollowme.tripmarble.domainlayer.member.domain.model.enums;

import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberStatus {
    ACTIVE("정상 회원") {
        @Override
        public void validateWithdrawable() {
            // ACTIVE 상태면 탈퇴 가능
        }

        @Override
        public void validateRestorable() {
            throw new MemberException(MemberErrorCode.MEMBER_NOT_WITHDRAWN);
        }
    },
    WITHDRAWN("탈퇴 회원") {
        @Override
        public void validateWithdrawable() {
            throw new MemberException(MemberErrorCode.MEMBER_ALREADY_WITHDRAWN);
        }

        @Override
        public void validateRestorable() {
            // WITHDRAWN 상태면 복구 가능
        }
    },
    SUSPENDED("정지 회원") {
        @Override
        public void validateWithdrawable() {
            // 정지된 회원도 탈퇴는 가능하게 일단 둠
        }

        @Override
        public void validateRestorable() {
            throw new MemberException(MemberErrorCode.MEMBER_SUSPENDED);
        }
    };

    private final String description;

    public abstract void validateWithdrawable();

    public abstract void validateRestorable();
}
