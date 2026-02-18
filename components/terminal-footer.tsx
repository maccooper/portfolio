export function TerminalFooter() {
  return (
    <footer className="border-t border-border px-6 py-8 lg:pl-12">
      <div className="mx-auto max-w-3xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-primary select-none">$</span>
          <span>echo &quot;Built with strong types and zero runtime errors&quot;</span>
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="text-primary">Mac Cooper</span>
          <span className="mx-2 text-border">|</span>
          <span>2025</span>
        </div>
      </div>
    </footer>
  )
}
