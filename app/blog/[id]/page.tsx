import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const blogPosts = [
  {
    id: "breaking-sub-10-barrier",
    title: "Breaking the Sub-10 Barrier: My Journey",
    excerpt:
      "After months of dedicated practice, I finally achieved my goal of a sub-10 average. Here's what I learned along the way.",
    author: {
      name: "Kim Min-jun",
      role: "President",
      avatar: "/korean-male-cuber.jpg",
    },
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Personal Story",
    tags: ["Personal Story", "Achievement", "Training"],
    image: "/blog-sub10-journey.jpg",
    content: `
# Breaking the Sub-10 Barrier: My Journey

When I first started speedcubing in 2022, a sub-10 average seemed like an impossible dream. Today, I'm proud to share that I've finally achieved this milestone, and I want to share the journey with you.

## The Beginning

My first official average was around 18 seconds. I remember watching videos of world-class cubers solving in under 7 seconds and thinking, "How is that even possible?" But I was determined to improve.

## The Plateau

After about six months of practice, I hit my first major plateau at around 13 seconds. No matter how much I practiced, I couldn't seem to break through. This is when I learned my most important lesson: **practice quality matters more than quantity**.

## Key Improvements

Here are the three main areas that helped me break through:

### 1. Cross Planning
I started planning my entire cross during inspection. This alone shaved off 1-2 seconds from my average.

### 2. F2L Lookahead
Instead of just solving F2L pairs quickly, I focused on looking ahead to the next pair while solving the current one. This was the hardest skill to develop but made the biggest difference.

### 3. Algorithm Optimization
I reviewed all my OLL and PLL algorithms and learned better fingertricks. Some algorithms I had been using were simply inefficient.

## The Breakthrough

After implementing these changes and practicing consistently for three months, I finally got my first sub-10 average at a local competition. The feeling was incredible!

## Advice for Others

If you're working toward sub-10 (or any goal), here's my advice:

- **Be patient** - Progress isn't always linear
- **Focus on fundamentals** - Speed comes from efficiency, not just fast turning
- **Practice with purpose** - Identify your weaknesses and work on them specifically
- **Stay motivated** - Join a community like GCU to keep yourself inspired

Remember, every world champion started where you are now. Keep cubing!
    `,
  },
  {
    id: "beginners-guide-cfop",
    title: "Beginner's Guide to CFOP Method",
    excerpt:
      "Learn the most popular speedcubing method step by step. Perfect for those transitioning from beginner's method.",
    author: {
      name: "Jung Eun-ji",
      role: "Community Manager",
      avatar: "/korean-female-speedcuber.jpg",
    },
    date: "March 12, 2025",
    readTime: "8 min read",
    category: "Tutorial",
    tags: ["Tutorial", "CFOP", "Beginner"],
    image: "/blog-cfop-guide.jpg",
    content: `
# Beginner's Guide to CFOP Method

CFOP (Cross, F2L, OLL, PLL) is the most popular speedcubing method used by the majority of world-class cubers. If you can already solve a cube using the beginner's method, you're ready to learn CFOP!

## What is CFOP?

CFOP breaks down the solve into four distinct steps:
- **Cross**: Solve the first layer cross
- **F2L**: First Two Layers - solve the first two layers simultaneously
- **OLL**: Orient Last Layer - make the top face all one color
- **PLL**: Permute Last Layer - solve the final layer

## Step 1: Cross

The cross is the foundation of your solve. A good cross should be solved in 8 moves or less.

**Tips for Cross:**
- Plan the entire cross during inspection
- Try to solve it without looking at the bottom
- Aim for efficiency over speed at first

## Step 2: F2L (First Two Layers)

F2L is where CFOP really shines. Instead of solving the first layer corners and then the second layer edges separately, you solve them together as pairs.

**Basic F2L Concepts:**
- There are 41 different F2L cases
- Start by learning intuitive F2L
- Focus on recognizing corner-edge pairs
- Practice lookahead to find the next pair while solving

## Step 3: OLL (Orient Last Layer)

OLL makes the top face all one color. There are 57 different OLL cases, but don't let that intimidate you!

**Learning OLL:**
- Start with 2-look OLL (only 10 algorithms)
- Gradually learn full OLL as you improve
- Focus on recognition speed
- Practice fingertricks for each algorithm

## Step 4: PLL (Permute Last Layer)

PLL solves the final layer completely. There are 21 PLL cases.

**Learning PLL:**
- Start with 2-look PLL (6 algorithms)
- Learn full PLL for faster times
- Master recognition from all angles
- Optimize your fingertricks

## Practice Tips

1. **Learn in stages** - Don't try to learn everything at once
2. **Use slow solves** - Focus on understanding, not speed
3. **Drill algorithms** - Practice each algorithm until it's muscle memory
4. **Track your progress** - Use a timer to see improvement

## Resources

Check out our Resources page for algorithm sheets, video tutorials, and practice tools!

Happy cubing!
    `,
  },
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  // Related posts (excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <article className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{post.author.name}</div>
                  <div className="text-xs">{post.author.role}</div>
                </div>
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
          </div>

          {/* Featured image */}
          <div className="aspect-video relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-br from-primary/20 to-accent/20">
            <img
              src={post.image || `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(post.title)}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {post.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                    {paragraph.replace("# ", "")}
                  </h1>
                )
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
                    {paragraph.replace("### ", "")}
                  </h3>
                )
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="ml-6">
                    {paragraph.replace("- ", "")}
                  </li>
                )
              }
              if (paragraph.includes("**")) {
                const parts = paragraph.split("**")
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
                  </p>
                )
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              }
              return null
            })}
          </div>

          <Separator className="my-8" />

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Share this article:</span>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Author Card */}
          <Card>
            <CardHeader>
              <CardTitle>About the Author</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">{post.author.role}</div>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/members">View Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="block group hover:bg-secondary/50 p-3 rounded-lg transition-colors"
                  >
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Newsletter */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">Get the latest articles delivered to your inbox.</p>
              <Button className="w-full">Subscribe</Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
