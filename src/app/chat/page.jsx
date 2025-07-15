"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageLayout from "@/components/ui/page-layout"

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState("")
  const [activeChat, setActiveChat] = useState("김선생님")
  const messagesEndRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searchType, setSearchType] = useState("student") // "student" or "teacher"
  const [selectedMembers, setSelectedMembers] = useState([])

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [chatRoomName, setChatRoomName] = useState("")

  const [chatList, setChatList] = useState([
    { name: "김선생님", lastMessage: "좋습니다! 그럼 15분 후에...", time: "14:33", unread: 0 },
    { name: "박원장님", lastMessage: "내일 회의 시간 확인 부탁드립니다.", time: "13:45", unread: 2 },
    { name: "이강사님", lastMessage: "수업 자료 공유드렸습니다.", time: "12:20", unread: 1 },
    { name: "전체 공지", lastMessage: "다음 주 휴무 안내", time: "11:30", unread: 0 },
  ])

  const dummyUsers = [
    // 학생 데이터
    { id: "20240001", name: "김학생", type: "student", department: "컴퓨터공학과" },
    { id: "20240002", name: "이학생", type: "student", department: "경영학과" },
    { id: "20240003", name: "박민수", type: "student", department: "전자공학과" },
    { id: "20240004", name: "최지영", type: "student", department: "디자인학과" },
    { id: "20240005", name: "정수현", type: "student", department: "영어영문학과" },
    { id: "20240006", name: "한소영", type: "student", department: "수학과" },
    { id: "20240007", name: "윤태호", type: "student", department: "물리학과" },
    { id: "20240008", name: "강미래", type: "student", department: "화학과" },

    // 교직원 데이터
    { id: "T001", name: "박교수", type: "teacher", department: "수학과" },
    { id: "T002", name: "최강사", type: "teacher", department: "영어과" },
    { id: "T003", name: "김원장", type: "teacher", department: "행정부" },
    { id: "T004", name: "이선생", type: "teacher", department: "컴퓨터공학과" },
    { id: "T005", name: "정교수", type: "teacher", department: "경영학과" },
    { id: "T006", name: "한부장", type: "teacher", department: "학생부" },
    { id: "T007", name: "윤강사", type: "teacher", department: "디자인학과" },
    { id: "T008", name: "송교수", type: "teacher", department: "전자공학과" },
  ]

  const [allMessages, setAllMessages] = useState({
    김선생님: [
      {
        id: 1,
        sender: "김선생님",
        content: "안녕하세요! 오늘 수업 준비는 어떻게 되고 있나요?",
        time: "14:30",
        isMe: false,
      },
      {
        id: 2,
        sender: "나",
        content: "네, 준비 완료했습니다. 학생들 출석 확인도 마쳤어요.",
        time: "14:32",
        isMe: true,
      },
      {
        id: 3,
        sender: "김선생님",
        content: "좋습니다! 그럼 15분 후에 시작하겠습니다.",
        time: "14:33",
        isMe: false,
      },
    ],
  })

  // messages 변수를 현재 활성 채팅의 메시지로 설정
  const messages = allMessages[activeChat] || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = dummyUsers.filter((user) => {
        const matchesId = user.id.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesName = user.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = searchType === "all" || user.type === searchType
        return (matchesId || matchesName) && matchesType
      })
      setSearchResults(filtered)
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

  const handleFinalCreateChatRoom = () => {
    // 새 채팅방을 chatList에 추가
    const newChatRoom = {
      name: chatRoomName,
      lastMessage: "채팅방이 생성되었습니다.",
      time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      unread: 0,
      members: selectedMembers,
    }

    // chatList 상태를 업데이트하기 위해 setChatList 함수 추가 필요
    setChatList((prev) => [newChatRoom, ...prev])

    // 새로 생성된 채팅방을 활성화
    setActiveChat(chatRoomName)

    console.log("최종 채팅방 생성:", {
      name: chatRoomName,
      members: selectedMembers,
    })

    setIsModalOpen(false)
    setShowConfirmModal(false)
    setSearchQuery("")
    setSearchResults([])
    setSelectedMembers([])
    setChatRoomName("")
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: "나",
        content: newMessage,
        time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }

      setAllMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMsg],
      }))

      setNewMessage("")
    }
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
                  {chatList.map((chat, index) => (
                    <div
                      key={index}
                      className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
                        activeChat === chat.name ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setActiveChat(chat.name)}
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
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 채팅 화면 */}
            <Card className="lg:col-span-3 flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle style={{ color: "#2C3E50" }}>{activeChat}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1ABC9C" }}></div>
                    <span className="text-sm" style={{ color: "#95A5A6" }}>
                      온라인
                    </span>
                  </div>
                </div>
              </CardHeader>

              {/* 메시지 영역 */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs lg:max-w-md ${message.isMe ? "order-2" : "order-1"}`}>
                        {!message.isMe && (
                          <p className="text-xs mb-1" style={{ color: "#95A5A6" }}>
                            {message.sender}
                          </p>
                        )}
                        <div
                          className={`px-4 py-2 rounded-lg ${message.isMe ? "text-white" : "bg-gray-100"}`}
                          style={{
                            backgroundColor: message.isMe ? "#1ABC9C" : "#f1f2f6",
                            color: message.isMe ? "white" : "#2C3E50",
                          }}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p
                          className={`text-xs mt-1 ${message.isMe ? "text-right" : "text-left"}`}
                          style={{ color: "#95A5A6" }}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
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
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" className="text-white" style={{ backgroundColor: "#1ABC9C" }}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>

        {/* 채팅방 만들기 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
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
            <Card className="w-full max-w-md mx-4">
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
