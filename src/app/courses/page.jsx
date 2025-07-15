"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CoursesPage() {
  const router = useRouter()

  useEffect(() => {
    // 과정 관리 메인 페이지 접근 시 자동으로 과정 리스트로 리다이렉트
    router.push("/courses/list")
  }, [router])

  return null
}
 