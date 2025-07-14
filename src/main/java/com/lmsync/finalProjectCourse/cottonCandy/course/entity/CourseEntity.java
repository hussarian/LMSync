package com.lmsync.finalProjectCourse.cottonCandy.course.entity;


import java.time.Instant;
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

/** 강의 정보 엔티티 */
@Entity
@Table(name="course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseEntity extends BaseEntity{
    
    @Id
    @Column(length = 100)
    private String courseId; // 강의 ID

    @Column(length = 100, nullable = false)
    private String memberId; // 강사 ID

    @Column(length = 100, nullable = false)
    private String educationId; // 교육과정 ID

    @Column(length = 100, nullable = false)
    private String courseCode; // 강의 코드

    @Column(length = 50, nullable = false)
    private String courseName; // 강의명

    @Column(nullable = false)
    private int maxCapacity; // 최대 인원

    @Column(nullable = false)
    private int minCapacity; // 최소 인원

    @Column(length = 100, nullable = false)
    private String classId; // 강의실 ID

    @Column(nullable = false)
    private LocalDateTime courseStartDay; // 시작일

    @Column(nullable = false)
    private int courseActive; // 활성화 상태

    @Column(nullable = false)
    private LocalDateTime courseEndDay; // 종료일

    @Column(length = 50, nullable = false)
    private String courseDays; // 강의 요일

    @Column(nullable = false)
    private LocalDateTime startTime; // 시작 시간

    @Column(nullable = false)
    private LocalDateTime endTime; // 종료 시간

    // UUID 자동 생성
    @PrePersist
    public void generateUUID() {
        if (this.courseId == null) {
            this.courseId = UUID.randomUUID().toString();
        }
    }
}
