package com.lmsync.finalProjectCourse.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lms")
public class test {
    @GetMapping("/test")
    public String test1() {
        return "서버 살아있어요!";
    }

}
