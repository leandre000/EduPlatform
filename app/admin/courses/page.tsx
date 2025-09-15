"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { IconBook, IconSearch, IconFilter, IconPlus, IconEdit, IconTrash, IconEye, IconUsers, IconStar } from "@tabler/icons-react"
import { useState } from "react"

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      students: 245,
      rating: 4.8,
      status: "Published",
      category: "Web Development",
      price: "$99",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Advanced React & Next.js",
      instructor: "Sarah Johnson",
      students: 189,
      rating: 4.9,
      status: "Published",
      category: "Web Development",
      price: "$149",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      instructor: "Mike Chen",
      students: 156,
      rating: 4.7,
      status: "Draft",
      category: "Data Science",
      price: "$199",
      createdAt: "2024-01-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Under Review":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage all platform courses and content.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <IconPlus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">238</p>
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
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">195</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <IconBook className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <IconBook className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <IconBook className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Search and manage platform courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <IconFilter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Courses Table */}
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                    <IconBook className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Created {new Date(course.createdAt).toLocaleDateString()}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <IconUsers className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconStar className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                    <span className="text-sm font-semibold">{course.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <IconEye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <IconEdit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <IconTrash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
