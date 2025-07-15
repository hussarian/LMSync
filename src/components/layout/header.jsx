"use client"

import Link from "next/link"
import { Bell, MessageSquare, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Header({ currentPage = "", userRole = "student", userName = "사용자" }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "새로운 학생이 등록되었습니다",
      message: "김철수 학생이 JavaScript 기초 과정에 등록했습니다.",
      time: "5분 전",
      isRead: false,
      type: "student",
    },
    {
      id: 2,
      title: "시험 결과가 업데이트되었습니다",
      message: "React 심화 과정의 중간고사 결과가 업로드되었습니다.",
      time: "1시간 전",
      isRead: false,
      type: "exam",
    },
    {
      id: 3,
      title: "강의실 예약 확인",
      message: "A101 강의실이 내일 오전 9시에 예약되었습니다.",
      time: "3시간 전",
      isRead: true,
      type: "room",
    },
    {
      id: 4,
      title: "설문 평가 완료",
      message: "Python 기초 과정의 설문 평가가 완료되었습니다.",
      time: "1일 전",
      isRead: true,
      type: "survey",
    },
  ])
  const notificationRef = useRef(null)

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "student":
        return "👨‍🎓"
      case "exam":
        return "📝"
      case "room":
        return "🏫"
      case "survey":
        return "📊"
      default:
        return "🔔"
    }
  }

  const handleLogout = () => {
    // 로그아웃 로직
    window.location.href = "/"
  }

  const handleProfile = () => {
    // 내 정보 보기 로직
    console.log("내 정보 보기")
    setIsDropdownOpen(false)
  }

  // 권한별 메뉴 구성
  const navItems =
    userRole === "admin"
      ? [{ href: "/institution/register", label: "기관 추가", key: "institution" }]
      : userRole === "director" || userRole === "staff"
        ? [
            { href: "/account", label: "계정 등록", key: "account" },
            { href: "/academic", label: "학적부", key: "academic" },
            // "과정 관리" 메뉴의 href를 "/courses/list"로 변경하여 기본값을 "과정 리스트"로 설정
            { href: "/courses/list", label: "과정 관리", key: "courses" },
            { href: "/attendance", label: "강의실 관리", key: "attendance" },
            { href: "/survey", label: "설문 평가 관리", key: "survey" },
            { href: "/exam", label: "시험 및 성적", key: "exam" },
            { href: "/permission", label: "권한 관리", key: "permission" },
          ]
        : userRole === "instructor"
          ? [
              { href: "/instructor/courses", label: "과정 관리", key: "courses" },
              { href: "/instructor/academic", label: "학적부", key: "academic" },
              { href: "/instructor/exam", label: "시험 및 성적", key: "exam" },
              { href: "/instructor/question-bank/all", label: "문제 은행", key: "question-bank" },
              { href: "/instructor/survey/lectures", label: "설문 평가", key: "survey" },
            ]
          : userRole === "student"
            ? [
                { href: "/student/my-courses", label: "출결", key: "my-courses" },
                { href: "/student/syllabus", label: "강의 계획서", key: "syllabus" },
                { href: "/student/assignments", label: "과제", key: "my-assignment" },
                { href: "/student/exams", label: "시험 및 성적", key: "my-exam" },
              ]
            : []

  // 과정 관리 페이지 생성을 위한 참고용 사이드바 메뉴 구조
  const coursesSidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/subjects/detail", label: "세부 과목 등록", key: "subject-detail" },
  ]

  // 사용자 권한 표시 텍스트도 변경:
  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "관리자권한"
      case "director":
        return "학원장권한"
      case "staff":
        return "일반직원권한"
      case "instructor":
        return "강사권한"
      case "student":
        return "학생권한"
      default:
        return "권한"
    }
  }

  return (
    <header className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "#2C3E50" }}>
      <div className="flex items-center space-x-8">
        <Link href="/dashboard" className="text-xl font-bold" style={{ color: "#1ABC9C" }}>
          LMSync
        </Link>
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-white hover:opacity-80 ${currentPage === item.key ? "px-3 py-1 rounded" : ""}`}
              style={{
                backgroundColor: currentPage === item.key ? "#1ABC9C" : "transparent",
                color: currentPage === item.key ? "white" : "#1ABC9C",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationRef}>
          <div className="relative cursor-pointer hover:opacity-80" onClick={handleNotificationClick}>
            <Bell className="w-5 h-5 text-white" />
            {notifications.filter((n) => !n.isRead).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.filter((n) => !n.isRead).length}
              </span>
            )}
          </div>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">알림</h3>
                  <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:text-blue-800">
                    모두 읽음
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">새로운 알림이 없습니다.</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.isRead ? "bg-blue-50" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-lg">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p
                              className={`text-sm font-medium text-gray-900 ${
                                !notification.isRead ? "font-semibold" : ""
                              }`}
                            >
                              {notification.title}
                            </p>
                            {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1"></div>}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t bg-gray-50 rounded-b-lg">
                <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">모든 알림 보기</button>
              </div>
            </div>
          )}
        </div>
        <Link href="/chat">
          <MessageSquare className="w-5 h-5 text-white cursor-pointer hover:opacity-80" />
        </Link>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 px-2 py-1 rounded"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User className="w-5 h-5 text-white" />
            <span className="text-white text-sm">{userName}</span>
            {/* 사용자 권한 표시 부분을 다음과 같이 변경: */}
            <span className="text-white text-xs opacity-70">{getRoleText(userRole)}</span>
          </div>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50"
              style={{ backgroundColor: "white" }}
            >
              <div className="py-1">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  style={{ color: "#2C3E50" }}
                >
                  내 정보 보기
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  style={{ color: "#2C3E50" }}
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
