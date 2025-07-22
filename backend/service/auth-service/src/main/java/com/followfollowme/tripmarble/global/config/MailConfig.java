package com.followfollowme.tripmarble.global.config;

import com.followfollowme.tripmarble.global.properties.MailProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender(MailProperties properties) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(properties.host());
        mailSender.setPort(properties.port());
        mailSender.setUsername(properties.username());
        mailSender.setPassword(properties.password());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", properties.smtpAuth());  // SMTP 인증 활성화 설정
        props.put("mail.smtp.starttls.enable", properties.starttlsEnable());  // STARTTLS 활성화 설정

        mailSender.setJavaMailProperties(props);
        
        return mailSender;
    }
}
