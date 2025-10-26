import { Trophy, Users, Calendar, Target } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Active Members",
    description: "Passionate cubers from across Gyeonggi Province",
  },
  {
    icon: Calendar,
    value: "12",
    label: "Events Hosted",
    description: "Official WCA competitions and practice sessions",
  },
  {
    icon: Trophy,
    value: "25+",
    label: "Podium Finishes",
    description: "Top 3 placements in regional competitions",
  },
  {
    icon: Target,
    value: "Sub-10",
    label: "Average Records",
    description: "Multiple members with sub-10 second averages",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Community in Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building the strongest speedcubing community in Gyeonggi Province
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card border rounded-2xl p-6 text-center hover:border-primary/50 transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="font-semibold mb-2">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
