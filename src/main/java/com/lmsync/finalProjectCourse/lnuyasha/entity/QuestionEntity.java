package com.lmsync.finalProjectCourse.lnuyasha.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "questionId", columnDefinition = "VARCHAR(100)")
    private String questionId;         // 문제 고유 ID
    
    @Column(name = "questionType", columnDefinition = "VARCHAR(100)")
    private String questionType;       // 문제 유형 ( String으로 처리)

    @Column(name = "questionText", columnDefinition = "TEXT")
    private String questionText;       // 문제 내용

    @Column(name = "questionAnswer", columnDefinition = "TEXT")
    private String questionAnswer;     // 정답

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;        // 해설

    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일

    @Column(name = "questionActive", columnDefinition = "int default 0")
    private int questionActive;        // 삭제 여부 (0: 미삭제, 1: 삭제 등)

    @Column(name = "subDetailId", columnDefinition = "VARCHAR(100)")
    private String subDetailId;        // 세부과목 UUID

    @Column(name = "educationId", columnDefinition = "VARCHAR(100)")
    private String educationId;        // 학원 UUID

    @Column(name = "memberId", columnDefinition = "VARCHAR(100)")
    private String memberId;           // 등록한 멤버 UUID
} 