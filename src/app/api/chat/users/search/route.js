import { NextResponse } from 'next/server'

// 백엔드 서버 URL
const BACKEND_URL = 'http://localhost:3001'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'all'

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { success: false, error: '검색어를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 백엔드 서버로 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/chat/users/search?q=${encodeURIComponent(query)}&type=${type}`, {
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
    console.error('사용자 검색 오류:', error)
    return NextResponse.json(
      { success: false, error: '백엔드 서버에 연결할 수 없습니다.' },
      { status: 500 }
    )
  }
} 