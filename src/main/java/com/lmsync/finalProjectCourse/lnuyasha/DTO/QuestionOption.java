package com.lmsync.finalProjectCourse.lnuyasha.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter  // 모든 필드의 getter
@NoArgsConstructor  // 기본 생성자
@AllArgsConstructor  // 전체 필드 생성자
@Builder  // 빌더 패턴 사용
public class QuestionOption {
    private String optId;

    private String optText; // 보기 내용
    private int optIsCorrect; // 보기 정답 여부

    private String questionId; // 문제 ID
}
