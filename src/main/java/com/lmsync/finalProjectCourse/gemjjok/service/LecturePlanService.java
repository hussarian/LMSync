package com.lmsync.finalProjectCourse.gemjjok.service;

import com.lmsync.finalProjectCourse.gemjjok.entity.LecturePlan;
import com.lmsync.finalProjectCourse.gemjjok.repository.LecturePlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LecturePlanService {
    @Autowired
    private LecturePlanRepository lecturePlanRepository;

    public LecturePlan createLecturePlan(LecturePlan lecturePlan) {
        return lecturePlanRepository.save(lecturePlan);
    }

    public LecturePlan updateLecturePlan(String planId, LecturePlan lecturePlan) {
        Optional<LecturePlan> existing = lecturePlanRepository.findById(planId);
        if (existing.isPresent()) {
            lecturePlan.setPlanId(planId);
            return lecturePlanRepository.save(lecturePlan);
        } else {
            throw new RuntimeException("LecturePlan not found");
        }
    }

    public void deleteLecturePlan(String planId) {
        lecturePlanRepository.deleteById(planId);
    }
} 