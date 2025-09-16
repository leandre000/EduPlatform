"use client"

export default function StudentSchedulePage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Schedule</h1>
        <a href="/student/dashboard" className="text-sm underline">Back</a>
      </div>
      <p className="text-muted-foreground">Your upcoming sessions and deadlines will appear here.</p>
    </div>
  )
}
