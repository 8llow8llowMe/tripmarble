package com.followfollowme.tripmarble.domainlayer.auth.application.port.out;

public interface MailSendPort {

    void send(String to, String subject, String htmlBody);
}
