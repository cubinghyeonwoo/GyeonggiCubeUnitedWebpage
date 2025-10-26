"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, BookOpen, ImageIcon, TrendingUp, Eye } from "lucide-react"

const stats = [
  { name: "Total Events", value: "24", icon: Calendar, change: "+3 this month", trend: "up" },
  { name: "Active Members", value: "156", icon: Users, change: "+12 this month", trend: "up" },
  { name: "Blog Posts", value: "48", icon: BookOpen, change: "+5 this month", trend: "up" },
  { name: "Gallery Images", value: "342", icon: ImageIcon, change: "+28 this month", trend: "up" },
]

const recentActivity = [
  { action: "New member registered", user: "Kim Minjun", time: "2 hours ago" },
  { action: "Event published", user: "Admin", time: "5 hours ago" },
  { action: "Blog post updated", user: "Park Jihoon", time: "1 day ago" },
  { action: "Gallery images uploaded", user: "Admin", time: "2 days ago" },
  { action: "Member profile updated", user: "Lee Soyeon", time: "3 days ago" },
]

const upcomingEvents = [
  { name: "Gyeonggi Winter Open 2025", date: "Jan 15, 2025", registrations: 45 },
  { name: "Weekly Practice Session", date: "Jan 8, 2025", registrations: 23 },
  { name: "Beginner Workshop", date: "Jan 12, 2025", registrations: 18 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with GCU.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{event.name}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.registrations}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Site Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>Page Views</span>
              </div>
              <p className="text-2xl font-bold">12,543</p>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Unique Visitors</span>
              </div>
              <p className="text-2xl font-bold">3,421</p>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Engagement Rate</span>
              </div>
              <p className="text-2xl font-bold">68%</p>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
