import { ScrollProgress } from "@/components/scroll-progress"
import { ScanlineOverlay } from "@/components/scanline-overlay"
import { TerminalNav } from "@/components/terminal-nav"
import { TerminalHero } from "@/components/terminal-hero"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { TerminalFooter } from "@/components/terminal-footer"

export default function Home() {
  return (
    <>
      <ScanlineOverlay />
      <ScrollProgress />
      <TerminalNav />

      <main className="relative min-h-screen">
        <section id="section-init"><TerminalHero /></section>
        <section id="section-about"><AboutSection /></section>
        <section id="section-xp"><ExperienceSection /></section>
        <section id="section-skills"><SkillsSection /></section>
      </main>

      <div id="section-end"><TerminalFooter /></div>
    </>
  )
}
