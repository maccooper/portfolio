import { Github, Linkedin, Mail, FileText } from "lucide-react"

const LINKS = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mac@example.com", label: "Email" },
  { icon: FileText, href: "#", label: "Resume" },
]

export function TerminalFooter() {
  return (
    <footer className="border-t border-border px-6 py-8 lg:pl-12">
      <div className="mx-auto max-w-3xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 border border-border hover:border-primary"
            >
              <Icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="text-primary">Mac Cooper</span>
          <span className="mx-2 text-border">|</span>
          <span>2025</span>
        </div>
      </div>
    </footer>
  )
}
