"use client"
import { useState } from "react"
import "../styles/AccountRegistration.css"

const AccountRegistration = ({ activeSubMenu }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    address: "",
    zipCode: "",
    detailAddress: "",
    roles: {
      student: false,
      instructor: false,
      staff: false,
    },
  })

  const [csvFile, setCsvFile] = useState(null)
  const [showAddressSearch, setShowAddressSearch] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRoleChange = (role, checked) => {
    setFormData((prev) => ({
      ...prev,
      roles: {
        ...prev.roles,
        [role]: checked,
      },
    }))
  }

  const handleAddressSearch = () => {
    // 실제로는 다음 주소 API 등을 사용
    // 여기서는 샘플 데이터로 대체
    const sampleAddress = {
      zipCode: "06234",
      address: "서울특별시 강남구 테헤란로 123",
    }

    setFormData((prev) => ({
      ...prev,
      zipCode: sampleAddress.zipCode,
      address: sampleAddress.address,
    }))
    setShowAddressSearch(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 선택된 역할 확인
    const selectedRoles = Object.entries(formData.roles)
      .filter(([, selected]) => selected)
      .map(([role]) => role)

    if (selectedRoles.length === 0) {
      alert("최소 하나의 역할을 선택해주세요.")
      return
    }

    // 실제로는 서버에 등록 요청
    alert(`계정이 등록되었습니다.\n역할: ${selectedRoles.join(", ")}`)

    // 폼 초기화
    setFormData({
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      address: "",
      zipCode: "",
      detailAddress: "",
      roles: {
        student: false,
        instructor: false,
        staff: false,
      },
    })
  }

  const handleCsvUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCsvFile(file)
      // 실제로는 CSV 파일을 파싱하여 처리
      alert(`${file.name} 파일이 선택되었습니다.`)
    }
  }

  const processCsvFile = () => {
    if (!csvFile) {
      alert("CSV 파일을 선택해주세요.")
      return
    }

    // 실제로는 CSV 파일을 읽어서 일괄 등록 처리
    alert("CSV 파일을 통한 일괄 등록이 완료되었습니다.")
    setCsvFile(null)
  }

  const downloadSampleCsv = () => {
    // CSV 샘플 파일 다운로드
    const csvContent =
      "이름,전화번호,이메일,생년월일,우편번호,주소,상세주소,역할\n홍길동,010-1234-5678,hong@example.com,1990-01-01,12345,서울시 강남구,101호,student\n김철수,010-2345-6789,kim@example.com,1985-05-15,54321,서울시 서초구,202호,instructor"

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "account_registration_sample.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (activeSubMenu === "일괄 등록") {
    return (
      <div className="account-registration">
        <div className="registration-header">
          <h2>일괄 계정 등록</h2>
          <p>CSV 파일을 업로드하여 여러 계정을 한 번에 등록할 수 있습니다.</p>
        </div>

        <div className="csv-upload-section">
          <div className="upload-instructions">
            <h3>업로드 방법</h3>
            <ol>
              <li>아래 샘플 CSV 파일을 다운로드하세요.</li>
              <li>샘플 파일의 형식에 맞춰 데이터를 입력하세요.</li>
              <li>완성된 CSV 파일을 업로드하세요.</li>
            </ol>
            <button className="download-sample-btn" onClick={downloadSampleCsv}>
              📄 샘플 CSV 다운로드
            </button>
          </div>

          <div className="file-upload-area">
            <input type="file" accept=".csv" onChange={handleCsvUpload} className="csv-file-input" id="csvFile" />
            <label htmlFor="csvFile" className="file-upload-label">
              {csvFile ? csvFile.name : "CSV 파일 선택"}
            </label>
            {csvFile && (
              <button className="process-csv-btn" onClick={processCsvFile}>
                일괄 등록 실행
              </button>
            )}
          </div>

          <div className="csv-format-info">
            <h4>CSV 파일 형식</h4>
            <div className="format-table">
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>생년월일</th>
                    <th>우편번호</th>
                    <th>주소</th>
                    <th>상세주소</th>
                    <th>역할</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>홍길동</td>
                    <td>010-1234-5678</td>
                    <td>hong@example.com</td>
                    <td>1990-01-01</td>
                    <td>12345</td>
                    <td>서울시 강남구</td>
                    <td>101호</td>
                    <td>student</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="format-note">* 역할은 student, instructor, staff 중 하나를 입력하세요.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="account-registration">
      <div className="registration-header">
        <h2>개별 계정 등록</h2>
        <p>새로운 사용자 계정을 등록할 수 있습니다.</p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>기본 정보</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">전화번호 *</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="010-0000-0000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일 *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">생년월일 *</label>
              <input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>주소 정보</h3>
          <div className="address-section">
            <div className="address-search">
              <div className="form-group">
                <label htmlFor="zipCode">우편번호</label>
                <div className="zipcode-input">
                  <input
                    type="text"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="우편번호"
                    readOnly
                  />
                  <button type="button" className="address-search-btn" onClick={handleAddressSearch}>
                    우편번호 찾기
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">주소</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="주소"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="detailAddress">상세주소</label>
              <input
                type="text"
                id="detailAddress"
                value={formData.detailAddress}
                onChange={(e) => handleInputChange("detailAddress", e.target.value)}
                placeholder="상세주소를 입력하세요"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>역할 선택 *</h3>
          <div className="role-checkboxes">
            <label className="role-checkbox">
              <input
                type="checkbox"
                checked={formData.roles.student}
                onChange={(e) => handleRoleChange("student", e.target.checked)}
              />
              <span className="role-label">
                <span className="role-icon">👨‍🎓</span>
                <div>
                  <strong>학생</strong>
                  <p>강의 수강, 과제 제출, 시험 응시</p>
                </div>
              </span>
            </label>

            <label className="role-checkbox">
              <input
                type="checkbox"
                checked={formData.roles.instructor}
                onChange={(e) => handleRoleChange("instructor", e.target.checked)}
              />
              <span className="role-label">
                <span className="role-icon">👨‍🏫</span>
                <div>
                  <strong>강사</strong>
                  <p>강의 진행, 과제 및 시험 관리</p>
                </div>
              </span>
            </label>

            <label className="role-checkbox">
              <input
                type="checkbox"
                checked={formData.roles.staff}
                onChange={(e) => handleRoleChange("staff", e.target.checked)}
              />
              <span className="role-label">
                <span className="role-icon">👥</span>
                <div>
                  <strong>직원</strong>
                  <p>학원 관리, 학생 관리, 행정 업무</p>
                </div>
              </span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="reset-btn"
            onClick={() =>
              setFormData({
                name: "",
                phone: "",
                email: "",
                birthDate: "",
                address: "",
                zipCode: "",
                detailAddress: "",
                roles: { student: false, instructor: false, staff: false },
              })
            }
          >
            초기화
          </button>
          <button type="submit" className="submit-btn">
            계정 등록
          </button>
        </div>
      </form>

      {/* 우편번호 검색 모달 (간단한 예시) */}
      {showAddressSearch && (
        <div className="address-modal-overlay" onClick={() => setShowAddressSearch(false)}>
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>우편번호 찾기</h3>
              <button onClick={() => setShowAddressSearch(false)}>✕</button>
            </div>
            <div className="modal-content">
              <p>실제 구현시에는 다음 주소 API 등을 연동합니다.</p>
              <button onClick={handleAddressSearch}>샘플 주소 선택</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountRegistration
