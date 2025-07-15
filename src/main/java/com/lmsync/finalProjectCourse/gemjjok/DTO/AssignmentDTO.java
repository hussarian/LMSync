package com.lmsync.finalProjectCourse.gemjjok.DTO;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentDTO {
    private String assignmentId;
    private String courseId;
    private String memberId;
    private String assignmentTitle;
    private String assignmentContent;
    private LocalDateTime dueDate;
    private Boolean fileRequired;
    private Boolean codeRequired;
    private Boolean isLocked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 