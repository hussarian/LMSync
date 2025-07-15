"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function SurveyPage() {
 const router = useRouter()

 useEffect(() => {
  router.push("/survey/items")
 }, [router])

 return null
}
