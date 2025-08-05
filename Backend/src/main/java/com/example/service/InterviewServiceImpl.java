package com.example.service;

import com.example.io.InterviewRequest;
import com.example.io.InterviewResponse;
import com.example.entity.MockInterview;
import com.example.repository.MockInterviewRepository;
import com.example.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final MockInterviewRepository mockInterviewRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /** ---------------------------
     *  Create Interview
     * --------------------------- */
    public MockInterview createInterview(InterviewRequest request) {
        // 1️⃣ Validate required fields
        if (request.getJsonMockResp() == null || request.getJobPosition() == null
                || request.getJobDescription() == null || request.getJobExperience() == null
                || request.getCreatedBy() == null) {
            throw new RuntimeException(
                    "All fields are required: jsonMockResp, jobPosition, jobDescription, jobExperience, createdBy (email)."
            );
        }

        // 2️⃣ Check if the user exists
        userRepository.findByEmail(request.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getCreatedBy()));

        // 3️⃣ Convert JSON request to string for storing in DB
        String jsonMockRespString;
        try {
            jsonMockRespString = objectMapper.writeValueAsString(request.getJsonMockResp());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Invalid JSON for jsonMockResp");
        }

        // 4️⃣ Create entity and save to DB
        MockInterview interview = MockInterview.builder()
                .jsonMockResp(jsonMockRespString)
                .jobPosition(request.getJobPosition())
                .jobDescription(request.getJobDescription())
                .jobExperience(request.getJobExperience())
                .createdByEmail(request.getCreatedBy())
                .build();

        return mockInterviewRepository.save(interview);
    }

    /** ---------------------------
     *  Fetch All Interviews
     * --------------------------- */
    public List<InterviewResponse> fetchAllInterviews() {
        return mockInterviewRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    /** ---------------------------
     *  Fetch Interviews By User
     * --------------------------- */
    public List<InterviewResponse> fetchInterviewsByUser(String email) {
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("The 'createdByEmail' is required.");
        }

        return mockInterviewRepository.findByCreatedByEmail(email).stream()
                .map(this::convertToResponse)
                .toList();
    }

    /** ---------------------------
     *  Fetch Interview By ID
     * --------------------------- */
    public InterviewResponse fetchInterviewById(String mockId) {
        if (mockId == null || mockId.isEmpty()) {
            throw new RuntimeException("mockId is required");
        }

        MockInterview interview = mockInterviewRepository.findById(mockId)
                .orElseThrow(() -> new RuntimeException("No interview found for this mockId"));

        return convertToResponse(interview);
    }

    /** ---------------------------
     *  Helper: Convert Entity -> Response DTO
     * --------------------------- */
    private InterviewResponse convertToResponse(MockInterview interview) {
        JsonNode jsonNode;
        try {
            jsonNode = objectMapper.readTree(interview.getJsonMockResp()); // convert string to JSON
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Invalid stored JSON for mockId: " + interview.getMockId());
        }

        return InterviewResponse.builder()
                .mockId(interview.getMockId())
                .jsonMockResp(jsonNode)
                .jobPosition(interview.getJobPosition())
                .jobDescription(interview.getJobDescription())
                .jobExperience(interview.getJobExperience())
                .createdByEmail(interview.getCreatedByEmail())
                .createdAt(interview.getCreatedAt())
                .updatedAt(interview.getUpdatedAt())
                .build();
    }
}
