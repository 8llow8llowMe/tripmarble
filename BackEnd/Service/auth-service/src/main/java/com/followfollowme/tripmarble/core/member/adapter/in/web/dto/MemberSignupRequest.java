package com.followfollowme.tripmarble.core.member.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record MemberSignupRequest(

    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    String email,

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하여야 합니다.")
    @Pattern(
        regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+\\[\\]{};:'\",.<>/?\\\\|])\\S{8,20}$",
        message = "비밀번호는 공백 없이 영문자, 숫자, 특수문자를 포함한 8~20자여야 합니다."
    )
    String password,

    @NotBlank(message = "이름은 필수입니다.")
    @Size(max = 10, message = "이름은 10자 이하만 가능합니다.")
    String name,

    @NotBlank(message = "닉네임은 필수입니다.")
    @Size(max = 10, message = "닉네임은 10자 이하만 가능합니다.")
    String nickname
) {

}
