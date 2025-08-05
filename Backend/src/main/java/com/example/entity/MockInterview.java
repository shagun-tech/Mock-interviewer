package com.example.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MockInterview {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String mockId;

    @Column(name = "json_mock_resp", nullable = false, columnDefinition = "LONGTEXT")
    private String jsonMockResp;

    @Column(nullable = false)
    private String jobPosition;

    @Column(nullable = false, length = 1000)
    private String jobDescription;

    @Column(nullable = false)
    private String jobExperience;

    @Column(nullable = false)
    private String createdByEmail;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
