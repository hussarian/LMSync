package com.lmsChat.finalProjectChat.chat.controller;

import com.lmsChat.finalProjectChat.chat.dto.WebSocketMessage;
import com.lmsChat.finalProjectChat.chat.dto.UserStatusMessage;
import com.lmsChat.finalProjectChat.chat.service.UserStatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {
    
    private final SimpMessageSendingOperations messagingTemplate;
    private final UserStatusService userStatusService;
    
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("WebSocket 연결됨: {}", event.getMessage());
    }
    
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        String userId = (String) headerAccessor.getSessionAttributes().get("userId");
        String userName = (String) headerAccessor.getSessionAttributes().get("userName");
        
        if (roomId != null && userId != null && userName != null) {
            log.info("WebSocket 연결 해제: roomId={}, userId={}, userName={}", roomId, userId, userName);
            
            // 사용자 상태 업데이트
            userStatusService.userLeft(roomId, userId, userName);
            
            // 채팅방의 모든 구독자에게 사용자 퇴장 알림 전송
            UserStatusMessage leaveMessage = UserStatusMessage.builder()
                    .type("user_left")
                    .roomId(roomId)
                    .userId(userId)
                    .userName(userName)
                    .build();
            
            messagingTemplate.convertAndSend("/topic/room/" + roomId + "/status", leaveMessage);
        }
    }
} 