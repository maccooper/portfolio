import { Github, Linkedin, Mail, FileText } from "lucide-react"

const LINKS = [
  { icon: Github, href: "https://github.com/maccooper", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mac-cooper-54625b163/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:Mackenzie.Cooper99@gmail.com", label: "Email" },
  { icon: FileText, href: "/maccooper_resume.pdf", label: "Resume" },
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
        <div className="text-xs">
          <span className="text-primary font-mono">0x0D0A</span>
        </div>
      </div>
    </footer>
  )
}
