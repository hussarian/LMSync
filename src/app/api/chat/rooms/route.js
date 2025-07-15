import { NextResponse } from 'next/server'

// 백엔드 서버 URL
const BACKEND_URL = 'http://localhost:3001'

export async function GET(request) {
  try {
    // 백엔드 서버로 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/chat/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization 헤더 전달
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')
        })
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || '백엔드 서버 오류' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('채팅방 목록 조회 오류:', error)
    return NextResponse.json(
      { success: false, error: '백엔드 서버에 연결할 수 없습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // 백엔드 서버로 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/chat/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization 헤더 전달
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')
        })
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || '백엔드 서버 오류' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('채팅방 생성 오류:', error)
    return NextResponse.json(
      { success: false, error: '백엔드 서버에 연결할 수 없습니다.' },
      { status: 500 }
    )
  }
} 