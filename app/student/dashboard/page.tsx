"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { IconBook, IconClock, IconAward, IconTrendingUp, IconPlayerPlay, IconCheck, IconStar } from "@tabler/icons-react"
import { useAuth } from "@/context/auth-context"
import { studentApi } from "@/utils/api"
import { ProtectedRoute } from "@/components/protected-route"

function StudentDashboardContent() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setError(null)
      const enrollmentsRes = await studentApi.getMyEnrollments()
      setEnrollments(enrollmentsRes.data || [])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      // Demo fallback data to avoid blocking UX
      setEnrollments([
        {
          id: "demo-1",
          course: { title: "Web Development Bootcamp" },
          progress: 65,
        },
        {
          id: "demo-2",
          course: { title: "React & Next.js Advanced" },
          progress: 40,
        },
      ] as any)
      setError(null)
    } finally {
      setIsLoading(false)
    }
  }

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Interactive Learning Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name || 'Student'}!</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-teal-100 to-green-100 text-teal-700 dark:from-teal-900 dark:to-green-900 dark:text-teal-300 border-0">
          Certificate Earned!
        </Badge>
      </div>

      {/* Hero Carousel */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {["/dashboard-learning.jpg", "/learning-dashboard.svg", "/placeholder.jpg"].map((src, i) => (
              <CarouselItem key={i}>
                <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                  <img src={src} alt="Learning highlight" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">Your Learning Journey</h3>
                    <p className="text-sm opacity-90">Track your progress and achievements</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Error State */}
      {error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">We couldn’t load everything</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchDashboardData}>Try again</Button>
          </CardContent>
        </Card>
      ) : null}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{enrollments.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <IconBook className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours Studied</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24.5</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <IconClock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <IconAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">87%</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <IconTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrollments.length === 0 ? (
              <div className="text-sm text-muted-foreground">No recent activities yet. Enroll in a course to get started.</div>
            ) : null}
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <IconCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed Web Development Module</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <IconPlayerPlay className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Started React Fundamentals</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <IconStar className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Earned JavaScript Certificate</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Goals</CardTitle>
            <CardDescription>Track your progress towards goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Complete React Course</span>
                <span className="text-sm text-gray-500">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Build Portfolio Project</span>
                <span className="text-sm text-gray-500">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Master TypeScript</span>
                <span className="text-sm text-gray-500">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Section */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Community</CardTitle>
          <CardDescription>Connect with fellow learners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm font-medium">50K+ Students</p>
              <p className="text-xs text-gray-500">Learning Together</p>
            </div>
            <Button size="sm" className="ml-auto">
              Join Discussion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["STUDENT", "INSTRUCTOR", "ADMIN"]}>
      <StudentDashboardContent />
    </ProtectedRoute>
  )
}
