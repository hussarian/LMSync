package com.lmsChat.finalProjectChat.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class TypingService {
    
    private final SimpMessagingTemplate messagingTemplate;
    
    // 채팅방별 타이핑 상태를 저장하는 맵
    // Key: roomId, Value: Map<userId, TypingInfo>
    private final ConcurrentMap<String, ConcurrentMap<String, TypingInfo>> typingUsers = new ConcurrentHashMap<>();
    
    /**
     * 타이핑 상태 업데이트
     */
    public void updateTypingStatus(String roomId, String userId, String userName, boolean isTyping) {
        typingUsers.computeIfAbsent(roomId, k -> new ConcurrentHashMap<>());
        
        if (isTyping) {
            // 타이핑 시작
            TypingInfo typingInfo = new TypingInfo(userId, userName, System.currentTimeMillis());
            typingUsers.get(roomId).put(userId, typingInfo);
            log.info("사용자 {}가 채팅방 {}에서 타이핑 시작", userName, roomId);
        } else {
            // 타이핑 중지
            typingUsers.get(roomId).remove(userId);
            log.info("사용자 {}가 채팅방 {}에서 타이핑 중지", userName, roomId);
        }
    }
    
    /**
     * 타이핑 상태 조회
     */
    public Map<String, TypingInfo> getTypingUsers(String roomId) {
        return typingUsers.getOrDefault(roomId, new ConcurrentHashMap<>());
    }
    
    /**
     * 주기적으로 오래된 타이핑 상태 정리 (10초마다 실행)
     */
    @Scheduled(fixedRate = 10000)
    public void cleanupExpiredTypingStatus() {
        long currentTime = System.currentTimeMillis();
        long timeout = 10000; // 10초
        
        typingUsers.forEach((roomId, users) -> {
            users.entrySet().removeIf(entry -> {
                boolean expired = (currentTime - entry.getValue().getStartTime()) > timeout;
                if (expired) {
                    log.debug("타이핑 상태 만료: roomId={}, userId={}", roomId, entry.getKey());
                }
                return expired;
            });
        });
    }
    
    /**
     * 타이핑 정보를 담는 내부 클래스
     */
    public static class TypingInfo {
        private final String userId;
        private final String userName;
        private final long startTime;
        
        public TypingInfo(String userId, String userName, long startTime) {
            this.userId = userId;
            this.userName = userName;
            this.startTime = startTime;
        }
        
        public String getUserId() {
            return userId;
        }
        
        public String getUserName() {
            return userName;
        }
        
        public long getStartTime() {
            return startTime;
        }
    }
} 