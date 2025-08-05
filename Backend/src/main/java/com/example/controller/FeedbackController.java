package com.example.controller;

import com.example.io.FeedbackRequest;
import com.example.io.FeedbackResponse;
import com.example.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    // POST /feedbacks
    @PostMapping
    public ResponseEntity<?> createFeedback(@RequestBody FeedbackRequest request) {
        try {
            FeedbackResponse response = feedbackService.createFeedback(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"" + ex.getMessage() + "\"}");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Something went wrong. Please try again later.\"}");
        }
    }

    // GET /feedbacks?mockId=123
    @GetMapping
    public ResponseEntity<?> fetchFeedbackByMockId(@RequestParam String mockId) {
        try {
            List<FeedbackResponse> responses = feedbackService.fetchFeedbackByMockId(mockId);
            return ResponseEntity.ok(responses);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"" + ex.getMessage() + "\"}");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Something went wrong. Please try again later.\"}");
        }
    }
}
