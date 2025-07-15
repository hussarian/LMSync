"use client"

import { useState } from "react"
import { Users, Shield, Settings, Eye, Edit, Trash2, Plus, Check, X } from "lucide-react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import EmptyState from "@/components/ui/empty-state"

export default function PermissionPage() {
  const [userRole] = useState("director") // 실제로는 로그인한 사용자의 역할을 가져와야 함
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // TODO: API 연동 필요 - 직원 목록 데이터
  const staffList = []

  // TODO: API 연동 필요 - 현재 사용자의 권한 데이터
  const currentUserPermissions = []

  const sidebarMenuItems = [
    { href: "/permission/staff", label: "직원 관리", key: "staff-management" },
    { href: "/permission/roles", label: "역할 관리", key: "role-management" },
  ]

  const handleEditPermissions = (staff) => {
    setSelectedStaff(staff)
    setIsEditModalOpen(true)
  }

  const handleDeleteStaff = (staffId) => {
    if (confirm("정말로 이 직원을 삭제하시겠습니까?")) {
      console.log("직원 삭제:", staffId)
    }
  }

  // 학원장 화면 - 직원 목록 카드
  const DirectorView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
            직원 관리
          </h1>
          <p className="text-gray-600">직원들의 권한을 관리하고 역할을 설정할 수 있습니다.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" />새 직원 추가
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(52, 152, 219, 0.1)" }}>
              <Users className="w-6 h-6" style={{ color: "#3498db" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">전체 직원</p>
              <p className="text-2xl font-bold" style={{ color: "#3498db" }}>
                0명
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(46, 204, 113, 0.1)" }}>
              <Shield className="w-6 h-6" style={{ color: "#2ecc71" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">활성 직원</p>
              <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                0명
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(155, 89, 182, 0.1)" }}>
              <Settings className="w-6 h-6" style={{ color: "#9b59b6" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">강사</p>
              <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                0명
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(231, 76, 60, 0.1)" }}>
              <Users className="w-6 h-6" style={{ color: "#e74c3c" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">일반 직원</p>
              <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                0명
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 직원 카드 목록 */}
      {staffList.length === 0 ? (
        <EmptyState
          title="등록된 직원이 없습니다"
          description="새로운 직원을 추가하여 권한을 관리해보세요."
          action={
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />새 직원 추가
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((staff) => (
            <div key={staff.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={staff.avatar || "/placeholder.svg"}
                    alt={staff.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
                    <p className="text-sm text-gray-600">{staff.department}</p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          staff.status === "활성" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {staff.status}
                      </span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          staff.role === "instructor" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {staff.role === "instructor" ? "강사" : "직원"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">이메일:</span>
                    <span className="ml-2">{staff.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">연락처:</span>
                    <span className="ml-2">{staff.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">입사일:</span>
                    <span className="ml-2">{staff.joinDate}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">보유 권한</p>
                  <div className="flex flex-wrap gap-1">
                    {staff.permissions.slice(0, 3).map((permission, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {permission}
                      </span>
                    ))}
                    {staff.permissions.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{staff.permissions.length - 3}개
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => console.log("상세보기:", staff.id)} className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    상세보기
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEditPermissions(staff)} className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    권한수정
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteStaff(staff.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // 일반직원 화면 - 자신의 권한 목록
  const StaffView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
          내 권한 현황
        </h1>
        <p className="text-gray-600">현재 계정에 부여된 권한을 확인할 수 있습니다.</p>
      </div>

      {/* 권한 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(46, 204, 113, 0.1)" }}>
              <Check className="w-6 h-6" style={{ color: "#2ecc71" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">허용된 권한</p>
              <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                0개
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 rounded-full" style={{ backgroundColor: "rgba(231, 76, 60, 0.1)" }}>
              <X className="w-6 h-6" style={{ color: "#e74c3c" }} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">제한된 권한</p>
              <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                0개
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 권한 상세 목록 */}
      {currentUserPermissions.length === 0 ? (
        <EmptyState
          title="권한 정보가 없습니다"
          description="계정에 할당된 권한이 없거나 데이터를 불러올 수 없습니다."
        />
      ) : (
        <div className="space-y-6">
          {currentUserPermissions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.permissions.map((permission, permissionIndex) => (
                    <div key={permissionIndex} className="flex items-start justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                              permission.granted ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {permission.granted ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <X className="w-3 h-3 text-red-600" />
                            )}
                          </div>
                          <h4 className="font-medium text-gray-900">{permission.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 ml-8">{permission.description}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          permission.granted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {permission.granted ? "허용" : "제한"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="permission" userRole={userRole} />
      <div className="flex">
        <Sidebar title="권한 관리" menuItems={sidebarMenuItems} currentPath="" />
        <main className="flex-1 p-8">{userRole === "director" ? <DirectorView /> : <StaffView />}</main>
      </div>

      {/* 권한 수정 모달 */}
      {isEditModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedStaff?.name || "직원"} 권한 관리</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedStaff?.department || "부서"} · {selectedStaff?.email || "이메일"}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setIsEditModalOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 좌측: 직원 정보 */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={selectedStaff?.avatar || "/placeholder.svg"}
                      alt={selectedStaff?.name || "직원"}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{selectedStaff?.name || "직원"}</h4>
                      <p className="text-sm text-gray-600">{selectedStaff?.department || "부서"}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          selectedStaff?.status === "활성" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedStaff?.status || "상태"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">이메일:</span>
                      <span className="ml-2 text-gray-600">{selectedStaff?.email || "-"}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">연락처:</span>
                      <span className="ml-2 text-gray-600">{selectedStaff?.phone || "-"}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">입사일:</span>
                      <span className="ml-2 text-gray-600">{selectedStaff?.joinDate || "-"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">역할 설정</h5>
                  <select
                    defaultValue={selectedStaff?.role || "staff"}
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="staff">일반 직원</option>
                    <option value="instructor">강사</option>
                    <option value="admin">관리자</option>
                  </select>
                </div>
              </div>

              {/* 우측: 권한 설정 */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">시스템 권한</h4>
                  <p className="text-sm text-gray-600">각 모듈별로 세부 권한을 설정할 수 있습니다.</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      category: "계정 관리",
                      color: "blue",
                      permissions: [
                        {
                          name: "개별 계정 등록",
                          key: "account-individual",
                          description: "새로운 사용자 계정을 개별적으로 생성",
                        },
                        { name: "일괄 계정 등록", key: "account-bulk", description: "여러 사용자 계정을 한번에 생성" },
                        { name: "계정 정보 수정", key: "account-edit", description: "기존 사용자 계정 정보 수정" },
                        { name: "계정 삭제", key: "account-delete", description: "사용자 계정 삭제" },
                      ],
                    },
                    {
                      category: "학적 관리",
                      color: "green",
                      permissions: [
                        { name: "학생 정보 조회", key: "student-view", description: "학생들의 기본 정보 조회" },
                        { name: "학생 정보 수정", key: "student-edit", description: "학생들의 정보 수정" },
                        { name: "학생 등록", key: "student-register", description: "새로운 학생 등록" },
                        { name: "학생 삭제", key: "student-delete", description: "학생 정보 삭제" },
                      ],
                    },
                    {
                      category: "과정 관리",
                      color: "purple",
                      permissions: [
                        { name: "과정 조회", key: "course-view", description: "등록된 과정들 조회" },
                        { name: "과정 등록", key: "course-register", description: "새로운 과정 등록" },
                        { name: "과정 수정", key: "course-edit", description: "기존 과정 정보 수정" },
                        { name: "과정 삭제", key: "course-delete", description: "과정 삭제" },
                      ],
                    },
                    {
                      category: "강의실 관리",
                      color: "orange",
                      permissions: [
                        { name: "강의실 조회", key: "room-view", description: "강의실 현황 조회" },
                        { name: "강의실 예약", key: "room-reserve", description: "강의실 예약" },
                        { name: "강의실 등록", key: "room-register", description: "새로운 강의실 등록" },
                        { name: "강의실 삭제", key: "room-delete", description: "강의실 삭제" },
                      ],
                    },
                  ].map((module) => (
                    <div key={module.category} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className={`font-medium text-${module.color}-900`}>{module.category}</h5>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">전체 선택</span>
                          <input
                            type="checkbox"
                            className={`rounded border-${module.color}-300 text-${module.color}-600 focus:ring-${module.color}-500`}
                            onChange={(e) => {
                              // 전체 선택/해제 로직
                              const checkboxes = document.querySelectorAll(`input[data-category="${module.category}"]`)
                              checkboxes.forEach((cb) => (cb.checked = e.target.checked))
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {module.permissions.map((permission) => (
                          <div
                            key={permission.key}
                            className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              id={permission.key}
                              data-category={module.category}
                              defaultChecked={selectedStaff?.permissions?.some((p) =>
                                p.includes(permission.name.split(" ")[0]),
                              ) || false}
                              className={`mt-1 rounded border-${module.color}-300 text-${module.color}-600 focus:ring-${module.color}-500`}
                            />
                            <div className="flex-1">
                              <label htmlFor={permission.key} className="font-medium text-gray-900 cursor-pointer">
                                {permission.name}
                              </label>
                              <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <div className="text-sm text-gray-500">마지막 수정: {new Date().toLocaleDateString()}</div>
              <div className="flex space-x-3">
                <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                  취소
                </Button>
                <Button
                  onClick={() => {
                    console.log("권한 수정 저장")
                    setIsEditModalOpen(false)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  권한 저장
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
