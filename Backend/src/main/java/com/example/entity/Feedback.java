package com.example.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String mockIdRef; // References Interview.mockId

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String correctAns;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String userAns;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String feedback;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false)
    private String userEmail;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
