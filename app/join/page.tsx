"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Trophy, Calendar, Heart, CheckCircle2 } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Community Access",
    description: "Join a vibrant community of speedcubers",
  },
  {
    icon: Trophy,
    title: "Competition Entry",
    description: "Priority registration for club events",
  },
  {
    icon: Calendar,
    title: "Weekly Practice",
    description: "Free access to practice sessions",
  },
  {
    icon: Heart,
    title: "Expert Coaching",
    description: "Learn from experienced cubers",
  },
]

export default function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    experience: "",
    pb3x3: "",
    wcaId: "",
    motivation: "",
    agreeTerms: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Application submitted:", formData)
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold">Application Submitted!</h1>
              <p className="text-lg text-muted-foreground">
                Thank you for applying to join Gyeonggi Cube United, {formData.firstName}!
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-left space-y-2">
                <h3 className="font-semibold">What's Next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ We'll review your application within 3-5 business days</li>
                  <li>✓ You'll receive an email at {formData.email} with next steps</li>
                  <li>✓ Check your spam folder if you don't see our email</li>
                  <li>✓ Feel free to attend our next practice session while you wait!</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <a href="/events">View Events</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/">Back to Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Join <span className="text-primary">Gyeonggi Cube United</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Become part of Gyeonggi Province's premier speedcubing community
            </p>
          </div>

          {/* Benefits */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Cubing Experience */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cubing Experience</h3>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => setFormData({ ...formData, experience: value })}
                    >
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (30s+)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (15-30s)</SelectItem>
                        <SelectItem value="advanced">Advanced (Sub-15)</SelectItem>
                        <SelectItem value="expert">Expert (Sub-10)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pb3x3">3x3 Personal Best</Label>
                      <Input
                        id="pb3x3"
                        placeholder="e.g., 12.34"
                        value={formData.pb3x3}
                        onChange={(e) => setFormData({ ...formData, pb3x3: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wcaId">WCA ID (if applicable)</Label>
                      <Input
                        id="wcaId"
                        placeholder="e.g., 2023JOHN01"
                        value={formData.wcaId}
                        onChange={(e) => setFormData({ ...formData, wcaId: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to join GCU? *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="Tell us about your interest in speedcubing and what you hope to achieve..."
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I agree to the club's terms and conditions, and I understand that membership requires active
                    participation in club activities.
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={!formData.agreeTerms || isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• We'll review your application within 3-5 business days</li>
                <li>• You'll receive an email with next steps and membership details</li>
                <li>• Annual membership fee: ₩50,000 (includes event discounts and club merchandise)</li>
                <li>• Questions? Contact us at membership@gcu.kr</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
