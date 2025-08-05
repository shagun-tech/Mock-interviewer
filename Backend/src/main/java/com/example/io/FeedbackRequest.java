package com.example.io;

import lombok.Data;

@Data
public class FeedbackRequest {
    private String mockIdRef;
    private String question;
    private String correctAns;
    private String userAns;
    private String feedback;
    private Integer rating;
    private String userEmail;
}
