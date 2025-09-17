package com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.controller;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.port.in.MemberInternalUseCase;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/v1/members")
@Tag(name = "회원", description = "회원 정보 관련 내부 서비스 통신 전용 API 입니다.")
@Hidden
public class MemberInternalController {

    private final MemberInternalUseCase memberInternalUseCase;

    @Operation(
        summary = "회원 프로필 목록 조회",
        description = "회원 ID 리스트를 통해 회원들의 프로필 정보를 조회합니다."
    )
    @GetMapping
    public ResponseEntity<List<MemberProfileInternalResponse>> getMemberProfiles(@RequestParam List<Long> memberIds) {
        List<MemberProfileInternalResponse> responses = memberInternalUseCase.getMemberProfiles(memberIds);
        return ResponseEntity.ok().body(responses);
    }

    @Operation(
        summary = "회원 프로필 조회",
        description = "회원 ID를 통해 해당 회원의 프로필 정보를 조회합니다."
    )
    @GetMapping("/{memberId}")
    public ResponseEntity<MemberProfileInternalResponse> getMemberProfile(@PathVariable long memberId) {
        MemberProfileInternalResponse response = memberInternalUseCase.getMemberProfiles(memberId);
        return ResponseEntity.ok().body(response);
    }
}
