package com.example.io;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FeedbackResponse {
    private Long id;
    private String mockIdRef;
    private String question;
    private String correctAns;
    private String userAns;
    private String feedback;
    private Integer rating;
    private String userEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
