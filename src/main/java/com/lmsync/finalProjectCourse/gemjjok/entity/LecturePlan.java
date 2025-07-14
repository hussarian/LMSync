package com.lmsync.finalProjectCourse.gemjjok.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "lectureplan")
public class LecturePlan {
    @Id
    @Column(name = "planId", length = 100, nullable = false)
    private String planId;

    @Column(name = "courseId", length = 100, nullable = false)
    private String courseId;

    @Column(name = "planTitle", length = 100, nullable = false)
    private String planTitle;

    @Column(name = "planContent", columnDefinition = "TEXT")
    private String planContent;

    @Column(name = "courseGoal", columnDefinition = "TEXT")
    private String courseGoal;

    @Column(name = "learningMethod", columnDefinition = "TEXT")
    private String learningMethod;

    @Column(name = "evaluationMethod", length = 255)
    private String evaluationMethod;

    @Column(name = "textbook", length = 255)
    private String textbook;

    @Column(name = "weekCount")
    private Integer weekCount;

    @Column(name = "assignmentPolicy", columnDefinition = "TEXT")
    private String assignmentPolicy;

    @Column(name = "latePolicy", columnDefinition = "TEXT")
    private String latePolicy;

    @Column(name = "etcNote", columnDefinition = "TEXT")
    private String etcNote;

    @Column(name = "isLocked")
    private Byte isLocked;

    @CreationTimestamp
    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @Column(name = "planActive")
    private Integer planActive;

    public String getPlanId() { return planId; }
    public void setPlanId(String planId) { this.planId = planId; }

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getPlanTitle() { return planTitle; }
    public void setPlanTitle(String planTitle) { this.planTitle = planTitle; }

    public String getPlanContent() { return planContent; }
    public void setPlanContent(String planContent) { this.planContent = planContent; }

    public String getCourseGoal() { return courseGoal; }
    public void setCourseGoal(String courseGoal) { this.courseGoal = courseGoal; }

    public String getLearningMethod() { return learningMethod; }
    public void setLearningMethod(String learningMethod) { this.learningMethod = learningMethod; }

    public String getEvaluationMethod() { return evaluationMethod; }
    public void setEvaluationMethod(String evaluationMethod) { this.evaluationMethod = evaluationMethod; }

    public String getTextbook() { return textbook; }
    public void setTextbook(String textbook) { this.textbook = textbook; }

    public Integer getWeekCount() { return weekCount; }
    public void setWeekCount(Integer weekCount) { this.weekCount = weekCount; }

    public String getAssignmentPolicy() { return assignmentPolicy; }
    public void setAssignmentPolicy(String assignmentPolicy) { this.assignmentPolicy = assignmentPolicy; }

    public String getLatePolicy() { return latePolicy; }
    public void setLatePolicy(String latePolicy) { this.latePolicy = latePolicy; }

    public String getEtcNote() { return etcNote; }
    public void setEtcNote(String etcNote) { this.etcNote = etcNote; }

    public Byte getIsLocked() { return isLocked; }
    public void setIsLocked(Byte isLocked) { this.isLocked = isLocked; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Integer getPlanActive() { return planActive; }
    public void setPlanActive(Integer planActive) { this.planActive = planActive; }
} 