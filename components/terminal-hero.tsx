"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown } from "lucide-react"
import descriptionsData from "@/descriptions.json"

type StaticLine =
  | { prefix: "~"; cmd: string }
  | { prefix: ""; output: string }

const STATIC_LINES: StaticLine[] = [
  { prefix: "~", cmd: "whoami" },
  { prefix: "", output: "Mac Cooper" },
  { prefix: "~", cmd: "cat /etc/title" },
  { prefix: "", output: "Software Engineer" },
  { prefix: "~", cmd: "echo $LOCATION" },
  { prefix: "", output: "British Columbia, Canada" },
  { prefix: "~", cmd: 'grep -r "passion" ./interests/' },
  { prefix: "", output: "Systems programming, interpreters, game engines, CLI tooling" },
]

// Must match exactly what `bash show-projects.sh` produces.
// Source of truth is descriptions.json — this derives from it at build time.
const LOOP_CMD = 'ls projects/ | while read p; do jq -r ".$p" descriptions.json; sleep 1.5; done'
const DESCRIPTIONS: string[] = Object.values(descriptionsData)

const SPEEDS = {
  cmd: 38,
  output: 22,
  delete: 14,
  linePause: 220,
  descPause: 1800,
} as const

type Phase = "static" | "cmd" | "typing" | "pausing" | "deleting"

// Enough rows to show all static lines + loop cmd + one output line without clipping.
const TERMINAL_ROWS = 14

