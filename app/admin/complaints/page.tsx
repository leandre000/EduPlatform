"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconShield, IconEye, IconCheck, IconX } from "@tabler/icons-react"

export default function AdminComplaintsPage() {
  const complaints = [
    { id: 1, subject: "Course content outdated", user: "John Smith", course: "React Basics", priority: "high", status: "open" },
    { id: 2, subject: "Assignment submission failed", user: "Sarah Johnson", course: "Node API", priority: "medium", status: "open" },
    { id: 3, subject: "Inappropriate content", user: "Mike Chen", course: "Design 101", priority: "low", status: "resolved" },
  ] as const

  const color = (p: string) =>
    p === "high"
      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      : p === "medium"
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Complaints</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconShield className="w-5 h-5" />
            Open Complaints
          </CardTitle>
          <CardDescription>Review and resolve user complaints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complaints.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{c.subject}</div>
                  <div className="text-sm text-muted-foreground">{c.user} • {c.course}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={color(c.priority)}>Priority: {c.priority}</Badge>
                  <Badge variant={c.status === "open" ? "default" : "secondary"}>{c.status}</Badge>
                  <Button size="sm" variant="outline"><IconEye className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline"><IconCheck className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline"><IconX className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


