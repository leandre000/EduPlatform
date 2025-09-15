"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconDatabase, IconCloudUpload } from "@tabler/icons-react"

export default function AdminDatabasePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Database</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><IconDatabase className="w-5 h-5" /> Backups</CardTitle>
            <CardDescription>Snapshot and restore backups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">Last backup: 2 hours ago</div>
            <Button><IconCloudUpload className="w-4 h-4 mr-2" /> Create Backup</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Size</CardTitle>
            <CardDescription>Current database usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">12.4 GB</div>
            <div className="text-sm text-muted-foreground">Growth: +4% this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connections</CardTitle>
            <CardDescription>Active client connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">82</div>
            <div className="text-sm text-muted-foreground">Peak today: 121</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


