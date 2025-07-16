"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageLayout from "@/components/ui/page-layout"

import { useStompChatRoom } from "@/hooks/useStompSocket.jsx"
import { chatService } from "@/lib/chatService.jsx"

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState("")
  const [activeChat, setActiveChat] = useState("")
  const [activeRoomId, setActiveRoomId] = useState("")
  const messagesEndRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searchType, setSearchType] = useState("student") // "student" or "teacher"
  const [selectedMembers, setSelectedMembers] = useState([])

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [chatRoomName, setChatRoomName] = useState("")

  const [chatList, setChatList] = useState([])
  const [loading, setLoading] = useState(true)

  // STOMP WebSocket 훅 사용
  const currentUserId = "current_user"
  const currentUserName = "나"
  const { 
    messages, 
    typingUsers, 
    onlineUsers, 
    sendMessage, 
    handleTyping, 
    isConnected 
  } = useStompChatRoom(activeRoomId, currentUserId, currentUserName)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 채팅방 목록 가져오기
  const fetchChatRooms = async () => {
    try {
      setLoading(true)
      const result = await chatService.getChatRooms()
      
      if (result && result.success && result.data) {
        setChatList(result.data)
        // 첫 번째 채팅방을 기본으로 선택
        if (result.data.length > 0 && !activeChat) {
          setActiveChat(result.data[0].name)
          setActiveRoomId(result.data[0].id)
        }
      } else {
        console.warn('채팅방 목록을 가져올 수 없습니다:', result?.error || '알 수 없는 오류')
        setChatList([])
      }
    } catch (error) {
      console.error('채팅방 목록 가져오기 오류:', error)
      setChatList([])
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 채팅방 목록 가져오기
  useEffect(() => {
    fetchChatRooms()
  }, [])

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const result = await chatService.searchUsers(searchQuery, searchType)
        
        if (result && result.success && result.data && result.data.users) {
          setSearchResults(result.data.users)
        } else {
          console.warn('사용자 검색 결과를 가져올 수 없습니다:', result?.error || '알 수 없는 오류')
          setSearchResults([])
          // 사용자에게 알림 (선택사항)
          if (result?.error && result.error.includes('백엔드 서버')) {
            alert('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
          }
        }
      } catch (error) {
        console.error('사용자 검색 오류:', error)
        setSearchResults([])
      }
    } else {
      setSearchResults([])
    }
  }

  const handleAddMember = (user) => {
    if (!selectedMembers.find((member) => member.id === user.id)) {
      setSelectedMembers([...selectedMembers, user])
    }
  }

  const handleRemoveMember = (userId) => {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== userId))
  }

  const handleCreateChatRoom = () => {
    if (selectedMembers.length > 0) {
      setShowConfirmModal(true)
      // 기본 채팅방 이름 설정
      const memberNames = selectedMembers.map((member) => member.name).join(", ")
      setChatRoomName(memberNames.length > 30 ? `${memberNames.substring(0, 30)}...` : memberNames)
    }
  }

  const handleFinalCreateChatRoom = async () => {
    try {
      const participantIds = selectedMembers.map(member => member.id)
      
      const result = await chatService.createChatRoom(
        selectedMembers.length === 1 ? 'individual' : 'group',
        chatRoomName,
        participantIds
      )
      
      if (result.success) {
        // 새 채팅방을 chatList에 추가
        setChatList((prev) => [result.data, ...prev])
        
        // 새로 생성된 채팅방을 활성화
        setActiveChat(result.data.name)
        setActiveRoomId(result.data.id)

        console.log("채팅방 생성 완료:", result.data)
      } else {
        console.error('채팅방 생성 실패:', result.error)
      }
    } catch (error) {
      console.error('채팅방 생성 오류:', error)
    }

    setIsModalOpen(false)
    setShowConfirmModal(false)
    setSearchQuery("")
    setSearchResults([])
    setSelectedMembers([])
    setChatRoomName("")
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() && activeRoomId) {
      sendMessage(newMessage)
      setNewMessage("")
    }
  }

  const handleChatSelect = (chat) => {
    setActiveChat(chat.name)
    setActiveRoomId(chat.id)
  }

  return (
    <PageLayout currentPage="chat" userRole="admin">
      <main className="p-4 h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
            {/* 채팅 목록 */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ color: "#2C3E50" }}>메시지</CardTitle>
                  <Button
                    size="sm"
                    className="text-white"
                    style={{ backgroundColor: "#1ABC9C" }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    + 채팅방
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {loading ? (
                    <div className="p-4 text-center">
                      <p className="text-sm" style={{ color: "#95A5A6" }}>채팅방 목록을 불러오는 중...</p>
                    </div>
                  ) : !chatList || chatList.length === 0 ? (
                    <div className="p-4 text-center">
                      <p className="text-sm" style={{ color: "#95A5A6" }}>채팅방이 없습니다.</p>
                    </div>
                  ) : (
                    chatList.map((chat, index) => (
                      <div
                        key={chat.id || index}
                        className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
                          activeChat === chat.name ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleChatSelect(chat)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium text-sm" style={{ color: "#2C3E50" }}>
                                {chat.name}
                              </h4>
                              <span className="text-xs" style={{ color: "#95A5A6" }}>
                                {chat.time}
                              </span>
                            </div>
                            <p className="text-xs truncate" style={{ color: "#95A5A6" }}>
                              {chat.lastMessage}
                            </p>
                          </div>
                          {chat.unread > 0 && (
                            <span
                              className="ml-2 px-2 py-1 rounded-full text-xs text-white"
                              style={{ backgroundColor: "#1ABC9C" }}
                            >
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 채팅 화면 */}
            <Card className="lg:col-span-2 flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle style={{ color: "#2C3E50" }}>{activeChat || "채팅"}</CardTitle>
                    {onlineUsers.length > 0 && (
                      <p className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                        온라인 {onlineUsers.length}명
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
                    ></div>
                    <span className="text-sm" style={{ color: "#95A5A6" }}>
                      {isConnected ? "연결됨" : "연결 끊김"}
                    </span>
                  </div>
                </div>
              </CardHeader>

              {/* 메시지 영역 */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm" style={{ color: "#95A5A6" }}>
                        {activeChat ? "메시지를 입력해보세요!" : "채팅방을 선택해주세요."}
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md ${message.isMe ? "order-2" : "order-1"}`}>
                          {!message.isMe && message.sender && (
                            <p className="text-xs mb-1" style={{ color: "#95A5A6" }}>
                              {message.sender.name}
                            </p>
                          )}
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.type === 'system' 
                                ? 'bg-gray-200 text-center text-xs' 
                                : message.isMe 
                                  ? "text-white" 
                                  : "bg-gray-100"
                            }`}
                            style={{
                              backgroundColor: message.type === 'system' 
                                ? '#f8f9fa' 
                                : message.isMe 
                                  ? "#1ABC9C" 
                                  : "#f1f2f6",
                              color: message.type === 'system' 
                                ? '#6c757d' 
                                : message.isMe 
                                  ? "white" 
                                  : "#2C3E50",
                            }}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p
                            className={`text-xs mt-1 ${message.isMe ? "text-right" : "text-left"}`}
                            style={{ color: "#95A5A6" }}
                          >
                            {new Date(message.time).toLocaleTimeString('ko-KR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {/* 타이핑 표시 */}
                  {typingUsers.length > 0 && (
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <p className="text-xs mb-1" style={{ color: "#95A5A6" }}>
                          {typingUsers.map(user => user.userName).join(', ')}님이 입력 중...
                        </p>
                        <div className="px-4 py-2 rounded-lg bg-gray-100">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* 메시지 입력 영역 */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Button type="button" variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" style={{ color: "#95A5A6" }} />
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <Smile className="w-4 h-4" style={{ color: "#95A5A6" }} />
                  </Button>
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value)
                      handleTyping()
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                    className="flex-1"
                    disabled={!activeRoomId}
                  />
                  <Button type="submit" size="sm" className="text-white" style={{ backgroundColor: "#1ABC9C" }}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>

            {/* 온라인 사용자 목록 */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>온라인 사용자</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {onlineUsers.length === 0 ? (
                    <div className="p-4 text-center">
                      <p className="text-sm" style={{ color: "#95A5A6" }}>온라인 사용자가 없습니다.</p>
                    </div>
                  ) : (
                    onlineUsers.map((user) => (
                      <div
                        key={user.userId}
                        className="p-3 border-b"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              {user.userName}
                            </p>
                            <p className="text-xs" style={{ color: "#95A5A6" }}>
                              {new Date(user.joinedAt).toLocaleTimeString('ko-KR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}에 참여
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 채팅방 만들기 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ color: "#2C3E50" }}>새 채팅방 만들기</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)} style={{ color: "#95A5A6" }}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    검색 대상
                  </label>
                  <div className="flex space-x-2">
                    <Button
                      variant={searchType === "student" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("student")}
                      className={searchType === "student" ? "text-white" : ""}
                      style={{
                        backgroundColor: searchType === "student" ? "#1ABC9C" : "transparent",
                        borderColor: "#1ABC9C",
                        color: searchType === "student" ? "white" : "#1ABC9C",
                      }}
                    >
                      학생
                    </Button>
                    <Button
                      variant={searchType === "teacher" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("teacher")}
                      className={searchType === "teacher" ? "text-white" : ""}
                      style={{
                        backgroundColor: searchType === "teacher" ? "#1ABC9C" : "transparent",
                        borderColor: "#1ABC9C",
                        color: searchType === "teacher" ? "white" : "#1ABC9C",
                      }}
                    >
                      교직원
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    {searchType === "student" ? "학번 또는 이름" : "교번 또는 이름"}
                  </label>
                  <p className="text-xs" style={{ color: "#95A5A6" }}>
                    {searchType === "student"
                      ? "테스트: 20240001, 김학생, 박민수, 최지영 등"
                      : "테스트: T001, 박교수, 김원장, 이선생 등"}
                  </p>
                  <div className="flex space-x-2">
                    <Input
                      placeholder={searchType === "student" ? "학번 또는 학생 이름 입력" : "교번 또는 교직원 이름 입력"}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSearch}
                      size="sm"
                      className="text-white"
                      style={{ backgroundColor: "#1ABC9C" }}
                    >
                      검색
                    </Button>
                  </div>
                </div>

                {/* 검색 결과 */}
                {searchResults.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                      검색 결과
                    </label>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {searchResults.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
                        >
                          <div>
                            <p className="font-medium text-sm" style={{ color: "#2C3E50" }}>
                              {user.name}
                            </p>
                            <p className="text-xs" style={{ color: "#95A5A6" }}>
                              {user.id} • {user.department}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                            onClick={() => handleAddMember(user)}
                          >
                            추가
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm" style={{ color: "#95A5A6" }}>
                      검색 결과가 없습니다.
                    </p>
                  </div>
                )}

                {/* 추가된 멤버 섹션 */}
                {selectedMembers.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                      추가된 멤버 ({selectedMembers.length}명)
                    </label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {selectedMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-2 border rounded bg-gray-50"
                        >
                          <div>
                            <p className="font-medium text-sm" style={{ color: "#2C3E50" }}>
                              {member.name}
                            </p>
                            <p className="text-xs" style={{ color: "#95A5A6" }}>
                              {member.id} • {member.department}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            제거
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full text-white font-medium"
                      style={{ backgroundColor: "#1ABC9C" }}
                      onClick={handleCreateChatRoom}
                    >
                      채팅방 만들기 ({selectedMembers.length}명)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 채팅방 생성 확인 모달 */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ color: "#2C3E50" }}>채팅방 생성 확인</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmModal(false)}
                    style={{ color: "#95A5A6" }}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    채팅방 이름
                  </label>
                  <Input
                    placeholder="채팅방 이름을 입력하세요"
                    value={chatRoomName}
                    onChange={(e) => setChatRoomName(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    참여 멤버 ({selectedMembers.length}명)
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-1 p-2 border rounded bg-gray-50">
                    {selectedMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2 p-1">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-medium"
                          style={{ backgroundColor: "#1ABC9C" }}
                        >
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                            {member.name}
                          </p>
                          <p className="text-xs" style={{ color: "#95A5A6" }}>
                            {member.id} • {member.department}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowConfirmModal(false)}
                    style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                  >
                    취소
                  </Button>
                  <Button
                    className="flex-1 text-white font-medium"
                    style={{ backgroundColor: "#1ABC9C" }}
                    onClick={handleFinalCreateChatRoom}
                    disabled={!chatRoomName.trim()}
                  >
                    채팅방 생성
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </PageLayout>
  )
}
