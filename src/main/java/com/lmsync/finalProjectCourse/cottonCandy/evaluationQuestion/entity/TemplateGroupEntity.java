package com.lmsync.finalProjectCourse.cottonCandy.evaluationQuestion.entity;

import java.time.LocalDateTime;
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
@Table(name = "templateGroup")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateGroupEntity extends BaseEntity {

    @Id
    @Column(length = 100)
    private String templateGroupId;

    @Column(length = 100, nullable = false)
    private String templateId;

    @Column(length = 100, nullable = false)
    private String courseId;

    @Column(length = 50, nullable = false)
    private String templateGroupName;

    @Column(nullable = false)
    private LocalDateTime courseDate;

    @PrePersist
    public void generateUUID() {
        if (this.templateGroupId == null) {
            this.templateGroupId = UUID.randomUUID().toString();
        }
    }
}

