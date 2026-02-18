"use client"

import { useEffect, useState, useRef } from "react"

const LINES = [
  { prefix: "~", cmd: "whoami", delay: 0 },
  { prefix: "", cmd: "", output: "Mac Cooper", delay: 600 },
  { prefix: "~", cmd: "cat /etc/title", delay: 1200 },
  { prefix: "", cmd: "", output: "Software Engineer", delay: 1800 },
  { prefix: "~", cmd: "echo $LOCATION", delay: 2400 },
  { prefix: "", cmd: "", output: "British Columbia, Canada", delay: 3000 },
  { prefix: "~", cmd: 'grep -r "passion" ./interests/', delay: 3600 },
  {
    prefix: "",
    cmd: "",
    output: "Systems programming, interpreters, game engines, CLI tooling",
    delay: 4200,
  },
]

const TERMINAL_ROWS = 10

export function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [typingIndex, setTypingIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const bodyRef = useRef<HTMLDivElement>(null)

  // Auto-scroll the terminal body to keep newest content visible
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [visibleLines, currentText])

  useEffect(() => {
    if (visibleLines >= LINES.length) return

    const line = LINES[visibleLines]
    const fullText = line.cmd || line.output || ""

    if (typingIndex < fullText.length) {
      const speed = line.cmd ? 35 : 12
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, typingIndex + 1))
        setTypingIndex(typingIndex + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setVisibleLines(visibleLines + 1)
      setTypingIndex(0)
      setCurrentText("")
    }, 300)
    return () => clearTimeout(timeout)
  }, [visibleLines, typingIndex])

  return (
    <section className="flex min-h-[100dvh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {/* Terminal window chrome */}
        <div className="rounded-t-sm border border-border bg-secondary">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted-foreground">
              mac@cooper ~{" "}
            </span>
            <span className="ml-auto text-[10px] text-muted-foreground/40 tabular-nums">
              {TERMINAL_ROWS} rows
            </span>
          </div>
        </div>

        {/* Terminal body -- FIXED height, overflow hidden, scrolls internally */}
        <div
          ref={bodyRef}
          className="rounded-b-sm border border-t-0 border-border bg-background p-5 md:p-6 overflow-hidden scrollbar-hide"
          style={{
            height: `${TERMINAL_ROWS * 1.625}rem`,
          }}
        >
          <div className="space-y-1" role="log" aria-label="Terminal output">
            {LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm leading-relaxed md:text-base"
              >
                {line.prefix ? (
                  <>
                    <span className="text-primary select-none shrink-0">
                      {line.prefix} {"$"}
                    </span>
                    <span className="text-foreground">{line.cmd}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground pl-6">
                    {line.output}
                  </span>
                )}
              </div>
            ))}

            {/* Currently typing line */}
            {visibleLines < LINES.length && (
              <div className="flex items-start gap-2 text-sm leading-relaxed md:text-base">
                {LINES[visibleLines].prefix ? (
                  <>
                    <span className="text-primary select-none shrink-0">
                      {LINES[visibleLines].prefix} {"$"}
                    </span>
                    <span className="text-foreground">
                      {currentText}
                      <span className="inline-block w-2 h-4 ml-0.5 bg-primary align-middle animate-blink" />
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground pl-6">
                    {currentText}
                    <span className="inline-block w-2 h-4 ml-0.5 bg-primary align-middle animate-blink" />
                  </span>
                )}
              </div>
            )}

            {/* Idle cursor after all lines */}
            {visibleLines >= LINES.length && (
              <div className="flex items-start gap-2 text-sm leading-relaxed md:text-base">
                <span className="text-primary select-none shrink-0">~ $</span>
                <span className="inline-block w-2 h-4 bg-primary align-middle animate-blink" />
              </div>
            )}
          </div>
        </div>


      </div>
    </section>
  )
}
