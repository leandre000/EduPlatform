export default function StudentPage() {
  console.log("StudentLayout rendered")
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Student Portal</h1>
      <p className="text-muted-foreground mb-4">Welcome to your learning space.</p>
      <a href="/student/dashboard" className="underline text-sm">Go to Dashboard</a>
    </div>
  )
}
