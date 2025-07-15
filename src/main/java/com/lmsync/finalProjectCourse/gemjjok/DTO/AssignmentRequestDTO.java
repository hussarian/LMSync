package com.lmsync.finalProjectCourse.gemjjok.DTO;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentRequestDTO {
    private String courseId;
    private String memberId;
    private String assignmentTitle;
    private String assignmentContent;
    private LocalDateTime dueDate;
    private Boolean fileRequired;
    private Boolean codeRequired;
    private Boolean isLocked;
} 