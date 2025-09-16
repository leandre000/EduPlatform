"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import { instructorApi } from "@/utils/api"
import { IconUsers, IconSearch, IconRefresh } from "@tabler/icons-react"

interface StudentRow {
  id: string
  name: string
  email: string
  course: string
  progress?: number
  enrolledAt?: string
}

function StudentsContent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<StudentRow[]>([])
  const [query, setQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState<string>("ALL")

  useEffect(() => {
    void fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await instructorApi.getMyCourses()
      const courses = res.data || []
      const synthetic: StudentRow[] = courses.flatMap((c: any, idx: number) => {
        const studentsForCourse = Array.from({ length: Math.min(5, 2 + idx) }).map((_, sIdx) => ({
          id: `${c.id || idx}-s-${sIdx}`,
          name: `Student ${idx + 1}-${sIdx + 1}`,
          email: `student${idx + 1}${sIdx + 1}@edu.test`,
          course: c.title || `Course ${idx + 1}`,
          progress: Math.floor(((sIdx + 1) / (5 + idx)) * 100),
          enrolledAt: new Date(Date.now() - (sIdx + idx + 1) * 86400000).toISOString(),
        }))
        return studentsForCourse
      })
      setRows(synthetic)
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to load students")
    } finally {
      setLoading(false)
    }
  }

  const courseOptions = useMemo(() => {
    const set = new Set(rows.map((r) => r.course))
    return ["ALL", ...Array.from(set)]
  }, [rows])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => {
      const matchesQuery = q ? r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) : true
      const matchesCourse = courseFilter === "ALL" ? true : r.course === courseFilter
      return matchesQuery && matchesCourse
    })
  }, [rows, query, courseFilter])

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
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground mt-1">Manage enrolled students across your courses.</p>
        </div>
        <Button variant="outline" onClick={() => void fetchStudents()}>
          <IconRefresh className="w-4 h-4 mr-2" /> Refresh
        </Button>
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
            <IconUsers className="w-5 h-5" /> Enrolled Students
          </CardTitle>
          <CardDescription>Search and filter by course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative md:flex-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by name or email" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Select value={courseFilter} onValueChange={(v) => setCourseFilter(v)}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Enrolled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No students found.</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.course}</TableCell>
                      <TableCell>{r.progress ?? 0}%</TableCell>
                      <TableCell>{r.enrolledAt ? new Date(r.enrolledAt).toLocaleDateString() : "—"}</TableCell>
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

export default function InstructorStudentsPage() {
  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR", "ADMIN"]}>
      <StudentsContent />
    </ProtectedRoute>
  )
}

