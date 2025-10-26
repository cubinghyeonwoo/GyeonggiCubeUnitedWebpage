"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    // 3D Cube animation
    let animationId: number
    const rotation = { x: 0.3, y: 0.4 }
    const targetRotation = { x: 0.3, y: 0.4 }
    let mouseX = 0
    let mouseY = 0

    const cubeSize = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.35
    const centerX = canvas.offsetWidth / 2
    const centerY = canvas.offsetHeight / 2

    // Rubik's cube colors
    const colors = {
      white: "#FFFFFF",
      yellow: "#FFD500",
      blue: "#0051BA",
      green: "#009B48",
      red: "#C41E3A",
      orange: "#FF5800",
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / rect.width
      mouseY = (e.clientY - rect.top) / rect.height
      targetRotation.y = (mouseX - 0.5) * 2
      targetRotation.x = (mouseY - 0.5) * 2
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // 3D projection
    const project = (x: number, y: number, z: number) => {
      const scale = 300 / (300 + z)
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
      }
    }

    // Rotate point
    const rotateX = (y: number, z: number, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        y: y * cos - z * sin,
        z: y * sin + z * cos,
      }
    }

    const rotateY = (x: number, z: number, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return {
        x: x * cos + z * sin,
        z: -x * sin + z * cos,
      }
    }

    // Draw cube face
    const drawFace = (vertices: Array<{ x: number; y: number; z: number }>, color: string) => {
      ctx.beginPath()
      const projected = vertices.map((v) => project(v.x, v.y, v.z))
      ctx.moveTo(projected[0].x, projected[0].y)
      for (let i = 1; i < projected.length; i++) {
        ctx.lineTo(projected[i].x, projected[i].y)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Smooth rotation interpolation
      rotation.x += (targetRotation.x - rotation.x) * 0.05
      rotation.y += (targetRotation.y - rotation.y) * 0.05

      // Auto-rotate when not hovering
      if (Math.abs(mouseX - 0.5) < 0.01 && Math.abs(mouseY - 0.5) < 0.01) {
        targetRotation.y += 0.005
      }

      const size = cubeSize / 2

      // Define cube vertices
      let vertices = [
        { x: -size, y: -size, z: -size },
        { x: size, y: -size, z: -size },
        { x: size, y: size, z: -size },
        { x: -size, y: size, z: -size },
        { x: -size, y: -size, z: size },
        { x: size, y: -size, z: size },
        { x: size, y: size, z: size },
        { x: -size, y: size, z: size },
      ]

      // Apply rotations
      vertices = vertices.map((v) => {
        let rotated = rotateX(v.y, v.z, rotation.x)
        v.y = rotated.y
        v.z = rotated.z
        rotated = rotateY(v.x, v.z, rotation.y)
        v.x = rotated.x
        v.z = rotated.z
        return v
      })

      // Draw faces (back to front for proper depth)
      const faces = [
        { vertices: [vertices[0], vertices[1], vertices[2], vertices[3]], color: colors.blue, z: vertices[0].z },
        { vertices: [vertices[4], vertices[5], vertices[6], vertices[7]], color: colors.green, z: vertices[4].z },
        { vertices: [vertices[0], vertices[1], vertices[5], vertices[4]], color: colors.yellow, z: vertices[0].z },
        { vertices: [vertices[2], vertices[3], vertices[7], vertices[6]], color: colors.white, z: vertices[2].z },
        { vertices: [vertices[0], vertices[3], vertices[7], vertices[4]], color: colors.orange, z: vertices[0].z },
        { vertices: [vertices[1], vertices[2], vertices[6], vertices[5]], color: colors.red, z: vertices[1].z },
      ]

      // Sort faces by average z-depth
      faces.sort((a, b) => {
        const avgZA = a.vertices.reduce((sum, v) => sum + v.z, 0) / 4
        const avgZB = b.vertices.reduce((sum, v) => sum + v.z, 0) / 4
        return avgZA - avgZB
      })

      faces.forEach((face) => drawFace(face.vertices, face.color))

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateSize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                Gyeonggi Province's Premier Cubing Club
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Speed. Precision.{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-[var(--neon-green)] bg-clip-text text-transparent">
                Unity.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              Join Gyeonggi Cube United and connect with passionate speedcubers across the province. Compete in official
              WCA competitions, improve your skills, and be part of a thriving community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group" asChild>
                <Link href="/events">
                  Upcoming Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group bg-transparent" asChild>
                <Link href="/about">
                  <Play className="mr-2 h-4 w-4" />
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">12</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--neon-green)]">100%</div>
                <div className="text-sm text-muted-foreground">WCA Official</div>
              </div>
            </div>
          </div>

          {/* Right content - 3D Cube */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-[var(--neon-green)]/20 blur-3xl rounded-full" />

              {/* Canvas for 3D cube */}
              <canvas ref={canvasRef} className="relative w-full h-full cursor-move" style={{ touchAction: "none" }} />

              {/* Interaction hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                Drag to rotate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
