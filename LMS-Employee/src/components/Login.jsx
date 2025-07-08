"use client"
import { useState } from "react"
import "../styles/Login.css"

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState("staff_director")
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  // 각 ���한별 샘플 계정 데이터 (5가지로 세분화)
  const accounts = {
    admin: {
      username: "admin",
      password: "admin123",
      userData: { id: 1, name: "시스템 관리자", role: "admin" },
    },
    staff_director: {
      username: "director",
      password: "director123",
      userData: { id: 2, name: "김학원장", role: "staff", position: "학원장" },
    },
    staff_general: {
      username: "staff",
      password: "staff123",
      userData: { id: 3, name: "이직원", role: "staff", position: "일반직원" },
    },
    instructor: {
      username: "instructor",
      password: "instructor123",
      userData: { id: 4, name: "박강사", role: "instructor", position: "수석강사" },
    },
    student: {
      username: "student",
      password: "student123",
      userData: { id: 5, name: "최학생", role: "student", position: "수강생" },
    },
  }

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const account = accounts[selectedRole]
    if (loginData.username === account.username && loginData.password === account.password) {
      onLogin(account.userData)
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  const handleQuickLogin = (role) => {
    const account = accounts[role]
    onLogin(account.userData)
  }

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "관리자"
      case "staff_director":
        return "직원(학원장)"
      case "staff_general":
        return "직원(일반직원)"
      case "instructor":
        return "강사"
      case "student":
        return "학생"
      default:
        return role
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-logo">LMSync</h1>
          <p className="login-subtitle">학습 관리 시스템</p>
        </div>

        <div className="role-selector">
          <div className="role-tabs">
            {Object.keys(accounts).map((role) => (
              <button
                key={role}
                className={`role-tab ${selectedRole === role ? "active" : ""}`}
                onClick={() => setSelectedRole(role)}
              >
                {getRoleText(role)}
              </button>
            ))}
          </div>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            로그인
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">데모 계정으로 빠른 로그인</p>
          <div className="demo-buttons">
            {Object.keys(accounts).map((role) => (
              <button key={role} className="demo-btn" onClick={() => handleQuickLogin(role)}>
                {getRoleText(role)}
              </button>
            ))}
          </div>
          <div className="demo-info">
            <p>각 권한별 계정 정보:</p>
            <ul>
              <li>관리자: admin / admin123</li>
              <li>직원(학원장): director / director123</li>
              <li>직원(일반직원): staff / staff123</li>
              <li>강사: instructor / instructor123</li>
              <li>학생: student / student123</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
