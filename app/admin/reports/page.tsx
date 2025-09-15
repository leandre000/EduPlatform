"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconFileText, IconDownload } from "@tabler/icons-react"

export default function AdminReportsPage() {
  const reports = [
    { id: 1, name: "Monthly Revenue", period: "Last month" },
    { id: 2, name: "User Growth", period: "Last quarter" },
    { id: 3, name: "Course Performance", period: "YTD" },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><IconFileText className="w-5 h-5" /> Generate Reports</CardTitle>
          <CardDescription>Export platform data for analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.period}</div>
              </div>
              <Button variant="outline"><IconDownload className="w-4 h-4 mr-2" /> Download CSV</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}


