"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, FileText, Video, Download } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    id: 1,
    title: "CFOP Algorithm Sheet",
    type: "PDF",
    category: "Tutorial",
    level: "Intermediate",
    downloads: 234,
    icon: FileText,
  },
  {
    id: 2,
    title: "F2L Practice Drills",
    type: "Video",
    category: "Tutorial",
    level: "Beginner",
    downloads: 156,
    icon: Video,
  },
  {
    id: 3,
    title: "OLL Recognition Guide",
    type: "PDF",
    category: "Tutorial",
    level: "Advanced",
    downloads: 189,
    icon: FileText,
  },
  {
    id: 4,
    title: "Competition Checklist",
    type: "PDF",
    category: "Guide",
    level: "All Levels",
    downloads: 312,
    icon: Download,
  },
]

export default function AdminResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-1">Manage learning materials and downloads</p>
        </div>
        <Link href="/admin/resources/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Resources List */}
      <div className="grid gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{resource.category}</span>
                    <span>•</span>
                    <span>{resource.level}</span>
                    <span>•</span>
                    <span>{resource.downloads} downloads</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/resources/${resource.id}`}>
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
