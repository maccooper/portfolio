"use client"

import { useEffect, useRef, useState } from "react"

const LINKS = [
  { label: "GitHub", href: "#", icon: "gh" },
  { label: "LinkedIn", href: "#", icon: "li" },
  { label: "Email", href: "mailto:mac@example.com", icon: "em" },
]

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="contact"
      className="relative px-6 py-24 md:py-32 lg:pl-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {"// contact --open"}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-primary" />
        </div>

        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
            Currently open to new opportunities. If you are building something
            interesting at the systems level, I would like to hear about it.
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 border border-border bg-card px-5 py-3 text-sm text-foreground hover:border-primary hover:text-primary transition-all duration-200"
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              >
                <span className="text-primary text-xs select-none">$</span>
                <span className="tracking-wide">{link.label}</span>
                <svg
                  className="ml-auto h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
