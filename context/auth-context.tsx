"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { publicApi, userApi } from "@/utils/api"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN"
  avatar?: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: "STUDENT" | "INSTRUCTOR"
  bio?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      if (!token) {
        setIsLoading(false)
        return
      }

      const response = await userApi.getProfile()
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem("jwtToken")
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await publicApi.login({ email, password })
      // const { token, user: userData } = response.data

      // localStorage.setItem("jwt", token)
      // setUser(userData)

      toast.success("Login successful!")
      console.log("Login response:", response)

      // Redirect based on role
      // switch (userData.role) {
      //   case "ADMIN":
      //     router.push("/admin/dashboard")
      //     break
      //   case "INSTRUCTOR":
      //     router.push("/instructor/dashboard")
      //     break
      //   default:
      //     router.push("/student/dashboard")
      // }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Login failed")
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("jwtToken")
    setUser(null)
    router.push("/")
    toast.success("Logged out successfully")
  }

  const register = async (data: RegisterData) => {
    try {
      const endpoint = data.role === "STUDENT" ? publicApi.registerStudent : publicApi.registerInstructor

      await endpoint(data)
      toast.success("Registration successful! Please login.")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed")
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await userApi.updateProfile(data)
      setUser(response.data)
      toast.success("Profile updated successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed")
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
