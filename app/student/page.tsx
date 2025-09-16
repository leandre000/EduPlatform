"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StudentPage() {
  console.log("StudentLayout rendered")
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Student Portal</h1>
        <p className="text-muted-foreground mb-4">Welcome to your learning space.</p>
        <Button asChild>
          <Link href="/student/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
