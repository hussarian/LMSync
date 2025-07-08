"use client"
import { useState } from "react"
import "../styles/ClassroomRegistration.css"

const ClassroomRegistration = ({ classrooms, setClassrooms }) => {
  const [excelFile, setExcelFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState("")
  const [previewData, setPreviewData] = useState([])
  const [showPreview, setShowPreview] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setExcelFile(file)
      setUploadStatus("")
      // 실제로는 파일을 읽어서 미리보기 데이터 생성
      // 여기서는 샘플 데이터로 대체
      const sampleData = [
        {
          roomNumber: "301",
          name: "AI 실습실",
          capacity: 35,
          location: "3층",
          availableHours: "09:00 - 20:00",
          equipment: "컴퓨터(35), GPU서버(2), 프로젝터(1)",
          features: "WiFi, 고성능 네트워크, GPU 클러스터",
        },
        {
          roomNumber: "302",
          name: "모바일 개발실",
          capacity: 28,
          location: "3층",
          availableHours: "09:00 - 18:00",
          equipment: "컴퓨터(28), 아이패드(28), 안드로이드 태블릿(28)",
          features: "WiFi, 모바일 테스트 환경",
        },
      ]
      setPreviewData(sampleData)
      setShowPreview(true)
    }
  }

  const processExcelData = () => {
    if (!excelFile) {
      alert("파일을 선택해주세요.")
      return
    }

    // 실제로는 Excel 파일을 파싱하여 처리
    const newClassrooms = previewData.map((data, index) => ({
      id: Math.max(...classrooms.map((c) => c.id), 0) + index + 1,
      roomNumber: data.roomNumber,
      name: data.name,
      capacity: Number.parseInt(data.capacity),
      isActive: true,
      currentCourse: null,
      availableHours: data.availableHours,
      equipment: parseEquipment(data.equipment),
      features: data.features.split(",").map((f) => f.trim()),
      location: data.location,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    }))

    setClassrooms([...classrooms, ...newClassrooms])
    setUploadStatus(`${newClassrooms.length}개의 강의실이 성공적으로 등록되었습니다.`)
    setExcelFile(null)
    setPreviewData([])
    setShowPreview(false)

    // 파일 입력 초기화
    const fileInput = document.getElementById("excelFile")
    if (fileInput) fileInput.value = ""
  }

  const parseEquipment = (equipmentString) => {
    // "컴퓨터(35), GPU서버(2), 프로젝터(1)" 형태의 문자열을 파싱
    const equipmentArray = []
    const items = equipmentString.split(",")

    items.forEach((item) => {
      const match = item.trim().match(/^(.+)$$(\d+)$$$/)
      if (match) {
        equipmentArray.push({
          name: match[1].trim(),
          quantity: Number.parseInt(match[2]),
          description: "",
        })
      }
    })

    return equipmentArray
  }

  const downloadSampleExcel = () => {
    // Excel 샘플 파일 다운로드 (실제로는 Excel 파일 생성)
    const csvContent = `강의실호수,강의실명,수용인원,위치,사용가능시간,장비목록,부가기능
301,AI 실습실,35,3층,09:00 - 20:00,"컴퓨터(35), GPU서버(2), 프로젝터(1)","WiFi, 고성능 네트워크, GPU 클러스터"
302,모바일 개발실,28,3층,09:00 - 18:00,"컴퓨터(28), 아이패드(28), 안드로이드 태블릿(28)","WiFi, 모바일 테스트 환경"
303,회의실,15,3층,09:00 - 21:00,"회의용 테이블(1), 의자(15), TV(1)","WiFi, 화상회의 시설"`

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "classroom_registration_sample.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="classroom-registration">
      <div className="registration-header">
        <h2>강의실 등록</h2>
        <p>Excel 파일을 업로드하여 여러 강의실을 한 번에 등록할 수 있습니다.</p>
      </div>

      <div className="upload-instructions">
        <h3>업로드 방법</h3>
        <div className="instruction-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>샘플 파일 다운로드</h4>
              <p>아래 버튼을 클릭하여 샘플 Excel 파일을 다운로드하세요.</p>
              <button className="download-sample-btn" onClick={downloadSampleExcel}>
                📄 샘플 Excel 파일 다운로드
              </button>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>데이터 입력</h4>
              <p>샘플 파일의 형식에 맞춰 강의실 정보를 입력하세요.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>파일 업로드</h4>
              <p>완성된 Excel 파일을 업로드하여 강의실을 등록하세요.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="file-upload-section">
        <div className="upload-area">
          <input
            type="file"
            id="excelFile"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="file-input"
          />
          <label htmlFor="excelFile" className="file-upload-label">
            <div className="upload-icon">📁</div>
            <div className="upload-text">
              {excelFile ? excelFile.name : "Excel 파일을 선택하거나 드래그하여 업로드하세요"}
            </div>
            <div className="upload-hint">지원 형식: .xlsx, .xls, .csv</div>
          </label>
        </div>

        {uploadStatus && (
          <div className={`upload-status ${uploadStatus.includes("성공") ? "success" : "error"}`}>{uploadStatus}</div>
        )}
      </div>

      {showPreview && (
        <div className="preview-section">
          <h3>미리보기</h3>
          <p>업로드할 강의실 데이터를 확인하세요.</p>
          <div className="preview-table-container">
            <table className="preview-table">
              <thead>
                <tr>
                  <th>강의실 호수</th>
                  <th>강의실명</th>
                  <th>수용인원</th>
                  <th>위치</th>
                  <th>사용시간</th>
                  <th>주요 장비</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.roomNumber}</td>
                    <td>{data.name}</td>
                    <td>{data.capacity}명</td>
                    <td>{data.location}</td>
                    <td>{data.availableHours}</td>
                    <td>{data.equipment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="preview-actions">
            <button className="cancel-btn" onClick={() => setShowPreview(false)}>
              취소
            </button>
            <button className="confirm-btn" onClick={processExcelData}>
              {previewData.length}개 강의실 등록
            </button>
          </div>
        </div>
      )}

      <div className="format-guide">
        <h3>파일 형식 안내</h3>
        <div className="format-table">
          <table>
            <thead>
              <tr>
                <th>컬럼명</th>
                <th>설명</th>
                <th>예시</th>
                <th>필수여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>강의실호수</td>
                <td>강의실 번호</td>
                <td>301, A-101</td>
                <td>필수</td>
              </tr>
              <tr>
                <td>강의실명</td>
                <td>강의실 이름</td>
                <td>AI 실습실</td>
                <td>필수</td>
              </tr>
              <tr>
                <td>수용인원</td>
                <td>최대 수용 가능 인원</td>
                <td>35</td>
                <td>필수</td>
              </tr>
              <tr>
                <td>위치</td>
                <td>강의실 위치</td>
                <td>3층, A동 2층</td>
                <td>필수</td>
              </tr>
              <tr>
                <td>사용가능시간</td>
                <td>강의실 사용 가능 시간</td>
                <td>09:00 - 20:00</td>
                <td>필수</td>
              </tr>
              <tr>
                <td>장비목록</td>
                <td>장비명(수량) 형태로 입력</td>
                <td>컴퓨터(35), 프로젝터(1)</td>
                <td>선택</td>
              </tr>
              <tr>
                <td>부가기능</td>
                <td>쉼표로 구분된 기능 목록</td>
                <td>WiFi, 에어컨, 음향시설</td>
                <td>선택</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClassroomRegistration
