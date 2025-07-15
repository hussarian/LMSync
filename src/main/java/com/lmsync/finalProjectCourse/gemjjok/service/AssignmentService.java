package com.lmsync.finalProjectCourse.gemjjok.service;

import com.lmsync.finalProjectCourse.gemjjok.DTO.AssignmentDTO;
import com.lmsync.finalProjectCourse.gemjjok.DTO.AssignmentRequestDTO;
import com.lmsync.finalProjectCourse.gemjjok.entity.Assignment;
import com.lmsync.finalProjectCourse.gemjjok.repository.AssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    // 등록
    public AssignmentDTO createAssignment(AssignmentRequestDTO dto) {
        Assignment assignment = Assignment.builder()
                .assignmentId(UUID.randomUUID().toString())
                .courseId(dto.getCourseId())
                .memberId(dto.getMemberId())
                .assignmentTitle(dto.getAssignmentTitle())
                .assignmentContent(dto.getAssignmentContent())
                .dueDate(dto.getDueDate())
                .fileRequired(dto.getFileRequired())
                .codeRequired(dto.getCodeRequired())
                .isLocked(dto.getIsLocked())
                .build();
        assignmentRepository.save(assignment);
        return toDTO(assignment);
    }

    // 수정
    @Transactional
    public AssignmentDTO updateAssignment(String assignmentId, AssignmentRequestDTO dto) {
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("과제를 찾을 수 없습니다."));
        assignment.setCourseId(dto.getCourseId());
        assignment.setMemberId(dto.getMemberId());
        assignment.setAssignmentTitle(dto.getAssignmentTitle());
        assignment.setAssignmentContent(dto.getAssignmentContent());
        assignment.setDueDate(dto.getDueDate());
        assignment.setFileRequired(dto.getFileRequired());
        assignment.setCodeRequired(dto.getCodeRequired());
        assignment.setIsLocked(dto.getIsLocked());
        return toDTO(assignment);
    }

    // 삭제
    public void deleteAssignment(String assignmentId) {
        assignmentRepository.deleteById(assignmentId);
    }

    // 단건 조회
    public AssignmentDTO getAssignment(String assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("과제를 찾을 수 없습니다."));
        return toDTO(assignment);
    }

    private AssignmentDTO toDTO(Assignment entity) {
        return AssignmentDTO.builder()
                .assignmentId(entity.getAssignmentId())
                .courseId(entity.getCourseId())
                .memberId(entity.getMemberId())
                .assignmentTitle(entity.getAssignmentTitle())
                .assignmentContent(entity.getAssignmentContent())
                .dueDate(entity.getDueDate())
                .fileRequired(entity.getFileRequired())
                .codeRequired(entity.getCodeRequired())
                .isLocked(entity.getIsLocked())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
} 