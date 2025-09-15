"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { IconBook, IconPlayerPlay, IconClock, IconStar, IconUsers, IconAward } from "@tabler/icons-react"
import { useState, useEffect } from "react"

type CourseSummary = {
  id: number
  title: string
  instructor: string
  thumbnail: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  students: number
  price: string
}

type Enrollment = {
  id: number
  course: CourseSummary
  progress: number
  completedLessons: number
  totalLessons: number
  enrolledAt: string
  lastAccessed: string
}

export default function StudentCoursesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEnrollments()
  }, [])

  const fetchEnrollments = async () => {
    try {
      // Mock data for now
      const mockEnrollments: Enrollment[] = [
        {
          id: 1,
          course: {
            id: 1,
            title: "Complete Web Development Bootcamp",
            instructor: "John Smith",
            thumbnail: "/placeholder.jpg",
            duration: "40 hours",
            level: "Beginner",
            rating: 4.8,
            students: 245,
            price: "$99",
          },
          progress: 75,
          completedLessons: 15,
          totalLessons: 20,
          enrolledAt: "2024-01-15",
          lastAccessed: "2024-01-20",
        },
        {
          id: 2,
          course: {
            id: 2,
            title: "Advanced React & Next.js",
            instructor: "Sarah Johnson",
            thumbnail: "/placeholder.jpg",
            duration: "25 hours",
            level: "Intermediate",
            rating: 4.9,
            students: 189,
            price: "$149",
          },
          progress: 45,
          completedLessons: 9,
          totalLessons: 20,
          enrolledAt: "2024-01-10",
          lastAccessed: "2024-01-19",
        },
        {
          id: 3,
          course: {
            id: 3,
            title: "Node.js Backend Development",
            instructor: "Mike Chen",
            thumbnail: "/placeholder.jpg",
            duration: "30 hours",
            level: "Advanced",
            rating: 4.7,
            students: 156,
            price: "$199",
          },
          progress: 20,
          completedLessons: 4,
          totalLessons: 20,
          enrolledAt: "2024-01-20",
          lastAccessed: "2024-01-18",
        },
      ]
      setEnrollments(mockEnrollments)
    } catch (error) {
      console.error("Failed to fetch enrollments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            Browse More Courses
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                <p className="text-2xl font-bold">{enrollments.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <IconBook className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <IconAward className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <IconPlayerPlay className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours Studied</p>
                <p className="text-2xl font-bold">24.5</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <IconClock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Learning Progress</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrollments.map((enrollment) => (
            <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                    <IconBook className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{enrollment.course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {enrollment.course.instructor}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getLevelColor(enrollment.course.level)}>
                        {enrollment.course.level}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <IconStar className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{enrollment.course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconUsers className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{enrollment.course.students}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{enrollment.completedLessons} of {enrollment.totalLessons} lessons</span>
                        <span>Last accessed: {new Date(enrollment.lastAccessed).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">
                        <IconPlayerPlay className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                      <Button variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
