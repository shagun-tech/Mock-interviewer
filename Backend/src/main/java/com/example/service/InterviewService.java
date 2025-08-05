package com.example.service;

import com.example.entity.MockInterview;
import com.example.io.InterviewRequest;
import com.example.io.InterviewResponse;

import java.util.List;

public interface InterviewService {

    public MockInterview createInterview(InterviewRequest request);

    public List<InterviewResponse> fetchAllInterviews();

    public List<InterviewResponse> fetchInterviewsByUser(String email);

    public InterviewResponse fetchInterviewById(String mockId);
}
