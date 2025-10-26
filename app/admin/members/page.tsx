"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Trash2, Trophy, Clock, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminMembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select(`
          *,
          member_personal_bests(*),
          member_collection(*)
        `)
        .order("created_at", { ascending: true })

      setMembers(data || [])
    } catch (error) {
      console.error("[v0] Error loading members:", error)
    } finally {
      setLoading(false)
    }
  }

  const changeRole = async (memberId: string, newRole: string) => {
    try {
      const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", memberId)

      if (error) throw error

      alert(`Role updated to ${newRole} successfully`)
      loadMembers()
    } catch (error) {
      console.error("[v0] Error changing role:", error)
      alert("Error updating role")
    }
  }

  const deleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to remove this member? This will delete all their data.")) {
      return
    }

    try {
      const { error } = await supabase.from("profiles").delete().eq("id", id)

      if (error) throw error

      alert("Member removed successfully")
      loadMembers()
    } catch (error) {
      console.error("[v0] Error deleting member:", error)
      alert("Error removing member")
    }
  }

  const filteredMembers = members.filter((member) =>
    member.full_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground mt-1">Manage club members, roles, and profiles</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Members Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredMembers.map((member) => {
          const best3x3 = member.member_personal_bests?.find((pb: any) => pb.event_name === "3x3x3")
          const collectionCount = member.member_collection?.length || 0

          return (
            <Card key={member.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={member.avatar_url || "/placeholder.svg"} alt={member.full_name} />
                    <AvatarFallback>
                      {member.full_name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{member.full_name || "Anonymous"}</h3>
                        <Select value={member.role || "member"} onValueChange={(value) => changeRole(member.id, value)}>
                          <SelectTrigger className="w-[120px] h-7">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.wca_id && <Badge>{member.wca_id}</Badge>}
                        {member.joined_date && (
                          <span className="text-sm text-muted-foreground">
                            Joined {new Date(member.joined_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      {best3x3 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{best3x3.single_time}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-muted-foreground" />
                        <span>{collectionCount} cubes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => deleteMember(member.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredMembers.length === 0 && <div className="text-center py-12 text-muted-foreground">No members found</div>}
    </div>
  )
}
