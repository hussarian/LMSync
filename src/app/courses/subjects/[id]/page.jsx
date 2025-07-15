"use client"
import { ArrowLeft, Edit, BookOpen, Clock, User, Calendar, Target, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import { useRouter } from "next/navigation"

export default function SubjectDetailPage({ params }) {
  const router = useRouter()
  const subjectId = params.id

  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/subjects/detail", label: "세부 과목 등록", key: "subject-detail" },
  ]

  // 더미 과목 데이터
  const subjectsData = {
    S001: {
      id: "S001",
      name: "HTML/CSS 기초",
      category: "프로그래밍",
      difficulty: "초급",
      duration: "2주",
      description:
        "웹 표준과 시맨틱 마크업을 학습하는 기초 과목입니다. HTML5의 새로운 요소들과 CSS3의 다양한 스타일링 기법을 배우며, 반응형 웹 디자인의 기초를 익힙니다.",
      prerequisites: "컴퓨터 기초 지식",
      objectives: [
        "HTML5 시맨틱 요소를 이해하고 활용할 수 있다",
        "CSS3 선택자와 속성을 활용하여 스타일링할 수 있다",
        "Flexbox와 Grid를 이용한 레이아웃을 구성할 수 있다",
        "반응형 웹 디자인의 기본 원리를 이해한다",
      ],
      instructor: "김강사",
      status: "활성",
      createdDate: "2024-01-15",
      usedInCourses: 3,
      curriculum: [
        {
          week: "1주차",
          topic: "HTML 기초",
          description: "HTML 구조, 기본 태그, 시맨틱 요소 학습",
        },
        {
          week: "2주차",
          topic: "CSS 기초 및 레이아웃",
          description: "CSS 선택자, 박스 모델, Flexbox, Grid 학습",
        },
      ],
      relatedCourses: [
        { id: "C001", name: "프론트엔드 개발 기초", students: 25, status: "진행중" },
        { id: "C003", name: "웹 개발 종합", students: 30, status: "진행중" },
        { id: "C005", name: "UI/UX 개발", students: 20, status: "예정" },
      ],
    },
    S002: {
      id: "S002",
      name: "JavaScript 기초",
      category: "프로그래밍",
      difficulty: "초급",
      duration: "2주",
      description:
        "JavaScript의 기본 문법과 DOM 조작을 학습하는 과목입니다. 변수, 함수, 객체의 개념을 이해하고 실제 웹 페이지에서 동적인 기능을 구현하는 방법을 배웁니다.",
      prerequisites: "HTML/CSS 기초",
      objectives: [
        "JavaScript 기본 문법을 이해하고 활용할 수 있다",
        "DOM을 조작하여 동적인 웹 페이지를 만들 수 있다",
        "이벤트 처리를 통한 사용자 상호작용을 구현할 수 있다",
        "기본적인 알고리즘과 자료구조를 이해한다",
      ],
      instructor: "이강사",
      status: "활성",
      createdDate: "2024-01-20",
      usedInCourses: 5,
      curriculum: [
        {
          week: "1주차",
          topic: "JavaScript 기본 문법",
          description: "변수, 데이터 타입, 연산자, 조건문, 반복문",
        },
        {
          week: "2주차",
          topic: "DOM 조작과 이벤트",
          description: "DOM 선택, 조작, 이벤트 리스너, 폼 처리",
        },
      ],
      relatedCourses: [
        { id: "C001", name: "프론트엔드 개발 기초", students: 25, status: "진행중" },
        { id: "C002", name: "JavaScript 마스터", students: 18, status: "진행중" },
        { id: "C003", name: "웹 개발 종합", students: 30, status: "진행중" },
        { id: "C004", name: "React 개발", students: 22, status: "예정" },
        { id: "C005", name: "UI/UX 개발", students: 20, status: "예정" },
      ],
    },
  }

  const subject = subjectsData[subjectId] || subjectsData["S001"]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "초급":
        return "#1ABC9C"
      case "중급":
        return "#f39c12"
      case "고급":
        return "#e74c3c"
      default:
        return "#95A5A6"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "활성":
        return "#1ABC9C"
      case "비활성":
        return "#95A5A6"
      default:
        return "#95A5A6"
    }
  }

  const getCourseStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "#1ABC9C"
      case "예정":
        return "#f39c12"
      case "완료":
        return "#95A5A6"
      default:
        return "#95A5A6"
    }
  }

  const handleEdit = () => {
    router.push(`/courses/subjects/${subjectId}/edit`)
  }

  const handleBack = () => {
    router.push("/courses/subjects")
  }

  const handleCourseClick = (courseId) => {
    router.push(`/courses/list/${courseId}`)
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarMenuItems} currentPath="/courses/subjects" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center space-x-2"
                  style={{ color: "#95A5A6" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>목록으로</span>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {subject.name}
                  </h1>
                  <p className="text-lg" style={{ color: "#95A5A6" }}>
                    과목 상세 정보
                  </p>
                </div>
              </div>
              <Button
                onClick={handleEdit}
                className="text-white font-medium flex items-center space-x-2"
                style={{ backgroundColor: "#1ABC9C" }}
              >
                <Edit className="w-4 h-4" />
                <span>편집</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 좌측: 기본 정보 */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div
                        className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <BookOpen className="w-10 h-10" style={{ color: "#1ABC9C" }} />
                      </div>
                      <h2 className="text-xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                        {subject.name}
                      </h2>
                      <Badge className="text-white" style={{ backgroundColor: getStatusColor(subject.status) }}>
                        {subject.status}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded"
                          style={{ backgroundColor: "#f0f0f0" }}
                        >
                          <span className="text-sm">📚</span>
                        </div>
                        <div>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            카테고리
                          </p>
                          <p className="font-medium" style={{ color: "#2C3E50" }}>
                            {subject.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded"
                          style={{ backgroundColor: "#f0f0f0" }}
                        >
                          <Target className="w-4 h-4" style={{ color: getDifficultyColor(subject.difficulty) }} />
                        </div>
                        <div>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            난이도
                          </p>
                          <Badge
                            className="text-white"
                            style={{ backgroundColor: getDifficultyColor(subject.difficulty) }}
                          >
                            {subject.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded"
                          style={{ backgroundColor: "#f0f0f0" }}
                        >
                          <Clock className="w-4 h-4" style={{ color: "#95A5A6" }} />
                        </div>
                        <div>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            기간
                          </p>
                          <p className="font-medium" style={{ color: "#2C3E50" }}>
                            {subject.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded"
                          style={{ backgroundColor: "#f0f0f0" }}
                        >
                          <User className="w-4 h-4" style={{ color: "#95A5A6" }} />
                        </div>
                        <div>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            담당강사
                          </p>
                          <p className="font-medium" style={{ color: "#2C3E50" }}>
                            {subject.instructor}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded"
                          style={{ backgroundColor: "#f0f0f0" }}
                        >
                          <Calendar className="w-4 h-4" style={{ color: "#95A5A6" }} />
                        </div>
                        <div>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            등록일
                          </p>
                          <p className="font-medium" style={{ color: "#2C3E50" }}>
                            {subject.createdDate}
                          </p>
                        </div>
                      </div>

                      {subject.prerequisites && (
                        <div className="pt-4 border-t">
                          <p className="text-sm font-medium mb-2" style={{ color: "#2C3E50" }}>
                            수강 조건
                          </p>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            {subject.prerequisites}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 우측: 과목 소개 */}
              <div className="lg:col-span-2 space-y-6">
                {/* 과목 소개 */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#2C3E50" }}>과목 소개</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed mb-6" style={{ color: "#2C3E50" }}>
                      {subject.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                        <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                          {subject.usedInCourses}
                        </div>
                        <div className="text-sm" style={{ color: "#95A5A6" }}>
                          사용 과정
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                        <div className="text-2xl font-bold" style={{ color: "#3498db" }}>
                          {subject.curriculum.length}
                        </div>
                        <div className="text-sm" style={{ color: "#95A5A6" }}>
                          커리큘럼 항목
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                        <div className="text-2xl font-bold" style={{ color: "#e67e22" }}>
                          {subject.objectives.length}
                        </div>
                        <div className="text-sm" style={{ color: "#95A5A6" }}>
                          학습 목표
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                        학습 목표
                      </h3>
                      <div className="space-y-3">
                        {subject.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#1ABC9C" }} />
                            <p style={{ color: "#2C3E50" }}>{objective}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 커리큘럼 */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#2C3E50" }}>커리큘럼</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subject.curriculum.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg"
                          style={{ borderColor: "#e0e0e0", backgroundColor: "#f8f9fa" }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium"
                                style={{ backgroundColor: "#1ABC9C" }}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                                  {item.topic}
                                </h4>
                                <p className="text-sm" style={{ color: "#95A5A6" }}>
                                  {item.week}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm ml-11" style={{ color: "#2C3E50" }}>
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 관련 과정 */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#2C3E50" }}>이 과목을 사용하는 과정</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {subject.relatedCourses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:border-emerald-500 cursor-pointer transition-colors"
                          style={{ borderColor: "#e0e0e0" }}
                          onClick={() => handleCourseClick(course.id)}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className="w-10 h-10 flex items-center justify-center rounded"
                              style={{ backgroundColor: "#f0f0f0" }}
                            >
                              <span className="text-sm">📖</span>
                            </div>
                            <div>
                              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                                {course.name}
                              </h4>
                              <p className="text-sm" style={{ color: "#95A5A6" }}>
                                수강생 {course.students}명
                              </p>
                            </div>
                          </div>
                          <Badge
                            className="text-white"
                            style={{ backgroundColor: getCourseStatusColor(course.status) }}
                          >
                            {course.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
