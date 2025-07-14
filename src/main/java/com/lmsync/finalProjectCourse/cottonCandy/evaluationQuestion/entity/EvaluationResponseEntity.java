package com.lmsync.finalProjectCourse.cottonCandy.evaluationQuestion.entity;

import java.util.UUID;

import com.lmsync.finalProjectCourse.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "evaluationResponse")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EvaluationResponseEntity extends BaseEntity {

    @Id
    @Column(length = 100)
    private String evalResultId;

    @Column(length = 100, nullable = false)
    private String templateGroupId;

    @Column(length = 100, nullable = false)
    private String memberId;

    @Column(length = 100, nullable = false)
    private String evalQuestionId;

    @Column(nullable = false)
    private int score;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answerText;

    @PrePersist
    public void generateUUID() {
        if (this.evalResultId == null) {
            this.evalResultId = UUID.randomUUID().toString();
        }
    }
}

