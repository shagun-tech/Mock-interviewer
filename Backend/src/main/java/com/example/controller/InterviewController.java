package com.example.controller;

import com.example.io.InterviewRequest;
import com.example.entity.MockInterview;
import com.example.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.io.InterviewResponse;

@RestController
@RequestMapping("/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping
    public ResponseEntity<?> createInterview(@RequestBody InterviewRequest request) {
        try {
            MockInterview created = interviewService.createInterview(request);
            return ResponseEntity.status(201).body(interviewService.fetchInterviewById(created.getMockId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating interview: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> fetchAllInterviews() {
        try {
            List<InterviewResponse> interviews = interviewService.fetchAllInterviews();
            return ResponseEntity.ok(interviews);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching interviews: " + e.getMessage());
        }
    }

    @GetMapping("/by-id")
    public ResponseEntity<?> fetchInterviewById(@RequestParam String mockId) {
        try {
            InterviewResponse interview = interviewService.fetchInterviewById(mockId);
            return ResponseEntity.ok(interview);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error fetching interview: " + e.getMessage());
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> fetchInterviewsByUser(@PathVariable String email) {
        try {
            List<InterviewResponse> interviews = interviewService.fetchInterviewsByUser(email);
            return ResponseEntity.ok(interviews);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error fetching interviews for user: " + e.getMessage());
        }
    }
}
