"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Eye, Edit, Trash2, FileText, Star, Clock, Users, BarChart3, X } from "lucide-react"

export default function SurveyItemsPage() {
  const [currentPath] = useState("/survey/items")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedType, setSelectedType] = useState("전체")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    category: "강의 내용",
    type: "5점 척도",
    description: "",
    status: "활성",
  })

  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
    category: "일반",
  })

  // 사이드바 메뉴 구성
  const sidebarMenuItems = [
    { href: "/survey/items", label: "평가 항목", key: "survey-items" },
    { href: "/survey/lectures", label: "강의 리스트", key: "survey-lectures" },
    { href: "/survey/templates", label: "템플릿 목록", key: "survey-templates" },
  ]

  // TODO: API 연동 필요 - 평가 항목 통계 데이터 조회
  // TODO: 질문 CRUD 기능 추가
  // TODO: 질문 카테고리 관리 기능 추가
  // TODO: 질문 사용 통계 및 분석 기능 추가
  const [stats, setStats] = useState([])

  // 질문지 데이터
  const surveyItems = [
    {
      id: 1,
      question: "강의 내용이 이해하기 쉽게 설명되었나요?",
      category: "강의 내용",
      type: "5점 척도",
      usageCount: 45,
      lastUsed: "2024-01-15",
      status: "활성",
      description: "강의 내용의 명확성과 이해도를 평가하는 질문",
    },
    {
      id: 2,
      question: "강사의 설명 방식에 만족하시나요?",
      category: "강사 평가",
      type: "5점 척도",
      usageCount: 38,
      lastUsed: "2024-01-12",
      status: "활성",
      description: "강사의 교수법과 설명 능력을 평가하는 질문",
    },
    {
      id: 3,
      question: "실습 시간이 충분했나요?",
      category: "실습",
      type: "5점 척도",
      usageCount: 32,
      lastUsed: "2024-01-10",
      status: "활성",
      description: "실습 시간의 적절성을 평가하는 질문",
    },
    {
      id: 4,
      question: "과정 전반에 대한 만족도는 어떠신가요?",
      category: "전반적 만족도",
      type: "5점 척도",
      usageCount: 67,
      lastUsed: "2024-01-18",
      status: "활성",
      description: "과정 전체에 대한 종합적인 만족도를 평가하는 질문",
    },
    {
      id: 5,
      question: "추가로 학습하고 싶은 내용이 있다면 적어주세요.",
      category: "개선사항",
      type: "주관식",
      usageCount: 23,
      lastUsed: "2024-01-08",
      status: "활성",
      description: "학습자의 추가 학습 요구사항을 파악하는 질문",
    },
    {
      id: 6,
      question: "강의 자료의 품질은 어떠했나요?",
      category: "강의 자료",
      type: "5점 척도",
      usageCount: 29,
      lastUsed: "2024-01-05",
      status: "비활성",
      description: "제공된 강의 자료의 품질을 평가하는 질문",
    },
  ]

  const categories = ["전체", "강의 내용", "강사 평가", "실습", "전반적 만족도", "개선사항", "강의 자료"]
  const types = ["전체", "5점 척도", "주관식", "객관식", "체크박스"]

  // 필터링된 질문 목록
  const filteredItems = surveyItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory
    const matchesType = selectedType === "전체" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const handleView = (itemId) => {
    console.log("질문 상세보기:", itemId)
  }

  const handleEdit = (itemId) => {
    console.log("질문 수정:", itemId)
  }

  const handleDelete = (itemId) => {
    console.log("질문 삭제:", itemId)
  }

  const getStatusColor = (status) => {
    return status === "활성" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "5점 척도":
        return "bg-blue-100 text-blue-800"
      case "주관식":
        return "bg-purple-100 text-purple-800"
      case "객관식":
        return "bg-orange-100 text-orange-800"
      case "체크박스":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateQuestion = () => {
    console.log("새 질문 생성:", newQuestion)
    // 실제로는 API 호출하여 질문 생성
    setShowCreateModal(false)
    setNewQuestion({
      question: "",
      category: "강의 내용",
      type: "5점 척도",
      description: "",
      status: "활성",
    })
  }

  const handleModalClose = () => {
    setShowCreateModal(false)
    setNewQuestion({
      question: "",
      category: "강의 내용",
      type: "5점 척도",
      description: "",
      status: "활성",
    })
  }

  const handleCreateTemplate = () => {
    console.log("템플릿 생성:", {
      ...templateData,
      questions: selectedQuestions,
    })
    // 실제로는 API 호출하여 템플릿 생성
    setShowTemplateModal(false)
    setSelectedQuestions([])
    setTemplateData({
      name: "",
      description: "",
      category: "일반",
    })
  }

  const handleTemplateModalClose = () => {
    setShowTemplateModal(false)
    setSelectedQuestions([])
    setTemplateData({
      name: "",
      description: "",
      category: "일반",
    })
  }

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredItems.length) {
      setSelectedQuestions([])
    } else {
      setSelectedQuestions(filteredItems.map((item) => item.id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="survey" userRole="staff" userName="관리자" />

      <div className="flex">
        <Sidebar title="설문 평가 관리" menuItems={sidebarMenuItems} currentPath={currentPath} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                평가 항목 관리
              </h1>
              <p className="text-gray-600">설문에 사용할 질문들을 관리합니다.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-l-4 hover:shadow-lg transition-shadow">
                  <div
                    className="border-l-4 absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: stat.color }}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold" style={{ color: "#e74c3c" }}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                      </div>
                      <div className="p-3 rounded-full" style={{ backgroundColor: "#fdf2f2" }}>
                        <stat.icon className="w-6 h-6" style={{ color: "#e74c3c" }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 검색 및 필터 */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="질문 내용이나 카테고리로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={() => setShowTemplateModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      템플릿 만들기
                    </Button>
                    <Button onClick={() => setShowCreateModal(true)} className="hover:bg-red-700 text-white bg-red-600">
                      <Plus className="w-4 h-4 mr-2" />새 질문 추가
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 질문 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" style={{ color: "#e74c3c" }} />
                    질문 목록 ({filteredItems.length}개)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-center py-3 px-4 font-medium text-gray-600 w-12">선택</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">질문 내용</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">카테고리</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">유형</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">사용 횟수</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">최근 사용</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">상태</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedQuestions.includes(item.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedQuestions([...selectedQuestions, item.id])
                                } else {
                                  setSelectedQuestions(selectedQuestions.filter((id) => id !== item.id))
                                }
                              }}
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-sm">{item.question}</p>
                              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`text-xs ${getTypeColor(item.type)}`}>{item.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium">{item.usageCount}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-600">{item.lastUsed}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => handleView(item.id)} className="p-1">
                                <Eye className="w-4 h-4" style={{ color: "#e74c3c" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleEdit(item.id)} className="p-1">
                                <Edit className="w-4 h-4" style={{ color: "#f39c12" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)} className="p-1">
                                <Trash2 className="w-4 h-4" style={{ color: "#e74c3c" }} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">검색 조건에 맞는 질문이 없습니다.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {/* 새 질문 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                새 질문 추가
              </h2>
              <Button variant="ghost" onClick={handleModalClose} className="p-1">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* 질문 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  질문 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  placeholder="평가할 질문을 입력해주세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  rows={3}
                  required
                />
              </div>

              {/* 카테고리 및 유형 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    {categories
                      .filter((cat) => cat !== "전체")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    질문 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newQuestion.type}
                    onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    {types
                      .filter((type) => type !== "전체")
                      .map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* 질문 설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">질문 설명</label>
                <textarea
                  value={newQuestion.description}
                  onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                  placeholder="질문에 대한 상세 설명을 입력해주세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  rows={2}
                />
              </div>

              {/* 상태 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="활성"
                      checked={newQuestion.status === "활성"}
                      onChange={(e) => setNewQuestion({ ...newQuestion, status: e.target.value })}
                      className="mr-2"
                    />
                    활성
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="비활성"
                      checked={newQuestion.status === "비활성"}
                      onChange={(e) => setNewQuestion({ ...newQuestion, status: e.target.value })}
                      className="mr-2"
                    />
                    비활성
                  </label>
                </div>
              </div>

              {/* 안내사항 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">질문 작성 가이드</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 명확하고 이해하기 쉬운 질문을 작성해주세요</li>
                  <li>• 5점 척도: 1(매우 불만족) ~ 5(매우 만족) 형태로 평가</li>
                  <li>• 주관식: 자유롭게 의견을 작성할 수 있는 질문</li>
                  <li>• 객관식: 여러 선택지 중 하나를 선택하는 질문</li>
                </ul>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={handleModalClose}>
                취소
              </Button>
              <Button
                onClick={handleCreateQuestion}
                disabled={!newQuestion.question.trim()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                질문 추가
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 템플릿 생성 모달 */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                설문 템플릿 만들기
              </h2>
              <Button variant="ghost" onClick={handleTemplateModalClose} className="p-1">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 템플릿 정보 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">템플릿 정보</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    템플릿 이름 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={templateData.name}
                    onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                    placeholder="템플릿 이름을 입력해주세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">템플릿 설명</label>
                  <textarea
                    value={templateData.description}
                    onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                    placeholder="템플릿에 대한 설명을 입력해주세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">템플릿 카테고리</label>
                  <select
                    value={templateData.category}
                    onChange={(e) => setTemplateData({ ...templateData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="일반">일반</option>
                    <option value="강의 평가">강의 평가</option>
                    <option value="과정 평가">과정 평가</option>
                    <option value="강사 평가">강사 평가</option>
                    <option value="시설 평가">시설 평가</option>
                  </select>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">선택된 질문</h4>
                  <p className="text-sm text-green-800">총 {selectedQuestions.length}개의 질문이 선택되었습니다.</p>
                  {selectedQuestions.length === 0 && (
                    <p className="text-sm text-red-600 mt-2">최소 1개 이상의 질문을 선택해주세요.</p>
                  )}
                </div>
              </div>

              {/* 질문 선택 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">질문 선택</h3>
                  <Button variant="outline" size="sm" onClick={handleSelectAll} className="text-sm bg-transparent">
                    {selectedQuestions.length === filteredItems.length ? "전체 해제" : "전체 선택"}
                  </Button>
                </div>

                <div className="border rounded-lg max-h-96 overflow-y-auto">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border-b last:border-b-0 hover:bg-gray-50 ${
                        selectedQuestions.includes(item.id) ? "bg-green-50" : ""
                      }`}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedQuestions.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedQuestions([...selectedQuestions, item.id])
                            } else {
                              setSelectedQuestions(selectedQuestions.filter((id) => id !== item.id))
                            }
                          }}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.question}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge className={`text-xs ${getTypeColor(item.type)}`}>{item.type}</Badge>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={handleTemplateModalClose}>
                취소
              </Button>
              <Button
                onClick={handleCreateTemplate}
                disabled={!templateData.name.trim() || selectedQuestions.length === 0}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                템플릿 생성
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
