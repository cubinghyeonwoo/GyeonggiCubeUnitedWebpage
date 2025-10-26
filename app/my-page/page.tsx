"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const cubeEvents = [
  "3x3x3",
  "2x2x2",
  "4x4x4",
  "5x5x5",
  "6x6x6",
  "7x7x7",
  "3x3x3 One-Handed",
  "3x3x3 Blindfolded",
  "Pyraminx",
  "Megaminx",
  "Skewb",
  "Square-1",
  "Clock",
]

export default function MyPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Profile fields
  const [fullName, setFullName] = useState("")
  const [wcaId, setWcaId] = useState("")
  const [bio, setBio] = useState("")
  const [mainCube, setMainCube] = useState("")
  const [location, setLocation] = useState("")

  // Personal bests
  const [personalBests, setPersonalBests] = useState<any[]>([])
  const [newPBEvent, setNewPBEvent] = useState("")
  const [newPBSingle, setNewPBSingle] = useState("")
  const [newPBAverage, setNewPBAverage] = useState("")

  // Specialties
  const [specialties, setSpecialties] = useState<any[]>([])
  const [newSpecialty, setNewSpecialty] = useState("")

  // Collection
  const [collection, setCollection] = useState<any[]>([])
  const [newCubeName, setNewCubeName] = useState("")
  const [newCubeType, setNewCubeType] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      // Load profile
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profile) {
        setFullName(profile.full_name || "")
        setWcaId(profile.wca_id || "")
        setBio(profile.bio || "")
        setMainCube(profile.main_cube || "")
        setLocation(profile.location || "")
      }

      // Load personal bests
      const { data: pbs } = await supabase.from("member_personal_bests").select("*").eq("member_id", user.id)
      setPersonalBests(pbs || [])

      // Load specialties
      const { data: specs } = await supabase.from("member_specialties").select("*").eq("member_id", user.id)
      setSpecialties(specs || [])

      // Load collection
      const { data: coll } = await supabase.from("member_collection").select("*").eq("member_id", user.id)
      setCollection(coll || [])
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          wca_id: wcaId,
          bio: bio,
          main_cube: mainCube,
          location: location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Error saving profile")
    } finally {
      setSaving(false)
    }
  }

  const addPersonalBest = async () => {
    if (!user || !newPBEvent) return

    try {
      const { error } = await supabase.from("member_personal_bests").upsert({
        member_id: user.id,
        event_name: newPBEvent,
        single_time: newPBSingle,
        average_time: newPBAverage,
      })

      if (error) throw error
      setNewPBEvent("")
      setNewPBSingle("")
      setNewPBAverage("")
      loadProfile()
    } catch (error) {
      console.error("Error adding personal best:", error)
    }
  }

  const deletePersonalBest = async (id: string) => {
    try {
      const { error } = await supabase.from("member_personal_bests").delete().eq("id", id)
      if (error) throw error
      loadProfile()
    } catch (error) {
      console.error("Error deleting personal best:", error)
    }
  }

  const addSpecialty = async () => {
    if (!user || !newSpecialty) return

    try {
      const { error } = await supabase.from("member_specialties").insert({
        member_id: user.id,
        specialty: newSpecialty,
      })

      if (error) throw error
      setNewSpecialty("")
      loadProfile()
    } catch (error) {
      console.error("Error adding specialty:", error)
    }
  }

  const deleteSpecialty = async (id: string) => {
    try {
      const { error } = await supabase.from("member_specialties").delete().eq("id", id)
      if (error) throw error
      loadProfile()
    } catch (error) {
      console.error("Error deleting specialty:", error)
    }
  }

  const addCollection = async () => {
    if (!user || !newCubeName || !newCubeType) return

    try {
      const { error } = await supabase.from("member_collection").insert({
        member_id: user.id,
        cube_name: newCubeName,
        cube_type: newCubeType,
      })

      if (error) throw error
      setNewCubeName("")
      setNewCubeType("")
      loadProfile()
    } catch (error) {
      console.error("Error adding to collection:", error)
    }
  }

  const deleteCollection = async (id: string) => {
    try {
      const { error } = await supabase.from("member_collection").delete().eq("id", id)
      if (error) throw error
      loadProfile()
    } catch (error) {
      console.error("Error deleting from collection:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      {/* Basic Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="wcaId">WCA ID</Label>
              <Input id="wcaId" placeholder="2023JOHN01" value={wcaId} onChange={(e) => setWcaId(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="mainCube">Main Speedcube</Label>
              <Input
                id="mainCube"
                placeholder="GAN 12 MagLev"
                value={mainCube}
                onChange={(e) => setMainCube(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Seoul, South Korea"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>
          <Button onClick={saveProfile} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Personal Bests */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personal Bests</CardTitle>
          <CardDescription>Track your best times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {personalBests.map((pb) => (
              <div key={pb.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{pb.event_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Single: {pb.single_time || "N/A"} | Average: {pb.average_time || "N/A"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deletePersonalBest(pb.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Select value={newPBEvent} onValueChange={setNewPBEvent}>
              <SelectTrigger>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {cubeEvents.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Single (e.g., 8.45)"
              value={newPBSingle}
              onChange={(e) => setNewPBSingle(e.target.value)}
            />
            <Input
              placeholder="Average (e.g., 10.23)"
              value={newPBAverage}
              onChange={(e) => setNewPBAverage(e.target.value)}
            />
          </div>
          <Button onClick={addPersonalBest} disabled={!newPBEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Personal Best
          </Button>
        </CardContent>
      </Card>

      {/* Specialties */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Specialties</CardTitle>
          <CardDescription>Your favorite events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {specialties.map((spec) => (
              <div key={spec.id} className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <span className="text-sm">{spec.specialty}</span>
                <button onClick={() => deleteSpecialty(spec.id)} className="hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Select value={newSpecialty} onValueChange={setNewSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {cubeEvents.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addSpecialty} disabled={!newSpecialty}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collection */}
      <Card>
        <CardHeader>
          <CardTitle>Cube Collection</CardTitle>
          <CardDescription>Your puzzle collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {collection.map((cube) => (
              <div key={cube.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{cube.cube_name}</p>
                  <p className="text-sm text-muted-foreground">{cube.cube_type}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteCollection(cube.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Cube name (e.g., GAN 12 MagLev)"
              value={newCubeName}
              onChange={(e) => setNewCubeName(e.target.value)}
            />
            <Select value={newCubeType} onValueChange={setNewCubeType}>
              <SelectTrigger>
                <SelectValue placeholder="Cube type" />
              </SelectTrigger>
              <SelectContent>
                {cubeEvents.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addCollection} disabled={!newCubeName || !newCubeType}>
            <Plus className="h-4 w-4 mr-2" />
            Add to Collection
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
