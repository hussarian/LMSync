"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import PageLayout from "@/components/ui/page-layout"

export default function AccountRegisterPage() {
  const [formData, setFormData] = useState({
    userType: "staff",
    name: "",
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUserTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    // 계정 등록 로직
    console.log("새 계정 등록 데이터:", formData)
    alert(`${formData.name}님의 ${getUserTypeLabel(formData.userType)} 계정이 성공적으로 등록되었습니다!`)
  }

  const handleReset = () => {
    setFormData({
      userType: "staff",
      name: "",
      userId: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      description: "",
    })
  }

  const getUserTypeLabel = (type) => {
    switch (type) {
      case "director":
        return "학원장"
      case "staff":
        return "일반직원"
      case "instructor":
        return "강사"
      case "student":
        return "학생"
      default:
        return "사용자"
    }
  }

  const userTypes = [
    { value: "director", label: "학원장", id: "director" },
    { value: "staff", label: "일반직원", id: "staff" },
    { value: "instructor", label: "강사", id: "instructor" },
    { value: "student", label: "학생", id: "student" },
  ]

  return (
    <PageLayout currentPage="account-register">
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
              새 계정 등록
            </h1>
            <p className="text-lg" style={{ color: "#95A5A6" }}>
              새로운 사용자 계정을 시스템에 등록합니다.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#2C3E50" }}>계정 정보 입력</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 사용자 유형 선택 */}
                <div className="space-y-3">
                  <Label>
                    사용자 유형 <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={handleUserTypeChange}
                    className="flex flex-wrap gap-4"
                  >
                    {userTypes.map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.value} id={type.id} />
                        <Label htmlFor={type.id} className="cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* 기본 정보 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      이름 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="이름을 입력하세요"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userId">
                      아이디 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="userId"
                      name="userId"
                      placeholder="아이디를 입력하세요"
                      value={formData.userId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* 비밀번호 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      비밀번호 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      비밀번호 확인 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="비밀번호를 다시 입력하세요"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* 연락처 정보 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      이메일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      연락처 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* 소속 정보 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">소속 부서/과목</Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder={
                        formData.userType === "student"
                          ? "학과를 입력하세요"
                          : formData.userType === "instructor"
                            ? "담당 과목을 입력하세요"
                            : "소속 부서를 입력하세요"
                      }
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">직책/학년</Label>
                    <Input
                      id="position"
                      name="position"
                      placeholder={formData.userType === "student" ? "학년을 입력하세요" : "직책을 입력하세요"}
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* 추가 설명 */}
                <div className="space-y-2">
                  <Label htmlFor="description">추가 설명</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="추가적인 정보나 특이사항을 입력하세요"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* 버튼 그룹 */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    초기화
                  </Button>
                  <Button type="submit" className="text-white font-medium" style={{ backgroundColor: "#1ABC9C" }}>
                    계정 등록
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 등록 안내 */}
          <Card className="mt-6" style={{ borderColor: "#1ABC9C", borderWidth: "1px" }}>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2" style={{ color: "#2C3E50" }}>
                계정 등록 안내사항
              </h3>
              <ul className="space-y-1 text-sm" style={{ color: "#95A5A6" }}>
                <li>• 필수 항목(*)은 반드시 입력해주세요.</li>
                <li>• 아이디는 중복될 수 없으며, 영문과 숫자 조합을 권장합니다.</li>
                <li>• 비밀번호는 8자 이상으로 설정해주세요.</li>
                <li>• 등록된 계정은 즉시 시스템에서 사용 가능합니다.</li>
                <li>• 계정 정보는 나중에 수정할 수 있습니다.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageLayout>
  )
}
