package com.lmsync.finalProjectCourse.cottonCandy.course.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.lmsync.finalProjectCourse.cottonCandy.course.entity.SubjectDetail;
import com.lmsync.finalProjectCourse.cottonCandy.course.repository.SubDetailRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubDetailService {

    private final SubDetailRepository subDetailRepository;
    public List<SubjectDetail> getSubjectDetailList() {
    
       return subDetailRepository.findAll();
    }
    
}
