"use client"

import { useState } from "react"
import { BrowserRouter as Router, Route, Switch, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User,
  MapPin,
  FileText,
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  Download,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"

export default function InstructorStudentDetailPage() {
  const { id } = useParams();

  // 강사 전용 사이드바 메뉴
  const sidebarItems = [
    { href: "/instructor/academic", label: "담당 학생 관리", key: "students" },
    { href: "/instructor/academic/attendance", label: "출석 현황", key: "attendance" },
  ]

  // 더미 학생 상세 데이터 (강사 담당 학생)
  const studentData = {
    1: {
      id: "1",
      name: "김철수",
      studentId: "2024001",
      email: "kim@example.com",
      phone: "010-1234-5678",
      course: "JavaScript 기초",
      courseCode: "JS101",
      enrollDate: "2024.01.15",
      status: "수강중",
      attendance: 85,
      averageScore: 88,
      lastActivity: "2024.02.14",
      assignments: { submitted: 8, total: 10 },
      progress: 75,
      birthDate: "2005-08-15",
      address: "서울시 강남구 테헤란로 123",
      parentName: "김부모",
      parentPhone: "010-9876-5432",
      emergencyContact: "010-1111-2222",
      gpa: "3.85",
      totalCredits: "45",
      advisor: "김강사",
      notes: "성실하고 적극적인 학생입니다.",
      recentGrades: [
        { subject: "JavaScript 기초", score: 92, date: "2024.02.10", type: "중간고사" },
        { subject: "JavaScript 기초", score: 85, date: "2024.02.05", type: "과제" },
        { subject: "JavaScript 기초", score: 88, date: "2024.01.30", type: "퀴즈" },
      ],
      attendanceHistory: [
        { date: "2024.02.14", status: "출석", lecture: "함수와 스코프" },
        { date: "2024.02.12", status: "출석", lecture: "배열과 객체" },
        { date: "2024.02.09", status: "지각", lecture: "조건문과 반복문" },
        { date: "2024.02.07", status: "출석", lecture: "변수와 데이터 타입" },
        { date: "2024.02.05", status: "결석", lecture: "JavaScript 소개" },
      ],
      assignmentHistory: [
        { title: "함수 실습 과제", dueDate: "2024.02.15", submitDate: "2024.02.14", score: 95, status: "완료" },
        { title: "배열 조작 과제", dueDate: "2024.02.10", submitDate: "2024.02.09", score: 88, status: "완료" },
        { title: "조건문 실습", dueDate: "2024.02.05", submitDate: "2024.02.05", score: 92, status: "완료" },
        { title: "변수 선언 과제", dueDate: "2024.01.30", submitDate: null, score: null, status: "미제출" },
      ],
    },
    2: {
      id: "2",
      name: "이영희",
      studentId: "2024002",
      email: "lee@example.com",
      phone: "010-2345-6789",
      course: "React 심화",
      courseCode: "REACT201",
      enrollDate: "2024.02.01",
      status: "수강중",
      attendance: 92,
      averageScore: 94,
      lastActivity: "2024.02.15",
      assignments: { submitted: 5, total: 6 },
      progress: 60,
      birthDate: "2004-12-20",
      address: "서울시 서초구 서초대로 456",
      parentName: "이부모",
      parentPhone: "010-8765-4321",
      emergencyContact: "010-2222-3333",
      gpa: "3.92",
      totalCredits: "78",
      advisor: "김강사",
      notes: "리더십이 뛰어난 학생입니다.",
      recentGrades: [
        { subject: "React 심화", score: 96, date: "2024.02.12", type: "프로젝트" },
        { subject: "React 심화", score: 92, date: "2024.02.08", type: "과제" },
        { subject: "React 심화", score: 94, date: "2024.02.05", type: "퀴즈" },
      ],
      attendanceHistory: [
        { date: "2024.02.15", status: "출석", lecture: "Redux 상태 관리" },
        { date: "2024.02.13", status: "출석", lecture: "React Router" },
        { date: "2024.02.10", status: "출석", lecture: "컴포넌트 최적화" },
        { date: "2024.02.08", status: "출석", lecture: "Hooks 심화" },
        { date: "2024.02.05", status: "출석", lecture: "Context API" },
      ],
      assignmentHistory: [
        { title: "Redux 프로젝트", dueDate: "2024.02.20", submitDate: "2024.02.18", score: 96, status: "완료" },
        { title: "Router 실습", dueDate: "2024.02.15", submitDate: "2024.02.14", score: 92, status: "완료" },
        { title: "Hooks 과제", dueDate: "2024.02.10", submitDate: "2024.02.09", score: 94, status: "완료" },
        { title: "Context 실습", dueDate: "2024.02.05", submitDate: null, score: null, status: "진행중" },
      ],
    },
  }

  const student = studentData[id] || {
    id: id,
    name: "학생 정보 없음",
    studentId: "-",
    email: "-",
    phone: "-",
    course: "-",
    courseCode: "-",
    enrollDate: "-",
    status: "정보없음",
    attendance: 0,
    averageScore: 0,
    lastActivity: "-",
    assignments: { submitted: 0, total: 0 },
    progress: 0,
    birthDate: "-",
    address: "-",
    parentName: "-",
    parentPhone: "-",
    emergencyContact: "-",
    gpa: "-",
    totalCredits: "-",
    advisor: "-",
    notes: "해당 학생의 정보를 찾을 수 없습니다.",
    recentGrades: [],
    attendanceHistory: [],
    assignmentHistory: [],
  }

  const [activeTab, setActiveTab] = useState("overview")
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [editedNotes, setEditedNotes] = useState(student.notes)

  const getAttendanceColor = (status) => {
    switch (status) {
      case "출석":
        return "bg-green-100 text-green-800"
      case "지각":
        return "bg-yellow-100 text-yellow-800"
      case "결석":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAssignmentStatusColor = (status) => {
    switch (status) {
      case "완료":
        return "bg-green-100 text-green-800"
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "미제출":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSaveNotes = () => {
    // 실제로는 API 호출로 서버에 저장
    console.log("특이사항 저장:", editedNotes)
    // 여기서 실제 저장 로직 구현
    setIsEditingNotes(false)
    // 성공 메시지 표시 등
  }

  const handleCancelEdit = () => {
    setEditedNotes(student.notes)
    setIsEditingNotes(false)
  }

  return (
    <Router>
      <Switch>
        <Route path="/instructor/academic/students/:id">
          <div className="min-h-screen bg-gray-50">
            <Header currentPage="academic" userRole="instructor" userName="김강사" />

            <div className="flex">
              <Sidebar title="학적부" menuItems={sidebarItems} currentPath="/instructor/academic" />

              <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                  {/* 헤더 */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Link to="/instructor/academic">
                          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>목록으로</span>
                          </Button>
                        </Link>
                        <div>
                          <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                            학생 상세 정보
                          </h1>
                          <p className="text-lg" style={{ color: "#95A5A6" }}>
                            {student.name}님의 상세 정보입니다.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" className="bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          리포트 다운로드
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* 학생 기본 정보 카드 */}
                    <Card className="lg:col-span-1">
                      <CardHeader>
                        <CardTitle style={{ color: "#2C3E50" }}>기본 정보</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center mb-6">
                          <div
                            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                            style={{ backgroundColor: "#1ABC9C" }}
                          >
                            {student.name.charAt(0)}
                          </div>
                          <h3 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                            {student.name}
                          </h3>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            {student.studentId}
                          </p>
                          <Badge
                            className={`mt-2 ${student.status === "수강중" ? "text-white" : "text-gray-600"}`}
                            style={{
                              backgroundColor: student.status === "수강중" ? "#1ABC9C" : "#95A5A6",
                            }}
                          >
                            {student.status}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <BookOpen className="w-4 h-4" style={{ color: "#95A5A6" }} />
                            <div>
                              <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                수강 과정
                              </p>
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {student.course}
                              </p>
                              <p className="text-xs" style={{ color: "#95A5A6" }}>
                                {student.courseCode}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Calendar className="w-4 h-4" style={{ color: "#95A5A6" }} />
                            <div>
                              <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                등록일
                              </p>
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {student.enrollDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Clock className="w-4 h-4" style={{ color: "#95A5A6" }} />
                            <div>
                              <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                최근 활동
                              </p>
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {student.lastActivity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 메인 콘텐츠 */}
                    <div className="lg:col-span-3 space-y-6">
                      {/* 학습 현황 통계 */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">출석률</p>
                                <p className="text-2xl font-bold" style={{ color: "#3498db" }}>
                                  {student.attendance}%
                                </p>
                              </div>
                              <Calendar className="w-6 h-6" style={{ color: "#3498db" }} />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">평균 성적</p>
                                <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                                  {student.averageScore}점
                                </p>
                              </div>
                              <Award className="w-6 h-6" style={{ color: "#2ecc71" }} />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">과제 제출</p>
                                <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                                  {student.assignments.submitted}/{student.assignments.total}
                                </p>
                              </div>
                              <FileText className="w-6 h-6" style={{ color: "#9b59b6" }} />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">진도율</p>
                                <p className="text-2xl font-bold" style={{ color: "#e67e22" }}>
                                  {student.progress}%
                                </p>
                              </div>
                              <TrendingUp className="w-6 h-6" style={{ color: "#e67e22" }} />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* 탭 메뉴 */}
                      <Card>
                        <CardHeader>
                          <div className="flex space-x-4 border-b">
                            <button
                              onClick={() => setActiveTab("overview")}
                              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "overview"
                                  ? "border-blue-500 text-blue-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              개요
                            </button>
                            <button
                              onClick={() => setActiveTab("grades")}
                              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "grades"
                                  ? "border-blue-500 text-blue-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              성적 이력
                            </button>
                            <button
                              onClick={() => setActiveTab("attendance")}
                              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "attendance"
                                  ? "border-blue-500 text-blue-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              출석 이력
                            </button>
                            <button
                              onClick={() => setActiveTab("assignments")}
                              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "assignments"
                                  ? "border-blue-500 text-blue-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              과제 이력
                            </button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {activeTab === "overview" && (
                            <div className="space-y-6">
                              {/* 연락처 정보 */}
                              <div>
                                <h4 className="font-semibold mb-4" style={{ color: "#2C3E50" }}>
                                  연락처 정보
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                      <Phone className="w-4 h-4" style={{ color: "#95A5A6" }} />
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                          휴대폰
                                        </p>
                                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                                          {student.phone}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <Mail className="w-4 h-4" style={{ color: "#95A5A6" }} />
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                          이메일
                                        </p>
                                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                                          {student.email}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <MapPin className="w-4 h-4" style={{ color: "#95A5A6" }} />
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                          주소
                                        </p>
                                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                                          {student.address}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                      <User className="w-4 h-4" style={{ color: "#95A5A6" }} />
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                          보호자명
                                        </p>
                                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                                          {student.parentName}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <Phone className="w-4 h-4" style={{ color: "#95A5A6" }} />
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                          보호자 연락처
                                        </p>
                                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                                          {student.parentPhone}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <Phone className="w-4 h-4" style={{ color: "#95A5A6" }} />
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                          비상연락처
                                        </p>
                                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                                          {student.emergencyContact}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 특이사항 */}
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                                    특이사항
                                  </h4>
                                  {!isEditingNotes && (
                                    <Button variant="outline" onClick={() => setIsEditingNotes(true)}>
                                      <Edit className="w-4 h-4 mr-2" />
                                      수정
                                    </Button>
                                  )}
                                </div>

                                {isEditingNotes ? (
                                  <div className="space-y-4">
                                    <textarea
                                      value={editedNotes}
                                      onChange={(e) => setEditedNotes(e.target.value)}
                                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      rows={4}
                                      placeholder="학생에 대한 특이사항을 입력하세요..."
                                    />
                                    <div className="flex space-x-2">
                                      <Button onClick={handleSaveNotes} className="bg-blue-600 hover:bg-blue-700">
                                        저장
                                      </Button>
                                      <Button variant="outline" onClick={handleCancelEdit}>
                                        취소
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm" style={{ color: "#95A5A6" }}>
                                      {student.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {activeTab === "grades" && (
                            <div className="space-y-4">
                              <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                                최근 성적 이력
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        과목
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        점수
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        유형
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        날짜
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {student.recentGrades.map((grade, index) => (
                                      <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.subject}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span
                                            className={`text-sm font-medium ${
                                              grade.score >= 90
                                                ? "text-green-600"
                                                : grade.score >= 80
                                                  ? "text-blue-600"
                                                  : grade.score >= 70
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}
                                          >
                                            {grade.score}점
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.date}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {activeTab === "attendance" && (
                            <div className="space-y-4">
                              <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                                출석 이력
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        날짜
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        상태
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        강의명
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {student.attendanceHistory.map((record, index) => (
                                      <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <Badge className={getAttendanceColor(record.status)}>{record.status}</Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {record.lecture}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {activeTab === "assignments" && (
                            <div className="space-y-4">
                              <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                                과제 제출 이력
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        과제명
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        마감일
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        제출일
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        점수
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        상태
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {student.assignmentHistory.map((assignment, index) => (
                                      <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                          {assignment.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {assignment.dueDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {assignment.submitDate || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          {assignment.score ? (
                                            <span
                                              className={`text-sm font-medium ${
                                                assignment.score >= 90
                                                  ? "text-green-600"
                                                  : assignment.score >= 80
                                                    ? "text-blue-600"
                                                    : assignment.score >= 70
                                                      ? "text-yellow-600"
                                                      : "text-red-600"
                                              }`}
                                            >
                                              {assignment.score}점
                                            </span>
                                          ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                          )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <Badge className={getAssignmentStatusColor(assignment.status)}>
                                            {assignment.status}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* 강사 안내사항 */}
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">담당 학생 관리 안내</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 학생의 학습 현황을 종합적으로 확인하고 관리하세요.</li>
                      <li>• 출석률이 낮거나 성적이 부진한 학생에게는 개별 상담을 진행해주세요.</li>
                      <li>• 과제 미제출 학생에게는 즉시 안내 및 지도가 필요합니다.</li>
                      <li>• 메시지 기능을 통해 학생과 직접 소통할 수 있습니다.</li>
                    </ul>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}
