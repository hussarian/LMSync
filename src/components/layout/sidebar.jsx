"use client"

import Link from "next/link"

export default function Sidebar({ title, menuItems, currentPath = "" }) {
  return (
    <aside className="w-64 min-h-screen p-4" style={{ backgroundColor: "#f1f2f6" }}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
          {title}
        </h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={
              item.href === "/lectures"
                ? "/instructor/lectures/history"
                : item.href === "/question-bank"
                  ? "/instructor/exam/question-bank"
                  : item.href === "/grades"
                    ? "/student/grades"
                    : item.href === "/qr-check-in"
                      ? "/student/my-courses/qr-check-in"
                      : item.href
            }
            scroll={false}
            className={`block px-4 py-2 rounded hover:bg-gray-200 transition-colors ${
              currentPath === item.href ? "bg-gray-200" : ""
            }`}
            style={{ color: "#2C3E50" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
