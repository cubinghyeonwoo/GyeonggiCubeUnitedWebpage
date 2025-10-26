import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const upcomingEvents = [
  {
    title: "Gyeonggi Spring Open 2025",
    date: "March 15, 2025",
    location: "Suwon Convention Center",
    participants: 45,
    status: "Registration Open",
    type: "WCA Official",
  },
  {
    title: "Weekly Practice Session",
    date: "Every Saturday",
    location: "Seongnam Community Center",
    participants: 20,
    status: "Ongoing",
    type: "Practice",
  },
  {
    title: "Beginner Workshop",
    date: "March 22, 2025",
    location: "Anyang Public Library",
    participants: 15,
    status: "Registration Open",
    type: "Workshop",
  },
]

export function UpcomingEvents() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground">Join us at our next competition or practice session</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="group hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={event.type === "WCA Official" ? "default" : "secondary"}>{event.type}</Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    {event.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{event.title}</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4 text-accent" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4 text-[var(--neon-green)]" />
                  {event.participants} participants
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group/btn" asChild>
                  <Link href="/events">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
