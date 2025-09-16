"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StudentAssignmentsPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Assignments</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/student/dashboard">Back</Link>
          </Button>
        </div>
        <p className="text-muted-foreground">
          This is a placeholder for the student assignments page.
        </p>
      </div>
    </div>
  )
}


