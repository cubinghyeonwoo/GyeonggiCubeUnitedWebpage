import { Target, Users, Trophy, Heart, Zap, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We believe in building a supportive, inclusive community where everyone can grow together.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "We strive for continuous improvement and celebrate achievements at every level.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Our love for speedcubing drives everything we do, from competitions to casual practice.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We embrace new techniques, methods, and technologies to push the boundaries of cubing.",
  },
]

const milestones = [
  { year: "2023", event: "GCU Founded", description: "Started with 10 passionate cubers in Suwon" },
  { year: "2023", event: "First Competition", description: "Hosted our first official WCA competition" },
  { year: "2024", event: "50+ Members", description: "Grew to over 50 active members across Gyeonggi" },
  { year: "2024", event: "National Recognition", description: "Multiple members achieved national rankings" },
  { year: "2025", event: "Expanding", description: "Opening new practice locations and hosting more events" },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Gyeonggi Cube United</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We're more than just a speedcubing club. We're a community of passionate cubers dedicated to pushing the
          limits of what's possible with a Rubik's Cube.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To create the strongest speedcubing community in Gyeonggi Province by providing world-class training,
                  organizing official competitions, and fostering a supportive environment where cubers of all levels
                  can achieve their goals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="text-center hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Gyeonggi Cube United was founded in early 2023 by a small group of speedcubing enthusiasts who wanted to
                create a dedicated community in Gyeonggi Province. What started as informal meetups in coffee shops
                quickly grew into something much bigger.
              </p>
              <p>
                Within our first year, we organized multiple official WCA competitions, established weekly practice
                sessions, and grew to over 50 active members. Our members have achieved remarkable success, with
                multiple podium finishes at regional and national competitions.
              </p>
              <p>
                Today, we're proud to be one of the most active cubing communities in Korea, known for our welcoming
                atmosphere, high-quality events, and commitment to helping every member reach their potential.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
            <img src="/speedcubing-community-group-photo.jpg" alt="GCU Community" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-primary/20 pl-6 relative">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary -translate-x-[7px]" />
                  <h3 className="font-semibold text-lg mb-2">{milestone.event}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-accent mb-2">12</div>
              <div className="text-sm text-muted-foreground">Events Hosted</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-[var(--neon-green)]/10 to-[var(--neon-green)]/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-[var(--neon-green)] mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Podium Finishes</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-[var(--violet-glow)]/10 to-[var(--violet-glow)]/5">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-[var(--violet-glow)] mb-2">100%</div>
              <div className="text-sm text-muted-foreground">WCA Official</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-muted-foreground mb-6">
              Ready to be part of something special? Join Gyeonggi Cube United and start your speedcubing journey with
              us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/events">View Events</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
