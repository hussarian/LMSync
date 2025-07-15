package com.lmsChat.finalProjectChat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Socket.IO 클라이언트 라이브러리 경로 설정
        registry.addResourceHandler("/socket.io/**")
                .addResourceLocations("classpath:/static/socket.io/");
        
        // 기타 정적 리소스
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
} 