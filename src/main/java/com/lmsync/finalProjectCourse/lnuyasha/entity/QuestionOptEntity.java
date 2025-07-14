package com.lmsync.finalProjectCourse.lnuyasha.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionOptEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "optId", columnDefinition = "VARCHAR(100)")
    private String optId;

    @Column(name = "optText", columnDefinition = "VARCHAR(50)")
    private String optText; // 보기 내용

    @Column(name = "optIsCorrect", columnDefinition = "int default 0")
    private int optIsCorrect; // 보기 정답 여부 (0: 오답, 1: 정답)

    @Column(name = "questionId", columnDefinition = "VARCHAR(100)")
    private String questionId; // 문제 ID
}
