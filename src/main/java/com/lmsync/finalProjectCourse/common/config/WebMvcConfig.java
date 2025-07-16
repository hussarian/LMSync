package com.lmsync.finalProjectCourse.common.config;

import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.lmsync.finalProjectCourse.common.jwt.JwtInterceptor;

public class WebMvcConfig implements WebMvcConfigurer{
    private final JwtInterceptor jwtInterceptor;

    public WebMvcConfig(JwtInterceptor jwtInterceptor) {
        this.jwtInterceptor = jwtInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/api/course/**"); // 인터셉터 적용 경로
    }
}
