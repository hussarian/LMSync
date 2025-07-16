package com.lmsync.finalProjectCourse.cottonCandy.course.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lmsync.finalProjectCourse.common.ResponseDTO;
import com.lmsync.finalProjectCourse.cottonCandy.course.entity.SubjectDetail;
import com.lmsync.finalProjectCourse.cottonCandy.course.service.SubDetailService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequiredArgsConstructor
@RequestMapping("/subDetail")
public class SubDetailController {
    private final SubDetailService subDetailService;
    
    @GetMapping("/list")
    public ResponseDTO<List<SubjectDetail>> getSubjectDetailList() {        
        List<SubjectDetail> subjectDetailList = subDetailService.getSubjectDetailList();
        return ResponseDTO.createSuccessResponse("성공", subjectDetailList);
    }
    
}
