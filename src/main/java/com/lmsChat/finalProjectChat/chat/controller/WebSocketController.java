package com.lmsChat.finalProjectChat.chat.controller;

import com.lmsChat.finalProjectChat.chat.dto.SendMessageRequest;
import com.lmsChat.finalProjectChat.chat.dto.SendMessageResponse;
import com.lmsChat.finalProjectChat.chat.dto.WebSocketMessage;
import com.lmsChat.finalProjectChat.chat.dto.TypingMessage;
import com.lmsChat.finalProjectChat.chat.dto.UserStatusMessage;
import com.lmsChat.finalProjectChat.chat.service.ChatRoomService;
import com.lmsChat.finalProjectChat.chat.service.TypingService;
import com.lmsChat.finalProjectChat.chat.service.UserStatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {
    
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomService chatRoomService;
    private final TypingService typingService;
    private final UserStatusService userStatusService;
    
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload SendMessageRequest request, SimpMessageHeaderAccessor headerAccessor) {
        try {
            String roomId = headerAccessor.getSessionAttributes().get("roomId").toString();
            String userId = headerAccessor.getSessionAttributes().get("userId").toString();
            
            log.info("WebSocket 메시지 전송: roomId={}, userId={}, content={}", roomId, userId, request.getContent());
            
            // 메시지 저장
            SendMessageResponse.MessageDto savedMessage = chatRoomService.sendMessage(roomId, userId, request);
            
            // WebSocket 메시지 생성
            WebSocketMessage webSocketMessage = WebSocketMessage.builder()
                    .type("message")
                    .roomId(roomId)
                    .message(WebSocketMessage.MessageDto.from(savedMessage))
                    .build();
            
            // 메시지 전송 시 타이핑 상태 중지
            typingService.updateTypingStatus(roomId, userId, "", false);
            
            // 채팅방의 모든 구독자에게 메시지 전송
            messagingTemplate.convertAndSend("/topic/room/" + roomId, webSocketMessage);
            
        } catch (Exception e) {
            log.error("WebSocket 메시지 전송 중 오류 발생", e);
        }
    }
    
    @MessageMapping("/chat.addUser")
    public void addUser(@Payload String roomId, SimpMessageHeaderAccessor headerAccessor) {
        try {
            String userId = headerAccessor.getSessionAttributes().get("userId").toString();
            String userName = headerAccessor.getSessionAttributes().get("userName").toString();
            
            log.info("WebSocket 사용자 추가: roomId={}, userId={}, userName={}", roomId, userId, userName);
            
            // 세션에 채팅방 정보 저장
            headerAccessor.getSessionAttributes().put("roomId", roomId);
            
            // 사용자 상태 업데이트
            userStatusService.userJoined(roomId, userId, userName);
            
            // 채팅방의 모든 구독자에게 사용자 입장 알림 전송
            UserStatusMessage joinMessage = UserStatusMessage.builder()
                    .type("user_joined")
                    .roomId(roomId)
                    .userId(userId)
                    .userName(userName)
                    .build();
            
            messagingTemplate.convertAndSend("/topic/room/" + roomId + "/status", joinMessage);
            
        } catch (Exception e) {
            log.error("WebSocket 사용자 추가 중 오류 발생", e);
        }
    }
    
    @MessageMapping("/chat.typing")
    public void handleTyping(@Payload TypingMessage typingMessage, SimpMessageHeaderAccessor headerAccessor) {
        try {
            String roomId = headerAccessor.getSessionAttributes().get("roomId").toString();
            String userId = headerAccessor.getSessionAttributes().get("userId").toString();
            String userName = headerAccessor.getSessionAttributes().get("userName").toString();
            
            log.info("WebSocket 타이핑 상태: roomId={}, userId={}, userName={}, isTyping={}", 
                    roomId, userId, userName, typingMessage.isTyping());
            
            // 타이핑 상태 업데이트
            typingService.updateTypingStatus(roomId, userId, userName, typingMessage.isTyping());
            
            // 타이핑 상태 메시지 생성
            TypingMessage typingStatus = TypingMessage.builder()
                    .type("typing")
                    .roomId(roomId)
                    .userId(userId)
                    .userName(userName)
                    .isTyping(typingMessage.isTyping())
                    .build();
            
            // 채팅방의 다른 사용자들에게 타이핑 상태 전송 (발신자 제외)
            messagingTemplate.convertAndSend("/topic/room/" + roomId + "/typing", typingStatus);
            
        } catch (Exception e) {
            log.error("WebSocket 타이핑 상태 처리 중 오류 발생", e);
        }
    }
} 