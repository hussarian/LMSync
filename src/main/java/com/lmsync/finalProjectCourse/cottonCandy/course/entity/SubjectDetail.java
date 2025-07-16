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

/** 세부 과목 정보 엔티티 */
@Entity
@Table(name = "subjectDetail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectDetail extends BaseEntity {

    @Id
    @Column(length = 100)
    private String subDetailId; // 과목 상세 ID

    @Column(length = 100, nullable = false)
    private String educationId; // 교육과정 ID

    @Column(nullable = false)
    private int subDetailName; // 과목명

    @Column(length = 100, nullable = false)
    private String subDetailInfo; // 과목 정보

    @Column(nullable = false)
    private int subDetailActive; // 활성화 상태

    // UUID 자동 생성
    @PrePersist
    public void generateUUID() {
        if (this.subDetailId == null) {
            this.subDetailId = UUID.randomUUID().toString();
        }
    }
}
