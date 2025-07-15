package com.lmsync.finalProjectCourse.gemjjok.controller;

import com.lmsync.finalProjectCourse.gemjjok.DTO.AssignmentDTO;
import com.lmsync.finalProjectCourse.gemjjok.DTO.AssignmentRequestDTO;
import com.lmsync.finalProjectCourse.gemjjok.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemjjok/assignment")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    // 등록
    @PostMapping
    public ResponseEntity<AssignmentDTO> create(@RequestBody AssignmentRequestDTO dto) {
        return ResponseEntity.ok(assignmentService.createAssignment(dto));
    }

    // 수정
    @PutMapping("/{assignmentId}")
    public ResponseEntity<AssignmentDTO> update(@PathVariable String assignmentId, @RequestBody AssignmentRequestDTO dto) {
        return ResponseEntity.ok(assignmentService.updateAssignment(assignmentId, dto));
    }

    // 삭제
    @DeleteMapping("/{assignmentId}")
    public ResponseEntity<Void> delete(@PathVariable String assignmentId) {
        assignmentService.deleteAssignment(assignmentId);
        return ResponseEntity.ok().build();
    }

    // 단건 조회
    @GetMapping("/{assignmentId}")
    public ResponseEntity<AssignmentDTO> get(@PathVariable String assignmentId) {
        return ResponseEntity.ok(assignmentService.getAssignment(assignmentId));
    }
} 