"use client"

import { useEffect, useRef, useState } from "react"

const INTERESTS = [
  { label: "algorithms / complexity",  desc: "pure problem solving — data structures, graphs, NP-hard. the part of CS that's just math and thinking" },
  { label: "systems programming",      desc: "close to the metal, close to the hardware" },
  { label: "compilers / interpreters", desc: "how languages become machines" },
  { label: "graphics / simulation",    desc: "applied math with visible output" },
  { label: "security",                 desc: "more interested than experienced — how systems get broken and why" },
  { label: "game engines",             desc: "real-time, constrained, has to be fast and correct" },
]

export function AboutSection() {
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
      id="about"
      className="relative px-6 py-14 md:py-20 lg:pl-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className={`mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {"// about"}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-primary" />
        </div>

        <div className={`space-y-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-foreground leading-relaxed text-sm md:text-base">
            Software engineer based in BC. I like systems that are close to the metal and honest about what they do.
            I believe code should be written defensively — strong types, tests as contracts, and no surprises at runtime.
          </p>
          <p className="text-foreground leading-relaxed text-sm md:text-base">
            Not interested in complexity for its own sake. Your smart fridge doesn&apos;t need to be on the wifi.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Previously worked on embedded telemetry at Dometic and data pipelines at Eddyfi Robotics.
            Looking to work on things that are genuinely hard: compilers, runtimes, game engines, anything low to the ground.
          </p>
        </div>

        <div className={`mt-10 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase block mb-4">
            {"// interests"}
          </span>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {INTERESTS.map((interest) => (
              <div
                key={interest.label}
                className="border border-border bg-secondary px-3 py-2 text-xs hover:border-primary transition-colors duration-200 group"
              >
                <span className="text-foreground group-hover:text-primary transition-colors duration-200">{interest.label}</span>
                <span className="text-muted-foreground block mt-0.5">{interest.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
