package com.lmsChat.finalProjectChat.chat.controller;

import com.lmsChat.finalProjectChat.chat.dto.ApiResponse;
import com.lmsChat.finalProjectChat.chat.dto.ChatRoomResponse;
import com.lmsChat.finalProjectChat.chat.dto.ChatRoomsResponse;
import com.lmsChat.finalProjectChat.chat.dto.CreateRoomRequest;
import com.lmsChat.finalProjectChat.chat.dto.CreateRoomResponse;
import com.lmsChat.finalProjectChat.chat.dto.MessagesResponse;
import com.lmsChat.finalProjectChat.chat.dto.SendMessageRequest;
import com.lmsChat.finalProjectChat.chat.dto.SendMessageResponse;
import com.lmsChat.finalProjectChat.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatRoomService chatRoomService;

    /**
     * 채팅방 목록 조회
     * GET /api/chat/rooms
     */
    @GetMapping("/rooms")
    public ResponseEntity<ChatRoomsResponse> getChatRooms(@RequestParam(value = "userId", required = false) String userId) {
        try {
            if (userId == null || userId.trim().isEmpty()) {
                // userId가 없으면 테스트용 기본 데이터 반환
                return ResponseEntity.ok(ChatRoomsResponse.builder()
                    .success(true)
                    .rooms(List.of(
                        ChatRoomResponse.builder()
                            .id("room_1")
                            .name("채팅방 1")
                            .lastMessage("안녕하세요")
                            .time("2024-01-15T10:30:00Z")
                            .unread(2)
                            .type("individual")
                            .build()
                    ))
                    .build());
            }
            
            List<ChatRoomResponse> chatRooms = chatRoomService.getChatRoomsByUserId(userId);
            
            log.info("사용자 {}의 채팅방 목록 조회 완료: {}개", userId, chatRooms.size());
            
            return ResponseEntity.ok(ChatRoomsResponse.builder()
                .success(true)
                .rooms(chatRooms)
                .build());
            
        } catch (Exception e) {
            log.error("채팅방 목록 조회 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(ChatRoomsResponse.builder()
                        .success(false)
                        .rooms(List.of())
                        .build());
        }
    }
    
    /**
     * 채팅방 생성
     * POST /api/chat/rooms
     */
    @PostMapping("/rooms")
    public ResponseEntity<CreateRoomResponse> createChatRoom(@RequestBody CreateRoomRequest request) {
        try {
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(CreateRoomResponse.builder()
                                .success(false)
                                .room(null)
                                .build());
            }
            
            if (request.getParticipantIds() == null || request.getParticipantIds().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(CreateRoomResponse.builder()
                                .success(false)
                                .room(null)
                                .build());
            }
            
            CreateRoomResponse.RoomDto room = chatRoomService.createChatRoom(request);
            
            log.info("채팅방 생성 완료: {}", room.getId());
            
            return ResponseEntity.ok(CreateRoomResponse.builder()
                    .success(true)
                    .room(room)
                    .build());
            
        } catch (IllegalArgumentException e) {
            log.error("채팅방 생성 중 유효성 검사 오류: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(CreateRoomResponse.builder()
                            .success(false)
                            .room(null)
                            .build());
        } catch (Exception e) {
            log.error("채팅방 생성 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(CreateRoomResponse.builder()
                            .success(false)
                            .room(null)
                            .build());
        }
    }
    
    /**
     * 채팅방 메시지 목록 조회
     * GET /api/chat/rooms/{roomId}/messages
     */
    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<MessagesResponse> getChatRoomMessages(@PathVariable String roomId) {
        try {
            if (roomId == null || roomId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(MessagesResponse.builder()
                                .success(false)
                                .messages(List.of())
                                .build());
            }
            
            List<MessagesResponse.MessageDto> messages = chatRoomService.getChatRoomMessages(roomId);
            
            log.info("채팅방 {}의 메시지 목록 조회 완료: {}개", roomId, messages.size());
            
            return ResponseEntity.ok(MessagesResponse.builder()
                    .success(true)
                    .messages(messages)
                    .build());
            
        } catch (IllegalArgumentException e) {
            log.error("채팅방 메시지 조회 중 유효성 검사 오류: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(MessagesResponse.builder()
                            .success(false)
                            .messages(List.of())
                            .build());
        } catch (Exception e) {
            log.error("채팅방 메시지 조회 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(MessagesResponse.builder()
                            .success(false)
                            .messages(List.of())
                            .build());
        }
    }
    
    /**
     * 메시지 전송
     * POST /api/chat/rooms/{roomId}/messages
     */
    @PostMapping("/rooms/{roomId}/messages")
    public ResponseEntity<SendMessageResponse> sendMessage(
            @PathVariable String roomId,
            @RequestParam(value = "senderId") String senderId,
            @RequestBody SendMessageRequest request) {
        try {
            if (roomId == null || roomId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(SendMessageResponse.builder()
                                .success(false)
                                .message(null)
                                .build());
            }
            
            if (senderId == null || senderId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(SendMessageResponse.builder()
                                .success(false)
                                .message(null)
                                .build());
            }
            
            if (request.getContent() == null || request.getContent().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(SendMessageResponse.builder()
                                .success(false)
                                .message(null)
                                .build());
            }
            
            SendMessageResponse.MessageDto message = chatRoomService.sendMessage(roomId, senderId, request);
            
            log.info("메시지 전송 완료: roomId={}, senderId={}, messageId={}", roomId, senderId, message.getId());
            
            return ResponseEntity.ok(SendMessageResponse.builder()
                    .success(true)
                    .message(message)
                    .build());
            
        } catch (IllegalArgumentException e) {
            log.error("메시지 전송 중 유효성 검사 오류: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(SendMessageResponse.builder()
                            .success(false)
                            .message(null)
                            .build());
        } catch (Exception e) {
            log.error("메시지 전송 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(SendMessageResponse.builder()
                            .success(false)
                            .message(null)
                            .build());
        }
    }
    
    /**
     * 테스트용 데이터 생성
     * POST /api/chat/test-data
     */
    @PostMapping("/test-data")
    public ResponseEntity<ApiResponse<String>> createTestData(@RequestParam(value = "userId") String userId) {
        try {
            if (userId == null || userId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("사용자 ID가 필요합니다."));
            }
            
            chatRoomService.createTestData(userId);
            
            log.info("사용자 {}의 테스트 데이터 생성 완료", userId);
            
            return ResponseEntity.ok(ApiResponse.success("테스트 데이터가 생성되었습니다."));
            
        } catch (Exception e) {
            log.error("테스트 데이터 생성 중 오류 발생", e);
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("테스트 데이터 생성 중 오류가 발생했습니다."));
        }
    }
}