"use client"
import { useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { ArrowLeft, Mail, Phone, Calendar, User, GraduationCap, MapPin, FileText, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function StudentDetailPage({ params }) {
  const { id } = params

  const sidebarMenuItems = [
    { href: "/academic/students", label: "학생 목록", key: "students" },
    { href: "/academic/register", label: "학생 출/결 처리", key: "register" },
  ]

  // 더미 학생 상세 데이터 (실제로는 API에서 가져올 데이터)
  const studentData = {
    20240001: {
      id: "20240001",
      name: "김학생",
      grade: "1학년",
      department: "컴퓨터공학과",
      phone: "010-1234-5678",
      email: "kim@example.com",
      status: "재학",
      enrollDate: "2024-03-02",
      birthDate: "2005-08-15",
      address: "서울시 강남구 테헤란로 123",
      parentName: "김부모",
      parentPhone: "010-9876-5432",
      emergencyContact: "010-1111-2222",
      gpa: "3.85",
      totalCredits: "45",
      advisor: "박교수",
      notes: "성실하고 적극적인 학생입니다.",
    },
    20240002: {
      id: "20240002",
      name: "이학생",
      grade: "2학년",
      department: "경영학과",
      phone: "010-2345-6789",
      email: "lee@example.com",
      status: "재학",
      enrollDate: "2023-03-02",
      birthDate: "2004-12-20",
      address: "서울시 서초구 서초대로 456",
      parentName: "이부모",
      parentPhone: "010-8765-4321",
      emergencyContact: "010-2222-3333",
      gpa: "3.92",
      totalCredits: "78",
      advisor: "최교수",
      notes: "리더십이 뛰어난 학생입니다.",
    },
    20240003: {
      id: "20240003",
      name: "박민수",
      grade: "1학년",
      department: "전자공학과",
      phone: "010-3456-7890",
      email: "park@example.com",
      status: "재학",
      enrollDate: "2024-03-02",
      birthDate: "2005-05-10",
      address: "서울시 마포구 월드컵로 789",
      parentName: "박부모",
      parentPhone: "010-7654-3210",
      emergencyContact: "010-3333-4444",
      gpa: "3.67",
      totalCredits: "42",
      advisor: "김교수",
      notes: "수학 실력이 뛰어난 학생입니다.",
    },
  }

  const student = studentData[id] || {
    id: id,
    name: "학생 정보 없음",
    grade: "-",
    department: "-",
    phone: "-",
    email: "-",
    status: "정보없음",
    enrollDate: "-",
    birthDate: "-",
    address: "-",
    parentName: "-",
    parentPhone: "-",
    emergencyContact: "-",
    gpa: "-",
    totalCredits: "-",
    advisor: "-",
    notes: "해당 학생의 정보를 찾을 수 없습니다.",
  }

  const searchParams = useSearchParams()
  const editMode = searchParams.get("edit") === "true"

  const [isEditing, setIsEditing] = useState(editMode)
  const [formData, setFormData] = useState(student)

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(student)
  }

  const handleSave = () => {
    console.log("저장된 데이터:", formData)
    alert(`${formData.name} 학생 정보가 수정되었습니다.`)
    setIsEditing(false)
    // 실제로는 여기서 API 호출하여 데이터 저장
  }

  const handleCancel = () => {
    setFormData(student)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <PageLayout currentPage="academic">
      <div className="flex">
        <Sidebar title="학적부" menuItems={sidebarMenuItems} currentPath="/academic/students" />

        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            {/* 헤더 */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link to="/academic/students">
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
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="flex items-center space-x-2 bg-transparent"
                        style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                      >
                        <span>취소</span>
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="text-white font-medium flex items-center space-x-2"
                        style={{ backgroundColor: "#1ABC9C" }}
                      >
                        <span>저장</span>
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleEdit}
                      className="text-white font-medium flex items-center space-x-2"
                      style={{ backgroundColor: "#1ABC9C" }}
                    >
                      <Edit className="w-4 h-4" />
                      <span>정보 수정</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 기본 정보 카드 */}
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
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="text-xl font-bold text-center bg-transparent border-b-2 border-emerald-500 focus:outline-none"
                        style={{ color: "#2C3E50" }}
                      />
                    ) : (
                      <h3 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                        {formData.name}
                      </h3>
                    )}
                    <p className="text-sm" style={{ color: "#95A5A6" }}>
                      {student.id}
                    </p>
                    <Badge
                      className={`mt-2 ${student.status === "재학" ? "text-white" : "text-gray-600"}`}
                      style={{
                        backgroundColor: student.status === "재학" ? "#1ABC9C" : "#95A5A6",
                      }}
                    >
                      {student.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          학과/학년
                        </p>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {student.department} {student.grade}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          입학일
                        </p>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {student.enrollDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          생년월일
                        </p>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {student.birthDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 연락처 정보 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>연락처 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                        학생 연락처
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4" style={{ color: "#95A5A6" }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              휴대폰
                            </p>
                            {isEditing ? (
                              <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="text-sm bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                                style={{ color: "#95A5A6" }}
                              />
                            ) : (
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {formData.phone}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4" style={{ color: "#95A5A6" }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              이메일
                            </p>
                            {isEditing ? (
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="text-sm bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                                style={{ color: "#95A5A6" }}
                              />
                            ) : (
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {formData.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4" style={{ color: "#95A5A6" }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              주소
                            </p>
                            {isEditing ? (
                              <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                className="text-sm bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none w-full"
                                style={{ color: "#95A5A6" }}
                              />
                            ) : (
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {formData.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                        보호자 연락처
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4" style={{ color: "#95A5A6" }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              보호자명
                            </p>
                            {isEditing ? (
                              <input
                                type="text"
                                value={formData.parentName}
                                onChange={(e) => handleInputChange("parentName", e.target.value)}
                                className="text-sm bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                                style={{ color: "#95A5A6" }}
                              />
                            ) : (
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {formData.parentName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4" style={{ color: "#95A5A6" }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              보호자 연락처
                            </p>
                            {isEditing ? (
                              <input
                                type="text"
                                value={formData.parentPhone}
                                onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                                className="text-sm bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                                style={{ color: "#95A5A6" }}
                              />
                            ) : (
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {formData.parentPhone}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4" style={{ color: "#95A5A6" }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              비상연락처
                            </p>
                            {isEditing ? (
                              <input
                                type="text"
                                value={formData.emergencyContact}
                                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                                className="text-sm bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                                style={{ color: "#95A5A6" }}
                              />
                            ) : (
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                {formData.emergencyContact}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 학업 정보 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>학업 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: "#1ABC9C" }}>
                        {student.gpa}
                      </div>
                      <div className="text-sm" style={{ color: "#95A5A6" }}>
                        평점평균 (GPA)
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: "#1ABC9C" }}>
                        {student.totalCredits}
                      </div>
                      <div className="text-sm" style={{ color: "#95A5A6" }}>
                        취득학점
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                        {student.advisor}
                      </div>
                      <div className="text-sm" style={{ color: "#95A5A6" }}>
                        지도교수
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 특이사항 */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>특이사항</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <FileText className="w-4 h-4 mt-1" style={{ color: "#95A5A6" }} />
                    <div>
                      {isEditing ? (
                        <textarea
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          className="text-sm bg-transparent border border-gray-300 rounded focus:border-emerald-500 focus:outline-none w-full p-2 resize-none"
                          style={{ color: "#95A5A6" }}
                          rows={3}
                        />
                      ) : (
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {formData.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
