import { Zap, Users, BookOpen, Trophy, Calendar, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Trophy,
    title: "Official WCA Competitions",
    description: "Participate in World Cube Association sanctioned events and earn official rankings.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Connect with fellow cubers, share techniques, and grow together in a supportive environment.",
    color: "text-accent",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access tutorials, algorithms, and training materials to improve your solving skills.",
    color: "text-[var(--neon-green)]",
  },
  {
    icon: Calendar,
    title: "Regular Meetups",
    description: "Join weekly practice sessions and monthly competitions across Gyeonggi Province.",
    color: "text-[var(--violet-glow)]",
  },
  {
    icon: Zap,
    title: "Speed Training",
    description: "Structured training programs to help you achieve faster solve times and better techniques.",
    color: "text-primary",
  },
  {
    icon: Sparkles,
    title: "All Skill Levels",
    description: "Whether you're a beginner or a pro, everyone is welcome in our inclusive community.",
    color: "text-accent",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Join GCU?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to excel in speedcubing, all in one community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group hover:border-primary/50 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
