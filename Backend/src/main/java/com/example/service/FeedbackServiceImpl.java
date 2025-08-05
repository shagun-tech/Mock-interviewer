package com.example.service;

import com.example.io.FeedbackRequest;
import com.example.io.FeedbackResponse;
import com.example.entity.Feedback;
import com.example.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    // Create Feedback
    public FeedbackResponse createFeedback(FeedbackRequest request) {
        validateRequest(request);

        Feedback feedback = Feedback.builder()
                .mockIdRef(request.getMockIdRef())
                .question(request.getQuestion())
                .correctAns(request.getCorrectAns())
                .userAns(request.getUserAns())
                .feedback(request.getFeedback())
                .rating(request.getRating())
                .userEmail(request.getUserEmail())
                .build();

        Feedback savedFeedback = feedbackRepository.save(feedback);

        return mapToResponse(savedFeedback);
    }

    // Fetch Feedback by mockId
    public List<FeedbackResponse> fetchFeedbackByMockId(String mockIdRef) {
        if (mockIdRef == null || mockIdRef.isEmpty()) {
            throw new RuntimeException("mockId is required to fetch feedback.");
        }

        return feedbackRepository.findByMockIdRefOrderByIdAsc(mockIdRef)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Validate Request
    private void validateRequest(FeedbackRequest request) {
        if (request.getMockIdRef() == null || request.getMockIdRef().isEmpty())
            throw new RuntimeException("mockIdRef is required.");
        if (request.getQuestion() == null || request.getQuestion().isEmpty())
            throw new RuntimeException("question is required.");
        if (request.getCorrectAns() == null || request.getCorrectAns().isEmpty())
            throw new RuntimeException("correctAns is required.");
        if (request.getUserAns() == null || request.getUserAns().isEmpty())
            throw new RuntimeException("userAns is required.");
        if (request.getFeedback() == null || request.getFeedback().isEmpty())
            throw new RuntimeException("feedback is required.");
        if (request.getRating() == null)
            throw new RuntimeException("rating is required.");
        if (request.getUserEmail() == null || request.getUserEmail().isEmpty())
            throw new RuntimeException("userEmail is required.");
    }

    // Convert Entity → DTO
    private FeedbackResponse mapToResponse(Feedback feedback) {
        return FeedbackResponse.builder()
                .id(feedback.getId())
                .mockIdRef(feedback.getMockIdRef())
                .question(feedback.getQuestion())
                .correctAns(feedback.getCorrectAns())
                .userAns(feedback.getUserAns())
                .feedback(feedback.getFeedback())
                .rating(feedback.getRating())
                .userEmail(feedback.getUserEmail())
                .createdAt(feedback.getCreatedAt())
                .updatedAt(feedback.getUpdatedAt())
                .build();
    }
}
