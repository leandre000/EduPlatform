"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StudentSupportPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Support</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/student/dashboard">Back</Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Open tickets and responses will appear here.</p>
      </div>
    </div>
  )
}
