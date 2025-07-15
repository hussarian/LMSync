"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Users, Clock, BookOpen, MapPin } from "lucide-react"
import Link from "next/link"

export default function InstructorLecturesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // 사이드바 메뉴 구성
  const sidebarItems = [
    { href: "/instructor/courses/lectures", label: "담당 강의", key: "lectures" },
    { href: "/instructor/courses/assignments", label: "과제 리스트", key: "assignments" }, 
  ]

  // 강사가 담당한 모든 강의 데이터 (과거~현재)
  const [lectures] = useState([
    {
      id: 1,
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "변수와 데이터 타입",
      lectureNumber: 1,
      date: "2024.02.15",
      time: "09:00 - 11:00",
      classroom: "A101",
      students: 25,
      attendees: 23,
      status: "완료",
      period: "2024년 1학기",
      materials: ["강의자료.pdf", "실습파일.zip"],
      homework: "변수 선언 연습문제",
      notes: "학생들의 이해도가 높았음",
    },
    {
      id: 2,
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "조건문과 반복문",
      lectureNumber: 2,
      date: "2024.02.17",
      time: "09:00 - 11:00",
      classroom: "A101",
      students: 25,
      attendees: 24,
      status: "완료",
      period: "2024년 1학기",
      materials: ["조건문_강의자료.pdf", "반복문_예제.js"],
      homework: "조건문 실습과제",
      notes: "반복문 부분에서 질문이 많았음",
    },
    {
      id: 3,
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "함수와 스코프",
      lectureNumber: 3,
      date: "2024.02.19",
      time: "09:00 - 11:00",
      classroom: "A101",
      students: 25,
      attendees: null,
      status: "예정",
      period: "2024년 1학기",
      materials: ["함수_강의자료.pdf"],
      homework: null,
      notes: null,
    },
    {
      id: 4,
      courseName: "React 심화",
      courseCode: "REACT201",
      lectureTitle: "컴포넌트 설계 패턴",
      lectureNumber: 1,
      date: "2024.02.16",
      time: "14:00 - 17:00",
      classroom: "B203",
      students: 18,
      attendees: 17,
      status: "완료",
      period: "2024년 1학기",
      materials: ["React_패턴.pdf", "예제코드.zip"],
      homework: "컴포넌트 리팩토링",
      notes: "고급 패턴에 대한 추가 설명 필요",
    },
    {
      id: 5,
      courseName: "Python 기초",
      courseCode: "PY101",
      lectureTitle: "파이썬 기초 문법",
      lectureNumber: 8,
      date: "2024.01.25",
      time: "10:00 - 12:00",
      classroom: "C105",
      students: 22,
      attendees: 20,
      status: "완료",
      period: "2023년 2학기",
      materials: ["Python_기초.pdf"],
      homework: "기초 문법 연습",
      notes: "과정 완료",
    },
    {
      id: 6,
      courseName: "웹 개발 입문",
      courseCode: "WEB101",
      lectureTitle: "HTML/CSS 기초",
      lectureNumber: 1,
      date: "2023.09.05",
      time: "13:00 - 16:00",
      classroom: "D201",
      students: 30,
      attendees: 28,
      status: "완료",
      period: "2023년 2학기",
      materials: ["HTML_CSS_기초.pdf", "실습예제.html"],
      homework: "개인 웹페이지 제작",
      notes: "첫 강의, 학생들의 참여도 높음",
    },
  ])

  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch =
      lecture.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.lectureTitle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPeriod = selectedPeriod === "all" || lecture.period === selectedPeriod
    const matchesStatus = selectedStatus === "all" || lecture.status === selectedStatus

    return matchesSearch && matchesPeriod && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "완료":
        return "bg-green-100 text-green-800"
      case "예정":
        return "bg-blue-100 text-blue-800"
      case "진행중":
        return "bg-yellow-100 text-yellow-800"
      case "취소":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAttendanceRate = (attendees, students) => {
    if (attendees === null) return null
    return Math.round((attendees / students) * 100)
  }

  // 통계 계산
  const totalLectures = lectures.length
  const completedLectures = lectures.filter((l) => l.status === "완료").length
  const upcomingLectures = lectures.filter((l) => l.status === "예정").length
  const averageAttendance =
    lectures
      .filter((l) => l.attendees !== null)
      .reduce((sum, l) => sum + getAttendanceRate(l.attendees, l.students), 0) /
    lectures.filter((l) => l.attendees !== null).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="courses" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarItems} currentPath="/instructor/courses/lectures" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                담당 강의 목록
              </h1>
              <p className="text-gray-600">과거부터 현재까지 담당하신 모든 강의를 확인하세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 강의 수</p>
                    <p className="text-2xl font-bold" style={{ color: "#3498db" }}>
                      {totalLectures}회
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8" style={{ color: "#3498db" }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">완료된 강의</p>
                    <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                      {completedLectures}회
                    </p>
                  </div>
                  <Clock className="w-8 h-8" style={{ color: "#2ecc71" }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">예정된 강의</p>
                    <p className="text-2xl font-bold" style={{ color: "#f39c12" }}>
                      {upcomingLectures}회
                    </p>
                  </div>
                  <Calendar className="w-8 h-8" style={{ color: "#f39c12" }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">평균 출석률</p>
                    <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                      {Math.round(averageAttendance)}%
                    </p>
                  </div>
                  <Users className="w-8 h-8" style={{ color: "#9b59b6" }} />
                </div>
              </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="과정명, 과정코드, 강의명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">전체 학기</option>
                  <option value="2024년 1학기">2024년 1학기</option>
                  <option value="2023년 2학기">2023년 2학기</option>
                  <option value="2023년 1학기">2023년 1학기</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">전체 상태</option>
                  <option value="완료">완료</option>
                  <option value="예정">예정</option>
                  <option value="진행중">진행중</option>
                </select>
              </div>
            </div>

            {/* 강의 목록 */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        강의 정보
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        일시/장소
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        출석 현황
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        강의 자료
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        과제
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLectures.map((lecture) => (
                      <tr key={lecture.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lecture.lectureTitle}</div>
                            <div className="text-sm text-gray-500">
                              {lecture.courseName} ({lecture.courseCode})
                            </div>
                            <div className="text-sm text-gray-500">
                              {lecture.lectureNumber}차시 | {lecture.period}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center mb-1">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{lecture.date}</span>
                          </div>
                          <div className="flex items-center mb-1">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{lecture.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{lecture.classroom}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lecture.attendees !== null ? (
                            <div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-sm text-gray-900">
                                  {lecture.attendees}/{lecture.students}명
                                </span>
                              </div>
                              <div className="text-sm text-gray-500">
                                출석률: {getAttendanceRate(lecture.attendees, lecture.students)}%
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">미진행</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            {lecture.materials.map((material, index) => (
                              <div
                                key={index}
                                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer mb-1"
                              >
                                📎 {material}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lecture.homework ? (
                            <div className="text-sm text-gray-900">{lecture.homework}</div>
                          ) : (
                            <span className="text-sm text-gray-500">없음</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lecture.status)}`}
                          >
                            {lecture.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link href={`/instructor/courses/lectures/${lecture.id}`}>
                              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                상세보기
                              </Button>
                            </Link>
                            {lecture.status === "예정" && (
                              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                수정
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 강의 노트 섹션 */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                최근 강의 노트
              </h3>
              <div className="space-y-4">
                {lectures
                  .filter((l) => l.notes && l.status === "완료")
                  .slice(0, 3)
                  .map((lecture) => (
                    <div key={lecture.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{lecture.lectureTitle}</h4>
                          <p className="text-sm text-gray-600">
                            {lecture.courseName} | {lecture.date}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">{lecture.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 안내사항 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">강의 관리 안내</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 강의 완료 후에는 출석 체크와 강의 노트를 작성해주세요.</li>
                <li>• 강의 자료는 사전에 업로드하여 학생들이 미리 확인할 수 있도록 해주세요.</li>
                <li>• 과제가 있는 경우 마감일을 명확히 공지해주세요.</li>
                <li>• 예정된 강의는 수정이 가능하며, 변경사항은 즉시 학생들에게 알림이 발송됩니다.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
