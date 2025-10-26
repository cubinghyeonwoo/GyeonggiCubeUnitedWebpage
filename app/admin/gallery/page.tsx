"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Trash2, Calendar } from "lucide-react"
import Image from "next/image"

const images = [
  {
    id: 1,
    title: "Winter Open 2024",
    category: "Competition",
    date: "Dec 15, 2024",
    image: "/gallery-winter-open-2024.jpg",
  },
  {
    id: 2,
    title: "Practice Session",
    category: "Practice",
    date: "Dec 10, 2024",
    image: "/gallery-practice-session.jpg",
  },
  {
    id: 3,
    title: "Beginner Workshop",
    category: "Workshop",
    date: "Dec 5, 2024",
    image: "/gallery-beginner-workshop.jpg",
  },
  {
    id: 4,
    title: "Seoul Championship",
    category: "Competition",
    date: "Nov 28, 2024",
    image: "/gallery-seoul-championship.jpg",
  },
  { id: 5, title: "Team Building", category: "Social", date: "Nov 20, 2024", image: "/gallery-team-building.jpg" },
  { id: 6, title: "Speed Bootcamp", category: "Workshop", date: "Nov 15, 2024", image: "/gallery-speed-bootcamp.jpg" },
]

export default function AdminGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredImages = images.filter((img) => img.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage event photos and images</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Upload Images
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Images Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((img) => (
          <Card key={img.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={img.image || "/placeholder.svg"} alt={img.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{img.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{img.date}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Badge variant="outline">{img.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
