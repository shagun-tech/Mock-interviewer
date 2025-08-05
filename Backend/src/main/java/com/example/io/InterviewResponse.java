package com.example.io;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InterviewResponse {
    private String mockId;
    private JsonNode jsonMockResp;
    private String jobPosition;
    private String jobDescription;
    private String jobExperience;
    private String createdByEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
