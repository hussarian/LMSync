"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Save, RotateCcw, BookOpen } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function SubjectDetailRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    parentSubject: "",
    duration: "",
    difficulty: "초급",
    description: "",
    objectives: [""],
    practiceContents: [""],
    evaluationMethod: "",
    prerequisites: "",
    materials: [""],
    order: "",
  })

  const [availableSubjects] = useState([
    { id: "S001", name: "HTML/CSS 기초" },
    { id: "S002", name: "JavaScript 기초" },
    { id: "S003", name: "JavaScript 심화" },
    { id: "S004", name: "React 기초" },
    { id: "S005", name: "React 심화" },
    { id: "S006", name: "Node.js & Express" },
    { id: "S007", name: "데이터베이스 연동" },
    { id: "S008", name: "Python 기초" },
    { id: "S009", name: "NumPy & Pandas" },
    { id: "S010", name: "데이터 시각화" },
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

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }))
  }

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        [field]: newArray,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("새 세부 과목 등록 데이터:", formData)
    alert(`${formData.name} 세부 과목이 성공적으로 등록되었습니다!`)
  }

  const handleReset = () => {
    setFormData({
      name: "",
      parentSubject: "",
      duration: "",
      difficulty: "초급",
      description: "",
      objectives: [""],
      practiceContents: [""],
      evaluationMethod: "",
      prerequisites: "",
      materials: [""],
      order: "",
    })
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarMenuItems} currentPath="/courses/subjects/detail" />

        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#1ABC9C" }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    세부 과목 등록
                  </h1>
                  <p className="text-lg" style={{ color: "#95A5A6" }}>
                    과목을 구성하는 세부 학습 단위를 등록합니다.
                  </p>
                </div>
              </div>
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
                        세부 과목명 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="세부 과목명을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        소속 과목 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.parentSubject}
                        onChange={(e) => handleInputChange("parentSubject", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: "#95A5A6" }}
                        required
                      >
                        <option value="">소속 과목을 선택하세요</option>
                        {availableSubjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        학습 시간 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="예: 2시간, 90분"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        난이도 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => handleInputChange("difficulty", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ borderColor: "#95A5A6" }}
                        required
                      >
                        <option value="초급">초급</option>
                        <option value="중급">중급</option>
                        <option value="고급">고급</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        순서
                      </label>
                      <Input
                        type="number"
                        placeholder="1"
                        value={formData.order}
                        onChange={(e) => handleInputChange("order", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                      세부 과목 설명 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="세부 과목에 대한 상세한 설명을 입력하세요"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                      선수 학습 내용
                    </label>
                    <Input
                      placeholder="이 세부 과목을 학습하기 전에 알아야 할 내용"
                      value={formData.prerequisites}
                      onChange={(e) => handleInputChange("prerequisites", e.target.value)}
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
                        placeholder="이 세부 과목의 학습 목표를 입력하세요"
                        value={objective}
                        onChange={(e) => handleArrayChange("objectives", index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("objectives", index)}
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
                    onClick={() => addArrayItem("objectives")}
                    className="bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    학습 목표 추가
                  </Button>
                </CardContent>
              </Card>

              {/* 실습 내용 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>실습 내용</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.practiceContents.map((content, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm font-medium" style={{ color: "#1ABC9C" }}>
                        {index + 1}.
                      </span>
                      <Input
                        placeholder="실습 내용을 입력하세요"
                        value={content}
                        onChange={(e) => handleArrayChange("practiceContents", index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("practiceContents", index)}
                        disabled={formData.practiceContents.length === 1}
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
                    onClick={() => addArrayItem("practiceContents")}
                    className="bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    실습 내용 추가
                  </Button>
                </CardContent>
              </Card>

              {/* 학습 자료 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>학습 자료</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.materials.map((material, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm font-medium" style={{ color: "#1ABC9C" }}>
                        {index + 1}.
                      </span>
                      <Input
                        placeholder="학습 자료명 또는 링크를 입력하세요"
                        value={material}
                        onChange={(e) => handleArrayChange("materials", index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("materials", index)}
                        disabled={formData.materials.length === 1}
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
                    onClick={() => addArrayItem("materials")}
                    className="bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    학습 자료 추가
                  </Button>
                </CardContent>
              </Card>

              {/* 평가 방법 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>평가 방법</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                      평가 방법 및 기준
                    </label>
                    <Textarea
                      placeholder="이 세부 과목의 평가 방법과 기준을 입력하세요 (예: 실습 과제 70%, 퀴즈 30%)"
                      value={formData.evaluationMethod}
                      onChange={(e) => handleInputChange("evaluationMethod", e.target.value)}
                      rows={3}
                    />
                  </div>
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
                  <span>세부 과목 등록</span>
                </Button>
              </div>
            </form>

            {/* 등록 안내 */}
            <Card className="mt-6" style={{ borderColor: "#1ABC9C", borderWidth: "1px" }}>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2" style={{ color: "#2C3E50" }}>
                  세부 과목 등록 안내사항
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: "#95A5A6" }}>
                  <li>• 세부 과목은 반드시 상위 과목에 속해야 합니다.</li>
                  <li>• 학습 시간은 실제 수업 시간을 기준으로 입력해주세요.</li>
                  <li>• 순서를 지정하면 과목 내에서 해당 순서로 정렬됩니다.</li>
                  <li>• 실습 내용과 평가 방법을 구체적으로 작성해주세요.</li>
                  <li>• 등록된 세부 과목은 과목 상세보기에서 확인할 수 있습니다.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
