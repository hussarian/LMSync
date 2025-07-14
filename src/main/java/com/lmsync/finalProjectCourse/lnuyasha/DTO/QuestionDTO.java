package com.lmsync.finalProjectCourse.lnuyasha.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter  // 모든 필드의 getter
@NoArgsConstructor  // 기본 생성자
@AllArgsConstructor  // 전체 필드 생성자
@Builder  // 빌더 패턴 사용
public class QuestionDTO {
    private String questionId;         // 문제 고유 ID
    private String questionType;       // 문제 유형 (ENUM -> String으로 처리)
    private String questionText;       // 문제 내용
    private String questionAnswer;     // 정답
    private String explanation;        // 해설

    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일
    private int questionActive;        // 삭제 여부 (0: 미삭제, 1: 삭제 등)

    private String subDetailId;        // 세부과목 UUID
    private String educationId;        // 학원 UUID
    private String memberId;           // 등록한 멤버 UUID
}
