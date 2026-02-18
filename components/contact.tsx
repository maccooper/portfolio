import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"

const links = [
  {
    icon: Github,
    label: "GitHub",
    href: "#",
    handle: "github.com/you",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
    handle: "linkedin.com/in/you",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@example.com",
    handle: "hello@example.com",
  },
]

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-sm font-semibold text-primary">03</span>
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          Contact
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Always open to interesting conversations about systems programming,
            language design, or new opportunities.
          </p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {"Let's connect"}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-t border-border py-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <link.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">
                  {link.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                  {link.handle}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  )
}
