"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconUpload } from "@tabler/icons-react"
import { ProtectedRoute } from "@/components/protected-route"
import { instructorApi } from "@/utils/api"

function ResourcesContent() {
  const [courses, setCourses] = useState<Array<{ id: string; title: string }>>([])
  const [courseId, setCourseId] = useState<string>("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const res = await instructorApi.getMyCourses()
      const opts = (res.data || []).map((c: any) => ({ id: String(c.id), title: c.title || String(c.id) }))
      setCourses(opts)
      setCourseId(opts[0]?.id || "")
    } catch {
      setCourses([])
    }
  }

  const handleUpload = async () => {
    if (!courseId || !files || files.length === 0) return
    try {
      setUploading(true)
      setMessage(null)
      const form = new FormData()
      // Using marking-guides endpoint as a stand-in for resource upload
      Array.from(files).forEach((file) => form.append("files", file))
      await instructorApi.uploadMarkingGuide(courseId, form)
      setMessage("Files uploaded successfully (demo)")
      setFiles(null)
      ;(document.getElementById("resource-files") as HTMLInputElement | null)?.value &&
        ((document.getElementById("resource-files") as HTMLInputElement).value = "")
    } catch {
      setMessage("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-muted-foreground mt-1">Upload course materials for your students.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconUpload className="w-5 h-5" /> Upload Resources
          </CardTitle>
          <CardDescription>Select a course and upload one or more files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={courseId} onValueChange={(v) => setCourseId(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input id="resource-files" type="file" multiple onChange={(e) => setFiles(e.target.files)} />
            <Button onClick={handleUpload} disabled={uploading || !courseId || !files || files.length === 0}>
              <IconUpload className="w-4 h-4 mr-2" /> {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
          {message ? <div className="text-sm text-muted-foreground">{message}</div> : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default function InstructorResourcesPage() {
  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR", "ADMIN"]}>
      <ResourcesContent />
    </ProtectedRoute>
  )
}

