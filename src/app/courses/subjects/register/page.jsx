"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Save, RotateCcw } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function CourseRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "프로그래밍",
    instructor: "",
    duration: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
    price: "",
    description: "",
    schedule: "",
    location: "",
    prerequisites: "",
    objectives: [""],
    curriculum: [],
  })

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [availableSubjects, setAvailableSubjects] = useState([
    { id: "S001", name: "HTML/CSS 기초", description: "웹 표준과 시맨틱 마크업", duration: "2주" },
    { id: "S002", name: "JavaScript 기초", description: "변수, 함수, 객체, DOM 조작", duration: "2주" },
    { id: "S003", name: "JavaScript 심화", description: "비동기 처리, ES6+, 모듈 시스템", duration: "4주" },
    { id: "S004", name: "React 기초", description: "컴포넌트, 상태관리, 라이프사이클", duration: "4주" },
    { id: "S005", name: "React 심화", description: "라우팅, 상태관리 라이브러리", duration: "4주" },
    { id: "S006", name: "Node.js & Express", description: "서버 개발, API 구축", duration: "4주" },
    { id: "S007", name: "데이터베이스 연동", description: "MongoDB 연동, 최종 프로젝트", duration: "4주" },
    { id: "S008", name: "Python 기초", description: "데이터 분석을 위한 Python 기초", duration: "2주" },
    { id: "S009", name: "NumPy & Pandas", description: "배열 연산과 데이터프레임 조작", duration: "2주" },
    { id: "S010", name: "데이터 시각화", description: "Matplotlib, Seaborn 활용", duration: "2주" },
  ])

  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/detail", label: "세부 과목 목록", key: "subject-detail" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...formData.objectives]
    newObjectives[index] = value
    setFormData((prev) => ({
      ...prev,
      objectives: newObjectives,
    }))
  }

  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }))
  }

  const removeObjective = (index) => {
    if (formData.objectives.length > 1) {
      const newObjectives = formData.objectives.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        objectives: newObjectives,
      }))
    }
  }

  const handleCurriculumChange = (index, field, value) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[index] = { ...newCurriculum[index], [field]: value }
    setFormData((prev) => ({
      ...prev,
      curriculum: newCurriculum,
    }))
  }

  const addCurriculumItem = () => {
    setIsSubjectModalOpen(true)
  }

  const handleSelectSubject = (subject) => {
    const newCurriculumItem = {
      week: subject.duration,
      topic: subject.name,
      description: subject.description,
    }
    setFormData((prev) => ({
      ...prev,
      curriculum: [...prev.curriculum, newCurriculumItem],
    }))
    setIsSubjectModalOpen(false)
  }

  const handleCloseSubjectModal = () => {
    setIsSubjectModalOpen(false)
  }

  const removeCurriculumItem = (index) => {
    const newCurriculum = formData.curriculum.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      curriculum: newCurriculum,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("새 과목 등록 데이터:", formData)
    alert(`${formData.name} 과목이 성공적으로 등록되었습니다!`)
  }

  const handleReset = () => {
    setFormData({
      name: "",
      category: "프로그래밍",
      instructor: "",
      duration: "",
      startDate: "",
      endDate: "",
      maxStudents: "",
      price: "",
      description: "",
      schedule: "",
      location: "",
      prerequisites: "",
      objectives: [""],
      curriculum: [],
    })
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과목 관리" menuItems={sidebarMenuItems} currentPath="/courses/subjects/register" />

        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                새 과목 등록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                새로운 교육 과목을 등록합니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 기본 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        과목명 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="과목명을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                      과목 설명 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="과목에 대한 상세한 설명을 입력하세요"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
              {/* 세부과목 선택 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>세부과목</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.curriculum.length === 0 ? (
                    <div className="text-center py-8">
                      <div
                        className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <span className="text-2xl">📚</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C3E50" }}>
                        선택된 세부과목이 없습니다
                      </h3>
                      <p style={{ color: "#95A5A6" }}>아래 버튼을 클릭하여 세부과목을 선택해주세요.</p>
                    </div>
                  ) : (
                    formData.curriculum.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg space-y-2"
                        style={{ borderColor: "#e0e0e0", backgroundColor: "#f8f9fa" }}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                            세부과목 {index + 1}
                          </h4>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => removeCurriculumItem(index)}
                            className="bg-transparent"
                            style={{ borderColor: "#e74c3c", color: "#e74c3c" }}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <div className="font-semibold" style={{ color: "#2C3E50" }}>{item.topic || item.name}</div>
                          <div className="text-sm" style={{ color: "#95A5A6" }}>{item.description}</div>
                        </div>
                      </div>
                    ))
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addCurriculumItem}
                    className="bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    등록된 세부과목에서 선택하여 추가
                  </Button>
                </CardContent>
              </Card>

              {/* 버튼 그룹 */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="flex items-center space-x-2 bg-transparent"
                  style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>초기화</span>
                </Button>
                <Button
                  type="submit"
                  className="text-white font-medium flex items-center space-x-2"
                  style={{ backgroundColor: "#1ABC9C" }}
                >
                  <Save className="w-4 h-4" />
                  <span>과목 등록</span>
                </Button>
              </div>
            </form>

            {/* 등록 안내 */}
            <Card className="mt-6" style={{ borderColor: "#1ABC9C", borderWidth: "1px" }}>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2" style={{ color: "#2C3E50" }}>
                  과목 등록 안내사항
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: "#95A5A6" }}>
                  <li>• 필수 항목(*)은 반드시 입력해주세요.</li>
                  <li>• 과목명은 중복될 수 없습니다.</li>
                  <li>• 등록된 과목은 즉시 과목 목록에 표시됩니다.</li>
                  <li>• 등록 후 과목 정보는 수정할 수 있습니다.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* 과목 선택 모달 */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: "#2C3E50" }}>등록된 과목에서 선택</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseSubjectModal} style={{ color: "#95A5A6" }}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="p-4 border rounded-lg hover:border-emerald-500 cursor-pointer transition-colors"
                    style={{ borderColor: "#e0e0e0" }}
                    onClick={() => handleSelectSubject(subject)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                        {subject.name}
                      </h4>
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: "#f0f0f0", color: "#95A5A6" }}
                      >
                        {subject.duration}
                      </span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: "#95A5A6" }}>
                      {subject.description}
                    </p>
                    <Button
                      size="sm"
                      className="text-white"
                      style={{ backgroundColor: "#1ABC9C" }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectSubject(subject)
                      }}
                    >
                      선택
                    </Button>
                  </div>
                ))}
              </div>

              {availableSubjects.length === 0 && (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: "#f0f0f0" }}
                  >
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
                    등록된 과목이 없습니다
                  </h3>
                  <p style={{ color: "#95A5A6" }}>먼저 과목을 등록해주세요.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
