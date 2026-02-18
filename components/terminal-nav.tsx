"use client"

import { useState } from "react"

const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
]

export function TerminalNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-[2px] right-0 z-40 px-4 py-3 md:px-6"
      role="navigation"
      aria-label="Main navigation"
    >
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
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileOpen}
      >
        <span className={`block h-[1.5px] w-5 bg-primary transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
        <span className={`block h-[1.5px] w-5 bg-primary transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block h-[1.5px] w-5 bg-primary transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full right-4 mt-1 border border-border bg-card p-3 min-w-[160px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 px-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <span className="text-primary mr-1 select-none">./</span>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
