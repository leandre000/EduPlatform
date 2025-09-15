"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts"
import { IconChartBar, IconUsers, IconBook, IconCurrencyDollar } from "@tabler/icons-react"

export default function AdminAnalyticsPage() {
  const revenue = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 18500 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 26500 },
    { month: "May", revenue: 31000 },
    { month: "Jun", revenue: 35500 },
  ]

  const signups = [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1450 },
    { month: "Mar", users: 1680 },
    { month: "Apr", users: 1920 },
    { month: "May", users: 2150 },
    { month: "Jun", users: 2380 },
  ]

  const kpis = [
    { label: "Total Users", value: "24,580", icon: <IconUsers className="w-5 h-5" /> },
    { label: "Total Courses", value: "1,238", icon: <IconBook className="w-5 h-5" /> },
    { label: "MRR", value: "$35,500", icon: <IconCurrencyDollar className="w-5 h-5" /> },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{kpi.label}</div>
                <div className="text-2xl font-semibold">{kpi.value}</div>
              </div>
              <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300">
                {kpi.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue (Last 6 months)</CardTitle>
            <CardDescription>Monthly recurring revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ revenue: { label: "Revenue", color: "hsl(var(--chart-1))" } }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenue}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Signups</CardTitle>
            <CardDescription>User signups per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ users: { label: "Users", color: "hsl(var(--chart-2))" } }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signups}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="var(--color-users)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconChartBar className="w-5 h-5" />
            At a Glance
          </CardTitle>
          <CardDescription>Key metrics across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div>Total Page Views: <span className="font-medium text-foreground">1.2M</span></div>
            <div>Avg. Session: <span className="font-medium text-foreground">6m 12s</span></div>
            <div>Churn Rate: <span className="font-medium text-foreground">2.1%</span></div>
            <div>Conversion: <span className="font-medium text-foreground">4.6%</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


