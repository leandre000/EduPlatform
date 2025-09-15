"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconMail, IconEye, IconTrash } from "@tabler/icons-react"

export default function AdminContactMessagesPage() {
  const messages = [
    { id: 1, name: "Alice", email: "alice@example.com", subject: "Billing question", status: "new" },
    { id: 2, name: "Bob", email: "bob@example.com", subject: "Partnership", status: "read" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconMail className="w-5 h-5" />
            Inbox
          </CardTitle>
          <CardDescription>User inquiries from the contact form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{m.subject}</div>
                  <div className="text-sm text-muted-foreground">{m.name} • {m.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={m.status === "new" ? "default" : "secondary"}>{m.status}</Badge>
                  <Button size="sm" variant="outline"><IconEye className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline"><IconTrash className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


