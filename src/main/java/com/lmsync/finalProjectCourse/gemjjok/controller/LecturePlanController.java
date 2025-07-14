package com.lmsync.finalProjectCourse.gemjjok.controller;

import com.lmsync.finalProjectCourse.gemjjok.entity.LecturePlan;
import com.lmsync.finalProjectCourse.gemjjok.service.LecturePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemjjok/lectureplan")
public class LecturePlanController {
    @Autowired
    private LecturePlanService lecturePlanService;

    @PostMapping
    public LecturePlan create(@RequestBody LecturePlan lecturePlan) {
        return lecturePlanService.createLecturePlan(lecturePlan);
    }

    @PutMapping("/{planId}")
    public LecturePlan update(@PathVariable String planId, @RequestBody LecturePlan lecturePlan) {
        return lecturePlanService.updateLecturePlan(planId, lecturePlan);
    }

    @DeleteMapping("/{planId}")
    public void delete(@PathVariable String planId) {
        lecturePlanService.deleteLecturePlan(planId);
    }
} 