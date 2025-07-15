"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  FileText,
  Download,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react"

export default function LectureDetailPage() {
  const params = useParams()
  const lectureId = Number.parseInt(params.id)

  const [isEditingMaterials, setIsEditingMaterials] = useState(false)
  const [newMaterial, setNewMaterial] = useState("")
  const [isEditingSyllabus, setIsEditingSyllabus] = useState(false)
  const [syllabusData, setSyllabusData] = useState({
    overview: "",
    objectives: "",
    evaluation: "",
    materials: "",
    weeklyPlan: "",
  })

  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [lectureNotes, setLectureNotes] = useState("")

  // 사이드바 메뉴 구성
  const sidebarItems = [
    { href: "/instructor/courses/lectures", label: "담당 강의", key: "lectures" },
    { href: "/instructor/courses/assignments", label: "과제 리스트", key: "assignments" }
  ]

  // 빈 강의 데이터
  const [lecture, setLecture] = useState(null)
  const [students, setStudents] = useState([])
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    // 실제로는 API 호출로 데이터를 가져옴
    const emptyLectureData = {
      id: lectureId,
      courseName: "강의 정보 없음",
      courseCode: "-",
      lectureTitle: "강의 정보 없음",
      lectureNumber: 0,
      date: "-",
      time: "-",
      classroom: "-",
      students: 0,
      attendees: 0,
      status: "정보없음",
      period: "-",
      homework: null,
      homeworkDueDate: null,
      notes: "",
      objectives: [],
      content: [],
      syllabus: {
        overview: "",
        objectives: "",
        evaluation: "",
        materials: "",
        weeklyPlan: "",
      },
    }

    const emptyStudentsData = []
    const emptyMaterialsData = []

    setLecture(emptyLectureData)
    setStudents(emptyStudentsData)
    setMaterials(emptyMaterialsData)
    setSyllabusData({
      overview: "",
      objectives: "",
      evaluation: "",
      materials: "",
      weeklyPlan: "",
    })
    setLectureNotes("")
  }, [lectureId])

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      const newMat = {
        id: materials.length + 1,
        name: newMaterial,
        type: "FILE",
        size: "0KB",
        uploadDate: new Date().toLocaleDateString("ko-KR").replace(/\./g, ".").slice(0, -1),
      }
      setMaterials([...materials, newMat])
      setNewMaterial("")
      setIsEditingMaterials(false)
    }
  }

  const handleDeleteMaterial = (materialId) => {
    setMaterials(materials.filter((m) => m.id !== materialId))
  }

  const getAttendanceColor = (attendance) => {
    switch (attendance) {
      case "출석":
        return "text-green-600 bg-green-100"
      case "지각":
        return "text-yellow-600 bg-yellow-100"
      case "결석":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getParticipationColor = (participation) => {
    switch (participation) {
      case "적극적":
        return "text-blue-600 bg-blue-100"
      case "보통":
        return "text-gray-600 bg-gray-100"
      case "소극적":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleSaveSyllabus = () => {
    setLecture((prev) => ({
      ...prev,
      syllabus: syllabusData,
    }))
    setIsEditingSyllabus(false)
  }

  const handleSaveNotes = () => {
    setLecture((prev) => ({ ...prev, notes: lectureNotes }))
    setIsEditingNotes(false)
  }

  if (!lecture) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="courses" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarItems} currentPath="/instructor/courses/lectures" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 뒤로가기 버튼 */}
            <div className="mb-6">
              <Link href="/instructor/courses/lectures">
                <Button variant="outline" className="mb-4 bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  강의 목록으로 돌아가기
                </Button>
              </Link>

              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                강의 상세 정보
              </h1>
              <p className="text-gray-600">강의의 상세 정보와 출석 현황을 확인하세요.</p>
            </div>

            {/* 강의 기본 정보 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C3E50" }}>
                    {lecture.lectureTitle}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">과정:</span>
                      <span className="ml-2 font-medium">
                        {lecture.courseName} ({lecture.courseCode})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">일시:</span>
                      <span className="ml-2 font-medium">{lecture.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">시간:</span>
                      <span className="ml-2 font-medium">{lecture.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">강의실:</span>
                      <span className="ml-2 font-medium">{lecture.classroom}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                    출석 현황
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">총 수강생:</span>
                      <span className="font-semibold">{lecture.students}명</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">출석:</span>
                      <span className="font-semibold text-green-600">{lecture.attendees}명</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">출석률:</span>
                      <span className="font-semibold text-blue-600">
                        {Math.round((lecture.attendees / lecture.students) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(lecture.attendees / lecture.students) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 강의 목표 및 내용 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                  강의 목표
                </h3>
                <ul className="space-y-2">
                  {lecture.objectives?.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                  강의 내용
                </h3>
                <ul className="space-y-2">
                  {lecture.content?.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 강의 자료 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                  강의 자료
                </h3>
                <Button onClick={() => setIsEditingMaterials(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  자료 추가
                </Button>
              </div>

              {isEditingMaterials && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMaterial}
                      onChange={(e) => setNewMaterial(e.target.value)}
                      placeholder="자료명을 입력하세요"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleAddMaterial} size="sm">
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingMaterials(false)
                        setNewMaterial("")
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <FileText className="w-5 h-5 text-blue-500 mr-2" />
                          <span className="font-medium text-gray-900">{material.name}</span>
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div>타입: {material.type}</div>
                          <div>크기: {material.size}</div>
                          <div>업로드: {material.uploadDate}</div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="p-1 bg-transparent">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-1 text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteMaterial(material.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 과제 정보 */}
            {lecture.homework && (
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                  과제 정보
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">{lecture.homework}</h4>
                      <p className="text-yellow-700 text-sm">마감일: {lecture.homeworkDueDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 강의 계획서 */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                    강의 계획서
                  </h3>
                  {!lecture.syllabus && (
                    <Link href={`/instructor/courses/lectures/${lectureId}/syllabus/create`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        강의계획서 작성하기
                      </Button>
                    </Link>
                  )}
                  {lecture.syllabus && (
                    <Link href={`/instructor/courses/lectures/${lectureId}/syllabus/edit`}>
                      <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        수정
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-6">
                {isEditingSyllabus ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">강의 개요</label>
                      <textarea
                        value={syllabusData.overview}
                        onChange={(e) => setSyllabusData({ ...syllabusData, overview: e.target.value })}
                        className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="강의의 전반적인 개요를 작성하세요..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">학습 목표</label>
                      <textarea
                        value={syllabusData.objectives}
                        onChange={(e) => setSyllabusData({ ...syllabusData, objectives: e.target.value })}
                        className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="학습 목표를 작성하세요..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">평가 방법</label>
                      <textarea
                        value={syllabusData.evaluation}
                        onChange={(e) => setSyllabusData({ ...syllabusData, evaluation: e.target.value })}
                        className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="평가 방법과 기준을 작성하세요..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">교재 및 참고자료</label>
                      <textarea
                        value={syllabusData.materials}
                        onChange={(e) => setSyllabusData({ ...syllabusData, materials: e.target.value })}
                        className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="교재 및 참고자료를 작성하세요..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">주차별 계획</label>
                      <textarea
                        value={syllabusData.weeklyPlan}
                        onChange={(e) => setSyllabusData({ ...syllabusData, weeklyPlan: e.target.value })}
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="주차별 강의 계획을 작성하세요..."
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button onClick={handleSaveSyllabus} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        저장
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditingSyllabus(false)
                          setSyllabusData(
                            lecture.syllabus || {
                              overview: "",
                              objectives: "",
                              evaluation: "",
                              materials: "",
                              weeklyPlan: "",
                            },
                          )
                        }}
                        variant="outline"
                      >
                        <X className="w-4 h-4 mr-2" />
                        취소
                      </Button>
                    </div>
                  </div>
                ) : lecture.syllabus ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">강의 개요</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{lecture.syllabus.overview}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">학습 목표</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{lecture.syllabus.objectives}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">평가 방법</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{lecture.syllabus.evaluation}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">교재 및 참고자료</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{lecture.syllabus.materials}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">주차별 계획</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{lecture.syllabus.weeklyPlan}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">강의계획서가 없습니다</h4>
                    <p className="text-gray-500 mb-4">강의계획서를 작성하여 체계적인 강의를 진행하세요.</p>
                    <Link href={`/instructor/courses/lectures/${lectureId}/syllabus/create`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        강의계획서 작성하기
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* 강의 노트 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                  강의 노트
                </h3>
                {!isEditingNotes ? (
                  <Button onClick={() => setIsEditingNotes(true)} size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    편집
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveNotes} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      저장
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingNotes(false)
                        setLectureNotes(lecture.notes)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      취소
                    </Button>
                  </div>
                )}
              </div>

              {isEditingNotes ? (
                <textarea
                  value={lectureNotes}
                  onChange={(e) => setLectureNotes(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="강의 노트를 작성하세요..."
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{lectureNotes || "강의 노트가 없습니다."}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
