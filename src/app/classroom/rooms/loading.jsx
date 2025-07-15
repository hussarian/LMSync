"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function RoomsListLoading() {
  const sidebarMenuItems = [
    { href: "/classroom/rooms", label: "강의실 목록", key: "room-list" },
    { href: "/classroom/register", label: "강의실 등록", key: "room-register" },
  ]

  return (
    <PageLayout currentPage="classroom">
      <div className="flex">
        <Sidebar title="강의실 관리" menuItems={sidebarMenuItems} currentPath="/classroom/rooms" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            {/* 헤더 로딩 */}
            <div className="mb-8">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-6 w-96" />
            </div>

            {/* 검색 및 필터 카드 로딩 */}
            <Card className="mb-6">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <Skeleton className="flex-1 h-10" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 통계 카드들 로딩 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <Skeleton className="h-8 w-12 mx-auto mb-2" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 강의실 목록 테이블 로딩 */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {/* 테이블 헤더 로딩 */}
                  <div className="grid grid-cols-9 gap-4 pb-3 border-b">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  {/* 테이블 행들 로딩 */}
                  <div className="space-y-3 pt-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="grid grid-cols-9 gap-4 py-3 border-b border-gray-100">
                        <Skeleton className="h-4 w-16" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-12" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-2 w-16 rounded-full" />
                            <Skeleton className="h-3 w-8" />
                          </div>
                        </div>
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                        <div className="flex justify-center gap-2">
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageLayout>
  )
} 