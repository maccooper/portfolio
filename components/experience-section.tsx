"use client"

import { useEffect, useRef, useState } from "react"

const EXPERIENCES = [
  {
    role: "Software Engineering Intern",
    company: "Dometic",
    period: "Previous",
    description:
      "Worked on embedded telemetry and IoT systems. Built firmware-level data pipelines for real-time sensor telemetry, interfacing directly with hardware protocols and constrained runtime environments.",
    tech: ["C", "Embedded C", "IoT", "MQTT", "Telemetry", "Firmware"],
  },
  {
    role: "Software Engineering Intern",
    company: "Eddyfi Robotics",
    period: "Previous",
    description:
      "Developed ETL pipelines and inventory management tooling. Designed data transformation workflows that integrated robotic inspection data with enterprise inventory systems.",
    tech: ["Python", "ETL", "SQL", "Data Pipelines", "Robotics"],
  },
]

export function ExperienceSection() {
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
      id="experience"
      className="relative px-6 py-14 md:py-20 lg:pl-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {"// experience"}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-primary" />
        </div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp, i) => (
            <article
              key={exp.company}
              className={`group relative border border-border bg-card p-5 md:p-6 transition-all duration-700 hover:border-primary/50 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              {/* Orange accent bar */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-border group-hover:bg-primary transition-colors duration-300" />

              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between mb-3">
                <div>
                  <h3 className="text-foreground text-sm md:text-base font-medium">
                    {exp.role}
                  </h3>
                  <p className="text-primary text-sm font-semibold">
                    {exp.company}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs font-mono">
                  {exp.period}
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="border border-border bg-secondary px-2 py-0.5 text-[10px] tracking-wider uppercase text-muted-foreground group-hover:border-primary/30 transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
