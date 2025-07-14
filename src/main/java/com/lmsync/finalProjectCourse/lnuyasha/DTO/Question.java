package com.lmsync.finalProjectCourse.lnuyasha.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   // 모든 필드의 getter, setter, toString, equals, hashCode 메서드 자동 생성
@NoArgsConstructor  // 기본 생성자
@AllArgsConstructor  // 전체 필드 생성자
public class Question {
    private Long questionId;         // 문제 고유 ID
    private String questionType;       // 문제 유형 (ENUM -> String으로 처리)
    private String questionText;       // 문제 내용
    private String questionAnswer;     // 정답
    private String explanation;        // 해설

    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일
    private int questionActive;        // 삭제 여부 (0: 미삭제, 1: 삭제 등)

    private Long subDetailId;        // 세부과목 UUID
    private Long educationId;        // 학원 UUID
    private Long memberId;           // 등록한 멤버 UUID
}
