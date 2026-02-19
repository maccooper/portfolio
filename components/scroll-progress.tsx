"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const SECTION_LABELS = ["init", "about", "xp", "skills", "END"]

// Mirrors exactly what the nav buttons href to — same DOM IDs, same positions.
// section-init / section-end have no nav link so we use the page.tsx wrapper IDs.
const ANCHORS = [
  { id: "section-init", idx: 0 },
  { id: "about",        idx: 1 },
  { id: "experience",   idx: 2 },
  { id: "skills",       idx: 3 },
  { id: "section-end",  idx: 4 },
]

function generateHexLine(addr: number): string {
  const hex = addr.toString(16).toUpperCase().padStart(4, "0")
  return `0x${hex}`
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const rafRef = useRef<number>(0)

  // Smooth progress tracking for the visual bar / read-head position
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
      setVisible(scrollTop > 80)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  // Section label — same element IDs the nav hrefs use.
  // Whichever section has the highest visible fraction wins;
  // ties go to the topmost (lowest idx) section.
  useEffect(() => {
    const ratios = new Map<number, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const anchor = ANCHORS.find((a) => a.id === entry.target.id)
          if (!anchor) return
          if (entry.isIntersecting) ratios.set(anchor.idx, entry.intersectionRatio)
          else ratios.delete(anchor.idx)
        })

        if (ratios.size === 0) return
        let best = 0, bestRatio = -1
        ratios.forEach((ratio, idx) => {
          if (ratio > bestRatio || (ratio === bestRatio && idx < best)) {
            bestRatio = ratio
            best = idx
          }
        })
        setSectionIndex(best)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    )

    ANCHORS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // 16 ticks at 0x1111 intervals — lands exactly on 0x0000, 0x1111, 0x2222 ... 0xFFFF
  const totalTicks = 16
  const hexLines = Array.from({ length: totalTicks }, (_, i) =>
    generateHexLine(i * 0x1111)
  )

  // Current read-head position (index in the hex lines)
  const headIndex = Math.floor(progress * (totalTicks - 1))

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 z-50 h-[2px] w-full">
        <div
          className="h-full bg-primary transition-[width] duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Central data stream column */}
      <div
        className={`fixed left-6 top-0 z-40 hidden h-full lg:flex flex-col items-center transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Vertical track */}
        <div className="relative flex h-full w-16 flex-col items-center py-16">
          {/* Background line */}
          <div className="absolute left-1/2 top-16 bottom-16 w-[1px] -translate-x-1/2 bg-border" />

          {/* Orange fill */}
          <div
            className="absolute left-1/2 top-16 w-[1px] -translate-x-1/2 bg-primary/60 transition-[height] duration-100 ease-out"
            style={{ height: `calc(${progress} * (100% - 128px))` }}
          />

          {/* Hex address ticks */}
          {hexLines.map((hex, i) => {
            const tickProgress = i / (totalTicks - 1)
            const isActive = i <= headIndex
            const isHead = i === headIndex
            return (
              <div
                key={i}
                className="absolute flex items-center gap-2 transition-all duration-200"
                style={{
                  top: `calc(64px + ${tickProgress} * (100% - 128px))`,
                  transform: "translateY(-50%)",
                }}
              >
                <div
                  className={`h-[1px] transition-all duration-200 ${
                    isHead
                      ? "w-3 bg-primary"
                      : isActive
                        ? "w-2 bg-primary/40"
                        : "w-1.5 bg-border"
                  }`}
                />
                <span
                  className={`text-[9px] font-mono tabular-nums tracking-tight transition-all duration-200 select-none ${
                    isHead
                      ? "text-primary"
                      : isActive
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground/20"
                  }`}
                >
                  {hex}
                </span>
              </div>
            )
          })}

          {/* Glowing read-head */}
          <div
            className="absolute left-0 flex items-center transition-all duration-150 ease-out"
            style={{
              top: `calc(64px + ${progress} * (100% - 128px))`,
              transform: "translateY(-50%)",
            }}
          >
            <div
              className="h-[2px] w-16 bg-primary"
              style={{
                boxShadow:
                  "0 0 6px #ff6a00, 0 0 12px #ff6a0088, 0 0 24px #ff6a0044",
              }}
            />
          </div>

          {/* Section label at read-head */}
          <div
            className="absolute left-[72px] flex items-center gap-1.5 transition-all duration-150 ease-out"
            style={{
              top: `calc(64px + ${progress} * (100% - 128px))`,
              transform: "translateY(-50%)",
            }}
          >
            <span className="text-[10px] text-primary font-mono tracking-widest uppercase">
              {"["}
              {SECTION_LABELS[sectionIndex]}
              {"]"}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: minimal right-side indicator */}
      <div
        className={`fixed right-2 top-1/2 z-40 -translate-y-1/2 flex flex-col items-center lg:hidden transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="relative h-32 w-[2px] bg-border rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-primary transition-[height] duration-100 ease-out rounded-full"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <span className="mt-1.5 text-[8px] text-primary font-mono tabular-nums">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </>
  )
}
