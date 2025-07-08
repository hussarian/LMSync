"use client"
import { useState } from "react"
import StaffList from "./StaffList"
import PermissionEditor from "./PermissionEditor"
import MyPermissions from "./MyPermissions"
import "../styles/PermissionManagement.css"

const PermissionManagement = ({ currentUser }) => {
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [view, setView] = useState("list") // "list", "editor", "myPermissions"

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff)
    setView("editor")
  }

  const handleBackToList = () => {
    setSelectedStaff(null)
    setView("list")
  }

  // 학원장인지 일반직원인지 확인
  const isDirector = currentUser.position === "학원장"

  if (!isDirector) {
    // 일반직원은 본인 권한만 조회
    return <MyPermissions currentUser={currentUser} />
  }

  return (
    <div className="permission-management">
      {view === "list" && <StaffList onStaffSelect={handleStaffSelect} showRequestButton={true} />}
      {view === "editor" && selectedStaff && <PermissionEditor staff={selectedStaff} onBack={handleBackToList} />}
    </div>
  )
}

export default PermissionManagement
