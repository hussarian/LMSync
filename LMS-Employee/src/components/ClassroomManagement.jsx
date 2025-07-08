"use client"
import { useState } from "react"
import ClassroomList from "./ClassroomList"
import ClassroomRegistration from "./ClassroomRegistration"
import "../styles/ClassroomManagement.css"

const ClassroomManagement = ({ activeSubMenu }) => {
  const [classrooms, setClassrooms] = useState([
    {
      id: 1,
      roomNumber: "101",
      name: "웹개발 실습실",
      capacity: 30,
      isActive: true,
      currentCourse: "React 기초 과정",
      availableHours: "09:00 - 18:00",
      equipment: [
        { name: "컴퓨터", quantity: 30, description: "Intel i5, 8GB RAM, SSD 256GB" },
        { name: "프로젝터", quantity: 1, description: "4K 해상도 지원" },
        { name: "화이트보드", quantity: 2, description: "대형 자석 화이트보드" },
        { name: "에어컨", quantity: 2, description: "냉난방 시스템" },
      ],
      features: ["WiFi", "전자칠판", "음향시설"],
      location: "1층",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
    },
    {
      id: 2,
      roomNumber: "102",
      name: "데이터분석 실습실",
      capacity: 25,
      isActive: true,
      currentCourse: "Python 데이터분석",
      availableHours: "09:00 - 17:00",
      equipment: [
        { name: "컴퓨터", quantity: 25, description: "Intel i7, 16GB RAM, SSD 512GB" },
        { name: "듀얼모니터", quantity: 25, description: "27인치 듀얼 모니터 세트" },
        { name: "프로젝터", quantity: 1, description: "4K 해상도 지원" },
        { name: "서버", quantity: 1, description: "데이터 처리용 고성능 서버" },
      ],
      features: ["WiFi", "고성능 네트워크", "데이터베이스 서버"],
      location: "1층",
      createdAt: "2024-01-16",
      lastUpdated: "2024-01-22",
    },
    {
      id: 3,
      roomNumber: "201",
      name: "이론 강의실",
      capacity: 50,
      isActive: true,
      currentCourse: null,
      availableHours: "09:00 - 21:00",
      equipment: [
        { name: "의자", quantity: 50, description: "학습용 의자" },
        { name: "책상", quantity: 25, description: "2인용 책상" },
        { name: "프로젝터", quantity: 1, description: "4K 해상도 지원" },
        { name: "스크린", quantity: 1, description: "전동 스크린" },
        { name: "마이크", quantity: 2, description: "무선 마이크" },
      ],
      features: ["WiFi", "음향시설", "조명제어"],
      location: "2층",
      createdAt: "2024-01-17",
      lastUpdated: "2024-01-18",
    },
    {
      id: 4,
      roomNumber: "202",
      name: "세미나실",
      capacity: 20,
      isActive: false,
      currentCourse: null,
      availableHours: "점검 중",
      equipment: [
        { name: "회의용 테이블", quantity: 1, description: "대형 원형 테이블" },
        { name: "의자", quantity: 20, description: "회의용 의자" },
        { name: "TV", quantity: 1, description: "65인치 스마트 TV" },
        { name: "화이트보드", quantity: 1, description: "이동식 화이트보드" },
      ],
      features: ["WiFi", "화상회의 시설"],
      location: "2층",
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-25",
    },
  ])

  const renderContent = () => {
    switch (activeSubMenu) {
      case "강의실 목록":
        return <ClassroomList classrooms={classrooms} setClassrooms={setClassrooms} />
      case "강의실 등록":
        return <ClassroomRegistration classrooms={classrooms} setClassrooms={setClassrooms} />
      default:
        return (
          <div className="classroom-overview">
            <h2>강의실 관리</h2>
            <p>좌측 사이드바에서 메뉴를 선택해주세요.</p>
            <div className="classroom-stats">
              <div className="stat-card">
                <h3>전체 강의실</h3>
                <p>{classrooms.length}개</p>
              </div>
              <div className="stat-card">
                <h3>활성 강의실</h3>
                <p>{classrooms.filter((c) => c.isActive).length}개</p>
              </div>
              <div className="stat-card">
                <h3>사용 중인 강의실</h3>
                <p>{classrooms.filter((c) => c.currentCourse).length}개</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return <div className="classroom-management">{renderContent()}</div>
}

export default ClassroomManagement
