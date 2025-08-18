"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { user, isLoading } = useAuth()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!isLoading && (!user || user.role !== "ADMIN")) {
  //     router.push("/login")
  //   }
  // }, [user, isLoading, router])

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
  //     </div>
  //   )
  // }

  // if (!user || user.role !== "ADMIN") {
  //   return null
  // }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
