"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, TrendingUp, Calendar, Play, CheckCircle, AlertCircle, Users } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { studentApi } from "@/utils/api"

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])
console.log("StudentDashboard rendered");
  const fetchDashboardData = async () => {
    try {
      const enrollmentsRes = await studentApi.getMyEnrollments()
      setEnrollments(enrollmentsRes.data || [])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for charts
  const progressData = [
    { month: "Jan", hours: 12 },
    { month: "Feb", hours: 19 },
    { month: "Mar", hours: 15 },
    { month: "Apr", hours: 25 },
    { month: "May", hours: 22 },
    { month: "Jun", hours: 30 },
  ]

  const skillsData = [
    { name: "Web Development", value: 35, color: "#0088FE" },
    { name: "Data Science", value: 25, color: "#00C49F" },
    { name: "UI/UX Design", value: 20, color: "#FFBB28" },
    { name: "Mobile Dev", value: 20, color: "#FF8042" },
  ]

  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 4.1 },
    { day: "Fri", hours: 2.9 },
    { day: "Sat", hours: 5.2 },
    { day: "Sun", hours: 3.7 },
  ]

  const stats = [
    {
      title: "Enrolled Courses",
      value: enrollments.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Hours Learned",
      value: "127",
      icon: <Clock className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Certificates",
      value: "3",
      icon: <Award className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Avg. Progress",
      value: "78%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      progress: 65,
      lastAccessed: "2 hours ago",
      instructor: "John Smith",
      nextLesson: "React Hooks Deep Dive",
    },
    {
      id: 2,
      title: "Python for Data Science",
      progress: 42,
      lastAccessed: "1 day ago",
      instructor: "Sarah Johnson",
      nextLesson: "Pandas DataFrames",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      progress: 89,
      lastAccessed: "3 days ago",
      instructor: "Mike Chen",
      nextLesson: "Prototyping with Figma",
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: "React Project Submission",
      course: "Web Development Bootcamp",
      dueDate: "2024-06-05",
      priority: "high",
    },
    {
      id: 2,
      title: "Data Analysis Assignment",
      course: "Python for Data Science",
      dueDate: "2024-06-08",
      priority: "medium",
    },
    {
      id: 3,
      title: "Design Portfolio Review",
      course: "UI/UX Design",
      dueDate: "2024-06-12",
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
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey and achieve your goals.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/student/profile">View Profile</Link>
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
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Continue Learning
              </CardTitle>
              <CardDescription>Pick up where you left off in your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Progress value={course.progress} className="w-20" />
                        <span className="text-sm">{course.progress}%</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</span>
                    </div>
                    <p className="text-sm text-teal-600 mt-1">Next: {course.nextLesson}</p>
                  </div>
                  <Button size="sm">Continue</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div
                  className={`p-1 rounded-full ${
                    deadline.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : deadline.priority === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{deadline.title}</h4>
                  <p className="text-xs text-muted-foreground">{deadline.course}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {new Date(deadline.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Hours spent learning over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: {
                  label: "Hours",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="var(--color-hours)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-hours)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Skills Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Distribution</CardTitle>
            <CardDescription>Your learning focus areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Hours",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={skillsData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Hours learned this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: {
                  label: "Hours",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium">Course Completed!</h4>
                <p className="text-sm text-muted-foreground">Finished "JavaScript Fundamentals"</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Assignment Submitted</h4>
                <p className="text-sm text-muted-foreground">React Project - Grade: A</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Study Streak</h4>
                <p className="text-sm text-muted-foreground">7 days in a row!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/courses">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse New Courses
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/student/assignments">
                <Calendar className="w-4 h-4 mr-2" />
                View Assignments
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/student/certificates">
                <Award className="w-4 h-4 mr-2" />
                My Certificates
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/student/complaints">
                <AlertCircle className="w-4 h-4 mr-2" />
                Submit Complaint
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
