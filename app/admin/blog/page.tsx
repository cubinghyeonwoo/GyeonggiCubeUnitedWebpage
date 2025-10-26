"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Calendar, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const posts = [
  {
    id: 1,
    title: "Breaking the Sub-10 Barrier: My Journey",
    author: "Kim Minjun",
    date: "Dec 28, 2024",
    category: "Personal Story",
    status: "published",
    views: 1243,
    image: "/blog-sub10-journey.jpg",
  },
  {
    id: 2,
    title: "CFOP Method: Complete Guide for Beginners",
    author: "Park Jihoon",
    date: "Dec 25, 2024",
    category: "Tutorial",
    status: "published",
    views: 2156,
    image: "/blog-cfop-guide.jpg",
  },
  {
    id: 3,
    title: "Competition Preparation Tips",
    author: "Lee Soyeon",
    date: "Dec 20, 2024",
    category: "Tips & Tricks",
    status: "published",
    views: 987,
    image: "/blog-competition-prep.jpg",
  },
  {
    id: 4,
    title: "New Training Methods for 2025",
    author: "Admin",
    date: "Dec 30, 2024",
    category: "News",
    status: "draft",
    views: 0,
    image: "/blog-cube-maintenance.jpg",
  },
]

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage blog content and articles</p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.title}</h3>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {post.author}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
