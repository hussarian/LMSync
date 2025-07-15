export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
      <div className="mb-4">
        <Icon className="w-16 h-16 mx-auto" style={{ color: "#95A5A6" }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
        {title}
      </h3>
      <p style={{ color: "#95A5A6" }}>{description}</p>
    </div>
  )
}
