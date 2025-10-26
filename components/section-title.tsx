import type React from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode
  subtitle?: string
  className?: string
  centered?: boolean
}

export function SectionTitle({ children, subtitle, className, centered = false }: SectionTitleProps) {
  return (
    <div className={cn("space-y-2", centered && "text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-balance">{children}</h2>
      {subtitle && <p className="text-lg text-muted-foreground text-pretty max-w-2xl">{subtitle}</p>}
    </div>
  )
}
