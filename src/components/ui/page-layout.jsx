"use client"

import Header from "@/components/layout/header"
import { useEffect, useState } from "react"

export default function PageLayout({ children, currentPage, backgroundColor = "#f8f9fa" }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // localStorage에서 현재 사용자 정보 가져오기
    const userInfo = localStorage.getItem("currentUser")
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo))
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <Header
        currentPage={currentPage}
        userRole={currentUser?.role || "admin"}
        userName={currentUser?.name || "사용자"}
      />
      {children}
      {/* <WindowsActivation /> */}
    </div>
  )
}
