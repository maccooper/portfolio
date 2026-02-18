"use client"

import { useEffect, useRef, useState } from "react"

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
      className="relative px-6 py-24 md:py-32 lg:pl-12"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header styled as a comment */}
        <div className={`mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {"// about"}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-primary" />
        </div>

        <div className={`space-y-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-foreground leading-relaxed text-sm md:text-base">
            Enjoyer of <span className="text-primary font-semibold">strong typing</span>. 
            I build things that run close to the metal and care deeply about 
            correctness, performance, and the developer experience of the tools I create.
          </p>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            My interests live at the intersection of systems programming and 
            developer tooling. I find satisfaction in writing interpreters that 
            parse cleanly, game engines that render fast, and CLI tools that 
            feel right.
          </p>

          <div className="border-l-2 border-primary pl-4 py-2">
            <p className="text-foreground text-sm md:text-base italic leading-relaxed">
              {"\"The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.\""}
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              -- Edsger W. Dijkstra
            </p>
          </div>
        </div>

        {/* Inline code-style tech interests */}
        <div className={`mt-10 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase block mb-4">
            {"// interests"}
          </span>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              "systems programming",
              "interpreters",
              "game engines",
              "CLI tooling",
              "embedded systems",
              "type theory",
              "compilers",
              "low-level I/O",
            ].map((interest) => (
              <div
                key={interest}
                className="border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200"
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
