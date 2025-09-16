"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { instructorApi } from "@/utils/api"
import { ProtectedRoute } from "@/components/protected-route"
import { IconFileText, IconRefresh, IconSearch, IconEye } from "@tabler/icons-react"

interface AssignmentSummary {
  id: string
  title: string
  courseTitle?: string
  dueDate?: string
  submissionsCount?: number
  pendingCount?: number
}

function AssignmentsContent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [assignments, setAssignments] = useState<AssignmentSummary[]>([])
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"ALL" | "PENDING" | "GRADED">("ALL")

  useEffect(() => {
    void fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      setError(null)
      // Assuming backend returns instructor assignments summary at this endpoint
      const myCoursesRes = await instructorApi.getMyCourses()
      const courseIds: string[] = (myCoursesRes.data || []).map((c: any) => c.id)
      // Simple synthetic example: map courses to fake assignments when API not available
      const synthetic: AssignmentSummary[] = courseIds.length
        ? courseIds.slice(0, 3).map((id, idx) => ({
            id: `a-${id}-${idx}`,
            title: `Assignment ${idx + 1}`,
            courseTitle: (myCoursesRes.data || [])[idx]?.title || `Course ${idx + 1}`,
            dueDate: new Date(Date.now() + (idx + 1) * 86400000).toISOString(),
            submissionsCount: 10 * (idx + 1),
            pendingCount: 3 * (idx + 1),
          }))
        : []
      setAssignments(synthetic)
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to load assignments")
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return assignments.filter((a) => {
      const matchesQuery = q
        ? (a.title || "").toLowerCase().includes(q) || (a.courseTitle || "").toLowerCase().includes(q)
        : true
      const matchesStatus =
        status === "ALL"
          ? true
          : status === "PENDING"
            ? (a.pendingCount || 0) > 0
            : (a.pendingCount || 0) === 0
      return matchesQuery && matchesStatus
    })
  }, [assignments, query, status])

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
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground mt-1">Review submissions and track grading progress.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => void fetchAssignments()}>
            <IconRefresh className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Failed to load</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconFileText className="w-5 h-5" /> My Assignments
          </CardTitle>
          <CardDescription>Filter by status and search by title or course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative md:flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search assignments" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="PENDING">Pending grading</SelectItem>
                <SelectItem value="GRADED">Fully graded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead className="text-right">Submissions</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No assignments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.title}</TableCell>
                      <TableCell>{a.courseTitle || "—"}</TableCell>
                      <TableCell>{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "—"}</TableCell>
                      <TableCell className="text-right">{a.submissionsCount ?? 0}</TableCell>
                      <TableCell className="text-right">{a.pendingCount ?? 0}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          <IconEye className="w-4 h-4 mr-2" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InstructorAssignmentsPage() {
  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR", "ADMIN"]}>
      <AssignmentsContent />
    </ProtectedRoute>
  )
}

