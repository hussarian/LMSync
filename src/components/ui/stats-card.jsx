import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatsCard({ title, value, unit, borderColor = "#1ABC9C" }) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow" style={{ borderColor }}>
      <CardHeader className="text-center">
        <CardTitle style={{ color: "#95A5A6" }}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-4xl font-bold mb-2" style={{ color: "#1ABC9C" }}>
          {value}
        </div>
        <div className="text-xl" style={{ color: "#2C3E50" }}>
          {unit}
        </div>
      </CardContent>
    </Card>
  )
}
