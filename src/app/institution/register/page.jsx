"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import PageLayout from "@/components/ui/page-layout"

export default function InstitutionRegisterPage() {
  const [formData, setFormData] = useState({
    institutionName: "",
    businessNumber: "",
    representative: "",
    phone: "",
    email: "",
    address: "",
    detailAddress: "",
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 기관 등록 로직
    console.log("기관 등록 데이터:", formData)
    alert("기관이 성공적으로 등록되었습니다!")
  }

  const handleReset = () => {
    setFormData({
      institutionName: "",
      businessNumber: "",
      representative: "",
      phone: "",
      email: "",
      address: "",
      detailAddress: "",
      description: "",
    })
  }

  return (
    <PageLayout currentPage="institution" userRole="admin">
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
              기관(학원) 등록
            </h1>
            <p className="text-lg" style={{ color: "#95A5A6" }}>
              새로운 학원을 시스템에 등록합니다.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#2C3E50" }}>기관 정보 입력</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">
                      기관명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="institutionName"
                      name="institutionName"
                      placeholder="학원명을 입력하세요"
                      value={formData.institutionName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessNumber">
                      사업자등록번호 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="businessNumber"
                      name="businessNumber"
                      placeholder="000-00-00000"
                      value={formData.businessNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="representative">
                      대표자명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="representative"
                      name="representative"
                      placeholder="대표자명을 입력하세요"
                      value={formData.representative}
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

                {/* 주소 정보 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      주소 <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="address"
                        name="address"
                        placeholder="기본 주소를 입력하세요"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}>
                        주소 검색
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detailAddress">상세 주소</Label>
                    <Input
                      id="detailAddress"
                      name="detailAddress"
                      placeholder="상세 주소를 입력하세요"
                      value={formData.detailAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* 기관 설명 */}
                <div className="space-y-2">
                  <Label htmlFor="description">기관 설명</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="기관에 대한 간단한 설명을 입력하세요"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                {/* 버튼 그룹 */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    초기화
                  </Button>
                  <Button type="submit" className="text-white font-medium" style={{ backgroundColor: "#1ABC9C" }}>
                    기관 등록
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 등록 안내 */}
          <Card className="mt-6" style={{ borderColor: "#1ABC9C", borderWidth: "1px" }}>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2" style={{ color: "#2C3E50" }}>
                등록 안내사항
              </h3>
              <ul className="space-y-1 text-sm" style={{ color: "#95A5A6" }}>
                <li>• 필수 항목(*)은 반드시 입력해주세요.</li>
                <li>• 사업자등록번호는 정확히 입력해주세요.</li>
                <li>• 등록 후 승인 과정을 거쳐 시스템 이용이 가능합니다.</li>
                <li>• 문의사항이 있으시면 관리자에게 연락해주세요.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageLayout>
  )
}
