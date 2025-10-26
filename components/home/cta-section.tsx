import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-[var(--neon-green)] p-1">
          <div className="relative bg-background rounded-[calc(1.5rem-1px)] p-12 md:p-16">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative text-center space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Join the Community?</h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Whether you're picking up your first cube or chasing world records, Gyeonggi Cube United is your home
                for speedcubing excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="group" asChild>
                  <Link href="/contact">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/members">Meet Our Members</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
