"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { ProtectedRoute } from "@/components/protected-route"

export default function StudentAreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["STUDENT", "INSTRUCTOR", "ADMIN"]}>
      <SidebarProvider>
        <StudentSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}


