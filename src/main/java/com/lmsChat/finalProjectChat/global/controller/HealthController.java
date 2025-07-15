package com.lmsChat.finalProjectChat.global.controller;

import com.lmsChat.finalProjectChat.global.dto.HealthResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
@Slf4j
public class HealthController {
    
    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;
    
    /**
     * 전체 시스템 상태 확인
     * GET /api/health
     */
    @GetMapping
    public ResponseEntity<HealthResponse> checkHealth() {
        Map<String, Object> details = new HashMap<>();
        boolean isHealthy = true;
        
        // 데이터베이스 연결 확인
        Map<String, Object> dbStatus = checkDatabaseConnection();
        details.put("database", dbStatus);
        
        if (!(Boolean) dbStatus.get("connected")) {
            isHealthy = false;
        }
        
        // 시스템 정보
        details.put("system", Map.of(
            "timestamp", LocalDateTime.now().toString(),
            "javaVersion", System.getProperty("java.version"),
            "springVersion", org.springframework.core.SpringVersion.getVersion()
        ));
        
        HealthResponse response = HealthResponse.builder()
                .status(isHealthy ? "UP" : "DOWN")
                .timestamp(LocalDateTime.now())
                .details(details)
                .build();
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 데이터베이스 연결만 확인
     * GET /api/health/db
     */
    @GetMapping("/db")
    public ResponseEntity<HealthResponse> checkDatabase() {
        Map<String, Object> dbStatus = checkDatabaseConnection();
        
        HealthResponse response = HealthResponse.builder()
                .status((Boolean) dbStatus.get("connected") ? "UP" : "DOWN")
                .timestamp(LocalDateTime.now())
                .details(Map.of("database", dbStatus))
                .build();
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 데이터베이스 연결 상태 확인
     */
    private Map<String, Object> checkDatabaseConnection() {
        Map<String, Object> status = new HashMap<>();
        
        try (Connection connection = dataSource.getConnection()) {
            // 연결 확인
            boolean isConnected = !connection.isClosed();
            status.put("connected", isConnected);
            
            if (isConnected) {
                // 데이터베이스 정보
                status.put("url", connection.getMetaData().getURL());
                status.put("databaseProductName", connection.getMetaData().getDatabaseProductName());
                status.put("databaseProductVersion", connection.getMetaData().getDatabaseProductVersion());
                status.put("driverName", connection.getMetaData().getDriverName());
                status.put("driverVersion", connection.getMetaData().getDriverVersion());
                
                // 간단한 쿼리 테스트
                try {
                    String result = jdbcTemplate.queryForObject("SELECT 1", String.class);
                    status.put("queryTest", "SUCCESS");
                    status.put("queryResult", result);
                } catch (Exception e) {
                    status.put("queryTest", "FAILED");
                    status.put("queryError", e.getMessage());
                }
                
                log.info("데이터베이스 연결 성공: {}", connection.getMetaData().getURL());
            } else {
                status.put("error", "Connection is closed");
                log.error("데이터베이스 연결이 닫혀있습니다.");
            }
            
        } catch (SQLException e) {
            status.put("connected", false);
            status.put("error", e.getMessage());
            status.put("errorCode", e.getErrorCode());
            status.put("sqlState", e.getSQLState());
            log.error("데이터베이스 연결 실패: {}", e.getMessage());
        }
        
        return status;
    }
} 