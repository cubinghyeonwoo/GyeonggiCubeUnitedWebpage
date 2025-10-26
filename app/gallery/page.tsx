"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, X } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    title: "Gyeonggi Winter Open 2024",
    date: "January 2024",
    location: "Suwon Convention Center",
    category: "Competition",
    participants: 78,
    image: "/gallery-winter-open-2024.jpg",
    description: "Our biggest winter competition with record attendance and amazing performances.",
  },
  {
    id: 2,
    title: "Weekly Practice Session",
    date: "February 2024",
    location: "Seongnam Community Center",
    category: "Practice",
    participants: 25,
    image: "/gallery-practice-session.jpg",
    description: "Regular Saturday practice where members improve their skills together.",
  },
  {
    id: 3,
    title: "Beginner Workshop",
    date: "February 2024",
    location: "Anyang Public Library",
    category: "Workshop",
    participants: 20,
    image: "/gallery-beginner-workshop.jpg",
    description: "Teaching newcomers the fundamentals of speedcubing.",
  },
  {
    id: 4,
    title: "Seoul Championship 2024",
    date: "March 2024",
    location: "Seoul Sports Complex",
    category: "Competition",
    participants: 120,
    image: "/gallery-seoul-championship.jpg",
    description: "GCU members competing at the Seoul Championship with great results.",
  },
  {
    id: 5,
    title: "Team Building Event",
    date: "April 2024",
    location: "Gyeonggi Park",
    category: "Social",
    participants: 35,
    image: "/gallery-team-building.jpg",
    description: "Fun outdoor activities and casual cubing with the community.",
  },
  {
    id: 6,
    title: "Speed Training Bootcamp",
    date: "April 2024",
    location: "Bucheon Training Center",
    category: "Workshop",
    participants: 15,
    image: "/gallery-speed-bootcamp.jpg",
    description: "Intensive training session focused on advanced techniques.",
  },
  {
    id: 7,
    title: "Pyraminx Masters 2024",
    date: "May 2024",
    location: "Incheon Convention Center",
    category: "Competition",
    participants: 45,
    image: "/gallery-pyraminx-masters.jpg",
    description: "Specialized competition for Pyraminx enthusiasts.",
  },
  {
    id: 8,
    title: "Community Meetup",
    date: "June 2024",
    location: "Cafe Cube",
    category: "Social",
    participants: 30,
    image: "/gallery-community-meetup.jpg",
    description: "Casual meetup with coffee, cubes, and great conversations.",
  },
  {
    id: 9,
    title: "Korean Nationals 2024",
    date: "July 2024",
    location: "Seoul Olympic Stadium",
    category: "Competition",
    participants: 200,
    image: "/gallery-korean-nationals.jpg",
    description: "GCU members representing at the national championship.",
  },
  {
    id: 10,
    title: "Summer Camp",
    date: "August 2024",
    location: "Gyeonggi Youth Center",
    category: "Workshop",
    participants: 40,
    image: "/gallery-summer-camp.jpg",
    description: "Week-long summer camp for young cubers to learn and compete.",
  },
  {
    id: 11,
    title: "Gyeonggi Autumn Cup 2024",
    date: "October 2024",
    location: "Goyang Sports Complex",
    category: "Competition",
    participants: 95,
    image: "/gallery-autumn-cup.jpg",
    description: "Fall competition with perfect weather and great performances.",
  },
  {
    id: 12,
    title: "Year End Celebration",
    date: "December 2024",
    location: "GCU Headquarters",
    category: "Social",
    participants: 50,
    image: "/gallery-year-end-party.jpg",
    description: "Celebrating a successful year with awards and fun activities.",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)

  const competitions = galleryItems.filter((item) => item.category === "Competition")
  const workshops = galleryItems.filter((item) => item.category === "Workshop")
  const social = galleryItems.filter((item) => item.category === "Social")

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Relive the best moments from our competitions, workshops, and community events
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-8">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
          <TabsTrigger value="all">All Photos</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <GalleryGrid items={galleryItems} onSelect={setSelectedImage} />
        </TabsContent>

        <TabsContent value="competitions">
          <GalleryGrid items={competitions} onSelect={setSelectedImage} />
        </TabsContent>

        <TabsContent value="workshops">
          <GalleryGrid items={workshops} onSelect={setSelectedImage} />
        </TabsContent>

        <TabsContent value="social">
          <GalleryGrid items={social} onSelect={setSelectedImage} />
        </TabsContent>
      </Tabs>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedImage?.title}</span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-4 mt-4">
                <img
                  src={selectedImage?.image || "/placeholder.svg"}
                  alt={selectedImage?.title}
                  className="w-full rounded-lg"
                />
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{selectedImage?.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{selectedImage?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[var(--neon-green)]" />
                    <span>{selectedImage?.participants} participants</span>
                  </div>
                </div>
                <p className="text-foreground">{selectedImage?.description}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function GalleryGrid({
  items,
  onSelect,
}: {
  items: typeof galleryItems
  onSelect: (item: (typeof galleryItems)[0]) => void
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No photos found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden"
          onClick={() => onSelect(item)}
        >
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
            <img
              src={item.image || `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(item.title)}`}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Badge variant="secondary" className="mb-2">
                  {item.category}
                </Badge>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span className="line-clamp-1">{item.date}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
