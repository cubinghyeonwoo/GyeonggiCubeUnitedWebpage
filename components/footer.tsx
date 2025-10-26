import Link from "next/link"
import { Instagram, Youtube, MessageCircle } from "lucide-react"

const footerLinks = {
  main: [
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "Discord", href: "#", icon: MessageCircle },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "YouTube", href: "#", icon: Youtube },
  ],
}

export function Footer() {
  return (
    <footer className="relative mt-20 border-t bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary via-accent to-[var(--neon-green)] opacity-80 blur-sm" />
                <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-background/90 font-bold text-lg">
                  GCU
                </div>
              </div>
              <span className="text-lg font-bold">Gyeonggi Cube United</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Speed. Precision. Unity. Connecting cubers across Gyeonggi Province.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:glow-primary"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Gyeonggi Cube United. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
