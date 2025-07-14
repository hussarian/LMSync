package com.lmsync.finalProjectCourse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = "com.lmsync.finalProjectCourse") // Feign Client 위치
@SpringBootApplication
public class FinalProjectCourseApplication {
	public static void main(String[] args) {
		SpringApplication.run(FinalProjectCourseApplication.class, args);
	}


}
