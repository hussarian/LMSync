"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Plus,
  MapPin,
  Users,
  Monitor,
  Wifi,
  Mic,
  Camera,
  Projector,
  Speaker,
  Keyboard,
  Mouse,
  Upload,
  Download,
  FileSpreadsheet,
} from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import PageLayout from "@/components/ui/page-layout"

const equipmentOptions = [
  { id: "projector", name: "프로젝터", icon: Projector },
  { id: "computer", name: "컴퓨터", icon: Monitor },
  { id: "wifi", name: "WiFi", icon: Wifi },
  { id: "microphone", name: "마이크", icon: Mic },
  { id: "camera", name: "카메라", icon: Camera },
  { id: "speaker", name: "스피커", icon: Speaker },
  { id: "keyboard", name: "키보드", icon: Keyboard },
  { id: "mouse", name: "마우스", icon: Mouse },
]

export default function ClassroomRegister() {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomName: "",
    capacity: "",
    building: "",
    floor: "",
    description: "",
    equipment: [],
  })

  const [availableEquipment, setAvailableEquipment] = useState(equipmentOptions)

  const sidebarItems = [
    { key: "rooms-list", label: "강의실 목록", href: "/classroom/rooms" },
    { key: "rooms-register", label: "강의실 등록", href: "/classroom/register" },
    ]

  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResults, setUploadResults] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddEquipment = (equipment) => {
    if (!formData.equipment.find((item) => item.id === equipment.id)) {
      setFormData((prev) => ({
        ...prev,
        equipment: [...prev.equipment, equipment],
      }))
    }
  }

  const handleRemoveEquipment = (equipmentId) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((item) => item.id !== equipmentId),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("강의실 등록:", formData)
    // 실제 등록 로직 구현
    alert("강의실이 성공적으로 등록되었습니다!")
  }

  const handleReset = () => {
    setFormData({
      roomNumber: "",
      roomName: "",
      capacity: "",
      building: "",
      floor: "",
      description: "",
      equipment: [],
    })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (
      file &&
      (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setUploadedFile(file)
    } else {
      alert("엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.")
    }
  }

  const handleExcelUpload = async () => {
    if (!uploadedFile) return

    setIsUploading(true)
    // 실제 업로드 로직 구현
    setTimeout(() => {
      setUploadResults({
        total: 15,
        success: 12,
        failed: 3,
        errors: [
          { row: 3, error: "강의실 호수가 중복됩니다." },
          { row: 7, error: "수용 인원이 유효하지 않습니다." },
          { row: 11, error: "건물명이 누락되었습니다." },
        ],
      })
      setIsUploading(false)
    }, 2000)
  }

  const downloadTemplate = () => {
    // 템플릿 다운로드 로직
    const link = document.createElement("a")
    link.href = "/templates/classroom-template.xlsx"
    link.download = "강의실_등록_템플릿.xlsx"
    link.click()
  }

  return (
    <PageLayout currentPage="classroom" userRole="staff" userName="김직원">
      <div className="flex">
        <Sidebar title="강의실 관리" menuItems={sidebarItems} currentPath="/classroom/register" />

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                강의실 등록
              </h1>
              <p className="text-gray-600">새로운 강의실 정보를 입력하거나 엑셀 파일로 일괄 등록하세요.</p>
            </div>

            {/* 엑셀 업로드 섹션 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" style={{ color: "#3498db" }} />
                  엑셀 파일 일괄 등록
                </CardTitle>
                <CardDescription>엑셀 파일을 업로드하여 여러 강의실을 한번에 등록할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={downloadTemplate}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Download className="w-4 h-4" />
                    템플릿 다운로드
                  </Button>
                  <span className="text-sm text-gray-500">먼저 템플릿을 다운로드하여 양식을 확인하세요.</span>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="flex flex-col items-center gap-2">
                      <Label htmlFor="excel-upload" className="cursor-pointer">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                          파일을 선택하거나 여기에 드래그하세요
                        </span>
                        <Input
                          id="excel-upload"
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </Label>
                      <p className="text-xs text-gray-500">Excel 파일만 지원 (.xlsx, .xls)</p>
                    </div>
                  </div>

                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">{uploadedFile.name}</span>
                          <span className="text-xs text-gray-500">({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                          className="p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {uploadedFile && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleExcelUpload}
                      disabled={isUploading}
                      style={{ backgroundColor: "#3498db" }}
                      className="hover:opacity-90"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          업로드 중...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          엑셀 파일 업로드
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {uploadResults && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">업로드 결과</h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-700">{uploadResults.total}</div>
                        <div className="text-sm text-gray-500">총 데이터</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{uploadResults.success}</div>
                        <div className="text-sm text-gray-500">성공</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{uploadResults.failed}</div>
                        <div className="text-sm text-gray-500">실패</div>
                      </div>
                    </div>

                    {uploadResults.errors.length > 0 && (
                      <div>
                        <h5 className="font-medium text-red-600 mb-2">오류 목록</h5>
                        <div className="space-y-1">
                          {uploadResults.errors.map((error, index) => (
                            <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                              행 {error.row}: {error.error}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2" style={{ color: "#f39c12" }}>
                    엑셀 업로드 안내사항
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 템플릿 파일의 양식을 반드시 준수해주세요.</li>
                    <li>• 강의실 호수는 중복될 수 없습니다.</li>
                    <li>• 수용 인원은 숫자로만 입력해주세요.</li>
                    <li>• 최대 100개의 강의실을 한번에 등록할 수 있습니다.</li>
                    <li>• 오류가 발생한 데이터는 개별적으로 수정 후 다시 업로드하세요.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 구분선 */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-4 text-sm text-gray-500 bg-gray-50">또는 개별 등록</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 기본 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" style={{ color: "#3498db" }} />
                    기본 정보
                  </CardTitle>
                  <CardDescription>강의실의 기본 정보를 입력하세요.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="roomNumber">강의실 호수 *</Label>
                      <Input
                        id="roomNumber"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleInputChange}
                        placeholder="예: 101, A-201"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomName">강의실명 *</Label>
                      <Input
                        id="roomName"
                        name="roomName"
                        value={formData.roomName}
                        onChange={handleInputChange}
                        placeholder="예: 컴퓨터실, 대강의실"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="capacity">수용 인원 *</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        placeholder="예: 30"
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="building">건물명 *</Label>
                      <Input
                        id="building"
                        name="building"
                        value={formData.building}
                        onChange={handleInputChange}
                        placeholder="예: 본관, A동"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="floor">층수 *</Label>
                      <Input
                        id="floor"
                        name="floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                        placeholder="예: 1층, 지하1층"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">강의실 설명</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="강의실에 대한 추가 설명을 입력하세요."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 장비 목록 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" style={{ color: "#3498db" }} />
                    보유 장비
                  </CardTitle>
                  <CardDescription>강의실에 설치된 장비를 선택하세요.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 선택된 장비 */}
                  {formData.equipment.length > 0 && (
                    <div>
                      <Label>선택된 장비</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.equipment.map((equipment) => {
                          const IconComponent = equipment.icon
                          return (
                            <Badge key={equipment.id} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                              <IconComponent className="w-3 h-3" />
                              {equipment.name}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() => handleRemoveEquipment(equipment.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* 사용 가능한 장비 */}
                  <div>
                    <Label>사용 가능한 장비</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {availableEquipment.map((equipment) => {
                        const IconComponent = equipment.icon
                        const isSelected = formData.equipment.find((item) => item.id === equipment.id)
                        return (
                          <Button
                            key={equipment.id}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className="flex items-center gap-2 justify-start"
                            onClick={() => handleAddEquipment(equipment)}
                            disabled={isSelected}
                          >
                            <IconComponent className="w-4 h-4" />
                            {equipment.name}
                            {!isSelected && <Plus className="w-3 h-3 ml-auto" />}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 등록 안내 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2" style={{ color: "#3498db" }}>
                      강의실 등록 안내
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 강의실 호수는 중복될 수 없습니다.</li>
                      <li>• 수용 인원은 실제 좌석 수를 기준으로 입력하세요.</li>
                      <li>• 장비 목록은 실제 설치된 장비만 선택하세요.</li>
                      <li>• 등록 후 강의실 정보는 언제든지 수정할 수 있습니다.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 버튼 영역 */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={handleReset}>
                  초기화
                </Button>
                <Button type="submit" style={{ backgroundColor: "#3498db" }} className="hover:opacity-90">
                  <Users className="w-4 h-4 mr-2" />
                  강의실 등록
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </PageLayout>
  )
} 