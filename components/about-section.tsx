"use client"

import { useEffect, useRef, useState } from "react"

const INTERESTS = [
  { label: "algorithms / complexity",  desc: "pure problem solving, used everywhere." },
  { label: "systems programming",      desc: "broad but ends up being most of the problems I find myself wanting to work on." },
  { label: "game engines",             desc: "real-time, constrained, has to be fast and correct" },
  { label: "graphics / simulation",    desc: "applied math with visible output" },
  { label: "security",                 desc: "more interested than experienced. what happens to your assumptions when someone is actively trying to break them." },
  { label: "compilers / interpreters", desc: "making correctness the compiler's problem, not the developer's." },
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
      className="relative px-4 sm:px-6 pt-8 pb-0 md:pt-14 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {"// about"}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-primary" />
        </div>

        <div className={`space-y-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-foreground leading-relaxed text-sm md:text-base">
            Software engineer based in BC. I like systems that are close to the metal and tuned to an objective.
            I believe code should be written defensively: strong types, tests as contracts, and little to no surprises at runtime.
          </p>
          <p className="text-foreground leading-relaxed text-sm md:text-base">
            Not interested in complexity for its own sake. Your smart fridge doesn&apos;t need to be on the wifi.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Currently building APIs at EducationPlannerBC.
            Previously worked on embedded telemetry at Dometic and data pipelines at Eddyfi Robotics.
            Want to work closer to the core. Compilers, runtimes, game engines, that direction.
          </p>
        </div>

        <div className={`mt-8 md:mt-14 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase block mb-4">
            {"// interests"}
          </span>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            These are areas I find myself drawn to. Some I&apos;ve worked in, some I&apos;m actively studying, some I just think about.
            The common thread is that they earn their complexity.
          </p>
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
