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
  demoLogin: (role: "STUDENT" | "INSTRUCTOR" | "ADMIN") => void
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
      const expiresAtStr = localStorage.getItem("jwtExpiresAt")
      const now = Date.now()
      if (!token) {
        // Check for demo session
        const demoRole = localStorage.getItem("demoRole") as User["role"] | null
        if (demoRole) {
          setUser({
            id: "demo-user-id",
            name: `Demo ${demoRole.charAt(0)}${demoRole.slice(1).toLowerCase()}`,
            email: `demo+${demoRole.toLowerCase()}@edu.test`,
            role: demoRole,
            avatar: "/placeholder.svg",
          })
          setIsLoading(false)
          return
        }
        setIsLoading(false)
        return
      }

      // If token exists but expired, clear and exit
      if (expiresAtStr && now > Number(expiresAtStr)) {
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("jwtExpiresAt")
        localStorage.removeItem("demoRole")
        setIsLoading(false)
        return
      }

      // Support demo token without backend call
      if (token.startsWith("demo-")) {
        const demoRole = (localStorage.getItem("demoRole") as User["role"]) || "STUDENT"
        setUser({
          id: "demo-user-id",
          name: `Demo ${demoRole.charAt(0)}${demoRole.slice(1).toLowerCase()}`,
          email: `demo+${demoRole.toLowerCase()}@edu.test`,
          role: demoRole,
          avatar: "/placeholder.svg",
        })
      } else {
        const response = await userApi.getProfile()
        setUser(response.data)
      }
    } catch (error) {
      localStorage.removeItem("jwtToken")
      localStorage.removeItem("demoRole")
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

      // If backend returns a token, set 1-hour expiry fallback
      // const expiresAt = Date.now() + 60 * 60 * 1000
      // localStorage.setItem("jwtToken", token)
      // localStorage.setItem("jwtExpiresAt", String(expiresAt))

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
    localStorage.removeItem("jwtExpiresAt")
    localStorage.removeItem("demoRole")
    // clear cookie
    if (typeof document !== "undefined") {
      document.cookie = "jwtToken=; Max-Age=0; path=/"
    }
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

  const demoLogin = (role: "STUDENT" | "INSTRUCTOR" | "ADMIN") => {
    const demoToken = `demo-${role}-${Date.now()}`
    localStorage.setItem("jwtToken", demoToken)
    const expiresAt = Date.now() + 60 * 60 * 1000
    localStorage.setItem("jwtExpiresAt", String(expiresAt))
    localStorage.setItem("demoRole", role)
    if (typeof document !== "undefined") {
      // cookie with 1-hour expiry
      const expiresDate = new Date(expiresAt).toUTCString()
      document.cookie = `jwtToken=${demoToken}; expires=${expiresDate}; path=/`
    }
    const demoUser: User = {
      id: "demo-user-id",
      name: `Demo ${role.charAt(0)}${role.slice(1).toLowerCase()}`,
      email: `demo+${role.toLowerCase()}@edu.test`,
      role,
      avatar: "/placeholder.svg",
    }
    setUser(demoUser)
    toast.success(`Logged in as ${role.toLowerCase()} (demo)`)

    switch (role) {
      case "ADMIN":
        router.push("/admin/dashboard")
        break
      case "INSTRUCTOR":
        router.push("/instructor/dashboard")
        break
      default:
        router.push("/student/dashboard")
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
        demoLogin,
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
