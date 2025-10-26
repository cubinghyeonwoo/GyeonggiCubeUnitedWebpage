import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const blogPosts = [
  {
    id: "breaking-sub-10-barrier",
    title: "Breaking the Sub-10 Barrier: My Journey",
    excerpt:
      "After months of dedicated practice, I finally achieved my goal of a sub-10 average. Here's what I learned along the way.",
    author: "Kim Min-jun",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Personal Story",
    image: "/blog-sub10-journey.jpg",
    featured: true,
  },
  {
    id: "beginners-guide-cfop",
    title: "Beginner's Guide to CFOP Method",
    excerpt:
      "Learn the most popular speedcubing method step by step. Perfect for those transitioning from beginner's method.",
    author: "Jung Eun-ji",
    date: "March 12, 2025",
    readTime: "8 min read",
    category: "Tutorial",
    image: "/blog-cfop-guide.jpg",
    featured: true,
  },
  {
    id: "competition-preparation-tips",
    title: "How to Prepare for Your First Competition",
    excerpt:
      "Nervous about your first WCA competition? Here are essential tips to help you perform your best under pressure.",
    author: "Lee Seo-yeon",
    date: "March 10, 2025",
    readTime: "6 min read",
    category: "Competition",
    image: "/blog-competition-prep.jpg",
    featured: false,
  },
  {
    id: "cube-maintenance-guide",
    title: "The Ultimate Cube Maintenance Guide",
    excerpt: "Keep your cubes performing at their best with proper cleaning, lubing, and tensioning techniques.",
    author: "Kang Tae-yang",
    date: "March 8, 2025",
    readTime: "7 min read",
    category: "Tutorial",
    image: "/blog-cube-maintenance.jpg",
    featured: false,
  },
  {
    id: "winter-open-recap",
    title: "Gyeonggi Winter Open 2024 Recap",
    excerpt: "A look back at our most successful competition yet, with record attendance and amazing performances.",
    author: "Park Ji-ho",
    date: "March 5, 2025",
    readTime: "4 min read",
    category: "Event Recap",
    image: "/blog-winter-recap.jpg",
    featured: false,
  },
  {
    id: "blindfolded-solving-intro",
    title: "Introduction to Blindfolded Solving",
    excerpt: "Discover the fascinating world of blindfolded cubing and learn the basics of the M2/OP method.",
    author: "Choi Hyun-woo",
    date: "March 3, 2025",
    readTime: "10 min read",
    category: "Tutorial",
    image: "/blog-blindfolded-intro.jpg",
    featured: false,
  },
  {
    id: "one-handed-techniques",
    title: "Mastering One-Handed Solving",
    excerpt: "Tips and techniques for improving your one-handed solving speed and efficiency.",
    author: "Park Ji-ho",
    date: "February 28, 2025",
    readTime: "6 min read",
    category: "Tutorial",
    image: "/blog-one-handed.jpg",
    featured: false,
  },
  {
    id: "community-growth-2024",
    title: "Our Community's Growth in 2024",
    excerpt: "Reflecting on an incredible year of growth, achievements, and community building.",
    author: "Kim Min-jun",
    date: "February 25, 2025",
    readTime: "5 min read",
    category: "Community",
    image: "/blog-community-growth.jpg",
    featured: false,
  },
]

const categories = ["All", "Tutorial", "Competition", "Personal Story", "Event Recap", "Community"]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stories, tutorials, and insights from the Gyeonggi Cube United community
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-2xl mx-auto mb-12 space-y-4">
        <Input type="search" placeholder="Search articles..." className="w-full" />
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={post.image || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(post.title)}`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">{post.category}</Badge>
                </div>
                <CardHeader>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full group/btn" asChild>
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={post.image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(post.title)}`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4" variant="secondary">
                  {post.category}
                </Badge>
              </div>
              <CardHeader className="flex-1">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={`/blog/${post.id}`}>Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest articles, event updates, and cubing tips delivered to your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
