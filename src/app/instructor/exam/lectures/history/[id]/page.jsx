"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Users, Award, BarChart3, Calendar, Download, Search, Eye, FileText } from "lucide-react"
import { Link } from "react-router-dom"

export default function LectureDetailPage() {
  const params = useParams()
  const lectureId = Number.parseInt(params.id)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [sortBy, setSortBy] = useState("score")

  // 강사 전용 사이드바 메뉴
  const sidebarItems = [
    { key: "my-exams", label: "내 시험 관리", href: "/instructor/exam/my-exams" },
    { key: "question-management", label: "문제 관리", href: "/instructor/exam/question-bank" },
    { key: "history", label: "내 강의 성적", href: "/instructor/exam/lectures/history" },
  ]

  // 강의 상세 정보
  const lectureDetail = {
    id: lectureId,
    title: "JavaScript 기초",
    code: "JS101",
    period: "2024.01.15 - 2024.04.15",
    year: "2024",
    semester: "1학기",
    status: "완료",
    totalStudents: 25,
    completedStudents: 23,
    dropoutStudents: 2,
    averageScore: 88.5,
    passRate: 92,
    attendanceRate: 85.2,
    satisfactionScore: 4.6,
    totalClasses: 48,
    completedClasses: 48,
    category: "프로그래밍",
    level: "초급",
    scoreDistribution: {
      excellent: 8, // 90점 이상
      good: 10, // 80-89점
      average: 5, // 70-79점
      poor: 0, // 70점 미만
    },
    weeklyScores: [
      { week: 1, average: 75.2, attendance: 96 },
      { week: 2, average: 78.5, attendance: 92 },
      { week: 3, average: 82.1, attendance: 88 },
      { week: 4, average: 85.3, attendance: 84 },
      { week: 5, average: 87.8, attendance: 80 },
      { week: 6, average: 89.2, attendance: 85 },
      { week: 7, average: 88.9, attendance: 87 },
      { week: 8, average: 90.1, attendance: 89 },
    ],
  }

  // 학생별 성적 데이터
  const [students] = useState([
    {
      id: 1,
      name: "김학생",
      studentId: "2024001",
      finalScore: 95.5,
      midtermScore: 92,
      finalExamScore: 98,
      assignmentScore: 96,
      attendanceScore: 95,
      attendanceRate: 95.8,
      grade: "A+",
      rank: 1,
      submittedAssignments: 12,
      totalAssignments: 12,
      lateSubmissions: 0,
      participationScore: 4.8,
      improvementRate: 15.2,
    },
    {
      id: 2,
      name: "이학생",
      studentId: "2024002",
      finalScore: 92.3,
      midtermScore: 89,
      finalExamScore: 94,
      assignmentScore: 93,
      attendanceScore: 92,
      attendanceRate: 91.7,
      grade: "A",
      rank: 2,
      submittedAssignments: 11,
      totalAssignments: 12,
      lateSubmissions: 1,
      participationScore: 4.5,
      improvementRate: 12.8,
    },
    {
      id: 3,
      name: "박학생",
      studentId: "2024003",
      finalScore: 88.7,
      midtermScore: 85,
      finalExamScore: 91,
      assignmentScore: 89,
      attendanceScore: 88,
      attendanceRate: 87.5,
      grade: "B+",
      rank: 3,
      submittedAssignments: 12,
      totalAssignments: 12,
      lateSubmissions: 2,
      participationScore: 4.2,
      improvementRate: 18.5,
    },
    {
      id: 4,
      name: "최학생",
      studentId: "2024004",
      finalScore: 85.2,
      midtermScore: 82,
      finalExamScore: 87,
      assignmentScore: 86,
      attendanceScore: 85,
      attendanceRate: 83.3,
      grade: "B",
      rank: 4,
      submittedAssignments: 10,
      totalAssignments: 12,
      lateSubmissions: 3,
      participationScore: 4.0,
      improvementRate: 8.7,
    },
    {
      id: 5,
      name: "정학생",
      studentId: "2024005",
      finalScore: 82.1,
      midtermScore: 78,
      finalExamScore: 85,
      assignmentScore: 83,
      attendanceScore: 82,
      attendanceRate: 79.2,
      grade: "B",
      rank: 5,
      submittedAssignments: 9,
      totalAssignments: 12,
      lateSubmissions: 4,
      participationScore: 3.8,
      improvementRate: 22.1,
    },
    // 더 많은 학생 데이터...
  ])

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.studentId.includes(searchTerm)
      const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade
      return matchesSearch && matchesGrade
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.finalScore - a.finalScore
        case "name":
          return a.name.localeCompare(b.name)
        case "attendance":
          return b.attendanceRate - a.attendanceRate
        case "improvement":
          return b.improvementRate - a.improvementRate
        default:
          return a.rank - b.rank
      }
    })

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800"
      case "A":
        return "bg-blue-100 text-blue-800"
      case "B+":
        return "bg-yellow-100 text-yellow-800"
      case "B":
        return "bg-orange-100 text-orange-800"
      case "C+":
        return "bg-red-100 text-red-800"
      case "C":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="lectures" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="강의 현황" menuItems={sidebarItems} currentPath="/instructor/lectures/history" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Link to="/instructor/exam/lectures/history">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    목록으로
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {lectureDetail.title} 성적 상세
                  </h1>
                  <p className="text-gray-600">
                    {lectureDetail.code} | {lectureDetail.year} {lectureDetail.semester} | {lectureDetail.period}
                  </p>
                </div>
              </div>
            </div>

            {/* 핵심 성과 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">평균 성적</p>
                      <p className={`text-3xl font-bold ${getScoreColor(lectureDetail.averageScore)}`}>
                        {lectureDetail.averageScore}점
                      </p>
                      <p className="text-xs text-gray-500 mt-1">전체 {lectureDetail.totalStudents}명</p>
                    </div>
                    <TrendingUp className="w-8 h-8" style={{ color: "#e67e22" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">합격률</p>
                      <p className="text-3xl font-bold text-green-600">{lectureDetail.passRate}%</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((lectureDetail.passRate / 100) * lectureDetail.totalStudents)}명 합격
                      </p>
                    </div>
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">출석률</p>
                      <p className="text-3xl font-bold text-blue-600">{lectureDetail.attendanceRate}%</p>
                      <p className="text-xs text-gray-500 mt-1">평균 출석률</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">만족도</p>
                      <p className="text-3xl font-bold text-purple-600">{lectureDetail.satisfactionScore}/5.0</p>
                      <p className="text-xs text-gray-500 mt-1">학생 평가</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 성적 분포 및 주차별 성과 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* 성적 분포 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    성적 분포
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">우수 (90점 이상)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${(lectureDetail.scoreDistribution.excellent / lectureDetail.totalStudents) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          {lectureDetail.scoreDistribution.excellent}명
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">양호 (80-89점)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(lectureDetail.scoreDistribution.good / lectureDetail.totalStudents) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-blue-600">
                          {lectureDetail.scoreDistribution.good}명
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">보통 (70-79점)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{
                              width: `${(lectureDetail.scoreDistribution.average / lectureDetail.totalStudents) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-yellow-600">
                          {lectureDetail.scoreDistribution.average}명
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">미흡 (70점 미만)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{
                              width: `${(lectureDetail.scoreDistribution.poor / lectureDetail.totalStudents) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-red-600">
                          {lectureDetail.scoreDistribution.poor}명
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 주차별 성과 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    주차별 성과 추이
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lectureDetail.weeklyScores.map((week) => (
                      <div key={week.week} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{week.week}주차</span>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className={`text-sm font-semibold ${getScoreColor(week.average)}`}>
                              평균 {week.average}점
                            </div>
                            <div className="text-xs text-gray-500">출석 {week.attendance}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 학생별 성적 목록 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    학생별 성적 현황
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      엑셀 다운로드
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      성적표 출력
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 검색 및 필터 */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="학생명, 학번으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">전체 등급</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="score">성적순</option>
                    <option value="name">이름순</option>
                    <option value="attendance">출석률순</option>
                    <option value="improvement">향상도순</option>
                  </select>
                </div>

                {/* 학생 목록 테이블 */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 font-medium">순위</th>
                        <th className="text-left p-3 font-medium">학생정보</th>
                        <th className="text-left p-3 font-medium">최종성적</th>
                        <th className="text-left p-3 font-medium">등급</th>
                        <th className="text-left p-3 font-medium">중간고사</th>
                        <th className="text-left p-3 font-medium">기말고사</th>
                        <th className="text-left p-3 font-medium">과제</th>
                        <th className="text-left p-3 font-medium">출석률</th>
                        <th className="text-left p-3 font-medium">향상도</th>
                        <th className="text-left p-3 font-medium">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center">
                              <span className="font-semibold text-gray-700">#{student.rank}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-xs text-gray-500">{student.studentId}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className={`text-lg font-bold ${getScoreColor(student.finalScore)}`}>
                              {student.finalScore}점
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(student.grade)}`}
                            >
                              {student.grade}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={getScoreColor(student.midtermScore)}>{student.midtermScore}점</span>
                          </td>
                          <td className="p-3">
                            <span className={getScoreColor(student.finalExamScore)}>{student.finalExamScore}점</span>
                          </td>
                          <td className="p-3">
                            <div>
                              <span className={getScoreColor(student.assignmentScore)}>
                                {student.assignmentScore}점
                              </span>
                              <div className="text-xs text-gray-500">
                                {student.submittedAssignments}/{student.totalAssignments}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <span className={getScoreColor(student.attendanceRate)}>{student.attendanceRate}%</span>
                              <div className="text-xs text-gray-500">참여도 {student.participationScore}/5.0</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`font-semibold ${student.improvementRate > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {student.improvementRate > 0 ? "+" : ""}
                              {student.improvementRate}%
                            </span>
                          </td>
                          <td className="p-3">
                            <Link to={`/instructor/academic/students/${student.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 검색 결과가 없을 때 */}
                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-600">다른 검색 조건을 시도해보세요.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 성적 분석 요약 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">성적 분석 요약</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                <div>
                  <strong>최고 성적:</strong> {Math.max(...students.map((s) => s.finalScore))}점
                  <br />
                  <strong>최저 성적:</strong> {Math.min(...students.map((s) => s.finalScore))}점
                </div>
                <div>
                  <strong>표준편차:</strong>{" "}
                  {Math.sqrt(
                    students.reduce((sum, s) => sum + Math.pow(s.finalScore - lectureDetail.averageScore, 2), 0) /
                      students.length,
                  ).toFixed(2)}
                  <br />
                  <strong>중간값:</strong>{" "}
                  {students.sort((a, b) => a.finalScore - b.finalScore)[Math.floor(students.length / 2)].finalScore}점
                </div>
                <div>
                  <strong>A등급 이상:</strong> {students.filter((s) => s.grade === "A+" || s.grade === "A").length}명 (
                  {Math.round(
                    (students.filter((s) => s.grade === "A+" || s.grade === "A").length / students.length) * 100,
                  )}
                  %)
                  <br />
                  <strong>평균 향상도:</strong>{" "}
                  {(students.reduce((sum, s) => sum + s.improvementRate, 0) / students.length).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
