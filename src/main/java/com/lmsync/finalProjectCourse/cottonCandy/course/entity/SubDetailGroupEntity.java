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

/** 과목 상세 그룹 엔티티 */
@Entity
@Table(name = "subDetailGroup")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubDetailGroupEntity extends BaseEntity {

    @Id
    @Column(length = 100)
    private String subDetailGroupId; // 과목 상세 그룹 ID

    @Column(length = 100, nullable = false)
    private String subDetailId; // 과목 상세 ID

    @Column(length = 100, nullable = false)
    private String subjectId; // 과목 ID

    // UUID 자동 생성
    @PrePersist
    public void generateUUID() {
        if (this.subDetailGroupId == null) {
            this.subDetailGroupId = UUID.randomUUID().toString();
        }
    }
}


