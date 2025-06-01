"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Shield,
  Database,
  Mail,
  Activity,
  ChevronUp,
  GraduationCap,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Complaints",
    url: "/admin/complaints",
    icon: MessageSquare,
  },
  {
    title: "Contact Messages",
    url: "/admin/contact",
    icon: Mail,
  },
  {
    title: "System Health",
    url: "/admin/system",
    icon: Activity,
  },
  {
    title: "Security",
    url: "/admin/security",
    icon: Shield,
  },
  {
    title: "Database",
    url: "/admin/database",
    icon: Database,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: AlertTriangle,
  },
]

export function AdminSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-600 to-red-600 text-white">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">EduPlatform</span>
                  <span className="truncate text-xs">Admin Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
