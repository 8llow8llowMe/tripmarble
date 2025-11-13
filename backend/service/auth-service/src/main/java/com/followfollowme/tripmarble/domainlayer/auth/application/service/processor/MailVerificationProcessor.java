package com.followfollowme.tripmarble.domainlayer.auth.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.mail.MailTemplateRenderer;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthErrorCode;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthException;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.MailSendPort;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.VerificationCodeStorePort;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.scheduler.Schedulers;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailVerificationProcessor {

    private static final int EXPIRES_MIN = 5;
    private static final int CODE_LENGTH = 8;

    private final VerificationCodeStorePort codeStorePort;
    private final MailSendPort mailSendPort;
    private final MemberRepositoryPort memberRepositoryPort;
    private final MailTemplateRenderer mailTemplateRenderer;

    public void sendVerificationCode(String email) {
        if (memberRepositoryPort.existByEmail(email)) {
            throw new MemberException(MemberErrorCode.EXIST_MEMBER_EMAIL, email);
        }

        String code = generateCode();

        boolean saved = codeStorePort.save(email, code, EXPIRES_MIN);
        if (!saved) {
            throw new AuthException(AuthErrorCode.EMAIL_VERIFICATION_STORE_FAILURE);
        }

        String subject = "[TripMarble] 일반 회원가입 이메일 인증 코드 안내";
        String body = renderTemplate(code, EXPIRES_MIN);

        Schedulers.boundedElastic()
            .schedule(() -> mailSendPort.send(email, subject, body));
    }

    public void verifyCode(String email, String code) {
        String stored = codeStorePort.find(email)
            .orElseThrow(() -> new AuthException(AuthErrorCode.NOT_FOUND_VERIFICATION_CODE));

        if (!stored.equals(code)) {
            throw new AuthException(AuthErrorCode.INVALID_VERIFICATION_CODE);
        }

        codeStorePort.delete(email);
    }

    private String generateCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(CODE_LENGTH);

        for (int i = 0; i < CODE_LENGTH; i++) {
            int index = ThreadLocalRandom.current().nextInt(chars.length());
            sb.append(chars.charAt(index));
        }

        return sb.toString();
    }

    private String renderTemplate(String code, int ttlMinutes) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("code", code);
        variables.put("ttlMinutes", ttlMinutes);
        return mailTemplateRenderer.render("verification-email", variables); // templates/verification-email.html
    }
}
