"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const SECTION_LABELS = ["init", "about", "xp", "skills", "contact", "EOF"]

function generateHexLine(addr: number): string {
  const hex = addr.toString(16).toUpperCase().padStart(4, "0")
  return `0x${hex}`
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number>(0)

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(scrolled)
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

  // Generate a column of hex addresses
  const totalTicks = 24
  const hexLines = Array.from({ length: totalTicks }, (_, i) => {
    const addr = Math.floor((i / totalTicks) * 0xffff)
    return generateHexLine(addr)
  })

  // Current read-head position (index in the hex lines)
  const headIndex = Math.floor(progress * (totalTicks - 1))

  // Current section label
  const sectionIndex = Math.min(
    Math.floor(progress * SECTION_LABELS.length),
    SECTION_LABELS.length - 1
  )

  return (
    <>
      {/* Top progress bar -- kept but thinner */}
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
            style={{
              height: `calc(${progress * 100}% * (100% - 128px) / 100%)`,
            }}
          />

          {/* Hex address ticks */}
          <div className="relative flex h-full flex-col justify-between py-0">
            {hexLines.map((hex, i) => {
              const isActive = i <= headIndex
              const isHead = i === headIndex
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 transition-all duration-200"
                >
                  {/* Tick mark */}
                  <div
                    className={`h-[1px] transition-all duration-200 ${
                      isHead
                        ? "w-3 bg-primary"
                        : isActive
                          ? "w-2 bg-primary/40"
                          : "w-1.5 bg-border"
                    }`}
                  />
                  {/* Hex label */}
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
          </div>

          {/* Glowing read-head */}
          <div
            className="absolute left-0 flex items-center transition-all duration-150 ease-out"
            style={{
              top: `calc(64px + ${progress} * (100% - 128px))`,
              transform: "translateY(-50%)",
            }}
          >
            {/* Glow line */}
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

          {/* Percentage readout at bottom */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
            <span className="text-[10px] text-primary font-mono tabular-nums">
              {Math.round(progress * 100)}%
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
