package com.example.repository;

import com.example.entity.MockInterview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MockInterviewRepository extends JpaRepository<MockInterview, String> {
    List<MockInterview> findByCreatedByEmail(String email);
}
