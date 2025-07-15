package com.lmsync.finalProjectCourse.gemjjok.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "assignment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assignment {
    @Id
    @Column(name = "assignmentId", length = 100, nullable = false)
    private String assignmentId;

    @Column(name = "courseId", length = 100, nullable = false)
    private String courseId;

    @Column(name = "memberId", length = 100, nullable = false)
    private String memberId;

    @Column(name = "assignmentTitle", length = 100)
    private String assignmentTitle;

    @Column(name = "assignmentContent", columnDefinition = "TEXT")
    private String assignmentContent;

    @Column(name = "dueDate")
    private LocalDateTime dueDate;

    @Column(name = "fileRequired")
    private Boolean fileRequired;

    @Column(name = "codeRequired")
    private Boolean codeRequired;

    @Column(name = "isLocked")
    private Boolean isLocked;

    @CreationTimestamp
    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;
} 