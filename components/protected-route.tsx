"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconShield, IconLoader2 } from "@tabler/icons-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("STUDENT" | "INSTRUCTOR" | "ADMIN")[]
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, allowedRoles, fallback }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      setIsChecking(false)
    }
  }, [isLoading])

  // Show loading state
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <IconLoader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
            <p className="text-muted-foreground">Verifying access...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <IconShield className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Access Restricted</CardTitle>
            <CardDescription>
              You need to be logged in to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700"
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push("/register")}
                className="w-full"
              >
                Create Account
              </Button>
            </div>
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => router.push("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <IconShield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Insufficient Permissions</CardTitle>
            <CardDescription>
              You don't have the required permissions to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Required role: {allowedRoles.join(" or ")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your role: {user.role}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={() => {
                  // Redirect to appropriate dashboard based on user role
                  switch (user.role) {
                    case "ADMIN":
                      router.push("/admin/dashboard")
                      break
                    case "INSTRUCTOR":
                      router.push("/instructor/dashboard")
                      break
                    default:
                      router.push("/student/dashboard")
                  }
                }}
                className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700"
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push("/")}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // User is authenticated and has proper permissions
  return <>{children}</>
}
