"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { IconHome, IconBook, IconFileText, IconMessageCircle, IconSettings } from "@tabler/icons-react"

export function StudentMobileNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Only show for student area and on small screens via CSS
  const isStudentArea = pathname?.startsWith("/student")
  if (!isStudentArea || (user && user.role !== "STUDENT")) {
    return null
  }

  const items = [
    { href: "/student/dashboard", label: "Home", icon: IconHome },
    { href: "/student/courses", label: "Courses", icon: IconBook },
    { href: "/student/assignments", label: "Tasks", icon: IconFileText },
    { href: "/student/support", label: "Support", icon: IconMessageCircle },
    { href: "/student/settings", label: "Settings", icon: IconSettings },
  ]

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t bg-background md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 text-xs ${
                  active ? "text-teal-600" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 mb-1 ${active ? "text-teal-600" : ""}`} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}


