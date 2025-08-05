package com.example.io;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class InterviewRequest {
    private JsonNode jsonMockResp;
    private String jobPosition;
    private String jobDescription;
    private String jobExperience;
    private String createdBy;
}
