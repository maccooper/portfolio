"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, FileText, Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
]

const CONTACT_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/maccooper" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mac-cooper-54625b163/" },
  { icon: Mail, label: "Email", href: "mailto:Mackenzie.Cooper99@gmail.com" },
  { icon: FileText, label: "Resume", href: "/maccooper_resume.pdf" },
]

export function TerminalNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setContactOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav
      className="fixed top-0 right-4 z-40 py-3 md:right-0 md:px-6"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Hamburger — mobile only */}
      <button
        className="p-2 md:hidden text-primary"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-full right-0 mt-1 border border-border bg-card p-2 min-w-[180px] md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center py-2 px-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <span className="text-primary mr-1 select-none">./</span>
              {item.label}
            </a>
          ))}
          <div className="border-t border-border mt-1">
            {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2 px-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon size={12} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <span className="text-primary mr-1 select-none">./</span>
            {item.label}
          </a>
        ))}

        {/* Contact dropdown */}
        <div ref={contactRef} className="relative">
          <button
            onClick={() => setContactOpen((o) => !o)}
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <span className="text-primary mr-1 select-none">./</span>
            contact
          </button>

          {contactOpen && (
            <div className="absolute top-full right-0 mt-3 border border-border bg-card p-3 flex gap-4">
              {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  onClick={() => setContactOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 border border-border hover:border-primary"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
