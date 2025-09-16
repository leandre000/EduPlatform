"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

export default function StudentSettingsPage() {
  const { logout } = useAuth()
  return (
    <div className="p-6 max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <a href="/student/dashboard" className="text-sm underline">Back</a>
      </div>
      <p className="text-muted-foreground">Update your profile and preferences here.</p>

      <div className="mt-2 grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Appearance</h2>
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </section>
        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Session</h2>
          <p className="text-sm text-muted-foreground mt-1">Token expires 1 hour after login.</p>
          <div className="mt-3">
            <Button variant="destructive" onClick={logout}>
              Log out
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}



