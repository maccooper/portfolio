import { Terminal, Cpu, Gamepad2, Code2 } from "lucide-react"

const interests = [
  {
    icon: Terminal,
    title: "CLI Tooling",
    description:
      "Building fast, composable command-line tools. Thoughtful argument parsing, helpful error messages, and great DX.",
  },
  {
    icon: Cpu,
    title: "Systems Programming",
    description:
      "Working close to the metal. Memory management, concurrency, and performance-critical code.",
  },
  {
    icon: Code2,
    title: "Interpreters",
    description:
      "Lexing, parsing, and evaluating. Understanding how languages work by building them from scratch.",
  },
  {
    icon: Gamepad2,
    title: "Game Engines",
    description:
      "Render loops, ECS architectures, and physics. The intersection of creative expression and systems engineering.",
  },
]

export function Interests() {
  return (
    <section id="interests" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-sm font-semibold text-primary">02</span>
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          Interests
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {interests.map((interest, i) => (
          <div
            key={interest.title}
            className="group relative flex flex-col gap-4 overflow-hidden border border-border bg-card p-6 transition-colors hover:border-primary/40 md:p-8"
          >
            {/* Orange top accent line */}
            <div className="absolute left-0 top-0 h-0.5 w-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <interest.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                <h3 className="font-mono text-sm font-semibold text-foreground">
                  {interest.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {interest.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
