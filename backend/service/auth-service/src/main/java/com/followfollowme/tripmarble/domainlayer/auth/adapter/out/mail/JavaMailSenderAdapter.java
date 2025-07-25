package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.mail;

import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.MailSendPort;
import com.followfollowme.tripmarble.global.properties.MailProperties;
import jakarta.mail.Message.RecipientType;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JavaMailSenderAdapter implements MailSendPort {

    private static final String SENDER_NAME = "TripMarble";

    private final JavaMailSender javaMailSender;
    private final MailProperties mailProperties;

    @Override
    public void send(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            message.setFrom(new InternetAddress(mailProperties.username(), SENDER_NAME));
            message.addRecipients(RecipientType.TO, to);
            message.setSubject(subject);
            message.setText(htmlBody, "utf-8", "html");
        } catch (Exception e) {
            log.error("[MailSender] 메일 발송 실패 - to: {}, message: {}", to, e.getMessage(), e);
        }
    }
}
