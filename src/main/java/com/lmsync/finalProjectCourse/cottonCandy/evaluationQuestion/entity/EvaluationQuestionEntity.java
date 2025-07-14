package com.lmsync.finalProjectCourse.cottonCandy.evaluationQuestion.entity;

import java.util.UUID;

import com.lmsync.finalProjectCourse.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "evaluationQuestion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EvaluationQuestionEntity extends BaseEntity {

    @Id
    @Column(length = 100)
    private String evalQuestionId;

    @Column(length = 100, nullable = false)
    private String educationId;

    @Column(nullable = false)
    private String evalQuestionType; // ENUM으로 처리

    @Column(length = 100, nullable = false)
    private String evalQuestionText;

    @Column(nullable = false)
    private int field2evalQuestionActive;

    @PrePersist
    public void generateUUID() {
        if (this.evalQuestionId == null) {
            this.evalQuestionId = UUID.randomUUID().toString();
        }
    }
}
