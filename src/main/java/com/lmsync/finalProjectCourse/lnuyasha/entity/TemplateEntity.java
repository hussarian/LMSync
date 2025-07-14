package com.lmsync.finalProjectCourse.lnuyasha.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "template")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "templateId", columnDefinition = "VARCHAR(100)")
    private String templateId;  // 템플릿 UUID
    
    @Column(name = "templateNumber", columnDefinition = "int")
    private int templateNumber; // 문제수

    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일

    @Column(name = "templateActive", columnDefinition = "int default 0")
    private int templateActive; // 삭제 여부 (0: 미삭제, 1: 삭제 등)
    
    @Column(name = "memberId", columnDefinition = "VARCHAR(100)")
    private String memberId; // 등록한 멤버 UUID

    @Column(name = "subGroupId", columnDefinition = "VARCHAR(100)")
    private String subGroupId; // 과정 + 과목 UUID
}
