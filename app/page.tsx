import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Interests } from "@/components/interests"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl">
      <Hero />
      <Experience />
      <Interests />
      <Contact />
      <Footer />
    </main>
  )
}
