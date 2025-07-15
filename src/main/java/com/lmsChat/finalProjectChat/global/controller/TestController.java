package com.lmsChat.finalProjectChat.global.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {
    
    private final JdbcTemplate jdbcTemplate;
    
    /**
     * 간단한 데이터베이스 테스트
     * GET /api/test/db
     */
    @GetMapping("/db")
    public ResponseEntity<Map<String, Object>> testDatabase() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 간단한 쿼리 실행
            String testResult = jdbcTemplate.queryForObject("SELECT 'Database connection successful!' as message", String.class);
            
            result.put("success", true);
            result.put("message", testResult);
            result.put("timestamp", java.time.LocalDateTime.now().toString());
            
            log.info("데이터베이스 테스트 성공");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("timestamp", java.time.LocalDateTime.now().toString());
            
            log.error("데이터베이스 테스트 실패: {}", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 서버 상태 확인
     * GET /api/test/server
     */
    @GetMapping("/server")
    public ResponseEntity<Map<String, Object>> testServer() {
        Map<String, Object> result = new HashMap<>();
        
        result.put("status", "UP");
        result.put("message", "서버가 정상적으로 실행 중입니다!");
        result.put("timestamp", java.time.LocalDateTime.now().toString());
        result.put("javaVersion", System.getProperty("java.version"));
        result.put("springVersion", org.springframework.core.SpringVersion.getVersion());
        
        return ResponseEntity.ok(result);
    }
} 