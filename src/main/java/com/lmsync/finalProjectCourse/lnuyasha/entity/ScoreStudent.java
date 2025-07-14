package com.lmsync.finalProjectCourse.lnuyasha.entity;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "scorestudent")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScoreStudent {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "scoreStudentId", columnDefinition = "VARCHAR(100)")
    private String scoreStudentId; // 학생 점수 UUID

    @Column(name = "score", columnDefinition = "int")
    private int score; // 학생 총점

    @Column(name = "isChecked", columnDefinition = "int default 0")
    private int isChecked; // 학생 점수 확인 여부  (0: 미확인, 1: 확인)

    private LocalDateTime createdAt; // 생성일
    private LocalDateTime updatedAt; // 수정일

    @Column(name = "memberId", columnDefinition = "VARCHAR(100)")
    private String memberId; // 학생 UUID
    
    @Column(name = "templateId", columnDefinition = "VARCHAR(100)")
    private String templateId; // 시험 UUID
}
