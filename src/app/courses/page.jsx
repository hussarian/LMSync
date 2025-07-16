"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import React from "react"

// 과정(코스) 메인 페이지 컴포넌트
export default function CoursesPage() {
  const router = useRouter()

  useEffect(() => {
    // 과정 관리 메인 페이지 접근 시 자동으로 과정 리스트로 리다이렉트
    router.push("/courses/list")
  }, [router])

  // 렌더링: 간단한 안내 메시지
  return <div>과정(코스) 메인 페이지입니다.</div>
}
 