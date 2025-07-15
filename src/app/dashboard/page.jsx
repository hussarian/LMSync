"use client"

import StatsCard from "@/components/ui/stats-card"
import PageLayout from "@/components/ui/page-layout"

export default function Dashboard() {
  const statsData = [
    {
      title: "오늘의 일정",
      value: "3개의",
      unit: "강의",
    },
    {
      title: "새로운 알림",
      value: "5개의",
      unit: "메시지",
    },
    {
      title: "진행 중인 과제",
      value: "2개의",
      unit: "과제",
    },
  ]

  return (
    <PageLayout currentPage="dashboard">
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
              LMSync에 오신 것을 환영합니다!
            </h1>
            <p className="text-lg" style={{ color: "#95A5A6" }}>
              이지원님, 좋은 하루 되세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsData.map((stat, index) => (
              <div key={index} className={index === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
                <StatsCard title={stat.title} value={stat.value} unit={stat.unit} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageLayout>
  )
}
