"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

        <Card>
          <CardHeader>
            <CardTitle>New Support Request</CardTitle>
            <CardDescription>Submit a ticket and our team will respond via email.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault()
                alert("Demo: ticket submitted")
              }}
            >
              <Input placeholder="Subject" required />
              <Textarea placeholder="Describe your issue" rows={4} required />
              <div className="flex gap-2">
                <Button type="submit">Submit</Button>
                <Button variant="outline" asChild>
                  <Link href="/student/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
