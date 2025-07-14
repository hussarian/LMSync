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
public class TemplateDTO {
    private String templateId;  // 템플릿 UUID
    
    private int templateNumber; // 문제수

    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일
    private int templateActive; // 삭제 여부 (0: 미삭제, 1: 삭제 등)
    
    private String memberId; // 등록한 멤버 UUID
    private String subGroupId; // 과정 + 과목 UUID
}
