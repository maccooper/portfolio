import { ScrollProgress } from "@/components/scroll-progress"
import { ScanlineOverlay } from "@/components/scanline-overlay"
import { TerminalNav } from "@/components/terminal-nav"
import { TerminalHero } from "@/components/terminal-hero"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { TerminalFooter } from "@/components/terminal-footer"

function SectionBreak({ label, addr }: { label: string; addr: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:pl-12">
      <div className="flex items-center gap-3 py-1">
        <div className="h-[1px] flex-1 bg-border" />
        <span className="text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase select-none">
          {"// "}
          {label}
          {" "}
          <span className="text-primary/30">{addr}</span>
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

        <SectionBreak label="SECTION::ABOUT" addr="0x0A00" />
        <AboutSection />

        <SectionBreak label="SECTION::EXPERIENCE" addr="0x0B00" />
        <ExperienceSection />

        <SectionBreak label="SECTION::SKILLS" addr="0x0C00" />
        <SkillsSection />

        <SectionBreak label="SECTION::CONTACT" addr="0x0D00" />
        <ContactSection />
      </main>

      <TerminalFooter />
    </>
  )
}
