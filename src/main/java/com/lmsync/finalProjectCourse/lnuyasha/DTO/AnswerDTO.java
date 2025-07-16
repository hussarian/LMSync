package com.lmsync.finalProjectCourse.lnuyasha.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 학생의 답안 정보를 담는 DTO 클래스
 */
@Getter  // 모든 필드의 getter
@NoArgsConstructor  // 기본 생성자
@AllArgsConstructor  // 전체 필드 생성자
@Builder  // 빌더 패턴 사용
public class AnswerDTO {
    private String answerId;                    // 답안 ID
    private String answerText;                // 답안 내용
    private int answerScore;                  // 답안 점수
    private String teacherComment;            // 교사 코멘트

    private LocalDateTime createdAt;          // 생성일시
    private LocalDateTime answerGradedAt;     // 채점 완료일시
    private LocalDateTime answerGradeUpdatedAt; // 점수 수정일시
    private int answerActive;                 // 삭제 여부 (1: 활성, 0: 비활성)
    
    private String templateQuestionId;          // 템플릿 질문 ID FK
    private String memberId;                    // 회원 ID FK

   
}