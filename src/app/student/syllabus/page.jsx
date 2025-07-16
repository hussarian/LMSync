"use client"

import { useState, useEffect } from "react"
import { Search, BookOpen, Calendar, Clock, User, MapPin, FileText, Download, Eye } from "lucide-react"
import Header from "@/components/layout/header"
import { Button } from "@/components/ui/button"

export default function StudentSyllabusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // 샘플 강의계획서 데이터
  const [syllabusData, setSyllabusData] = useState([
    {
      id: 1,
      courseCode: "CS101",
      courseName: "JavaScript 기초",
      instructor: "김강사",
      semester: "2024-1",
      credits: 3,
      schedule: "월, 수 09:00-10:30",
      classroom: "A101",
      status: "진행중",
      enrollmentDate: "2024-03-02",
      syllabus: {
        objectives: [
          "JavaScript의 기본 문법과 개념을 이해한다",
          "DOM 조작과 이벤트 처리를 학습한다",
          "비동기 프로그래밍의 기초를 익힌다",
        ],
        textbook: "모던 JavaScript 튜토리얼",
        evaluation: {
          attendance: 20,
          assignment: 30,
          midterm: 25,
          final: 25,
        },
        schedule: [
          { week: 1, topic: "JavaScript 소개 및 기본 문법", content: "변수, 데이터 타입, 연산자" },
          { week: 2, topic: "제어문과 함수", content: "조건문, 반복문, 함수 선언과 호출" },
          { week: 3, topic: "객체와 배열", content: "객체 생성, 배열 메서드, 구조 분해" },
          { week: 4, topic: "DOM 조작", content: "요소 선택, 스타일 변경, 이벤트 리스너" },
          { week: 5, topic: "이벤트 처리", content: "이벤트 객체, 이벤트 위임, 폼 처리" },
          { week: 6, topic: "비동기 프로그래밍", content: "콜백, Promise, async/await" },
          { week: 7, topic: "중간고사", content: "1-6주차 내용 평가" },
          { week: 8, topic: "Ajax와 Fetch API", content: "서버 통신, JSON 처리" },
        ],
      },
    },
    {
      id: 2,
      courseCode: "CS201",
      courseName: "React 심화",
      instructor: "이강사",
      semester: "2024-1",
      credits: 3,
      schedule: "화, 목 14:00-15:30",
      classroom: "B203",
      status: "진행중",
      enrollmentDate: "2024-03-02",
      syllabus: {
        objectives: [
          "React의 고급 개념과 패턴을 학습한다",
          "상태 관리 라이브러리 사용법을 익힌다",
          "실제 프로젝트를 통해 실무 경험을 쌓는다",
        ],
        textbook: "리액트를 다루는 기술",
        evaluation: {
          attendance: 15,
          assignment: 35,
          project: 30,
          final: 20,
        },
        schedule: [
          { week: 1, topic: "React 고급 개념", content: "Hooks, Context API, 성능 최적화" },
          { week: 2, topic: "상태 관리", content: "Redux, Zustand, 상태 설계 패턴" },
          { week: 3, topic: "라우팅", content: "React Router, 동적 라우팅" },
          { week: 4, topic: "스타일링", content: "CSS-in-JS, Styled Components" },
          { week: 5, topic: "테스팅", content: "Jest, React Testing Library" },
          { week: 6, topic: "프로젝트 기획", content: "요구사항 분석, 설계" },
          { week: 7, topic: "프로젝트 개발", content: "개발 진행, 코드 리뷰" },
          { week: 8, topic: "프로젝트 발표", content: "최종 발표 및 평가" },
        ],
      },
    },
    {
      id: 3,
      courseCode: "CS301",
      courseName: "Node.js 백엔드",
      instructor: "박강사",
      semester: "2024-1",
      credits: 3,
      schedule: "금 09:00-12:00",
      classroom: "C105",
      status: "완료",
      enrollmentDate: "2024-03-02",
      syllabus: {
        objectives: [
          "Node.js 환경에서 서버 개발을 학습한다",
          "데이터베이스 연동과 API 설계를 익힌다",
          "보안과 배포에 대한 이해를 높인다",
        ],
        textbook: "Node.js 교과서",
        evaluation: {
          attendance: 20,
          assignment: 25,
          project: 35,
          final: 20,
        },
        schedule: [
          { week: 1, topic: "Node.js 기초", content: "설치, 모듈 시스템, npm" },
          { week: 2, topic: "Express.js", content: "라우팅, 미들웨어, 템플릿 엔진" },
          { week: 3, topic: "데이터베이스", content: "MongoDB, Mongoose ODM" },
          { week: 4, topic: "인증과 보안", content: "JWT, 암호화, CORS" },
          { week: 5, topic: "API 설계", content: "RESTful API, 문서화" },
          { week: 6, topic: "테스팅", content: "단위 테스트, 통합 ���스�����" },
          { week: 7, topic: "배포", content: "Docker, AWS, CI/CD" },
          { week: 8, topic: "최종 프로젝트", content: "프로젝트 발표 및 평가" },
        ],
      },
    },
  ])

  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 필터링된 강의 목록
  const filteredCourses = syllabusData.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSemester = selectedSemester === "all" || course.semester === selectedSemester
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus

    return matchesSearch && matchesSemester && matchesStatus
  })

  const handleViewSyllabus = (course) => {
    setSelectedCourse(course)
  }

  const handleDownloadSyllabus = (course) => {
    // 강의계획서 다운로드 로직
    console.log(`${course.courseName} 강의계획서 다운로드`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-green-100 text-green-800"
      case "완료":
        return "bg-gray-100 text-gray-800"
      case "예정":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="syllabus" userRole="student" userName="김학생" />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">강의계획서를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="syllabus" userRole="student" userName="김학생" />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">강의계획서</h1>
            <p className="text-gray-600 mt-1">수강중인 강의들의 강의계획서를 확인할 수 있습니다.</p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">총 수강 과목</p>
                  <p className="text-2xl font-bold text-gray-900">{syllabusData.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">진행중인 과목</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {syllabusData.filter((c) => c.status === "진행중").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">총 학점</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {syllabusData.reduce((sum, course) => sum + course.credits, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">완료된 과목</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {syllabusData.filter((c) => c.status === "완료").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="bg-white p-4 rounded-lg border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="과목명, 강사명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 학기</option>
                <option value="2024-1">2024-1학기</option>
                <option value="2023-2">2023-2학기</option>
                <option value="2023-1">2023-1학기</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 상태</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
                <option value="예정">예정</option>
              </select>
            </div>
          </div>

          {/* 강의 목록 */}
          <div className="space-y-4">
            {filteredCourses.length === 0 ? (
              <div className="bg-white p-8 rounded-lg border text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">강의계획서가 없습니다</h3>
                <p className="text-gray-600">검색 조건을 변경해보세요.</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{course.courseName}</h3>
                        <span className="text-sm text-gray-500">({course.courseCode})</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {course.instructor}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {course.semester}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {course.schedule}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {course.classroom}
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        학점: {course.credits}학점 | 수강신청일: {course.enrollmentDate}
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex gap-2 mt-4 lg:mt-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewSyllabus(course)}
                        className="bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        상세보기
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDownloadSyllabus(course)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        다운로드
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 강의계획서 상세 모달 */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">{selectedCourse.courseName} 강의계획서</h2>
                <button onClick={() => setSelectedCourse(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {/* <div>
                    <span className="font-medium">과목코드:</span> {selectedCourse.courseCode}
                  </div> */}
                  <div>
                    <span className="font-medium">담당교수:</span> {selectedCourse.instructor}
                  </div>
                  <div>
                    <span className="font-medium">학기:</span> {selectedCourse.semester}
                  </div>
                  <div>
                    <span className="font-medium">학점:</span> {selectedCourse.credits}학점
                  </div>
                  <div>
                    <span className="font-medium">강의시간:</span> {selectedCourse.schedule}
                  </div>
                  <div>
                    <span className="font-medium">강의실:</span> {selectedCourse.classroom}
                  </div>
                </div>
              </div>

              {/* 학습 목표 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">학습 목표</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {selectedCourse.syllabus.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              {/* 교재 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">교재</h3>
                <p className="text-sm text-gray-700">{selectedCourse.syllabus.textbook}</p>
              </div>

              {/* 평가 방법 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">평가 방법</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedCourse.syllabus.evaluation).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{value}%</div>
                      <div className="text-sm text-gray-600">
                        {key === "attendance"
                          ? "출석"
                          : key === "assignment"
                            ? "과제"
                            : key === "midterm"
                              ? "중간고사"
                              : key === "final"
                                ? "기말고사"
                                : key === "project"
                                  ? "프로젝트"
                                  : key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주차별 계획 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주차별 강의 계획</h3>
                <div className="space-y-3">
                  {selectedCourse.syllabus.schedule.map((week) => (
                    <div key={week.week} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {week.week}주차: {week.topic}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">{week.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                닫기
              </Button>
              <Button onClick={() => handleDownloadSyllabus(selectedCourse)} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                다운로드
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
