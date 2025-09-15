"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconShieldLock, IconAlertTriangle } from "@tabler/icons-react"

export default function AdminSecurityPage() {
  const checks = [
    { name: "JWT Signature", status: "pass" },
    { name: "HTTPS Only", status: "pass" },
    { name: "CORS Policy", status: "warn" },
    { name: "Rate Limiting", status: "pass" },
  ]

  const tone = (s: string) => (s === "pass" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300")

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Security</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconShieldLock className="w-5 h-5" />
            Security Checklist
          </CardTitle>
          <CardDescription>Overview of platform security checks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {checks.map((c) => (
            <div key={c.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="font-medium">{c.name}</div>
              <Badge className={tone(c.status)}>{c.status}</Badge>
            </div>
          ))}
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm">
            <IconAlertTriangle className="w-4 h-4" />
            Review CORS domains in environment config for production.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


