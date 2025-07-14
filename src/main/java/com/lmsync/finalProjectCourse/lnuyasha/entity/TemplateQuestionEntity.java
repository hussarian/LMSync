package com.lmsync.finalProjectCourse.lnuyasha.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "templatequestion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateQuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "templateQuestionId", columnDefinition = "VARCHAR(100)")
    private String templateQuestionId;  // 템플릿 질문 UUID
    
    @Column(name = "templateQuestionScore", columnDefinition = "int")
    private int templateQuestionScore; // 배점점

    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일
    
    @Column(name = "questionId", columnDefinition = "VARCHAR(100)")
    private String questionId; // 문제 UUID

    @Column(name = "templateId", columnDefinition = "VARCHAR(100)")
    private String templateId; // 시험 UUID
}
