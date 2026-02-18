import { ScrollProgress } from "@/components/scroll-progress"
import { ScanlineOverlay } from "@/components/scanline-overlay"
import { TerminalNav } from "@/components/terminal-nav"
import { TerminalHero } from "@/components/terminal-hero"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { TerminalFooter } from "@/components/terminal-footer"

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:pl-12">
      <div className="flex items-center gap-3 py-1">
        <div className="h-[1px] flex-1 bg-border" />
        <span className="text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase select-none">
          {"// "}
          {label}
        </span>
        <div className="h-[1px] flex-1 bg-border" />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <ScanlineOverlay />
      <ScrollProgress />
      <TerminalNav />

      <main className="relative min-h-screen">
        <TerminalHero />

        <SectionBreak label="SECTION::ABOUT" />
        <AboutSection />

        <SectionBreak label="SECTION::EXPERIENCE" />
        <ExperienceSection />

        <SectionBreak label="SECTION::SKILLS" />
        <SkillsSection />

        <SectionBreak label="SECTION::CONTACT" />
        <ContactSection />
      </main>

      <TerminalFooter />
    </>
  )
}
