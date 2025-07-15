"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import { useRouter } from "next/navigation"

export default function StudentsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("all")

  // 현재 사용자 정보 (실제로는 인증 시스템에서 가져와야 함)
  const [currentUser] = useState({
    id: "instructor001",
    name: "김강사",
    role: "instructor", // "admin", "staff", "instructor"
    email: "instructor@example.com",
  })

  // 강사별 담당 강의 정보 (실제로는 API에서 가져와야 함)
  const instructorCourses = {
    instructor001: {
      name: "김강사",
      courses: [
        {
          id: "COURSE001",
          name: "웹 프로그래밍 기초",
          students: ["20240001", "20240003", "20240006"], // 수강생 학번 목록
        },
        {
          id: "COURSE002",
          name: "데이터베이스 설계",
          students: ["20240002", "20240004", "20240007"],
        },
      ],
    },
  }

  const router = useRouter()

  const sidebarMenuItems = [
    { href: "/academic/students", label: "학생 목록", key: "students" },
    { href: "/academic/register", label: "학생 출/결 처리", key: "register" },
  ]

  // 더미 학생 데이터
  const studentsData = [
    {
      id: "20240001",
      name: "김학생",
      grade: "1학년",
      department: "컴퓨터공학과",
      phone: "010-1234-5678",
      email: "kim@example.com",
      status: "재학",
      enrollDate: "2024-03-02",
    },
    {
      id: "20240002",
      name: "이학생",
      grade: "2학년",
      department: "경영학과",
      phone: "010-2345-6789",
      email: "lee@example.com",
      status: "재학",
      enrollDate: "2023-03-02",
    },
    {
      id: "20240003",
      name: "박민수",
      grade: "1학년",
      department: "전자공학과",
      phone: "010-3456-7890",
      email: "park@example.com",
      status: "재학",
      enrollDate: "2024-03-02",
    },
    {
      id: "20240004",
      name: "최지영",
      grade: "3학년",
      department: "디자인학과",
      phone: "010-4567-8901",
      email: "choi@example.com",
      status: "재학",
      enrollDate: "2022-03-02",
    },
    {
      id: "20240005",
      name: "정수현",
      grade: "2학년",
      department: "영어영문학과",
      phone: "010-5678-9012",
      email: "jung@example.com",
      status: "휴학",
      enrollDate: "2023-03-02",
    },
    {
      id: "20240006",
      name: "한소영",
      grade: "1학년",
      department: "수학과",
      phone: "010-6789-0123",
      email: "han@example.com",
      status: "재학",
      enrollDate: "2024-03-02",
    },
    {
      id: "20240007",
      name: "윤태호",
      grade: "3학년",
      department: "물리학과",
      phone: "010-7890-1234",
      email: "yoon@example.com",
      status: "재학",
      enrollDate: "2022-03-02",
    },
    {
      id: "20240008",
      name: "강미래",
      grade: "2학년",
      department: "화학과",
      phone: "010-8901-2345",
      email: "kang@example.com",
      status: "재학",
      enrollDate: "2023-03-02",
    },
  ]

  // 필터링된 학생 데이터
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.includes(searchTerm) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade

    // 강사 계정인 경우 담당 강의 학생만 필터링
    let matchesInstructorCourse = true
    if (currentUser.role === "instructor") {
      const instructorData = instructorCourses[currentUser.id]
      if (instructorData) {
        const allStudentIds = instructorData.courses.flatMap((course) => course.students)
        matchesInstructorCourse = allStudentIds.includes(student.id)
      } else {
        matchesInstructorCourse = false
      }
    }

    return matchesSearch && matchesGrade && matchesInstructorCourse
  })

  // 강사 담당 강의 정보
  const getInstructorCourseInfo = () => {
    if (currentUser.role === "instructor") {
      const instructorData = instructorCourses[currentUser.id]
      if (instructorData) {
        const totalStudents = instructorData.courses.reduce((sum, course) => sum + course.students.length, 0)
        return {
          courses: instructorData.courses,
          totalStudents: totalStudents,
        }
      }
    }
    return null
  }

  const instructorInfo = getInstructorCourseInfo()

  const handleEdit = (studentId) => {
    router.push(`/academic/students/${studentId}?edit=true`)
  }

  const handleDelete = (studentId) => {
    console.log("삭제:", studentId)
    if (confirm("정말로 이 학생을 삭제하시겠습니까?")) {
      alert(`${studentId} 학생이 삭제되었습니다.`)
    }
  }

  const handleView = (studentId) => {
    router.push(`/academic/students/${studentId}`)
  }

  return (
    <PageLayout currentPage="academic">
      <div className="flex">
        <Sidebar title="학적부" menuItems={sidebarMenuItems} currentPath="/academic/students" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                {currentUser.role === "instructor" ? "담당 강의 학생 목록" : "전체 학생 목록"}
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                {currentUser.role === "instructor"
                  ? "담당하고 있는 강의의 학생 정보를 조회하고 관리할 수 있습니다."
                  : "등록된 모든 학생의 정보를 조회하고 관리할 수 있습니다."}
              </p>
              {instructorInfo && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">담당 강의 정보</h3>
                  <div className="space-y-1">
                    {instructorInfo.courses.map((course) => (
                      <div key={course.id} className="text-sm text-blue-700">
                        • {course.name} ({course.students.length}명)
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 검색 및 필터 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>검색 및 필터</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "#95A5A6" }}
                      />
                      <Input
                        placeholder="이름, 학번, 학과로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                      style={{ borderColor: "#95A5A6" }}
                    >
                      <option value="all">전체 학년</option>
                      <option value="1학년">1학년</option>
                      <option value="2학년">2학년</option>
                      <option value="3학년">3학년</option>
                      <option value="4학년">4학년</option>
                    </select>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 bg-transparent"
                      style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                    >
                      <Filter className="w-4 h-4" />
                      <span>필터</span>
                    </Button>
                    <Button
                      className="text-white font-medium flex items-center space-x-2"
                      style={{ backgroundColor: "#1ABC9C" }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>학생 추가</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 학생 목록 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {studentsData.length}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    전체 학생
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {studentsData.filter((s) => s.status === "재학").length}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    재학생
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#95A5A6" }}>
                    {studentsData.filter((s) => s.status === "휴학").length}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    휴학생
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {filteredStudents.length}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    검색 결과
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 학생 목록 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>
                  {currentUser.role === "instructor" ? "담당 강의 학생 목록" : "학생 목록"} ({filteredStudents.length}
                  명)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "#95A5A6" }}>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          학번
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          이름
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          학년
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          학과
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          연락처
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          상태
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          입학일
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50" style={{ borderColor: "#f1f2f6" }}>
                          <td className="py-3 px-4 font-mono text-sm" style={{ color: "#2C3E50" }}>
                            {student.id}
                          </td>
                          <td className="py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                            {student.name}
                          </td>
                          <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                            {student.grade}
                          </td>
                          <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                            {student.department}
                          </td>
                          <td className="py-3 px-4 font-mono text-sm" style={{ color: "#95A5A6" }}>
                            {student.phone}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                student.status === "재학" ? "text-white" : "text-gray-600"
                              }`}
                              style={{
                                backgroundColor: student.status === "재학" ? "#1ABC9C" : "#95A5A6",
                              }}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm" style={{ color: "#95A5A6" }}>
                            {student.enrollDate}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => handleView(student.id)} className="p-1">
                                <Eye className="w-4 h-4" style={{ color: "#1ABC9C" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleEdit(student.id)} className="p-1">
                                <Edit className="w-4 h-4" style={{ color: "#95A5A6" }} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(student.id)}
                                className="p-1"
                              >
                                <Trash2 className="w-4 h-4" style={{ color: "#e74c3c" }} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-8">
                      <p style={{ color: "#95A5A6" }}>검색 결과가 없습니다.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
