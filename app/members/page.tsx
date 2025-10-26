import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function MembersPage() {
  const supabase = await createClient()

  const { data: profiles } = await supabase
    .from("profiles")
    .select(`
      *,
      member_personal_bests(*),
      member_specialties(*),
      member_collection(*)
    `)
    .order("created_at", { ascending: true })

  const members = profiles || []
  const leadership = members.filter((m) => m.role === "admin")

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Members</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet the passionate cubers who make up Gyeonggi Cube United
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <Input type="search" placeholder="Search members..." className="w-full" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <MemberGrid members={members} />
        </TabsContent>

        <TabsContent value="leadership" className="mt-8">
          <MemberGrid members={leadership} />
        </TabsContent>
      </Tabs>

      {/* Join CTA */}
      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Want to Join Our Community?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for passionate cubers to join our club. All skill levels are welcome!
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Sign Up Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MemberGrid({ members }: { members: any[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No members found. Be the first to join!
        </div>
      ) : (
        members.map((member) => {
          const best3x3 = member.member_personal_bests?.find((pb: any) => pb.event_name === "3x3x3")
          const specialties = member.member_specialties?.slice(0, 3) || []

          return (
            <Card key={member.id} className="group hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-24 w-24 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                    <AvatarImage src={member.avatar_url || "/placeholder.svg"} alt={member.full_name} />
                    <AvatarFallback>
                      {member.full_name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {member.full_name || "Anonymous"}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {member.role === "admin" ? "Admin" : "Member"}
                    </Badge>
                  </div>

                  {specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {specialties.map((spec: any, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec.specialty}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="w-full space-y-2 text-sm">
                    {best3x3 && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Best 3x3x3:</span>
                        <span className="font-mono font-semibold">{best3x3.single_time || "N/A"}</span>
                      </div>
                    )}
                    {member.wca_id && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">WCA ID:</span>
                        <span className="font-mono text-xs">{member.wca_id}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={`/members/${member.id}`}>View Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })
      )}
    </div>
  )
}
