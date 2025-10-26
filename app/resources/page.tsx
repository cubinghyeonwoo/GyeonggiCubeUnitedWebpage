import { BookOpen, Video, FileText, Download, ExternalLink, Lightbulb, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const tutorials = [
  {
    title: "Beginner's Guide to 3x3x3",
    description: "Learn the basics of solving a Rubik's Cube using the layer-by-layer method.",
    type: "Tutorial",
    level: "Beginner",
    duration: "30 min",
    icon: BookOpen,
    link: "#",
  },
  {
    title: "CFOP Method Explained",
    description: "Master the most popular speedcubing method: Cross, F2L, OLL, and PLL.",
    type: "Tutorial",
    level: "Intermediate",
    duration: "1 hour",
    icon: BookOpen,
    link: "#",
  },
  {
    title: "Advanced F2L Techniques",
    description: "Optimize your F2L with advanced cases and lookahead strategies.",
    type: "Tutorial",
    level: "Advanced",
    duration: "45 min",
    icon: Target,
    link: "#",
  },
  {
    title: "OLL Algorithms Complete Guide",
    description: "All 57 OLL algorithms with fingertricks and recognition tips.",
    type: "Algorithm Sheet",
    level: "Intermediate",
    duration: "Reference",
    icon: FileText,
    link: "#",
  },
  {
    title: "PLL Algorithms Complete Guide",
    description: "All 21 PLL algorithms with optimal fingertricks and execution.",
    type: "Algorithm Sheet",
    level: "Intermediate",
    duration: "Reference",
    icon: FileText,
    link: "#",
  },
  {
    title: "Roux Method Introduction",
    description: "Learn the alternative Roux method for speedcubing.",
    type: "Tutorial",
    level: "Intermediate",
    duration: "40 min",
    icon: BookOpen,
    link: "#",
  },
]

const videos = [
  {
    title: "Sub-10 Walkthrough Solves",
    description: "Watch our top members break down their sub-10 second solves step by step.",
    creator: "Kim Min-jun",
    duration: "15 min",
    thumbnail: "/video-sub10-walkthrough.jpg",
    link: "#",
  },
  {
    title: "Beginner Workshop Recording",
    description: "Full recording of our beginner workshop covering cube notation and basic solving.",
    creator: "Jung Eun-ji",
    duration: "2 hours",
    thumbnail: "/video-beginner-workshop.jpg",
    link: "#",
  },
  {
    title: "Competition Tips & Strategies",
    description: "How to prepare for your first WCA competition and perform under pressure.",
    creator: "Lee Seo-yeon",
    duration: "20 min",
    thumbnail: "/video-competition-tips.jpg",
    link: "#",
  },
  {
    title: "Blindfolded Solving Tutorial",
    description: "Introduction to 3x3x3 blindfolded solving using the M2/OP method.",
    creator: "Choi Hyun-woo",
    duration: "45 min",
    thumbnail: "/video-blindfolded-tutorial.jpg",
    link: "#",
  },
  {
    title: "One-Handed Techniques",
    description: "Master one-handed solving with proper fingertricks and table abuse.",
    creator: "Park Ji-ho",
    duration: "25 min",
    thumbnail: "/video-one-handed.jpg",
    link: "#",
  },
  {
    title: "Cube Maintenance Guide",
    description: "How to clean, lube, and tension your cubes for optimal performance.",
    creator: "Kang Tae-yang",
    duration: "18 min",
    thumbnail: "/video-cube-maintenance.jpg",
    link: "#",
  },
]

const downloads = [
  {
    title: "GCU Algorithm Sheet Collection",
    description: "Complete collection of CFOP, Roux, and ZZ algorithms in PDF format.",
    fileSize: "2.5 MB",
    format: "PDF",
    downloads: 234,
  },
  {
    title: "Practice Timer Spreadsheet",
    description: "Track your solves and analyze your progress with our custom spreadsheet.",
    fileSize: "156 KB",
    format: "XLSX",
    downloads: 189,
  },
  {
    title: "Competition Checklist",
    description: "Everything you need to prepare for your first WCA competition.",
    fileSize: "89 KB",
    format: "PDF",
    downloads: 312,
  },
  {
    title: "Cube Notation Guide",
    description: "Visual guide to understanding cube notation and algorithm reading.",
    fileSize: "1.2 MB",
    format: "PDF",
    downloads: 445,
  },
]

const externalResources = [
  {
    title: "World Cube Association",
    description: "Official WCA website for competition results and regulations.",
    url: "https://worldcubeassociation.org",
    icon: ExternalLink,
  },
  {
    title: "CubeSkills",
    description: "Comprehensive tutorials and algorithms by Feliks Zemdegs.",
    url: "https://cubeskills.com",
    icon: ExternalLink,
  },
  {
    title: "SpeedCubeDB",
    description: "Algorithm database with multiple methods and variations.",
    url: "https://speedcubedb.com",
    icon: ExternalLink,
  },
  {
    title: "CSTimer",
    description: "Popular online timer with statistics and scramble generation.",
    url: "https://cstimer.net",
    icon: ExternalLink,
  },
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to improve your speedcubing skills, from beginner tutorials to advanced techniques
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid gap-4 md:grid-cols-3 mb-12">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Start with Basics</h3>
              <p className="text-sm text-muted-foreground">
                Master the fundamentals before moving to advanced methods.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Practice Daily</h3>
              <p className="text-sm text-muted-foreground">Consistent practice is key to improving your solve times.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[var(--neon-green)]/10 to-[var(--neon-green)]/5 border-[var(--neon-green)]/20">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--neon-green)]/20 flex items-center justify-center">
              <Target className="h-6 w-6 text-[var(--neon-green)]" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Set Goals</h3>
              <p className="text-sm text-muted-foreground">Track your progress and celebrate milestone achievements.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tutorials" className="space-y-8">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="external">External</TabsTrigger>
        </TabsList>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial, index) => {
              const Icon = tutorial.icon
              return (
                <Card key={index} className="group hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge
                        variant={
                          tutorial.level === "Beginner"
                            ? "secondary"
                            : tutorial.level === "Intermediate"
                              ? "default"
                              : "outline"
                        }
                      >
                        {tutorial.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{tutorial.type}</span>
                      <span>•</span>
                      <span>{tutorial.duration}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href={tutorial.link}>View Tutorial</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <Card
                key={index}
                className="group hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                  <img
                    src={
                      video.thumbnail ||
                      `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(video.title)}`
                    }
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.creator}</span>
                    <span>{video.duration}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href={video.link}>Watch Video</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Downloads Tab */}
        <TabsContent value="downloads" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {downloads.map((download, index) => (
              <Card key={index} className="group hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <FileText className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors mb-2">
                        {download.title}
                      </CardTitle>
                      <CardDescription>{download.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{download.format}</Badge>
                    <span>{download.fileSize}</span>
                    <span>•</span>
                    <span>{download.downloads} downloads</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full group/btn">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* External Resources Tab */}
        <TabsContent value="external" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {externalResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <Card key={index} className="group hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--neon-green)]/10 flex items-center justify-center group-hover:bg-[var(--neon-green)]/20 transition-colors">
                        <Icon className="h-6 w-6 text-[var(--neon-green)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors mb-2">
                          {resource.title}
                        </CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <div className="mt-16">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Join our Discord community or reach out to our training team for
              personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/members">Meet Our Trainers</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
