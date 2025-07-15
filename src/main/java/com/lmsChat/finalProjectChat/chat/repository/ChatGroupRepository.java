package com.lmsChat.finalProjectChat.chat.repository;

import com.lmsChat.finalProjectChat.chat.entity.ChatGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatGroupRepository extends JpaRepository<ChatGroup, String> {
    
    /**
     * 특정 사용자가 참여한 채팅방 목록 조회
     */
    @Query(value = "SELECT chatRoomId FROM chatgroup WHERE memberId = :memberId", nativeQuery = true)
    List<String> findChatRoomIdsByMemberId(@Param("memberId") String memberId);
    
    /**
     * 특정 채팅방의 참여자 목록 조회
     */
    List<ChatGroup> findByChatRoomId(String chatRoomId);
    
    /**
     * 특정 사용자가 특정 채팅방에 참여 중인지 확인
     */
    boolean existsByMemberIdAndChatRoomId(String memberId, String chatRoomId);
    
    /**
     * 특정 사용자의 채팅방 참여 정보 조회
     */
    ChatGroup findByMemberIdAndChatRoomId(String memberId, String chatRoomId);
    
    /**
     * 특정 채팅방에 특정 사용자가 참여 중인지 확인
     */
    boolean existsByChatRoomIdAndMemberId(String chatRoomId, String memberId);
} 