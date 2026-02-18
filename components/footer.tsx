export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-border px-6 py-8 md:flex-row md:px-12 lg:px-24">
      <span className="font-mono text-xs text-muted-foreground">
        {"Built with strong types and good intentions."}
      </span>
      <span className="font-mono text-xs text-muted-foreground">
        {"// "}
        <span className="text-primary">BC</span>
        {", Canada"}
      </span>
    </footer>
  )
}
