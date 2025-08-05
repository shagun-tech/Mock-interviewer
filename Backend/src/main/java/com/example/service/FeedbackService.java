package com.example.service;

import com.example.entity.Feedback;
import com.example.io.FeedbackRequest;
import com.example.io.FeedbackResponse;

import java.util.List;

public interface FeedbackService {

    public FeedbackResponse createFeedback(FeedbackRequest request);

    public List<FeedbackResponse> fetchFeedbackByMockId(String mockIdRef);
}
