package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberActivitySummaryResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberSignupRequest;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberUpdateRequest;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberUpdateCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.port.in.MemberWebUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
@Tag(name = "회원", description = "회원 관련 API 입니다.")
public class MemberWebController {

    private final MemberWebUseCase memberWebUseCase;

    @Operation(
        summary = "일반 회원가입",
        description = "해당 서비스에 일반 회원가입 하는 기능입니다."
    )
    @PostMapping("/signup")
    public ResponseEntity<Response<Void>> signupMember(
        @Valid @RequestBody MemberSignupRequest request) {
        memberWebUseCase.signupMember(MemberSignupCommand.from(request));
        return ResponseEntity.ok().body(Response.success());
    }

    @Operation(
        summary = "나의 회원 정보 조회",
        description = "로그인한 나의 회원 정보를 조회 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<MemberMyInfoResponse>> getMyInfo(
        @AuthenticationPrincipal MemberLoginActive loginActive) {
        MemberMyInfoResponse myInfoResponse = memberWebUseCase.getMyInfo(loginActive.id());
        return ResponseEntity.ok().body(Response.success(myInfoResponse));
    }

    @Operation(
        summary = "임시 프로필 이미지 업로드",
        description = "로그인한 사용자가 MinIO에 프로필 이미지를 업로드하고, 이미지 URL을 반환 받는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @PostMapping(value = "/profile-image/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<MemberProfileUploadResponse>> uploadProfileImage(
        @RequestPart MultipartFile imageFile) {
        MemberProfileUploadResponse profileUploadResponse = memberWebUseCase.uploadProfileImage(
            imageFile);
        return ResponseEntity.ok().body(Response.success(profileUploadResponse));
    }

    @Operation(
        summary = "회원정보 수정",
        description = "닉네임 또는 프로필 이미지를 수정하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @PatchMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<Void>> updateMyInfo(
        @AuthenticationPrincipal MemberLoginActive loginActive, @Valid @RequestBody MemberUpdateRequest request) {
        memberWebUseCase.updateMyInfo(MemberUpdateCommand.from(loginActive.id(), request));
        return ResponseEntity.ok().body(Response.success());
    }

    @Operation(
        summary = "회원 탈퇴",
        description = "로그인한 사용자가 회원 탈퇴(비활성화)하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @PostMapping("/me/withdraw")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<Void>> withdrawMember(@AuthenticationPrincipal MemberLoginActive loginActive) {
        memberWebUseCase.withdrawMember(loginActive.id());
        return ResponseEntity.ok().body(Response.success());
    }

    @Operation(
        summary = "나의 활동 요약 조회",
        description = "특정 회원의 여행 게임 수 및 작성한 여행지 리뷰 수 및 리뷰에 첨부된 사진 개수를 조회합니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @GetMapping("/me/activity-summary")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<MemberActivitySummaryResponse>> getMyActivitySummary(
        @AuthenticationPrincipal MemberLoginActive loginActive
    ) {
        MemberActivitySummaryResponse summaryResponse = memberWebUseCase.getMemberActivitySummary(loginActive.id());
        return ResponseEntity.ok().body(Response.success(summaryResponse));
    }
}
