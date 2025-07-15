package com.lmsChat.finalProjectChat.chat.controller;

import com.lmsChat.finalProjectChat.chat.service.UserStatusService;
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
public class UserStatusController {
    
    private final UserStatusService userStatusService;
    
    /**
     * 채팅방의 온라인 사용자 목록 조회
     * GET /api/chat/rooms/{roomId}/users/online
     */
    @GetMapping("/{roomId}/users/online")
    public ResponseEntity<OnlineUsersResponse> getOnlineUsers(@PathVariable String roomId) {
        try {
            Map<String, UserStatusService.UserInfo> onlineUsers = userStatusService.getOnlineUsers(roomId);
            
            List<OnlineUserDto> users = onlineUsers.values().stream()
                    .map(info -> OnlineUserDto.builder()
                            .userId(info.getUserId())
                            .userName(info.getUserName())
                            .joinedAt(info.getJoinedAt())
                            .build())
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(OnlineUsersResponse.builder()
                    .success(true)
                    .users(users)
                    .count(users.size())
                    .build());
            
        } catch (Exception e) {
            log.error("온라인 사용자 조회 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(OnlineUsersResponse.builder()
                            .success(false)
                            .users(List.of())
                            .count(0)
                            .build());
        }
    }
    
    /**
     * 특정 사용자의 온라인 상태 확인
     * GET /api/chat/rooms/{roomId}/users/{userId}/status
     */
    @GetMapping("/{roomId}/users/{userId}/status")
    public ResponseEntity<UserStatusResponse> getUserStatus(
            @PathVariable String roomId,
            @PathVariable String userId) {
        try {
            boolean isOnline = userStatusService.isUserOnline(roomId, userId);
            
            return ResponseEntity.ok(UserStatusResponse.builder()
                    .success(true)
                    .userId(userId)
                    .roomId(roomId)
                    .isOnline(isOnline)
                    .build());
            
        } catch (Exception e) {
            log.error("사용자 상태 조회 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(UserStatusResponse.builder()
                            .success(false)
                            .userId(userId)
                            .roomId(roomId)
                            .isOnline(false)
                            .build());
        }
    }
    
    /**
     * 온라인 사용자 응답 DTO
     */
    public static class OnlineUsersResponse {
        private boolean success;
        private List<OnlineUserDto> users;
        private int count;
        
        public static OnlineUsersResponse builder() {
            return new OnlineUsersResponse();
        }
        
        public OnlineUsersResponse success(boolean success) {
            this.success = success;
            return this;
        }
        
        public OnlineUsersResponse users(List<OnlineUserDto> users) {
            this.users = users;
            return this;
        }
        
        public OnlineUsersResponse count(int count) {
            this.count = count;
            return this;
        }
        
        public OnlineUsersResponse build() {
            return this;
        }
        
        // Getters
        public boolean isSuccess() { return success; }
        public List<OnlineUserDto> getUsers() { return users; }
        public int getCount() { return count; }
    }
    
    /**
     * 온라인 사용자 DTO
     */
    public static class OnlineUserDto {
        private String userId;
        private String userName;
        private long joinedAt;
        
        public static OnlineUserDto builder() {
            return new OnlineUserDto();
        }
        
        public OnlineUserDto userId(String userId) {
            this.userId = userId;
            return this;
        }
        
        public OnlineUserDto userName(String userName) {
            this.userName = userName;
            return this;
        }
        
        public OnlineUserDto joinedAt(long joinedAt) {
            this.joinedAt = joinedAt;
            return this;
        }
        
        public OnlineUserDto build() {
            return this;
        }
        
        // Getters
        public String getUserId() { return userId; }
        public String getUserName() { return userName; }
        public long getJoinedAt() { return joinedAt; }
    }
    
    /**
     * 사용자 상태 응답 DTO
     */
    public static class UserStatusResponse {
        private boolean success;
        private String userId;
        private String roomId;
        private boolean isOnline;
        
        public static UserStatusResponse builder() {
            return new UserStatusResponse();
        }
        
        public UserStatusResponse success(boolean success) {
            this.success = success;
            return this;
        }
        
        public UserStatusResponse userId(String userId) {
            this.userId = userId;
            return this;
        }
        
        public UserStatusResponse roomId(String roomId) {
            this.roomId = roomId;
            return this;
        }
        
        public UserStatusResponse isOnline(boolean isOnline) {
            this.isOnline = isOnline;
            return this;
        }
        
        public UserStatusResponse build() {
            return this;
        }
        
        // Getters
        public boolean isSuccess() { return success; }
        public String getUserId() { return userId; }
        public String getRoomId() { return roomId; }
        public boolean isOnline() { return isOnline; }
    }
} 