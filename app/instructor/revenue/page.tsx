"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconCurrencyDollar, IconTrendingUp, IconUsers, IconStar } from "@tabler/icons-react"
import { ProtectedRoute } from "@/components/protected-route"

function RevenueContent() {
  const payouts = useMemo(
    () => [
      { id: "p-1", date: "2025-08-30", amount: 450.0, status: "PAID", method: "Bank" },
      { id: "p-2", date: "2025-07-30", amount: 380.5, status: "PAID", method: "Bank" },
      { id: "p-3", date: "2025-06-30", amount: 512.25, status: "PAID", method: "Bank" },
    ],
    [],
  )

  const summary = useMemo(
    () => ({
      mrr: 3000,
      totalStudents: 1234,
      avgRating: 4.8,
      monthChange: 0.18,
    }),
    [],
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Revenue</h1>
        <p className="text-muted-foreground mt-1">Earnings, payouts, and sales performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${summary.mrr.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+{Math.round(summary.monthChange * 100)}% from last month</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <IconCurrencyDollar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{summary.totalStudents.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <IconUsers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">{summary.avgRating}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <IconStar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-2xl font-bold">+{Math.round(summary.monthChange * 100)}%</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <IconTrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payouts</CardTitle>
          <CardDescription>Recent payouts to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                    <TableCell>${p.amount.toFixed(2)}</TableCell>
                    <TableCell>{p.status}</TableCell>
                    <TableCell>{p.method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InstructorRevenuePage() {
  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR", "ADMIN"]}>
      <RevenueContent />
    </ProtectedRoute>
  )
}

