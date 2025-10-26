import { notFound } from "next/navigation"
import { Trophy, Award, Target, ExternalLink, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function MemberProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: member } = await supabase
    .from("profiles")
    .select(`
      *,
      member_personal_bests(*),
      member_specialties(*),
      member_collection(*)
    `)
    .eq("id", params.id)
    .single()

  if (!member) {
    notFound()
  }

  const personalBests = member.member_personal_bests || []
  const specialties = member.member_specialties || []
  const collection = member.member_collection || []

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/members">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                  <AvatarImage src={member.avatar_url || "/placeholder.svg"} alt={member.full_name} />
                  <AvatarFallback className="text-2xl">
                    {member.full_name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">{member.full_name || "Anonymous"}</h1>
                  <Badge variant="default" className="text-sm">
                    {member.role === "admin" ? "Admin" : "Member"}
                  </Badge>
                </div>

                <div className="w-full space-y-2 text-sm">
                  {member.wca_id && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">WCA ID:</span>
                      <span className="font-mono">{member.wca_id}</span>
                    </div>
                  )}
                  {member.joined_date && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Joined:</span>
                      <span>{new Date(member.joined_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {member.location && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{member.location}</span>
                    </div>
                  )}
                  {collection.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Collection:</span>
                      <span>{collection.length} puzzles</span>
                    </div>
                  )}
                </div>

                <Separator />

                {member.wca_id && (
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`https://worldcubeassociation.org/persons/${member.wca_id}`} target="_blank">
                      View WCA Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          {specialties.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((spec: any) => (
                    <Badge key={spec.id} variant="secondary">
                      {spec.specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Equipment */}
          {member.main_cube && (
            <Card>
              <CardHeader>
                <CardTitle>Equipment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Main Cube</div>
                  <div className="font-medium">{member.main_cube}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio */}
          {member.bio && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Personal Bests */}
          {personalBests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Personal Bests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {personalBests.map((pb: any) => (
                    <div key={pb.id} className="p-4 rounded-lg bg-secondary/50 border">
                      <div className="font-semibold mb-3">{pb.event_name}</div>
                      <div className="space-y-2 text-sm">
                        {pb.single_time && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Single:</span>
                            <span className="font-mono font-semibold text-primary">{pb.single_time}</span>
                          </div>
                        )}
                        {pb.average_time && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Average:</span>
                            <span className="font-mono font-semibold text-accent">{pb.average_time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Collection */}
          {collection.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Cube Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {collection.map((cube: any) => (
                    <div key={cube.id} className="p-3 rounded-lg bg-secondary/30 border">
                      <div className="font-medium">{cube.cube_name}</div>
                      <div className="text-sm text-muted-foreground">{cube.cube_type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
