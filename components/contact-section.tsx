"use client"

import { useEffect, useRef, useState } from "react"

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="contact"
      className="relative px-6 py-24 md:py-32 lg:pl-12"
    >
      <div className="mx-auto max-w-3xl">
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {"// contact"}
          </span>
          <div className="mt-2 h-[1px] w-12 bg-primary" />
        </div>

        <p className={`text-muted-foreground text-sm leading-relaxed max-w-md transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Currently open to new opportunities. If you are building something
          interesting at the systems level, I would like to hear about it.
        </p>
      </div>
    </section>
  )
}
