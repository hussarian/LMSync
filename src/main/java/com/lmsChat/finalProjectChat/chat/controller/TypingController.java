package com.lmsChat.finalProjectChat.chat.controller;

import com.lmsChat.finalProjectChat.chat.service.TypingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
@Slf4j
public class TypingController {
    
    private final TypingService typingService;
    
    /**
     * 채팅방의 타이핑 중인 사용자 목록 조회
     * GET /api/chat/rooms/{roomId}/typing
     */
    @GetMapping("/{roomId}/typing")
    public ResponseEntity<TypingUsersResponse> getTypingUsers(@PathVariable String roomId) {
        try {
            Map<String, TypingService.TypingInfo> typingUsers = typingService.getTypingUsers(roomId);
            
            List<TypingUserDto> users = typingUsers.values().stream()
                    .map(info -> TypingUserDto.builder()
                            .userId(info.getUserId())
                            .userName(info.getUserName())
                            .build())
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(TypingUsersResponse.builder()
                    .success(true)
                    .users(users)
                    .build());
            
        } catch (Exception e) {
            log.error("타이핑 사용자 조회 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(TypingUsersResponse.builder()
                            .success(false)
                            .users(List.of())
                            .build());
        }
    }
    
    /**
     * 타이핑 사용자 응답 DTO
     */
    public static class TypingUsersResponse {
        private boolean success;
        private List<TypingUserDto> users;
        
        public static TypingUsersResponse builder() {
            return new TypingUsersResponse();
        }
        
        public TypingUsersResponse success(boolean success) {
            this.success = success;
            return this;
        }
        
        public TypingUsersResponse users(List<TypingUserDto> users) {
            this.users = users;
            return this;
        }
        
        public TypingUsersResponse build() {
            return this;
        }
        
        // Getters
        public boolean isSuccess() { return success; }
        public List<TypingUserDto> getUsers() { return users; }
    }
    
    /**
     * 타이핑 사용자 DTO
     */
    public static class TypingUserDto {
        private String userId;
        private String userName;
        
        public static TypingUserDto builder() {
            return new TypingUserDto();
        }
        
        public TypingUserDto userId(String userId) {
            this.userId = userId;
            return this;
        }
        
        public TypingUserDto userName(String userName) {
            this.userName = userName;
            return this;
        }
        
        public TypingUserDto build() {
            return this;
        }
        
        // Getters
        public String getUserId() { return userId; }
        public String getUserName() { return userName; }
    }
} 