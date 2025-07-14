"use client"

import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function CoursesPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // 과정 관리 메인 페이지 접근 시 자동으로 과정 리스트로 리다이렉트
    navigate("/courses/list")
  }, [navigate])

  return null
}
