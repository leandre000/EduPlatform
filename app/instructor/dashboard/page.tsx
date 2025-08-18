"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  FileText,
  BarChart3,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import Link from "next/link"
import { instructorApi } from "@/utils/api"

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const coursesRes = await instructorApi.getMyCourses()
      setCourses(coursesRes.data || [])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for charts
  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1900 },
    { month: "Mar", revenue: 1500 },
    { month: "Apr", revenue: 2500 },
    { month: "May", revenue: 2200 },
    { month: "Jun", revenue: 3000 },
  ]

  const enrollmentData = [
    { course: "Web Dev", students: 245 },
    { course: "React", students: 189 },
    { course: "Node.js", students: 156 },
    { course: "Python", students: 134 },
    { course: "UI/UX", students: 98 },
  ]

  const coursePerformance = [
    { name: "Completed", value: 65, color: "#10B981" },
    { name: "In Progress", value: 25, color: "#F59E0B" },
    { name: "Not Started", value: 10, color: "#EF4444" },
  ]

  const stats = [
    {
      title: "Total Courses",
      value: courses.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      change: "+12%",
    },
    {
      title: "Total Students",
      value: "1,234",
      icon: <Users className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
      change: "+23%",
    },
    {
      title: "Monthly Revenue",
      value: "$3,000",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      change: "+18%",
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      change: "+0.2",
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      students: 245,
      revenue: "$2,450",
      rating: 4.8,
      status: "Published",
    },
    {
      id: 2,
      title: "Advanced React & Next.js",
      students: 189,
      revenue: "$1,890",
      rating: 4.9,
      status: "Published",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      students: 156,
      revenue: "$1,560",
      rating: 4.7,
      status: "Draft",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      type: "assignment",
      title: "Grade React Project Submissions",
      count: 23,
      priority: "high",
    },
    {
      id: 2,
      type: "complaint",
      title: "Respond to Course Complaints",
      count: 3,
      priority: "medium",
    },
    {
      id: 3,
      type: "review",
      title: "Review Course Content Updates",
      count: 5,
      priority: "low",
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
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your courses and track your teaching performance.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/instructor/courses/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/instructor/analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Your earnings over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Student Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollments</CardTitle>
            <CardDescription>Students enrolled in your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: {
                  label: "Students",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <XAxis dataKey="course" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="students" fill="var(--color-students)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>My Courses</span>
                <Button size="sm" asChild>
                  <Link href="/instructor/courses">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge variant={course.status === "Published" ? "default" : "secondary"}>{course.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{course.students} students</span>
                      <span>{course.revenue} revenue</span>
                      <span>★ {course.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Pending Tasks & Course Performance */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-1 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {task.type === "assignment" ? (
                        <FileText className="w-4 h-4" />
                      ) : task.type === "complaint" ? (
                        <MessageSquare className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">{task.count} items</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Course Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Student completion rates</CardDescription>
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
                    <Pie data={coursePerformance} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {coursePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center gap-4 mt-4">
                {coursePerformance.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline" asChild>
              <Link href="/instructor/courses/create">
                <Plus className="w-6 h-6" />
                Create New Course
              </Link>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline" asChild>
              <Link href="/instructor/assignments">
                <FileText className="w-6 h-6" />
                Grade Assignments
              </Link>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline" asChild>
              <Link href="/instructor/complaints">
                <MessageSquare className="w-6 h-6" />
                Handle Complaints
              </Link>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline" asChild>
              <Link href="/instructor/analytics">
                <BarChart3 className="w-6 h-6" />
                View Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
