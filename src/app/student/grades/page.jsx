"use client"

// TODO: 학생 성적 조회 페이지
// - API 연동 필요: 학생 성적 데이터 조회
// - 성적 분포 차트 개선 필요
// - 성적 상세 정보 모달 추가 고려

import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import EmptyState from "@/components/ui/empty-state"
import { GraduationCap } from "lucide-react"

export default function StudentGradesPage() {
  const [gradesData, setGradesData] = useState(null)
  const [loading, setLoading] = useState(true)

  // 사이드바 메뉴 항목
  const sidebarMenuItems = [
    { href: "/student/exams", label: "시험 목록", key: "exam-list" },
    { key: "grades", label: "성적 조회", href: "/student/grades" },
  ]

  // TODO: 실제 API에서 성적 데이터 가져오기
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // TODO: 실제 API 호출로 교체 필요
        // const response = await fetchStudentGrades()
        // setGradesData(response.data)
        
        // 임시: 빈 데이터로 설정
        setGradesData({
          student: {
            id: "",
            name: "",
            studentNumber: "",
            department: "",
            year: 0,
          },
          semester: "",
          overallGPA: 0,
          totalCredits: 0,
          courses: [],
          gradeDistribution: {
            "A+": 0,
            A: 0,
            "A-": 0,
            "B+": 0,
            B: 0,
            "B-": 0,
            "C+": 0,
            C: 0,
            "C-": 0,
            "D+": 0,
            D: 0,
            F: 0,
          },
        })
      } catch (error) {
        console.error('성적 데이터 조회 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGrades()
  }, [])

  const getGradeColor = (grade) => {
    const colors = {
      "A+": "text-green-600 bg-green-50",
      A: "text-green-600 bg-green-50",
      "A-": "text-green-600 bg-green-50",
      "B+": "text-blue-600 bg-blue-50",
      B: "text-blue-600 bg-blue-50",
      "B-": "text-blue-600 bg-blue-50",
      "C+": "text-yellow-600 bg-yellow-50",
      C: "text-yellow-600 bg-yellow-50",
      "C-": "text-yellow-600 bg-yellow-50",
      "D+": "text-orange-600 bg-orange-50",
      D: "text-orange-600 bg-orange-50",
      F: "text-red-600 bg-red-50",
    }
    return colors[grade] || "text-gray-600 bg-gray-50"
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
        <Header currentPage="grades" userRole="student" userName="학생" />
        <div className="flex">
          <Sidebar menuItems={sidebarMenuItems} currentPath="/student/grades" />
          <main className="flex-1 p-6">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">성적 정보를 불러오는 중...</div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      <Header 
        currentPage="grades" 
        userRole="student" 
        userName={gradesData?.student?.name || "학생"} 
      />
      <div className="flex">
        <Sidebar menuItems={sidebarMenuItems} currentPath="/student/grades" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 학생 정보 및 전체 성적 요약 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                    학생 정보
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">이름:</span>
                      <span className="font-medium">{gradesData.student.name || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">학번:</span>
                      <span className="font-medium">{gradesData.student.studentNumber || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">학과:</span>
                      <span className="font-medium">{gradesData.student.department || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">학년:</span>
                      <span className="font-medium">{gradesData.student.year ? `${gradesData.student.year}학년` : "-"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                    {gradesData.semester || "학기"} 학기 성적
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">평점평균:</span>
                      <span className="font-bold text-xl" style={{ color: "#2C3E50" }}>
                        {gradesData.overallGPA || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 이수학점:</span>
                      <span className="font-medium">{gradesData.totalCredits || 0}학점</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">수강과목수:</span>
                      <span className="font-medium">{gradesData.courses.length}과목</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 성적 분포 차트 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                성적 분포
              </h3>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {Object.entries(gradesData.gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="text-center">
                    <div className={`p-2 rounded text-sm font-medium ${getGradeColor(grade)}`}>{grade}</div>
                    <div className="text-xs text-gray-600 mt-1">{count}과목</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 과목별 상세 성적 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                  과목별 상세 성적
                </h3>
              </div>
              {gradesData.courses.length === 0 ? (
                <div className="p-8">
                  <EmptyState
                    icon={GraduationCap}
                    title="수강 과목이 없습니다"
                    description="현재 학기에 등록된 과목이 없습니다."
                  />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          과목명
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          과목코드
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          학점
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          담당교수
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          중간고사
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          기말고사
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          과제
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          출석
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          최종성적
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {gradesData.courses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{course.name || "-"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.code || "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.credits || "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.instructor || "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.midterm ? `${course.midterm}점` : "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.final ? `${course.final}점` : "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.assignments ? `${course.assignments}점` : "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.attendance ? `${course.attendance}점` : "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(course.finalGrade || "")}`}
                            >
                              {course.finalGrade || "-"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 학기별 성적 추이 (추가 정보) */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                성적 통계
              </h3>
              {gradesData.courses.length === 0 ? (
                <div className="p-8">
                  <EmptyState
                    icon={GraduationCap}
                    title="성적 통계를 표시할 수 없습니다"
                    description="수강 중인 과목이 있어야 통계를 확인할 수 있습니다."
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {(
                        gradesData.courses.reduce((sum, course) => sum + (course.midterm || 0), 0) / gradesData.courses.length
                      ).toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">중간고사 평균</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {(
                        gradesData.courses.reduce((sum, course) => sum + (course.final || 0), 0) / gradesData.courses.length
                      ).toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">기말고사 평균</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {(
                        gradesData.courses.reduce((sum, course) => sum + (course.attendance || 0), 0) / gradesData.courses.length
                      ).toFixed(1)}
                      %
                    </div>
                    <div className="text-sm text-gray-600">출석률 평균</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
