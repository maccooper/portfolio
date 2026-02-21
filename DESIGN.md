# Design Reference

Source-of-truth for the vanilla rewrite. Extracted from the Next.js prototype before migration.

---

## Font

**JetBrains Mono** — monospace, used for everything (both `font-sans` and `font-mono` are mapped to it).

Load via Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

CSS:
```css
font-family: 'JetBrains Mono', monospace;
```

---

## Colour Tokens

All defined as CSS custom properties on `:root`.

| Token                | Hex       | Usage                                      |
|----------------------|-----------|--------------------------------------------|
| `--background`       | `#0d0d0d` | Page background                            |
| `--foreground`       | `#e8e8e8` | Primary text                               |
| `--card`             | `#141414` | Card / terminal body background            |
| `--card-foreground`  | `#e8e8e8` | Text on cards                              |
| `--primary`          | `#ff6a00` | Orange accent — borders, labels, cursor    |
| `--primary-foreground`| `#0d0d0d`| Text on primary-coloured backgrounds       |
| `--secondary`        | `#1a1a1a` | Chip / tag backgrounds                     |
| `--secondary-foreground`| `#a0a0a0`| Text on secondary backgrounds            |
| `--muted`            | `#1a1a1a` | Same as secondary                          |
| `--muted-foreground` | `#6b6b6b` | De-emphasised text, section labels         |
| `--border`           | `#2a2a2a` | All borders                                |
| `--ring`             | `#ff6a00` | Focus ring                                 |

### Hardcoded colours (not tokenised)

| Value     | Location                        | Usage                              |
|-----------|---------------------------------|------------------------------------|
| `#ff5f57` | Terminal chrome                 | Red dot (macOS close button)       |
| `#febc2e` | Terminal chrome                 | Yellow dot (macOS minimise)        |
| `#28c840` | Terminal chrome                 | Green dot (macOS maximise)         |
| `#888`    | Terminal hero                   | Command text (`~ $ <cmd>`)         |
| `#d4d4d4` | Terminal hero                   | Output text                        |
| `#444`    | Scroll arrow (resting)          | Dim arrow-down icon                |
| `#888`    | Scroll arrow (hover)            | Hover state for arrow-down         |

### Selection colour
```css
::selection {
  background: #ff6a00;
  color: #0d0d0d;
}
```

---

## Icons

No icon pack. Brand marks from Simple Icons, everything functional via Unicode rendered in JetBrains Mono.

### Brand marks — [Simple Icons](https://simpleicons.org)

Pure canonical brand SVGs, no decorative framing. Inline them directly — no library needed.

| Brand      | Used in       | Simple Icons slug |
|------------|---------------|-------------------|
| GitHub     | Nav, Footer   | `github`          |
| LinkedIn   | Nav, Footer   | `linkedin`        |

Fetch SVG source at `https://cdn.simpleicons.org/<slug>` or download from simpleicons.org.
Fill with `currentColor` so they inherit the parent's text colour.

### Functional — Unicode glyphs

Rendered in JetBrains Mono, these are the aesthetic. Zero dependencies.

| Purpose        | Glyph | Unicode   | Notes                        |
|----------------|-------|-----------|------------------------------|
| Mobile menu    | `≡`   | U+2261    | Identical to — triple bar    |
| Close / dismiss| `×`   | U+00D7    | Multiplication sign, not `x` |
| Scroll cue     | `↓`   | U+2193    | Downward arrow               |
| Resume / CV    | `[cv]`| —         | Plain text label             |
| Email          | `@`   | U+0040    | Or `[mail]` text label       |

---

## Shadows & Glows

### Terminal window (hero)
```css
box-shadow:
  0 0 12px rgba(255, 106, 0, 0.06),
  0 10px 30px rgba(255, 106, 0, 0.04),
  0 22px 50px rgba(255, 106, 0, 0.025);
```
Subtle orange floor glow beneath the terminal card.

### Scroll progress read-head
```css
box-shadow: 0 0 6px #ff6a00, 0 0 12px #ff6a0088, 0 0 24px #ff6a0044;
```
Paired with `pulse-glow` keyframe animation (fires on section change).

---

## Animations & Transitions

### Keyframes

