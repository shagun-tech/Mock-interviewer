package com.example.service;

import com.example.io.ProfileRequest;
import com.example.io.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);

    ProfileResponse getProfile(String email);

    void sendResetOtp(String email);

    void resetPassword(String email,String otp,String newPassword);

    void sendOtp(String userId);

    void verifyOtp(String userId,String otp);

}
