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
    curriculum: [{ week: "", topic: "", description: "" }],
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
    { href: "/courses/subjects/detail", label: "세부 과목 등록", key: "subject-detail" },
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
    if (formData.curriculum.length > 1) {
      const newCurriculum = formData.curriculum.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        curriculum: newCurriculum,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("새 과정 등록 데이터:", formData)
    alert(`${formData.name} 과정이 성공적으로 등록되었습니다!`)
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
      curriculum: [{ week: "", topic: "", description: "" }],
    })
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarMenuItems} currentPath="/courses/register" />

        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                새 과정 등록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                새로운 교육 과정을 등록합니다.
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
                        과정명 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="과정명을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        카테고리 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: "#95A5A6" }}
                        required
                      >
                        <option value="프로그래밍">프로그래밍</option>
                        <option value="데이터사이언스">데이터사이언스</option>
                        <option value="디자인">디자인</option>
                        <option value="마케팅">마케팅</option>
                        <option value="인프라">인프라</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="보안">보안</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        담당 강사 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="강사명을 입력하세요"
                        value={formData.instructor}
                        onChange={(e) => handleInputChange("instructor", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        과정 기간 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="예: 6개월, 12주"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        시작일 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        종료일 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        최대 수강생 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        placeholder="30"
                        value={formData.maxStudents}
                        onChange={(e) => handleInputChange("maxStudents", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        수강료 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="예: 1,200,000원"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        수업 일정
                      </label>
                      <Input
                        placeholder="예: 월, 수, 금 19:00-22:00"
                        value={formData.schedule}
                        onChange={(e) => handleInputChange("schedule", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        강의실
                      </label>
                      <Input
                        placeholder="예: 강의실 A-101"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        수강 조건
                      </label>
                      <Input
                        placeholder="예: 컴퓨터 기초 지식"
                        value={formData.prerequisites}
                        onChange={(e) => handleInputChange("prerequisites", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                      과정 설명 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="과정에 대한 상세한 설명을 입력하세요"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 학습 목표 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>학습 목표</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm font-medium" style={{ color: "#1ABC9C" }}>
                        {index + 1}.
                      </span>
                      <Input
                        placeholder="학습 목표를 입력하세요"
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeObjective(index)}
                        disabled={formData.objectives.length === 1}
                        className="bg-transparent"
                        style={{ borderColor: "#e74c3c", color: "#e74c3c" }}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addObjective}
                    className="bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    학습 목표 추가
                  </Button>
                </CardContent>
              </Card>

              {/* 커리큘럼 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>커리큘럼</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.curriculum.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg space-y-4"
                      style={{ borderColor: "#e0e0e0", backgroundColor: "#f8f9fa" }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                          커리큘럼 {index + 1}
                        </h4>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeCurriculumItem(index)}
                          disabled={formData.curriculum.length === 1}
                          className="bg-transparent"
                          style={{ borderColor: "#e74c3c", color: "#e74c3c" }}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                            주차
                          </label>
                          <Input
                            placeholder="예: 1-2주"
                            value={item.week}
                            onChange={(e) => handleCurriculumChange(index, "week", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                            주제
                          </label>
                          <Input
                            placeholder="주제를 입력하세요"
                            value={item.topic}
                            onChange={(e) => handleCurriculumChange(index, "topic", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          설명
                        </label>
                        <Textarea
                          placeholder="상세 설명을 입력하세요"
                          value={item.description}
                          onChange={(e) => handleCurriculumChange(index, "description", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addCurriculumItem}
                    className="bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    등록된 과목에서 선택하여 추가
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
                  <span>과정 등록</span>
                </Button>
              </div>
            </form>

            {/* 등록 안내 */}
            <Card className="mt-6" style={{ borderColor: "#1ABC9C", borderWidth: "1px" }}>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2" style={{ color: "#2C3E50" }}>
                  과정 등록 안내사항
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: "#95A5A6" }}>
                  <li>• 필수 항목(*)은 반드시 입력해주세요.</li>
                  <li>• 과정명은 중복될 수 없습니다.</li>
                  <li>• 시작일은 종료일보다 이전이어야 합니다.</li>
                  <li>• 등록된 과정은 즉시 과정 목록에 표시됩니다.</li>
                  <li>• 등록 후 과정 정보는 수정할 수 있습니다.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* 과목 선택 모달 */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
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