```css
/* Blinking cursor block */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-end infinite;
}

/* Read-head glow pulse — fires on section change */
@keyframes pulse-glow {
  0%   { filter: brightness(1);
         box-shadow: 0 0 6px #ff6a00, 0 0 12px #ff6a0088, 0 0 24px #ff6a0044; }
  15%  { filter: brightness(2.5);
         box-shadow: 0 0 12px #ff6a00, 0 0 24px #ff6a00bb, 0 0 40px #ff6a0077; }
  100% { filter: brightness(1);
         box-shadow: 0 0 6px #ff6a00, 0 0 12px #ff6a0088, 0 0 24px #ff6a0044; }
}
.read-head { animation: pulse-glow 0.4s ease-out; }

/* Arrow down bounce — native CSS, no library needed */
@keyframes bounce {
  0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50%       { transform: translateY(-25%); animation-timing-function: cubic-bezier(0,0,0.2,1); }
}
.animate-bounce { animation: bounce 1s infinite; }
```

### Transition conventions

| Purpose                        | Duration | Easing      |
|--------------------------------|----------|-------------|
| Scroll-in fade (sections)      | 700ms    | default     |
| Scroll-in delay (stagger)      | 200–400ms delay | —  |
| Hover colour change            | 200ms    | default     |
| Hover border change            | 200–300ms| default     |
| Scroll progress bar width      | 100ms    | linear      |
| Scroll progress fill height    | 100ms    | linear      |
| Read-head translateY           | 150ms    | linear      |
| Section label translateY       | 150ms    | linear      |
| Nav/overlay fade-in            | 500ms    | default     |

Note: read-head transition (150ms) is intentionally longer than the fill (100ms). Tape-inertia metaphor — the head lags the fill slightly.

---

## Scanline Overlay

Two stacked `position: fixed` full-viewport divs, `pointer-events: none`, `z-index: 60`.

```css
/* Scanlines */
background-image: repeating-linear-gradient(
  0deg,
  transparent, transparent 1px,
  rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px
);
opacity: 0.03;

/* Vignette */
background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%);
```

---

## Layout Constants

- Max content width: `48rem` (768px) — `max-w-3xl` in Tailwind
- Breakpoints: `sm` 640px · `md` 768px · `lg` 1024px
- Border radius: `0.25rem` (`--radius`)
- Section padding: `px-4 sm:px-6 lg:px-12`, `pt-8 md:pt-14`
- Scroll progress track padding: `64px` top and bottom

---

## Scroll Progress — Hex Scrubber

- 16 ticks: `0x0000` → `0xFFFF` in `0x1111` steps
- Tick colour logic:
  - Active tick: `#ff6a00`, opacity `1.0`
  - Passed ticks: `#ff6a00`, opacity `0.6`
  - Future ticks: `#e8e8e8`, opacity `0.2`
- Section labels: `["init", "about", "xp", "skills", "END"]`
- Section anchor IDs: `section-init`, `section-about`, `section-xp`, `section-skills`, `section-end`
- Desktop: fixed left column, hidden below `lg`
- Mobile: right-side mini progress bar + `%` label, hidden at `lg`+
- Top progress bar: always visible, `2px` high

---

## Terminal Hero — Typewriter Speeds

```js
const SPEEDS = {
  cmd:       38,   // ms per character — commands
  output:    22,   // ms per character — output lines
  delete:    14,   // ms per character — deletion
  linePause: 220,  // ms pause between lines
  descPause: 1500, // ms hold on completed description before deleting
}
```

Terminal body height: `14 rows × 1.625rem` = `22.75rem`

---

## Assets

- `public/maccooper_resume.pdf` — resume, linked from nav and footer
- Favicons: `icon-light-32x32.png`, `icon-dark-32x32.png`, `icon.svg`, `apple-icon.png`
- Theme colour: `#0d0d0d`

---

## Typography Scale (used)

All text is `JetBrains Mono`. Sizes in use:

| Class equiv  | Size   | Used for                            |
|--------------|--------|-------------------------------------|
| `text-[8px]` | 8px    | Mobile scroll % label               |
| `text-[9px]` | 9px    | Hex ticks, section label            |
| `text-[10px]`| 10px   | Tech tags in experience             |
| `text-xs`    | 12px   | Nav links, section headers, chips   |
| `text-sm`    | 14px   | Terminal output, body text (mobile) |
| `text-base`  | 16px   | Body text (desktop), terminal (md+) |

Letter-spacing: `tracking-widest` (`0.1em`) on nav links and section labels.

---

## Misc Details

- Nav prefix: `./` in primary colour before each nav label
- Terminal prompt: `~ $` in primary colour
- Section label prefix: `//` in muted-foreground, e.g. `// about`
- Skills category prefix: `>` in primary colour
- Footer hex signature: `0x0D0A` (CRLF — intentional)
- `scrollbar-hide` on terminal body (hidden scrollbar, still scrollable)
- `antialiased` on body
- `will-change: transform` on read-head and section label for compositor promotion