export function TerminalHero() {
  // Static identity lines
  const [visibleLines, setVisibleLines] = useState(0)
  const [staticCharIdx, setStaticCharIdx] = useState(0)
  const [staticText, setStaticText] = useState("")

  // Loop animation
  const [phase, setPhase] = useState<Phase>("static")
  const [cmdCharIdx, setCmdCharIdx] = useState(0)
  const [descIdx, setDescIdx] = useState(0)
  const [descCharIdx, setDescCharIdx] = useState(0)
  const [descText, setDescText] = useState("")

  const bodyRef = useRef<HTMLDivElement>(null)

  // Keep newest content scrolled into view
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visibleLines, staticText, descText, cmdCharIdx, phase])

  // Phase: static — type through identity lines one character at a time
  useEffect(() => {
    if (phase !== "static") return
    if (visibleLines >= STATIC_LINES.length) {
      setPhase("cmd")
      return
    }
    const line = STATIC_LINES[visibleLines]
    const fullText = line.prefix === "~" ? line.cmd : line.output
    if (staticCharIdx < fullText.length) {
      const speed = line.prefix === "~" ? SPEEDS.cmd : SPEEDS.output
      const t = setTimeout(() => {
        setStaticText(fullText.slice(0, staticCharIdx + 1))
        setStaticCharIdx((i) => i + 1)
      }, speed)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1)
      setStaticCharIdx(0)
      setStaticText("")
    }, SPEEDS.linePause)
    return () => clearTimeout(t)
  }, [phase, visibleLines, staticCharIdx])

  // Phase: cmd — type the loop command
  useEffect(() => {
    if (phase !== "cmd") return
    if (cmdCharIdx < LOOP_CMD.length) {
      const t = setTimeout(() => setCmdCharIdx((i) => i + 1), SPEEDS.cmd)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase("typing"), SPEEDS.linePause)
    return () => clearTimeout(t)
  }, [phase, cmdCharIdx])

  // Phase: typing — stream current description character by character
  useEffect(() => {
    if (phase !== "typing") return
    const desc = DESCRIPTIONS[descIdx]
    if (descCharIdx < desc.length) {
      const t = setTimeout(() => {
        setDescText(desc.slice(0, descCharIdx + 1))
        setDescCharIdx((i) => i + 1)
      }, SPEEDS.output)
      return () => clearTimeout(t)
    }
    setPhase("pausing")
  }, [phase, descIdx, descCharIdx])

  // Phase: pausing — hold the completed description so it can be read
  useEffect(() => {
    if (phase !== "pausing") return
    const t = setTimeout(() => setPhase("deleting"), SPEEDS.descPause)
    return () => clearTimeout(t)
  }, [phase])

  // Phase: deleting — erase description backwards, then advance to next
  useEffect(() => {
    if (phase !== "deleting") return
    if (descCharIdx > 0) {
      const t = setTimeout(() => {
        setDescText((d) => d.slice(0, -1))
        setDescCharIdx((i) => i - 1)
      }, SPEEDS.delete)
      return () => clearTimeout(t)
    }
    setDescIdx((i) => (i + 1) % DESCRIPTIONS.length)
    setDescText("")
    setDescCharIdx(0)
    setPhase("typing")
  }, [phase, descCharIdx])

  const showCmd = phase !== "static"
  const showDesc = phase === "typing" || phase === "pausing" || phase === "deleting"
  const currentStaticLine =
    visibleLines < STATIC_LINES.length ? STATIC_LINES[visibleLines] : null

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-4 py-20 sm:px-6">
      <div
          className="w-full max-w-3xl"
          style={{
            boxShadow: [
              "0 0 12px rgba(255,106,0,0.06)",   /* tight surface emission — all edges */
              "0 10px 30px rgba(255,106,0,0.04)", /* medium glow, pushed down — bottom bleed */
              "0 22px 50px rgba(255,106,0,0.025)",/* wide ambient pool — light on the floor below */
            ].join(", "),
          }}
        >
        {/* Terminal chrome */}
        <div className="rounded-t-sm border border-border bg-secondary">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted-foreground">mac@cooper ~</span>
            <span className="ml-auto text-[10px] text-muted-foreground/40 tabular-nums">
              {TERMINAL_ROWS} rows
            </span>
          </div>
        </div>

        {/* Terminal body — fixed height, scrolls internally */}
        <div
          ref={bodyRef}
          className="rounded-b-sm border border-t-0 border-border bg-background p-4 sm:p-5 md:p-6 overflow-y-scroll scrollbar-hide"
          style={{ height: `${TERMINAL_ROWS * 1.625}rem` }}
        >
          <div className="space-y-1" role="log" aria-label="Terminal output">

            {/* Committed static lines */}
            {STATIC_LINES.slice(0, visibleLines).map((line, i) =>
              line.prefix === "~" ? (
                <div key={i} className="flex items-start gap-2 text-sm leading-relaxed md:text-base">
                  <span className="text-primary select-none shrink-0">~ $</span>
                  <span className="text-[#888] break-all">{line.cmd}</span>
                </div>
              ) : (
                <div key={i} className="text-sm leading-relaxed md:text-base">
                  <span className="text-[#d4d4d4] pl-6">{line.output}</span>
                </div>
              )
            )}

            {/* Currently typing static line */}
            {phase === "static" && currentStaticLine && (
              currentStaticLine.prefix === "~" ? (
                <div className="flex items-start gap-2 text-sm leading-relaxed md:text-base">
                  <span className="text-primary select-none shrink-0">~ $</span>
                  <span className="text-[#888] break-all">
                    {staticText}
                    <span className="inline-block w-[7px] h-[1.1em] ml-0.5 bg-primary align-middle animate-blink" />
                  </span>
                </div>
              ) : (
                <div className="text-sm leading-relaxed md:text-base">
                  <span className="text-[#d4d4d4] pl-6">
                    {staticText}
                    <span className="inline-block w-[7px] h-[1.1em] ml-0.5 bg-primary align-middle animate-blink" />
                  </span>
                </div>
              )
            )}

            {/* Loop command — appears once, stays committed */}
            {showCmd && (
              <div className="flex items-start gap-2 text-sm leading-relaxed md:text-base">
                <span className="text-primary select-none shrink-0">~ $</span>
                <span className="text-[#888] break-all">
                  {LOOP_CMD.slice(0, cmdCharIdx)}
                  {phase === "cmd" && (
                    <span className="inline-block w-[7px] h-[1.1em] ml-0.5 bg-primary align-middle animate-blink" />
                  )}
                </span>
              </div>
            )}

            {/* Cycling project description — types in, pauses, deletes, repeats */}
            {showDesc && (
              <div className="text-sm leading-relaxed md:text-base">
                <span className="text-[#d4d4d4] pl-6">
                  {descText}
                  <span className="inline-block w-[7px] h-[1.1em] ml-0.5 bg-primary align-middle animate-blink" />
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#444] hover:text-[#888] transition-colors duration-300"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </a>
    </section>
  )
}
