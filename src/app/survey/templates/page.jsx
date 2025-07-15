"use client"

import { useState } from "react"
import { Eye, Edit, Trash2, Plus, Search, Filter, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageLayout from "@/components/ui/page-layout"

export default function SurveyTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "강의 평가",
  })

  // TODO: API 연동 필요 - 설문 템플릿 목록 조회
  // TODO: 템플릿 생성, 수정, 삭제 기능 추가
  // TODO: 템플릿 복사 및 적용 기능 추가
  // TODO: 템플릿 사용 통계 조회 기능 추가
  const [templates, setTemplates] = useState([])
  
  // TODO: API 연동 필요 - 사용 가능한 질문 목록 조회
  const [availableQuestions, setAvailableQuestions] = useState([])

  const categories = ["all", "강의 평가", "실습 평가", "온라인 평가", "기타"]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const handleSelectAllQuestions = () => {
    if (selectedQuestions.length === availableQuestions.length) {
      setSelectedQuestions([])
    } else {
      setSelectedQuestions(availableQuestions.map((q) => q.id))
    }
  }

  const handleCreateTemplate = () => {
    if (newTemplate.name && selectedQuestions.length > 0) {
      console.log("새 템플릿 생성:", {
        ...newTemplate,
        questions: selectedQuestions,
      })
      setShowCreateModal(false)
      setNewTemplate({ name: "", description: "", category: "강의 평가" })
      setSelectedQuestions([])
    }
  }

  const handleView = (templateId) => {
    console.log("템플릿 상세보기:", templateId)
  }

  const handleEdit = (templateId) => {
    console.log("템플릿 수정:", templateId)
  }

  const handleDelete = (templateId) => {
    if (confirm("정말로 이 템플릿을 삭제하시겠습니까?")) {
      console.log("템플릿 삭제:", templateId)
    }
  }

  const sidebarItems = [
    { key: "survey-items", label: "평가 항목", href: "/survey/items" },
    { key: "survey-lectures", label: "강의 리스트", href: "/survey/lectures" },
    { key: "survey-templates", label: "템플릿 목록", href: "/survey/templates" },
  ]

  return (
    <PageLayout title="설문 평가 관리" sidebarItems={sidebarItems} currentPath="/survey/templates">
      <div className="space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">전체 템플릿</p>
                <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                  {templates.length}개
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(231, 76, 60, 0.1)" }}
              >
                <Filter className="w-6 h-6" style={{ color: "#e74c3c" }} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 템플릿</p>
                <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                  {templates.filter((t) => t.status === "활성").length}개
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(231, 76, 60, 0.1)" }}
              >
                <Check className="w-6 h-6" style={{ color: "#e74c3c" }} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 사용 횟수</p>
                <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                  {templates.reduce((sum, t) => sum + t.usageCount, 0)}회
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(231, 76, 60, 0.1)" }}
              >
                <Eye className="w-6 h-6" style={{ color: "#e74c3c" }} />
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="템플릿명 또는 설명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "전체 카테고리" : category}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="text-white"
              style={{ backgroundColor: "#e74c3c" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              템플릿 만들기
            </Button>
          </div>
        </div>

        {/* 템플릿 목록 */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">템플릿명</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">카테고리</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">질문 수</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">사용 횟수</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">상태</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">등록일</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{template.name}</div>
                        <div className="text-sm text-gray-500">{template.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {template.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{template.questionCount}개</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{template.usageCount}회</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.status === "활성" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {template.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{template.createdDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => handleView(template.id)} className="p-1">
                          <Eye className="w-4 h-4" style={{ color: "#e74c3c" }} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(template.id)} className="p-1">
                          <Edit className="w-4 h-4" style={{ color: "#f39c12" }} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(template.id)} className="p-1">
                          <Trash2 className="w-4 h-4" style={{ color: "#e74c3c" }} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 템플릿 생성 모달 */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold">새 템플릿 만들기</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)} className="p-1">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex h-[600px]">
                {/* 좌측: 템플릿 정보 입력 */}
                <div className="w-1/3 p-6 border-r bg-gray-50">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        템플릿명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="템플릿명을 입력하세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">템플릿 설명</label>
                      <textarea
                        value={newTemplate.description}
                        onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="3"
                        placeholder="템플릿에 대한 설명을 입력하세요"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                      <select
                        value={newTemplate.category}
                        onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="강의 평가">강의 평가</option>
                        <option value="실습 평가">실습 평가</option>
                        <option value="온라인 평가">온라인 평가</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <p>
                          선택된 질문: <span className="font-semibold text-red-600">{selectedQuestions.length}개</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 우측: 질문 선택 */}
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">질문 선택</h4>
                    <Button variant="outline" size="sm" onClick={handleSelectAllQuestions}>
                      {selectedQuestions.length === availableQuestions.length ? "전체 해제" : "전체 선택"}
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-[450px] overflow-y-auto">
                    {availableQuestions.map((question) => (
                      <div
                        key={question.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedQuestions.includes(question.id)
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => handleQuestionSelect(question.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedQuestions.includes(question.id)}
                            onChange={() => handleQuestionSelect(question.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{question.content}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {question.category}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {question.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  취소
                </Button>
                <Button
                  onClick={handleCreateTemplate}
                  disabled={!newTemplate.name || selectedQuestions.length === 0}
                  className="text-white"
                  style={{ backgroundColor: "#e74c3c" }}
                >
                  템플릿 생성
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
