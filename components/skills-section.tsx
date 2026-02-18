"use client"

import { useEffect, useRef, useState } from "react"

const SKILL_CATEGORIES = [
  {
    label: "languages",
    items: ["Rust", "C", "C++", "TypeScript", "Python", "Go"],
  },
  {
    label: "systems",
    items: ["Linux", "Embedded", "RTOS", "POSIX", "Networking"],
  },
  {
    label: "tools",
    items: ["Git", "Docker", "GDB", "Valgrind", "Make/CMake"],
  },
  {
    label: "domains",
    items: ["Compilers", "Interpreters", "Game Engines", "IoT", "ETL"],
  },
]

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="skills"
      className="relative px-6 py-24 md:py-32 lg:pl-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {"// skills"}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-primary" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary text-xs">{">"}</span>
                <span className="text-muted-foreground text-xs tracking-widest uppercase">
                  {cat.label}
                </span>
              </div>
              <div className="border border-border bg-card p-4">
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-foreground text-xs bg-secondary border border-border px-2.5 py-1 hover:border-primary hover:text-primary transition-colors duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
