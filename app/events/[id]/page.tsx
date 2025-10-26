import { notFound } from "next/navigation"
import { Calendar, MapPin, Users, Clock, DollarSign, Tag, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
    description:
      "Join us for the Gyeonggi Spring Open 2025, an official WCA competition featuring multiple speedcubing events. This competition is open to all skill levels, from beginners to advanced cubers. Come compete, meet fellow cubers, and improve your official rankings!",
    schedule: [
      { time: "9:00 AM", activity: "Registration & Check-in" },
      { time: "9:30 AM", activity: "3x3x3 Round 1" },
      { time: "11:00 AM", activity: "2x2x2 Round 1" },
      { time: "12:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM", activity: "4x4x4 Round 1" },
      { time: "3:00 PM", activity: "Pyraminx Final" },
      { time: "4:00 PM", activity: "Skewb Final" },
      { time: "5:00 PM", activity: "3x3x3 Final" },
      { time: "5:45 PM", activity: "Awards Ceremony" },
    ],
    requirements: [
      "Valid WCA account (create at worldcubeassociation.org)",
      "Registration fee payment before deadline",
      "Bring your own puzzles (WCA regulation compliant)",
      "Arrive 30 minutes before your first event",
    ],
    organizers: ["Kim Min-jun", "Lee Seo-yeon", "Park Ji-ho"],
    wcaLink: "https://worldcubeassociation.org",
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
    description:
      "Our weekly practice sessions are casual meetups for cubers of all skill levels. Drop in anytime during the session to practice, learn new techniques, get tips from experienced cubers, or just hang out with the community. No registration required!",
    schedule: [
      { time: "2:00 PM", activity: "Open Practice Begins" },
      { time: "2:30 PM", activity: "Beginner Tips & Tricks" },
      { time: "3:30 PM", activity: "Timed Practice Rounds" },
      { time: "4:30 PM", activity: "Free Practice & Socializing" },
    ],
    requirements: ["Bring your own cubes", "All skill levels welcome", "No registration needed"],
    organizers: ["Choi Hyun-woo"],
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
    description:
      "Perfect for beginners who want to learn speedcubing! This workshop covers the fundamentals of solving a 3x3x3 cube and introduces the CFOP method. Our experienced instructors will guide you step-by-step, and you'll leave with the knowledge to solve the cube consistently.",
    schedule: [
      { time: "1:00 PM", activity: "Introduction & Cube Notation" },
      { time: "1:30 PM", activity: "Cross & F2L Basics" },
      { time: "2:30 PM", activity: "Break & Practice Time" },
      { time: "2:45 PM", activity: "OLL & PLL Introduction" },
      { time: "3:30 PM", activity: "Practice & Q&A" },
    ],
    requirements: [
      "No prior experience needed",
      "Bring a 3x3x3 cube (or borrow one at the workshop)",
      "Registration required",
      "Workshop fee: ₩5,000",
    ],
    organizers: ["Jung Eun-ji", "Kang Tae-yang"],
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
    description:
      "Our biggest competition of the year! The Gyeonggi Summer Championship features 8 official WCA events and welcomes competitors from across Korea. With a larger venue and more events, this is the perfect opportunity to challenge yourself and compete for podium finishes.",
    schedule: [
      { time: "9:00 AM", activity: "Registration Opens" },
      { time: "9:30 AM", activity: "Opening Ceremony" },
      { time: "10:00 AM", activity: "Multiple Events (See detailed schedule)" },
      { time: "12:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM", activity: "Afternoon Events Continue" },
      { time: "6:00 PM", activity: "Finals & Awards Ceremony" },
    ],
    requirements: [
      "Valid WCA account required",
      "Registration opens April 1, 2025",
      "Limited to 100 competitors",
      "All puzzles must be WCA regulation compliant",
    ],
    organizers: ["Kim Min-jun", "Lee Seo-yeon", "Park Ji-ho", "Choi Hyun-woo"],
    wcaLink: "https://worldcubeassociation.org",
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
    description:
      "An intensive training bootcamp for intermediate to advanced cubers looking to break through their speed plateaus. Learn advanced F2L techniques, optimize your OLL/PLL recognition, and practice with timed drills. Limited spots available for personalized attention.",
    schedule: [
      { time: "10:00 AM", activity: "Advanced F2L Techniques" },
      { time: "11:30 AM", activity: "OLL/PLL Optimization" },
      { time: "12:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM", activity: "Timed Practice Drills" },
      { time: "2:30 PM", activity: "Individual Feedback & Q&A" },
    ],
    requirements: [
      "Intermediate level or higher (sub-30 seconds average)",
      "Know basic CFOP method",
      "Limited to 15 participants",
      "Registration required",
    ],
    organizers: ["Park Ji-ho", "Jung Eun-ji"],
  },
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={event.type === "WCA Official" ? "default" : "secondary"} className="text-sm">
                {event.type}
              </Badge>
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
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-muted-foreground">{event.description}</p>
          </div>

          <Separator />

          {/* Schedule */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Schedule</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-24 font-mono text-sm text-muted-foreground">{item.time}</div>
                      <div className="flex-1 font-medium">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Events & Categories</h2>
            <div className="flex flex-wrap gap-2">
              {event.categories.map((category, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Organizers */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Organizers</h2>
            <div className="flex flex-wrap gap-2">
              {event.organizers.map((organizer, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {organizer}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-sm text-muted-foreground">{event.date}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Time</div>
                  <div className="text-sm text-muted-foreground">{event.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--neon-green)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{event.location}</div>
                  <div className="text-sm text-muted-foreground">{event.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-[var(--violet-glow)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Participants</div>
                  <div className="text-sm text-muted-foreground">
                    {event.participants} / {event.maxParticipants} registered
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Registration Fee</div>
                  <div className="text-sm text-muted-foreground">{event.fee}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Registration Deadline</div>
                  <div className="text-sm text-muted-foreground">{event.registrationDeadline}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration CTA */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Ready to Join?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {event.status === "Registration Open"
                    ? "Register now to secure your spot!"
                    : event.status === "Coming Soon"
                      ? "Registration opens soon. Check back later!"
                      : "Drop in anytime during the session!"}
                </p>
              </div>

              {event.status === "Registration Open" && (
                <Button className="w-full" size="lg">
                  Register Now
                </Button>
              )}

              {event.status === "Ongoing" && (
                <Button className="w-full bg-transparent" size="lg" variant="outline">
                  Get Directions
                </Button>
              )}

              {event.status === "Coming Soon" && (
                <Button className="w-full bg-transparent" size="lg" variant="outline" disabled>
                  Registration Opens Soon
                </Button>
              )}

              {event.wcaLink && (
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={event.wcaLink} target="_blank" rel="noopener noreferrer">
                    View on WCA Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about this event? Contact our organizers or visit our Discord community.
              </p>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
