package com.lmsChat.finalProjectChat.chat.service;

import com.lmsChat.finalProjectChat.chat.dto.ChatRoomResponse;
import com.lmsChat.finalProjectChat.chat.dto.CreateRoomRequest;
import com.lmsChat.finalProjectChat.chat.dto.CreateRoomResponse;
import com.lmsChat.finalProjectChat.chat.dto.MessagesResponse;
import com.lmsChat.finalProjectChat.chat.dto.SendMessageRequest;
import com.lmsChat.finalProjectChat.chat.dto.SendMessageResponse;
import com.lmsChat.finalProjectChat.chat.entity.ChatRoom;
import com.lmsChat.finalProjectChat.global.exception.ChatRoomNotFoundException;
import com.lmsChat.finalProjectChat.global.exception.UnauthorizedException;
import com.lmsChat.finalProjectChat.global.exception.UserNotFoundException;
import com.lmsChat.finalProjectChat.chat.entity.ChatMessage;
import com.lmsChat.finalProjectChat.chat.entity.ChatGroup;
import com.lmsChat.finalProjectChat.chat.repository.ChatRoomRepository;
import com.lmsChat.finalProjectChat.chat.repository.ChatGroupRepository;
import com.lmsChat.finalProjectChat.chat.repository.ChatMessageRepository;
import com.lmsChat.finalProjectChat.user.entity.User;
import com.lmsChat.finalProjectChat.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRoomService {
    
    private final ChatRoomRepository chatRoomRepository;
    private final ChatGroupRepository chatGroupRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    
    /**
     * 사용자의 채팅방 목록 조회
     */
    public List<ChatRoomResponse> getChatRoomsByUserId(String userId) {
        log.info("사용자 {}의 채팅방 목록 조회", userId);
        
        // ChatGroup을 통해 사용자가 참여한 채팅방 ID 목록 조회
        List<String> chatRoomIds = chatGroupRepository.findChatRoomIdsByMemberId(userId);
        
        // 채팅방 정보 조회 (Native SQL 사용)
        List<ChatRoom> chatRooms = chatRoomRepository.findAllByChatRoomIds(chatRoomIds);
        
        // 각 채팅방의 마지막 메시지 조회
        Map<String, ChatMessage> lastMessages = chatRoomIds.stream()
                .collect(Collectors.toMap(
                    roomId -> roomId,
                    roomId -> chatMessageRepository.findFirstByChatRoomIdOrderByCreatedAtDesc(roomId).orElse(null)
                ));
        
        return chatRooms.stream()
                .map(chatRoom -> ChatRoomResponse.from(chatRoom, lastMessages.get(chatRoom.getChatRoomId())))
                .collect(Collectors.toList());
    }
    
    /**
     * 채팅방 생성 (새로운 API)
     */
    @Transactional
    public CreateRoomResponse.RoomDto createChatRoom(CreateRoomRequest request) {
        log.info("채팅방 생성 요청: {}", request);
        
        // 참여자 유효성 검사
        List<User> participants = userRepository.findByUserIdIn(request.getParticipantIds());
        if (participants.size() != request.getParticipantIds().size()) {
            throw new IllegalArgumentException("존재하지 않는 사용자가 포함되어 있습니다.");
        }
        
        // 채팅방 ID 생성
        String chatRoomId = "room_" + UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        
        // 채팅방 생성
        ChatRoom chatRoom = ChatRoom.builder()
                .chatRoomId(chatRoomId)
                .creatorId(participants.get(0).getUserId()) // 첫 번째 참여자를 생성자로 설정
                .chatRoomName(request.getName())
                .memberCount(participants.size())
                .createdAt(LocalDateTime.now())
                .build();
        
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
        
        // 채팅 그룹 생성 (참여자 추가)
        for (User participant : participants) {
            ChatGroup chatGroup = ChatGroup.builder()
                    .chatGroupId("group_" + UUID.randomUUID().toString().replace("-", "").substring(0, 8))
                    .memberId(participant.getUserId())
                    .chatRoomId(chatRoomId)
                    .createdAt(LocalDateTime.now())
                    .enteredAt(LocalDateTime.now())
                    .build();
            
            chatGroupRepository.save(chatGroup);
        }
        
        return CreateRoomResponse.RoomDto.from(savedChatRoom, participants);
    }
    
    /**
     * 채팅방 생성 (기존 메서드)
     */
    public ChatRoomResponse createChatRoom(String chatRoomId, String creatorId, String chatRoomName) {
        log.info("채팅방 생성: {}, 생성자: {}, 이름: {}", chatRoomId, creatorId, chatRoomName);
        
        ChatRoom chatRoom = ChatRoom.builder()
                .chatRoomId(chatRoomId)
                .creatorId(creatorId)
                .chatRoomName(chatRoomName)
                .memberCount(1) // 생성자 포함
                .build();
        
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
        return ChatRoomResponse.from(savedChatRoom, null); // 새로 생성된 채팅방이므로 마지막 메시지는 없음
    }
    
    /**
     * 채팅방 조회
     */
    public ChatRoom getChatRoomById(String chatRoomId) {
        return chatRoomRepository.findByChatRoomId(chatRoomId);
    }
    
    /**
     * 채팅방 메시지 목록 조회
     */
    public List<MessagesResponse.MessageDto> getChatRoomMessages(String roomId) {
        log.info("채팅방 {}의 메시지 목록 조회", roomId);
        
        // 채팅방 존재 여부 확인
        ChatRoom chatRoom = chatRoomRepository.findByChatRoomId(roomId);
        if (chatRoom == null) {
            throw new IllegalArgumentException("존재하지 않는 채팅방입니다.");
        }
        
        // 메시지 목록 조회 (최신순)
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomIdOrderByCreatedAtDesc(roomId);
        
        // 발신자 정보 조회
        List<String> senderIds = messages.stream()
                .map(ChatMessage::getSenderId)
                .distinct()
                .collect(Collectors.toList());
        
        Map<String, User> users = userRepository.findByUserIdIn(senderIds).stream()
                .collect(Collectors.toMap(User::getUserId, user -> user));
        
        // 메시지 DTO 변환
        return messages.stream()
                .map(message -> {
                    User sender = users.get(message.getSenderId());
                    return MessagesResponse.MessageDto.from(message, sender);
                })
                .collect(Collectors.toList());
    }
    
    /**
     * 메시지 전송
     */
    @Transactional
    public SendMessageResponse.MessageDto sendMessage(String roomId, String senderId, SendMessageRequest request) {
        log.info("채팅방 {}에서 사용자 {}가 메시지 전송", roomId, senderId);
        
        // 채팅방 존재 여부 확인
        ChatRoom chatRoom = chatRoomRepository.findByChatRoomId(roomId);
        if (chatRoom == null) {
            throw new IllegalArgumentException("존재하지 않는 채팅방입니다.");
        }
        
        // 발신자 존재 여부 확인
        User sender = userRepository.findByUserId(senderId);
        if (sender == null) {
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
        }
        
        // 채팅방 참여 여부 확인
        boolean isParticipant = chatGroupRepository.existsByChatRoomIdAndMemberId(roomId, senderId);
        if (!isParticipant) {
            throw new IllegalArgumentException("채팅방에 참여하지 않은 사용자입니다.");
        }
        
        // 메시지 ID 생성
        String messageId = "msg_" + UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        
        // 메시지 생성 및 저장
        ChatMessage message = ChatMessage.builder()
                .messageId(messageId)
                .senderId(senderId)
                .chatRoomId(roomId)
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .build();
        
        ChatMessage savedMessage = chatMessageRepository.save(message);
        
        return SendMessageResponse.MessageDto.from(savedMessage, sender);
    }
    
    /**
     * 테스트용 데이터 생성
     */
    public void createTestData(String userId) {
        // 테스트용 사용자 생성 (없는 경우)
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            user = User.builder()
                    .userId(userId)
                    .name("테스트 사용자 " + userId)
                    .email(userId + "@test.com")
                    .type(User.UserType.STUDENT)
                    .build();
            userRepository.save(user);
        }
        
        // 테스트용 선생님 사용자 생성
        User teacher = userRepository.findByUserId("teacher_001");
        if (teacher == null) {
            teacher = User.builder()
                    .userId("teacher_001")
                    .name("김선생님")
                    .email("teacher@test.com")
                    .type(User.UserType.TEACHER)
                    .build();
            userRepository.save(teacher);
        }
        
        // 테스트용 채팅방 생성
        ChatRoom chatRoom = ChatRoom.builder()
                .chatRoomId("room_001")
                .creatorId(userId)
                .chatRoomName("김선생님")
                .memberCount(2)
                .createdAt(java.time.LocalDateTime.now().minusHours(1))
                .build();
        
        chatRoomRepository.save(chatRoom);
        
        // 테스트용 메시지 생성
        ChatMessage message = ChatMessage.builder()
                .messageId("msg_001")
                .senderId("teacher_001")
                .chatRoomId("room_001")
                .content("좋습니다! 그럼 15분 후에...")
                .createdAt(java.time.LocalDateTime.now().minusMinutes(30))
                .build();
        
        chatMessageRepository.save(message);
        
        // 테스트용 채팅 그룹 생성
        ChatGroup chatGroup = ChatGroup.builder()
                .chatGroupId("group_001")
                .memberId(userId)
                .chatRoomId("room_001")
                .createdAt(java.time.LocalDateTime.now().minusHours(1))
                .enteredAt(java.time.LocalDateTime.now().minusHours(1))
                .build();
        
        chatGroupRepository.save(chatGroup);
    }
} 