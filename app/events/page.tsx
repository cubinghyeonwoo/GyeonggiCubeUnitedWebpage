import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const events = [
  {
    id: "gyeonggi-spring-open-2025",
    title: "Gyeonggi Spring Open 2025",
    date: "March 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Suwon Convention Center",
    address: "123 Convention St, Suwon, Gyeonggi",
    participants: 45,
    maxParticipants: 80,
    status: "Registration Open",
    type: "WCA Official",
    categories: ["3x3x3", "2x2x2", "4x4x4", "Pyraminx", "Skewb"],
    registrationDeadline: "March 8, 2025",
    fee: "₩15,000",
    description: "Official WCA competition featuring multiple events. All skill levels welcome!",
  },
  {
    id: "weekly-practice-march",
    title: "Weekly Practice Session",
    date: "Every Saturday",
    time: "2:00 PM - 5:00 PM",
    location: "Seongnam Community Center",
    address: "456 Community Rd, Seongnam, Gyeonggi",
    participants: 20,
    maxParticipants: 30,
    status: "Ongoing",
    type: "Practice",
    categories: ["All Events"],
    registrationDeadline: "N/A",
    fee: "Free",
    description: "Casual practice sessions for all skill levels. Drop in anytime!",
  },
  {
    id: "beginner-workshop-march",
    title: "Beginner Workshop",
    date: "March 22, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Anyang Public Library",
    address: "789 Library Ave, Anyang, Gyeonggi",
    participants: 15,
    maxParticipants: 25,
    status: "Registration Open",
    type: "Workshop",
    categories: ["3x3x3 Basics", "CFOP Method"],
    registrationDeadline: "March 20, 2025",
    fee: "₩5,000",
    description: "Learn the fundamentals of speedcubing from experienced cubers.",
  },
  {
    id: "gyeonggi-summer-championship",
    title: "Gyeonggi Summer Championship 2025",
    date: "June 10, 2025",
    time: "9:00 AM - 7:00 PM",
    location: "Goyang Sports Complex",
    address: "321 Sports Blvd, Goyang, Gyeonggi",
    participants: 0,
    maxParticipants: 100,
    status: "Coming Soon",
    type: "WCA Official",
    categories: ["3x3x3", "2x2x2", "4x4x4", "5x5x5", "3x3x3 OH", "Pyraminx", "Skewb", "Megaminx"],
    registrationDeadline: "June 1, 2025",
    fee: "₩20,000",
    description: "Our biggest competition of the year with 8 official events!",
  },
  {
    id: "speed-training-bootcamp",
    title: "Speed Training Bootcamp",
    date: "April 5, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Bucheon Training Center",
    address: "555 Training St, Bucheon, Gyeonggi",
    participants: 8,
    maxParticipants: 15,
    status: "Registration Open",
    type: "Workshop",
    categories: ["Advanced Techniques", "F2L", "OLL/PLL"],
    registrationDeadline: "April 1, 2025",
    fee: "₩10,000",
    description: "Intensive training for intermediate to advanced cubers looking to improve their times.",
  },
]

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.status !== "Past")
  const wcaEvents = events.filter((e) => e.type === "WCA Official")
  const practiceEvents = events.filter((e) => e.type === "Practice")
  const workshopEvents = events.filter((e) => e.type === "Workshop")

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Events & Competitions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join us at official WCA competitions, practice sessions, and workshops across Gyeonggi Province
        </p>
      </div>

      {/* Tabs for filtering */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="wca">WCA Official</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <EventGrid events={upcomingEvents} />
        </TabsContent>

        <TabsContent value="wca" className="mt-8">
          <EventGrid events={wcaEvents} />
        </TabsContent>

        <TabsContent value="practice" className="mt-8">
          <EventGrid events={practiceEvents} />
        </TabsContent>

        <TabsContent value="workshops" className="mt-8">
          <EventGrid events={workshopEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EventGrid({ events }: { events: typeof events }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No events found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="group hover:border-primary/50 transition-all hover:shadow-lg flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <Badge variant={event.type === "WCA Official" ? "default" : "secondary"}>{event.type}</Badge>
              <Badge
                variant="outline"
                className={
                  event.status === "Registration Open"
                    ? "bg-accent/10 text-accent border-accent/20"
                    : event.status === "Coming Soon"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-secondary"
                }
              >
                {event.status}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>
          </CardHeader>

          <CardContent className="space-y-3 flex-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4 text-accent flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-start text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4 text-[var(--neon-green)] flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4 text-[var(--violet-glow)] flex-shrink-0" />
              <span>
                {event.participants}/{event.maxParticipants} participants
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 pt-2">{event.description}</p>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button variant="default" className="flex-1" asChild>
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
