"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconActivity, IconServer, IconCpu, IconClock } from "@tabler/icons-react"

export default function AdminSystemHealthPage() {
  const metrics = [
    { label: "Uptime", value: "99.98%", icon: <IconClock className="w-5 h-5" /> },
    { label: "CPU", value: "42%", icon: <IconCpu className="w-5 h-5" /> },
    { label: "Requests/min", value: "1.2k", icon: <IconActivity className="w-5 h-5" /> },
    { label: "Instances", value: "3", icon: <IconServer className="w-5 h-5" /> },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">System Health</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
                <div className="text-2xl font-semibold">{m.value}</div>
              </div>
              <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300">
                {m.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Latest system-level events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>Autoscaled to 3 instances · 5m ago</div>
          <div>Background job completed · 22m ago</div>
          <div>Database backup created · 1h ago</div>
        </CardContent>
      </Card>
    </div>
  )
}


