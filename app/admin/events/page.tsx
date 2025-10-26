"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "Gyeonggi Winter Open 2025",
    date: "January 15, 2025",
    location: "Suwon Convention Center",
    type: "WCA Official",
    status: "upcoming",
    registrations: 45,
    capacity: 80,
  },
  {
    id: 2,
    title: "Weekly Practice Session",
    date: "January 8, 2025",
    location: "GCU Training Center",
    type: "Practice",
    status: "upcoming",
    registrations: 23,
    capacity: 30,
  },
  {
    id: 3,
    title: "Beginner Workshop",
    date: "January 12, 2025",
    location: "Seongnam Community Center",
    type: "Workshop",
    status: "upcoming",
    registrations: 18,
    capacity: 25,
  },
  {
    id: 4,
    title: "Seoul Championship 2024",
    date: "December 10, 2024",
    location: "Seoul Sports Complex",
    type: "WCA Official",
    status: "completed",
    registrations: 120,
    capacity: 120,
  },
]

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">Manage club events and competitions</p>
        </div>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>
                            {event.registrations}/{event.capacity} registered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/events/${event.id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
