"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, DollarSign, AlertTriangle, Activity, Shield, BarChart3, Settings } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { adminApi } from "@/utils/api"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [complaints, setComplaints] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, complaintsRes] = await Promise.all([
        adminApi.getPlatformStats(),
        adminApi.getAllUsers({ limit: 10 }),
        adminApi.viewAllComplaints(),
      ])
      setStats(statsRes.data)
      setUsers(usersRes.data.users)
      setComplaints(complaintsRes.data)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for charts
  const userGrowthData = [
    { month: "Jan", students: 1200, instructors: 45, total: 1245 },
    { month: "Feb", students: 1450, instructors: 52, total: 1502 },
    { month: "Mar", students: 1680, instructors: 58, total: 1738 },
    { month: "Apr", students: 1920, instructors: 65, total: 1985 },
    { month: "May", students: 2150, instructors: 72, total: 2222 },
    { month: "Jun", students: 2380, instructors: 78, total: 2458 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 15000, courses: 120 },
    { month: "Feb", revenue: 18500, courses: 145 },
    { month: "Mar", revenue: 22000, courses: 168 },
    { month: "Apr", revenue: 26500, courses: 192 },
    { month: "May", revenue: 31000, courses: 215 },
    { month: "Jun", revenue: 35500, courses: 238 },
  ]

  const userDistribution = [
    { name: "Students", value: 85, color: "#10B981" },
    { name: "Instructors", value: 12, color: "#3B82F6" },
    { name: "Admins", value: 3, color: "#8B5CF6" },
  ]

  const courseCategories = [
    { category: "Web Development", courses: 45, students: 1250 },
    { category: "Data Science", courses: 32, students: 890 },
    { category: "Mobile Development", courses: 28, students: 720 },
    { category: "UI/UX Design", courses: 24, students: 650 },
    { category: "Digital Marketing", courses: 18, students: 480 },
    { category: "Business", courses: 15, students: 380 },
  ]

  const platformStats = [
    {
      title: "Total Users",
      value: "2,458",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      change: "+12.5%",
    },
    {
      title: "Total Courses",
      value: "238",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
      change: "+8.3%",
    },
    {
      title: "Monthly Revenue",
      value: "$35,500",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      change: "+15.2%",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      icon: <Activity className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      change: "+5.7%",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "INSTRUCTOR",
      joinDate: "2024-05-30",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "STUDENT",
      joinDate: "2024-05-29",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      role: "STUDENT",
      joinDate: "2024-05-28",
      status: "Pending",
    },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High Server Load",
      description: "Server CPU usage is above 80%",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "info",
      title: "Scheduled Maintenance",
      description: "System maintenance scheduled for tonight",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "error",
      title: "Payment Gateway Issue",
      description: "Some payment transactions are failing",
      time: "1 hour ago",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage the entire learning platform.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/admin/users">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Platform user growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Total Users",
                  color: "hsl(var(--chart-1))",
                },
                students: {
                  label: "Students",
                  color: "hsl(var(--chart-2))",
                },
                instructors: {
                  label: "Instructors",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stackId="1"
                    stroke="var(--color-total)"
                    fill="var(--color-total)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stackId="2"
                    stroke="var(--color-students)"
                    fill="var(--color-students)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="instructors"
                    stackId="3"
                    stroke="var(--color-instructors)"
                    fill="var(--color-instructors)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue & Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Course Growth</CardTitle>
            <CardDescription>Platform revenue and course creation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                courses: {
                  label: "Courses",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="courses"
                    stroke="var(--color-courses)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-courses)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Categories */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Categories Performance</CardTitle>
              <CardDescription>Courses and student enrollment by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  courses: {
                    label: "Courses",
                    color: "hsl(var(--chart-1))",
                  },
                  students: {
                    label: "Students",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseCategories}>
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="courses" fill="var(--color-courses)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="students" fill="var(--color-students)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Distribution & System Alerts */}
        <div className="space-y-6">
          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Platform user roles breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={userDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center gap-4 mt-4">
                {userDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div
                    className={`p-1 rounded-full ${
                      alert.type === "error"
                        ? "bg-red-100 text-red-600"
                        : alert.type === "warning"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Users</span>
              <Button size="sm" asChild>
                <Link href="/admin/users">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{user.role}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex-col gap-2" variant="outline" asChild>
                <Link href="/admin/users">
                  <Users className="w-6 h-6" />
                  Manage Users
                </Link>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline" asChild>
                <Link href="/admin/courses">
                  <BookOpen className="w-6 h-6" />
                  Manage Courses
                </Link>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline" asChild>
                <Link href="/admin/complaints">
                  <Shield className="w-6 h-6" />
                  Handle Complaints
                </Link>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="w-6 h-6" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
