"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { InstructorSidebar } from "@/components/instructor/instructor-sidebar"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "INSTRUCTOR")) {
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

  if (!user || user.role !== "INSTRUCTOR") {
    return null
  }

  return (
    <SidebarProvider>
      <InstructorSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
