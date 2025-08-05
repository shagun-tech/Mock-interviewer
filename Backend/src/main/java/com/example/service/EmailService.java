package com.example.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendWelcomeEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Welcome to Our Platform");
        message.setText("Hello " + name + ",\n\nThanks for registering with us!\n\nRegards,\nAditya Singh");
        mailSender.send(message);
    }

    public void sendResetOtpEmail(String toEmail,String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Password reset otp");
        message.setText("Your OTP for resetting your password is " + otp +". Use this OTP to proceed with resetting password");
        mailSender.send(message);
    }

    public void sendVerifyOtpEmail(String toEmail,String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Verification otp");
        message.setText("Your OTP for verifying your account is " + otp +". Use this OTP to proceed with verifying account");
        mailSender.send(message);
    }
}
