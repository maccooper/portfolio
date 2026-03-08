# Design Reference

Source-of-truth for the vanilla rewrite.

---

## Font

**JetBrains Mono** — monospace, used for everything.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

---

## Colour Tokens

| Token       | Hex       | Usage                                   |
|-------------|-----------|-----------------------------------------|
| `--bg`      | `#0d0d0d` | Page background                         |
| `--fg`      | `#e8e8e8` | Primary text                            |
| `--card`    | `#141414` | Card / terminal body background         |
| `--raised`  | `#1a1a1a` | Chrome, chip, tag backgrounds           |
| `--accent`  | `#ff6a00` | Orange — borders, prompt, cursor        |
| `--muted`   | `#6b6b6b` | De-emphasised text, section labels      |
| `--border`  | `#2a2a2a` | All borders                             |

### Hardcoded colours

| Value     | Usage                              |
|-----------|------------------------------------|
| `#ff5f57` | Terminal chrome — red dot          |
| `#febc2e` | Terminal chrome — yellow dot       |
| `#28c840` | Terminal chrome — green dot        |
| `#888`    | Terminal command text              |
| `#d4d4d4` | Terminal output text               |
| `#444`    | Scroll cue (resting)               |

---

## Shadows & Glows

### Terminal window

```css
box-shadow:
  0 0 12px rgba(255,106,0,0.06),
  0 10px 30px rgba(255,106,0,0.04),
  0 22px 50px rgba(255,106,0,0.025);
```

---

## Animations

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0);    animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50%       { transform: translateY(-25%); animation-timing-function: cubic-bezier(0,0,0.2,1); }
}
```

---

## Scanline Overlay

Two stacked `position: fixed` full-viewport divs, `pointer-events: none`, `z-index: 60`.

```css
.scanlines {
  background-image: repeating-linear-gradient(
    0deg,
    transparent, transparent 1px,
    rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px
  );
  opacity: 0.03;
}

.vignette {
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%);
}
```

---

## Layout

- Max content width: `48rem`
- Breakpoints: `768px` (md), `1024px` (lg)
- Terminal body height: `22.75rem` (14 rows × 1.625 line-height)

---

## Terminal FSM — Speeds

```js
const SPEEDS = {
  cmd:       38,   // ms/char — commands
  output:    22,   // ms/char — output lines
  delete:    14,   // ms/char — deletion
  linePause: 220,  // ms pause between lines
  descPause: 1500, // ms hold on completed description
}
```

---

## Misc

- Nav prefix: `./` in accent colour
- Terminal prompt: `~ $` in accent colour
- Section label prefix: `//` in muted
- Footer hex signature: `0x0D0A` (CRLF — intentional)
- `selection` background: `#ff6a00`, color: `#0d0d0d`
