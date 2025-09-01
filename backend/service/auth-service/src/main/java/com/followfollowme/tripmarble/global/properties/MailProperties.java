package com.followfollowme.tripmarble.global.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mail")
public record MailProperties(
    String host,
    int port,
    String username,
    String password,
    boolean smtpAuth,
    boolean starttlsEnable
) {

}
