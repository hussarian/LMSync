"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    name: "",
    id: "",
    password: "",
    role: "",
  })

  const handleRegister = (e) => {
    e.preventDefault()
    // 회원가입 로직 구현
    console.log("Register:", registerData)
  }

  const accountInfo = [
    { role: "관리자(admin)", credentials: "director / director123" },
    { role: "학원(학원장)", credentials: "director / director123" },
    { role: "직원(일반직원)", credentials: "staff / staff123" },
    { role: "강사", credentials: "instructor / instructor123" },
    { role: "학생", credentials: "student / student123" },
  ]

  return (
    <>
      <div className="text-center mb-4">
        <p className="text-sm" style={{ color: "#95A5A6" }}>
          대표 계정으로 먼저 로그인
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>관리자</Label>
            <div className="text-sm" style={{ color: "#95A5A6" }}>
              학원(학원장)
            </div>
          </div>
          <div className="space-y-2">
            <Label>강사</Label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>직원(일반직원)</Label>
          </div>
          <div className="space-y-2">
            <Label>학생</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>학생</Label>
        </div>

        <div className="text-xs space-y-1" style={{ color: "#95A5A6" }}>
          <p>각 권한별 계정 정보:</p>
          {accountInfo.map((info, index) => (
            <p key={index}>
              {info.role}: {info.credentials}
            </p>
          ))}
        </div>
      </form>
    </>
  )
}
