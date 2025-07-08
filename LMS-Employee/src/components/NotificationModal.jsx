"use client"
import { useEffect } from "react"
import "../styles/NotificationModal.css"

const NotificationModal = ({ onClose, onNotificationClick }) => {
  // 모달 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("notification-modal-overlay")) {
        onClose()
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [onClose])

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [onClose])

  // 샘플 알림 데이터
  const notifications = [
    {
      id: 1,
      title: "새로운 과제가 등록되었습니다",
      message: "React 기초 과제가 등록되었습니다. 마감일: 2024-01-20",
      time: "5분 전",
      type: "assignment",
      menu: "과제",
      subMenu: "과제 관리",
      isRead: false,
    },
    {
      id: 2,
      title: "출석 체크 알림",
      message: "오늘 출석을 체크해주세요.",
      time: "1시간 전",
      type: "attendance",
      menu: "출석",
      subMenu: "출석 현황",
      isRead: false,
    },
    {
      id: 3,
      title: "새로운 공지사항",
      message: "2024년 1월 교육 일정이 공지되었습니다.",
      time: "2시간 전",
      type: "notice",
      menu: "학적부",
      subMenu: "학생 목록",
      isRead: true,
    },
    {
      id: 4,
      title: "시험 일정 안내",
      message: "중간고사 일정이 확정되었습니다.",
      time: "1일 전",
      type: "exam",
      menu: "시험",
      subMenu: "시험 관리",
      isRead: true,
    },
  ]

  const handleNotificationClick = (notification) => {
    onNotificationClick(notification.menu, notification.subMenu)
  }

  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal">
        <div className="notification-header">
          <h3>알림</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.isRead ? "unread" : ""}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-content">
                <div className="notification-title">
                  {notification.title}
                  {!notification.isRead && <span className="unread-dot"></span>}
                </div>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-time">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="notification-footer">
          <button className="mark-all-read-btn">모든 알림 읽음 처리</button>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal
