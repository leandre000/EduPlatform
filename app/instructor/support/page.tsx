"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { instructorApi } from "@/utils/api"
import { IconMessageCircle, IconSearch, IconSend, IconRefresh, IconFilter } from "@tabler/icons-react"
import { ProtectedRoute } from "@/components/protected-route"

type ComplaintStatus = "PENDING" | "RESOLVED"

interface Complaint {
  id: string
  subject: string
  description?: string
  courseId?: string
  createdAt?: string
  status?: ComplaintStatus
  student?: { id: string; name: string; email: string }
  responses?: Array<{ id: string; responseText: string; createdAt: string }>
}

function SupportContent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "ALL">("ALL")
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    void fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await instructorApi.viewInstructorComplaints()
      setComplaints(res.data || [])
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to load complaints")
    } finally {
      setLoading(false)
    }
  }

  const filteredComplaints = useMemo(() => {
    const q = query.trim().toLowerCase()
    return complaints.filter((c) => {
      const matchesQuery = q
        ? (c.subject || "").toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q) ||
          (c.student?.name || "").toLowerCase().includes(q)
        : true
      const matchesStatus = statusFilter === "ALL" ? true : (c.status || "PENDING") === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [complaints, query, statusFilter])

  const handleSendReply = async (complaintId: string) => {
    if (!replyText.trim()) return
    try {
      await instructorApi.respondToComplaint(complaintId, { responseText: replyText.trim(), status: "RESOLVED" })
      setReplyText("")
      setActiveReplyId(null)
      await fetchComplaints()
    } catch (e) {
      // Swallow to keep UI simple; could add a toast later
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-muted-foreground mt-1">View and respond to student complaints and tickets.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => void fetchComplaints()}>
            <IconRefresh className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Failed to load</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void fetchComplaints()}>Try again</Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconMessageCircle className="w-5 h-5" /> Complaints
          </CardTitle>
          <CardDescription>Filter and respond to student issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative md:flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by subject, description, or student"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <IconFilter className="w-4 h-4 text-muted-foreground" />
              <select
                className="border rounded-md px-2 py-2 bg-background"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | "ALL")}
              >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>

          <Separator />

          {filteredComplaints.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No complaints match your filters.</div>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((c) => (
                <div key={c.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{c.subject || "(No subject)"}</h3>
                        <Badge variant={c.status === "RESOLVED" ? "default" : "secondary"}>
                          {c.status || "PENDING"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-3xl">{c.description || "(No description)"}</p>
                      <div className="text-xs text-muted-foreground">
                        {c.student?.name ? `From ${c.student.name}` : "Unknown student"}
                        {c.createdAt ? ` • ${new Date(c.createdAt).toLocaleString()}` : null}
                        {c.courseId ? ` • Course: ${c.courseId}` : null}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {c.status !== "RESOLVED" ? (
                        <Button size="sm" onClick={() => setActiveReplyId(activeReplyId === c.id ? null : c.id)}>
                          Reply
                        </Button>
                      ) : null}
                    </div>
                  </div>

                  {activeReplyId === c.id ? (
                    <div className="mt-4 space-y-3">
                      <Textarea
                        placeholder="Write a response..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleSendReply(c.id)}>
                          <IconSend className="w-4 h-4 mr-2" /> Send & Mark Resolved
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setActiveReplyId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {c.responses && c.responses.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Responses</h4>
                      <div className="space-y-2">
                        {c.responses.map((r) => (
                          <div key={r.id} className="text-sm p-3 rounded-md bg-muted">
                            <div>{r.responseText}</div>
                            <div className="text-xs text-muted-foreground mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function InstructorSupportPage() {
  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR", "ADMIN"]}>
      <SupportContent />
    </ProtectedRoute>
  )
}

