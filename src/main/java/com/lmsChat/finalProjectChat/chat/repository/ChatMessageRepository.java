package com.lmsChat.finalProjectChat.chat.repository;

import com.lmsChat.finalProjectChat.chat.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    
    /**
     * 특정 채팅방의 메시지 목록 조회 (최신순)
     */
    List<ChatMessage> findByChatRoomIdOrderByCreatedAtDesc(String chatRoomId);
    
    /**
     * 특정 채팅방의 최신 메시지 조회
     */
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatRoomId = :chatRoomId ORDER BY cm.createdAt DESC")
    List<ChatMessage> findLatestMessageByChatRoomId(@Param("chatRoomId") String chatRoomId);
    
    /**
     * 특정 채팅방의 마지막 메시지 조회
     */
    Optional<ChatMessage> findFirstByChatRoomIdOrderByCreatedAtDesc(String chatRoomId);
    
    /**
     * 특정 사용자가 보낸 메시지 목록 조회
     */
    List<ChatMessage> findBySenderIdOrderByCreatedAtDesc(String senderId);
    
    /**
     * 특정 채팅방의 메시지 개수 조회
     */
    long countByChatRoomId(String chatRoomId);
    
    /**
     * 특정 채팅방의 메시지 목록 조회 (최신순, 페이지네이션)
     */
    List<ChatMessage> findByChatRoomIdOrderByCreatedAtDesc(String chatRoomId, org.springframework.data.domain.Pageable pageable);
    
    /**
     * 특정 채팅방의 메시지 목록 조회 (최신순)
     */
    List<ChatMessage> findByChatRoomIdOrderByCreatedAtAsc(String chatRoomId);
} 