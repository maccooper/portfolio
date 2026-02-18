import { ArrowUpRight } from "lucide-react"

const experiences = [
  {
    period: "Previous",
    company: "Dometic",
    role: "Software Engineer",
    description:
      "Worked on embedded telemetry and IoT systems, building reliable data pipelines and real-time monitoring for connected devices.",
    tags: ["Embedded", "Telemetry", "IoT"],
  },
  {
    period: "Previous",
    company: "Eddyfi Robotics",
    role: "Software Engineer",
    description:
      "Developed ETL pipelines and inventory tooling, automating data flows and streamlining operational processes.",
    tags: ["ETL", "Tooling", "Data Pipelines"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-sm font-semibold text-primary">01</span>
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          Experience
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="group border-t border-border py-8 transition-colors md:py-10"
          >
            <div className="grid gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              <div className="flex flex-col gap-2 md:col-span-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <span className="text-border">{"/"}</span>
                  <span className="font-mono text-sm text-primary">{exp.company}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <p className="leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
