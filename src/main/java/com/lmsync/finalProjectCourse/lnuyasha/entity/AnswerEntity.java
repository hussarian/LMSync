package com.lmsync.finalProjectCourse.lnuyasha.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 학생의 답안 정보를 담는 Entity 클래스
 */
@Entity
@Table(name = "answer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "answerId", columnDefinition = "VARCHAR(100)")
    private String answerId;
    
    @Column(name = "answerText", columnDefinition = "TEXT")
    private String answerText;                // 답안 내용

    @Column(name = "answerScore", columnDefinition = "int")
    private int answerScore;                  // 답안 점수

    @Column(name = "teacherComment", columnDefinition = "TEXT")
    private String teacherComment;            // 교사 코멘트

    @Column(name = "createdAt", columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;          // 생성일시

    @Column(name = "answerGradedAt", columnDefinition = "TIMESTAMP")
    private LocalDateTime answerGradedAt;     // 채점 완료일시

    @Column(name = "answerGradeUpdatedAt", columnDefinition = "TIMESTAMP")
    private LocalDateTime answerGradeUpdatedAt; // 점수 수정일시

    @Column(name = "answerActive", columnDefinition = "int default 0")
    private int answerActive;                 // 삭제 여부 (1: 활성, 0: 비활성)
    
    @Column(name = "templateQuestionId", columnDefinition = "VARCHAR(100)")
    private String templateQuestionId;          // 템플릿 질문 ID FK

    @Column(name = "memberId", columnDefinition = "VARCHAR(100)")
    private String memberId;                    // 회원 ID FK
} 