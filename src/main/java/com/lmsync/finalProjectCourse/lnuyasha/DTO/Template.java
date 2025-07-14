package com.lmsync.finalProjectCourse.lnuyasha.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Template {
    private Long templateId;  // 템플릿 UUID
    private int templateNumber; // 문제수

    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일
    private int templateActive; // 삭제 여부 (0: 미삭제, 1: 삭제 등)
    
    private Long memberId; // 등록한 멤버 UUID
    private Long subGroupID; // 과정 + 과목 UUID
}
