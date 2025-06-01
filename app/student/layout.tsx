"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "STUDENT")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!user || user.role !== "STUDENT") {
    return null
  }

  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
