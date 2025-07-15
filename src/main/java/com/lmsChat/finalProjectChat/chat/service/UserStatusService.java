package com.lmsChat.finalProjectChat.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserStatusService {
    
    private final SimpMessagingTemplate messagingTemplate;
    
    // 채팅방별 온라인 사용자 목록을 저장하는 맵
    // Key: roomId, Value: Map<userId, UserInfo>
    private final ConcurrentMap<String, ConcurrentMap<String, UserInfo>> onlineUsers = new ConcurrentHashMap<>();
    
    /**
     * 사용자 입장 처리
     */
    public void userJoined(String roomId, String userId, String userName) {
        onlineUsers.computeIfAbsent(roomId, k -> new ConcurrentHashMap<>());
        
        UserInfo userInfo = new UserInfo(userId, userName, System.currentTimeMillis());
        onlineUsers.get(roomId).put(userId, userInfo);
        
        log.info("사용자 입장: roomId={}, userId={}, userName={}", roomId, userId, userName);
    }
    
    /**
     * 사용자 퇴장 처리
     */
    public void userLeft(String roomId, String userId, String userName) {
        if (onlineUsers.containsKey(roomId)) {
            onlineUsers.get(roomId).remove(userId);
            log.info("사용자 퇴장: roomId={}, userId={}, userName={}", roomId, userId, userName);
        }
    }
    
    /**
     * 채팅방의 온라인 사용자 목록 조회
     */
    public Map<String, UserInfo> getOnlineUsers(String roomId) {
        return onlineUsers.getOrDefault(roomId, new ConcurrentHashMap<>());
    }
    
    /**
     * 특정 사용자가 온라인인지 확인
     */
    public boolean isUserOnline(String roomId, String userId) {
        return onlineUsers.containsKey(roomId) && onlineUsers.get(roomId).containsKey(userId);
    }
    
    /**
     * 채팅방의 온라인 사용자 수 조회
     */
    public int getOnlineUserCount(String roomId) {
        return onlineUsers.getOrDefault(roomId, new ConcurrentHashMap<>()).size();
    }
    
    /**
     * 사용자 정보를 담는 내부 클래스
     */
    public static class UserInfo {
        private final String userId;
        private final String userName;
        private final long joinedAt;
        
        public UserInfo(String userId, String userName, long joinedAt) {
            this.userId = userId;
            this.userName = userName;
            this.joinedAt = joinedAt;
        }
        
        public String getUserId() {
            return userId;
        }
        
        public String getUserName() {
            return userName;
        }
        
        public long getJoinedAt() {
            return joinedAt;
        }
    }
} 