"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [userType, setUserType] = useState("director")
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  })

  const router = useRouter()

  // 더미 계정 정보
  const dummyAccounts = {
    admin: { id: "admin", password: "admin123", name: "시스템관리자", role: "admin" },
    director: { id: "director", password: "director123", name: "이지원", role: "director" },
    staff: { id: "staff", password: "staff123", name: "김직원", role: "staff" },
    instructor: { id: "instructor", password: "instructor123", name: "박강사", role: "instructor" },
    student: { id: "student", password: "student123", name: "최학생", role: "student" },
  }

  const handleLogin = (e) => {
    e.preventDefault()

    // 선택된 권한의 더미 계정과 비교
    const selectedAccount = dummyAccounts[userType]

    if (loginData.id === selectedAccount.id && loginData.password === selectedAccount.password) {
      // 로그인 성공 - 사용자 정보를 localStorage에 저장 (실제 프로젝트에서는 더 안전한 방법 사용)
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: selectedAccount.name,
          role: selectedAccount.role,
          userType: userType,
        }),
      )

      router.push("/dashboard")
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  const userTypes = [
    { value: "admin", label: "관리자", id: "admin" },
    { value: "director", label: "학원(학원장)", id: "director"},
    { value: "staff", label: "학원(일반직원)", id: "staff" },
    { value: "instructor", label: "강사", id: "instructor" },
    { value: "student", label: "학생", id: "student" },
  ]

  // 선택된 권한에 따른 계정 정보 표시
  const selectedAccountInfo = dummyAccounts[userType]

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userType">권한 선택</Label>
        <RadioGroup value={userType} onValueChange={setUserType} className="flex flex-wrap gap-2">
          {userTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              {/* <RadioGroupItem value={type.value} id={type.id} /> */}
              <input 
                type="radio" 
                value={type.value} 
                id={type.id} 
                checked={userType === type.value} 
                onChange={() => setUserType(type.value)} 
                className="align-middle" // 추가된 클래스
              />
              <Label 
                htmlFor={type.id} 
                className={`text-sm ${userType === type.value ? 'font-bold' : ''}`} 
                style={{ color: userType === type.value ? "#1ABC9C" : "inherit" }}
              >
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* 테스트 계정 정보 표시 */}
      <div className="p-3 rounded-lg" style={{ backgroundColor: "#f8f9fa", borderLeft: "4px solid #1ABC9C" }}>
        <p className="text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
          테스트 계정 정보
        </p>
        <p className="text-xs" style={{ color: "#95A5A6" }}>
          아이디: <span className="font-mono font-medium">{selectedAccountInfo.id}</span>
        </p>
        <p className="text-xs" style={{ color: "#95A5A6" }}>
          비밀번호: <span className="font-mono font-medium">{selectedAccountInfo.password}</span>
        </p>
        <p className="text-xs" style={{ color: "#95A5A6" }}>
          이름: <span className="font-medium">{selectedAccountInfo.name}</span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="loginId">아이디</Label>
        <Input
          id="loginId"
          placeholder="아이디를 입력하세요"
          value={loginData.id}
          onChange={(e) => setLoginData({ ...loginData, id: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="loginPassword">비밀번호</Label>
        <Input
          id="loginPassword"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
      </div>

      <Button type="submit" className="w-full text-white font-medium" style={{ backgroundColor: "#1ABC9C" }}>
        로그인
      </Button>

      {/* 전체 계정 정보 요약 */}
      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#f1f2f6" }}>
        <p className="text-xs font-medium mb-2" style={{ color: "#2C3E50" }}>
          전체 테스트 계정 목록:
        </p>
        <div className="space-y-1 text-xs" style={{ color: "#95A5A6" }}>
          <p>• 관리자: admin / admin123</p>
          <p>• 학원장: director / director123</p>
          <p>• 일반직원: staff / staff123</p>
          <p>• 강사: instructor / instructor123</p>
          <p>• 학생: student / student123</p>
        </div>
      </div>
    </form>
  )
}
