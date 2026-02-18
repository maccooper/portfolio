import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="flex min-h-svh flex-col justify-between px-6 pb-12 pt-16 md:px-12 lg:px-24">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Available for work
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          BC, Canada
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-8">
        <h1 className="text-balance text-6xl font-bold leading-[0.95] tracking-tight text-foreground md:text-8xl lg:text-9xl">
          Software
          <br />
          Engineer<span className="text-primary">.</span>
        </h1>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Enjoyer of strong typing. Building systems software,
            interpreters, game engines, and CLI tooling.
          </p>

          {/* Asiimov-style accent block */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-1.5 bg-primary" />
            <div className="flex flex-col font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>Junior</span>
              <span className="text-foreground">Developer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-end justify-between">
        <nav className="flex gap-8 font-mono text-xs">
          {[
            { num: "01", label: "Experience", href: "#experience" },
            { num: "02", label: "Interests", href: "#interests" },
            { num: "03", label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-primary">{item.num}</span>
              <span className="hidden md:inline">{item.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#experience"
          className="group flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to experience section"
        >
          <span className="hidden md:inline">Scroll</span>
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  )
}
