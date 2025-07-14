package com.lmsync.finalProjectCourse.cottonCandy.course.entity;

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

/** 과목 그룹 엔티티 */
@Entity
@Table(name = "subGroup")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubGroupEntity extends BaseEntity {

    @Id
    @Column(length = 100)
    private String subGroupId; // 과목 그룹 ID

    @Column(length = 100, nullable = false)
    private String courseId; // 강의 ID

    @Column(length = 100, nullable = false)
    private String subjectId; // 과목 ID

    // UUID 자동 생성
    @PrePersist
    public void generateUUID() {
        if (this.subGroupId == null) {
            this.subGroupId = UUID.randomUUID().toString();
        }
    }
}

