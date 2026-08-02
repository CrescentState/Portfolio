# 🏗️ Web Project Delivery Framework
## A Battle-Tested 8-Phase Build Checklist

> **"Placeholder content gets shipped by accident more often than people admit."**
>
> This framework exists to prevent that. Every phase is a gate. You do not proceed to Phase 2 until Phase 1 is locked. No exceptions.

---

## 📋 Master Checklist Overview

| Phase | Name | Status Gate | Risk if Skipped |
|-------|------|-------------|-----------------|
| **0** | Foundation & Content | Content inventory 100% final | Shipping placeholder text/assets |
| **1** | Structural Shell | Static layout + real content, all breakpoints | Layout collapse on real devices |
| **2** | State/Orchestration Layer | Scroll controller debugged & visualized | Animations fire at wrong times |
| **3** | Signature Interaction | Core 3D/physics piece isolated & tuned | "Wow" moment breaks on Safari/mobile |
| **4** | Micro-interactions & Polish | Every hover/keyboard state defined | Site feels "unfinished" |
| **5** | Performance Audit | 50fps sustained on 4x CPU throttle | Awwwards-level bounce rate |
| **6** | Cross-environment QA | Real hardware tested (not DevTools) | Silent degradation on iPhone |
| **7** | Content/SEO/Meta | OG images + meta per route verified | Social shares look broken |
| **8** | Submission-grade Polish | Cold run-through by zero-context user | Judges spot unfinished details |

---

---

# Phase 0 — Foundation & Content

> **Thesis:** Animation is lipstick on a pig if the pig is still a placeholder. Lock content first.

## ✅ Checklist

- [ ] **Content inventory locked** — Every project, image, case-study write-up, and bio copy exists in final form.
- [ ] **Information architecture mapped** — Sitemap of every route/section with a one-line note on what interaction lives in each.
- [ ] **Visual direction fixed** — Single moodboard/style reference locked:
  - [ ] Palette defined (2–3 colors max, e.g., igloo's grey-blue duo)
  - [ ] Typeface pairing selected and licensed
  - [ ] Spacing scale defined (8px base grid recommended)
- [ ] **Device/browser target list decided explicitly**:
  - [ ] Browser support matrix documented (e.g., Chrome 110+, Safari 16+, Firefox 115+)
  - [ ] Mobile experience scope defined: full 3D vs. simplified fallback
  - [ ] `prefers-reduced-motion` strategy decided upfront

## 🎨 Design & Flow

### Content-First Philosophy
Design does not begin with a hero animation. It begins with a spreadsheet. Every headline, body paragraph, image asset, and CTA must be written, edited, and approved before a single `div` is styled. This prevents the "lorem ipsum trap" where beautiful layouts collapse when real content (with variable lengths) replaces placeholder text.

### Information Architecture (IA) Map
Create a sitemap where each node includes:
- **Route/URL**
- **Content type** (text-heavy, image gallery, 3D showcase, form)
- **Primary interaction** (scroll-driven, click-through, hover-reveal, static)
- **Entry/exit transitions** (how user arrives and leaves)

Example:
```
/
├── /work          → Project grid, scroll-driven masonry, hover preview
├── /work/:slug    → Case study, horizontal scroll gallery, pinned intro
├── /about         → Bio + team, static with subtle parallax
├── /contact       → Form, minimal animation, focus on usability
└── /404           → Branded error, easter egg interaction
```

### Visual Direction Lock
Reference: [Igloo](https://igloo.inc/) — grey-blue duo, restrained palette, generous whitespace.

**Why 2–3 colors max?** Every additional color dilutes brand impact and complicates accessibility contrast checks. Lock:
1. **Primary** — Brand identity (buttons, key headlines)
2. **Secondary** — Supporting accents (links, hover states, tags)
3. **Neutral** — Backgrounds, borders, disabled states (often a tint of primary)

### Device Target Matrix
| Device Class | Experience Level | Technical Notes |
|-------------|------------------|-----------------|
| Desktop (WebGL capable) | Full 3D, all effects | Target 60fps |
| High-end Mobile (iPhone 14+, flagship Android) | Full 3D with touch optimizations | Reduce particle counts 30% |
| Mid-range Mobile | Simplified 3D / 2D fallback | CSS transforms only, no WebGL |
| Low-power / Reduced Motion | Static, content-focused | Respect `prefers-reduced-motion: reduce` |

---

---

# Phase 1 — Structural Shell

> **Thesis:** If it doesn't work without JavaScript, it doesn't work. Build the bones first.

## ✅ Checklist

- [ ] **Static layout implemented** for every section with real (not lorem ipsum) content.
- [ ] **Zero animation** at this stage. Movement is forbidden.
- [ ] **Responsive breakpoints validated** at actual device widths, not just browser-resize dragging.
- [ ] **Semantic HTML + ARIA structure** present underneath any canvas/JS layer.
- [ ] **Screen reader pass completed** — verified with NVDA/VoiceOver, not assumed.
- [ ] **Base routing functional** — all routes resolve, 404 handled.
- [ ] **Bilingual string-table wiring** (if applicable) functional and tested.

## 🎨 Design & Flow

### Static-First Development
Build every page as if CSS animations and JavaScript do not exist. This ensures:
- **Progressive enhancement** — Core content is accessible even if JS fails
- **SEO foundation** — Crawlers see content, not empty canvas containers
- **Performance baseline** — You know exactly how fast the site is before adding weight

### Breakpoint Discipline
Do not trust browser resize dragging. Test at exact widths:
- **320px** — iPhone SE (smallest mainstream device)
- **375px** — iPhone standard
- **414px** — iPhone Plus/Max
- **768px** — iPad portrait
- **1024px** — iPad landscape / small laptop
- **1440px** — Standard desktop
- **1920px** — Large desktop
- **2560px** — 4K (optional, but test scaling)

Use actual devices or BrowserStack. DevTools emulation is a starting point, not validation.

### Semantic HTML & ARIA
Every interactive element must have:
- Proper heading hierarchy (`h1` → `h2` → `h3`, no skips)
- Landmark regions (`<header>`, `<main>`, `<footer>`, `<nav>`)
- ARIA labels for icon-only buttons (`aria-label="Close menu"`)
- Focus management for modals/drawers (trap focus, return focus on close)
- Alt text for all images (decorative images get `alt=""`)

### Screen Reader Verification
Run through the site with:
- **macOS**: VoiceOver (Cmd + F5)
- **Windows**: NVDA (free)
- **iOS**: VoiceOver (Settings → Accessibility)

Listen for: skipped headings, missing labels, unclear link text ("click here"), unannounced state changes.

---

---

# Phase 2 — State/Orchestration Layer

> **Thesis:** One controller to rule them all. If you can't see the state, you can't debug the animation.

## ✅ Checklist

- [ ] **Single scroll-progress (or state) controller** built.
- [ ] **Debug overlay** showing current progress value — visible and logged.
- [ ] **Controller accuracy confirmed** — value maps correctly to scroll position across all sections.
- [ ] **At least one dummy component** proven to react correctly to the controller.
- [ ] **State subscription pattern** defined — how components listen to the controller.
- [ ] **Cleanup logic** — unsubscribing on unmount to prevent memory leaks.

## 🎨 Design & Flow

### The Controller Pattern
All animation timing must derive from a single source of truth. Options:
- **GSAP ScrollTrigger** — `scrub: true` with a master timeline
- **Lenis smooth scroll** + custom progress tracker
- **Intersection Observer** for section-based triggers (lighter, less precise)
- **Custom RAF loop** — only if you need frame-perfect control

**Why one controller?** Multiple scroll libraries fighting for control causes jank, inconsistent timing, and impossible debugging.

### Debug Overlay Requirements
Build a persistent (toggleable) debug panel showing:
```
[Phase 2 Debug Overlay]
Scroll Progress: 0.3421 (34.21%)
Active Section: #work-showcase
Section Progress: 0.78 (78% through current section)
FPS: 58
Controller State: PLAYING
```

This overlay stays on through Phase 3 and 4. Remove only in Phase 5.

### Dummy Component Test
Before building real animated pieces, create a simple box that:
- Changes color based on scroll progress (0% = red, 100% = green)
- Scales from 0.5x to 1.5x based on section progress
- Logs its state to console on every update

If the dummy box behaves correctly, your controller is solid. If it stutters, fix the controller before adding complexity.

### State Subscription Architecture
```javascript
// Pseudocode — controller broadcasts, components subscribe
class ScrollController {
  constructor() {
    this.progress = 0;
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback); // unsubscribe
  }

  update(progress) {
    this.progress = progress;
    this.subscribers.forEach(cb => cb(progress));
  }
}
```

**Rule:** Components never read scroll position directly. They receive it from the controller.

---

---

# Phase 3 — Signature Interaction (The "Wow" Piece)

> **Thesis:** Build the centerpiece in isolation. Integrate only when it's bulletproof.

## ✅ Checklist

- [ ] **Core 3D/physics centerpiece built in isolation** — own sandboxed test page.
- [ ] **No integration with main site** until standalone version is approved.
- [ ] **Camera/animation timing tuned** against real controller values.
- [ ] **Multiple scroll speeds tested**:
  - [ ] Slow deliberate scroll (intentional, cinematic)
  - [ ] Fast flick-scroll (should not break, should feel responsive)
- [ ] **Fallback/reduced version built** for:
  - [ ] Low-power devices (disable particles, reduce geometry)
  - [ ] `prefers-reduced-motion: reduce` (static image or simple fade)
- [ ] **Mobile-specific optimizations** — touch events, reduced polygon count.
- [ ] **Safari-specific testing** — WebGL on Safari is where most sites degrade.

## 🎨 Design & Flow

### Isolated Sandbox Development
Create `/sandbox/signature-interaction.html` — a standalone page with:
- Only the 3D canvas/WebGL context
- Minimal UI (play/pause, reset, speed slider)
- FPS counter visible at all times
- The real controller logic (or a simulated version)

**Why isolate?** Debugging WebGL + routing + responsive layout + content all at once is impossible. Isolate variables.

### Scroll Speed Tuning Matrix
| Scroll Behavior | Expected Visual Result | Failure Mode |
|----------------|------------------------|--------------|
| Slow (1px/frame) | Smooth, cinematic reveal | Stuttering due to too many calculations |
| Normal (continuous) | Fluid, responsive | Jank from uncapped update frequency |
| Fast (flick) | Catches up gracefully, no blank frames | Animation falls behind, shows empty canvas |
| Stop mid-animation | Holds a stable intermediate state | Snaps to end or start, looks broken |

### Fallback Strategy
```css
@media (prefers-reduced-motion: reduce) {
  .webgl-canvas { display: none; }
  .static-fallback { display: block; }
}
```

For low-power devices, detect via:
- `navigator.hardwareConcurrency` < 4 → reduced mode
- `navigator.deviceMemory` < 4 → reduced mode
- Frame rate drops below 30fps for 3 seconds → auto-downgrade

### Safari WebGL Checklist
Safari is the IE6 of modern WebGL. Verify:
- [ ] `gl.MAX_TEXTURE_SIZE` sufficient for your textures
- [ ] `gl.getExtension('OES_texture_float_linear')` available if using float textures
- [ ] No `console.warn` from Three.js about unsupported features
- [ ] `requestAnimationFrame` timing is consistent (Safari throttles in background tabs)
- [ ] Touch events don't conflict with scroll (Safari's elastic scroll is aggressive)

---

---

# Phase 4 — Micro-interactions & Polish

> **Thesis:** Delight lives in the details. But details come last — never let polish distract from structure.

## ✅ Checklist

- [ ] **Hover states** defined for every interactive element.
- [ ] **Glitch-type effects** added (if on-brand) — only after structural pieces are stable.
- [ ] **Cursor effects** implemented (custom cursor or contextual cursor states).
- [ ] **Easter eggs** added — hidden interactions for engaged users.
- [ ] **Keyboard accessibility** — every interactive element has a keyboard-accessible equivalent.
- [ ] **Explicit skip decisions documented** — if an interaction is mouse-only, document why.
- [ ] **Loading/preload sequence designed**:
  - [ ] Skeleton states for content-heavy sections
  - [ ] Asset preloading strategy (critical vs. lazy)
  - [ ] No pop-in — elements fade in or slide in, never appear abruptly

## 🎨 Design & Flow

### Micro-interaction Hierarchy
Not all interactions are equal. Prioritize:

| Priority | Interaction | Example | Implementation |
|----------|-------------|---------|----------------|
| P0 | Primary CTA hover | Button scale + color shift | CSS transition, 200ms ease-out |
| P1 | Navigation feedback | Link underline animation | CSS `::after` width transition |
| P2 | Scroll indicators | Progress bar, section dots | Controller-driven, minimal DOM |
| P3 | Ambient motion | Subtle parallax on images | RequestAnimationFrame, throttled |
| P4 | Easter eggs | Konami code, hidden click zones | Event listener, low priority |

### Custom Cursor Design
Reference sites (Awwwards-tier) use custom cursors. Requirements:
- **States**: default, hover (interactive), drag (sliders), text (input fields), loading
- **Performance**: Use `transform: translate()` not `left/top`. Cursor should never drop below 60fps.
- **Fallback**: Hide custom cursor on touch devices. Show default.
- **Accessibility**: Respect `prefers-reduced-motion` — some users find custom cursors disorienting.

### Loading Sequence Design
```
[User lands on site]
    ↓
[Show branded loader — max 2 seconds]
    ↓
[Critical CSS + above-fold content rendered]
    ↓
[Remove loader, fade in content (300ms)]
    ↓
[Lazy load below-fold images + WebGL assets]
    ↓
[All assets loaded → enable full interactions]
```

**Never:** Show a blank page while WebGL initializes. Show something immediately.

### Keyboard Accessibility Rules
- Every `onClick` must have an `onKeyDown` (Enter/Space)
- Focus states must be visible (don't remove `outline` without replacement)
- Tab order must follow visual order (no `tabindex` gymnastics)
- Skip links for keyboard users ("Skip to main content")

---

---

# Phase 5 — Performance Audit

> **Thesis:** Your dev machine is a lie. Test like your users live — on budget hardware and slow coffee shop WiFi.

## ✅ Checklist

- [ ] **Lighthouse/PageSpeed run** on:
  - [ ] Throttled network (Fast 3G or Slow 4G preset)
  - [ ] Throttled CPU (4x slowdown in Chrome DevTools)
- [ ] **Chrome DevTools Performance trace** recorded during scroll.
- [ ] **Sustained 50fps+ confirmed** — no drops below 50fps during normal usage.
- [ ] **GPU memory checked** across a simulated "visit multiple pages" session.
- [ ] **No memory leak/creep confirmed** — GPU memory returns to baseline after navigation.
- [ ] **Asset sizes audited**:
  - [ ] Total page weight under 2MB (initial load)
  - [ ] Largest Contentful Paint (LCP) under 2.5s
  - [ ] Compressed model/texture sizes verified (use Draco, KTX2, WebP)

## 🎨 Design & Flow

### Throttled Testing Setup
**Chrome DevTools:**
1. Performance tab → CPU: 4x slowdown
2. Network tab → Fast 3G (1.6 Mbps down, 750 Kbps up, 150ms RTT)
3. Rendering tab → Enable "FPS meter"

**Target Metrics:**
| Metric | Target | Fail |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.0s | > 1.8s |
| Largest Contentful Paint (LCP) | < 2.5s | > 4.0s |
| Time to Interactive (TTI) | < 3.8s | > 7.3s |
| Cumulative Layout Shift (CLS) | < 0.1 | > 0.25 |
| Speed Index | < 3.4s | > 5.8s |

### Scroll Performance Profiling
Record a 30-second Performance trace while:
- Scrolling slowly through the entire page
- Scrolling rapidly (flicking)
- Stopping and starting mid-animation

**Look for:**
- Long tasks (> 50ms) blocking the main thread
- Layout thrashing (read-write-read-write cycles)
- Excessive GPU layer creation (check "Layers" panel)
- Memory climbing steadily (leak indicator)

### GPU Memory Audit
```javascript
// Check GPU memory in Chrome
// DevTools → More Tools → Rendering → GPU Memory
// Or chrome://gpu for detailed info
```

Simulate a full user session:
1. Load homepage
2. Navigate to /work
3. Open a case study
4. Return to homepage
5. Navigate to /about
6. Check GPU memory — should be near initial load levels

**If memory climbs:** You have a texture/geometry leak. Check disposal logic in Three.js (`geometry.dispose()`, `material.dispose()`, `texture.dispose()`).

### Asset Compression Checklist
- [ ] 3D models: Draco compression (glTF + Draco reduces size 5-10x)
- [ ] Textures: KTX2/Basis Universal or WebP (not PNG/JPG)
- [ ] Videos: H.264 MP4 + WebM fallback, max 1080p for hero
- [ ] Fonts: WOFF2 only, subset to used glyphs
- [ ] Images: Responsive `srcset`, lazy loading for below-fold

---

---

# Phase 6 — Cross-Environment QA

> **Thesis:** Chrome DevTools device emulation is a preview, not proof. Real hardware reveals real bugs.

## ✅ Checklist

- [ ] **Tested on actual mobile hardware** (not just Chrome DevTools device emulation):
  - [ ] Mid-range Android (e.g., Samsung A-series, Pixel 6a)
  - [ ] Older iPhone (iPhone 11 or earlier, not just latest)
- [ ] **Tested on Safari specifically** if any scroll-linked WebGL is involved.
- [ ] **Tested with slow/throttled network** to confirm loading sequence doesn't break down.
- [ ] **Tested on Windows** (if primarily developed on Mac) — font rendering differs.
- [ ] **Tested on Firefox** — CSS containment and WebGL behavior vary.

## 🎨 Design & Flow

### Real Device Testing Protocol
**Minimum Hardware Matrix:**
| Device | OS Version | Browser | Why It Matters |
|--------|-----------|---------|----------------|
| iPhone 11 | iOS 16+ | Safari | Older GPU, limited RAM — reveals performance cliffs |
| iPhone 14/15 | iOS 17+ | Safari | Modern baseline, but test WebGL limits |
| Samsung Galaxy A54 | Android 14 | Chrome | Mid-range, most common user segment |
| Google Pixel 7 | Android 14 | Chrome | Clean Android, good WebGL support |
| iPad Air | iPadOS 17 | Safari | Touch + hover hybrid, larger viewport |

**What to test on each:**
- [ ] Page loads without errors (check remote debugging console)
- [ ] Scroll is smooth (no rubber-banding conflicts with custom scroll)
- [ ] Tap targets are ≥ 48x48px (accessibility)
- [ ] No horizontal scroll (except intentional galleries)
- [ ] WebGL/3D elements render correctly (no black boxes)
- [ ] Memory warnings don't appear (iOS kills heavy tabs)

### Safari Scroll-Linked WebGL Checklist
Safari's compositor is different from Chrome. Verify:
- [ ] `position: sticky` doesn't break scroll calculations
- [ ] `-webkit-overflow-scrolling: touch` is set on scroll containers
- [ ] Canvas doesn't flicker during scroll (try `will-change: transform`)
- [ ] `requestAnimationFrame` doesn't pause in background tabs
- [ ] Pinch-to-zoom doesn't break layout (set `user-scalable=no` only if intentional)

### Network Resilience Testing
1. Load site on Fast 3G
2. Interrupt load mid-way (airplane mode)
3. Restore connection
4. **Expected:** Loading resumes or shows retry state
5. **Failure:** Infinite spinner, broken layout, missing images with no alt fallback

---

---

# Phase 7 — Content/SEO/Meta Pass

> **Thesis:** A beautiful site that looks broken when shared is a beautiful failure.

## ✅ Checklist

- [ ] **OG images** set per route (1200×630px, < 1MB, tested on all platforms).
- [ ] **Meta descriptions** written per route (150-160 chars, unique, actionable).
- [ ] **Title tags** set per route (50-60 chars, brand + keyword).
- [ ] **Favicon** — multi-resolution set (16×16, 32×32, 180×180 apple-touch-icon).
- [ ] **Social preview cards checked** by actually pasting URL into:
  - [ ] Twitter/X Card Validator
  - [ ] LinkedIn Post Inspector
  - [ ] Slack (unfurl test in private message)
  - [ ] Facebook Sharing Debugger
- [ ] **Canonical URLs** set per route.
- [ ] **Structured data (JSON-LD)** for:
  - [ ] Organization
  - [ ] WebSite (search box if applicable)
  - [ ] BreadcrumbList
  - [ ] Article/Project (if content-rich)
- [ ] **Sitemap.xml** generated and submitted to Search Console.
- [ ] **Robots.txt** configured, no accidental `noindex` on live pages.

## 🎨 Design & Flow

### OG Image Design Standards
Each route needs a unique OG image that:
- **Dimensions:** 1200×630px (1.91:1 ratio)
- **Format:** PNG or JPG < 1MB
- **Content:** Route-specific imagery + brand lockup + readable title
- **Safe zone:** Keep critical content within center 800×400px (mobile crops edges)

**Example OG image set:**
```
/               → og-home.jpg      (Brand hero shot)
/work           → og-work.jpg      (Project grid preview)
/work/:slug     → og-project.jpg   (Project hero image)
/about          → og-about.jpg     (Team photo or brand manifesto)
```

### Social Platform Preview Checklist
| Platform | Tool | What to Verify |
|----------|------|----------------|
| Twitter/X | [Card Validator](https://cards-dev.twitter.com/validator) | Large image card, title/description render |
| LinkedIn | [Post Inspector](https://www.linkedin.com/post-inspector/) | Image crops correctly, no broken links |
| Slack | Paste in DM | Unfurl shows image + description |
| Facebook | [Sharing Debugger](https://developers.facebook.com/tools/debug/) | Image scrapes correctly, no errors |
| iMessage | Send to yourself | Rich preview appears |
| Discord | Paste in channel | Embed renders with image |

### Meta Tag Template
```html
<!-- Primary Meta Tags -->
<title>Page Title | Brand Name</title>
<meta name="title" content="Page Title | Brand Name">
<meta name="description" content="Compelling description under 160 characters.">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="Page Title | Brand Name">
<meta property="og:description" content="Compelling description.">
<meta property="og:image" content="https://example.com/og-page.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://example.com/page">
<meta property="twitter:title" content="Page Title | Brand Name">
<meta property="twitter:description" content="Compelling description.">
<meta property="twitter:image" content="https://example.com/og-page.jpg">
```

---

---

# Phase 8 — Submission-Grade Polish

> **Thesis:** The difference between "good" and "awarded" is the details no one asked for, but everyone notices.

## ✅ Checklist

- [ ] **Cursor design custom** — default browser cursor reads as unfinished on Awwwards-tier sites.
- [ ] **Every transition reviewed individually**:
  - [ ] Page load transition
  - [ ] Route change transition
  - [ ] Section reveal transition
  - [ ] Modal/drawer open/close
  - [ ] Not just the flagship interaction — all of them
- [ ] **Cold run-through completed**:
  - [ ] Second person with zero context walks through the site
  - [ ] You watch (don't guide) where they hesitate or get confused
  - [ ] Document friction points and fix before submission
- [ ] **404 page** is on-brand and helpful (not default server error).
- [ ] **Loading states** are branded (not generic spinner).
- [ ] **Error states** are designed (form validation, failed loads).
- [ ] **Empty states** are designed (no projects yet, search no results).
- [ ] **Print stylesheet** considered (or explicit `media="print"` hide).

## 🎨 Design & Flow

### Transition Audit Matrix
Review every transition against these criteria:

| Transition | Duration | Easing | Direction | Consistency Check |
|-----------|----------|--------|-----------|-------------------|
| Page load | 600ms | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Fade up | Same across all routes? |
| Route change | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Slide left | Reverse on back nav? |
| Section reveal | 800ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Fade + scale | Staggered children? |
| Modal open | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Scale up | Backdrop fades simultaneously? |
| Modal close | 200ms | `cubic-bezier(0.4, 0, 1, 1)` | Scale down | Faster than open (snappy dismiss)? |

**Rule:** If two transitions feel different without intentional reason, unify them.

### Cold Run-Through Protocol
1. **Recruit a tester** who has never seen the site, doesn't know the brand, and isn't a designer/developer.
2. **Give them a task:** "Find the contact form" or "Learn what this company does."
3. **Say nothing.** Watch their screen. Record if possible (with permission).
4. **Note:**
   - Where they pause (confusion)
   - Where they click incorrectly (affordance failure)
   - Where they scroll past important content (hierarchy failure)
   - Where they say "huh" or "wait" (cognitive load)
5. **Fix the top 3 friction points.** Repeat with a new tester.

### The "Unfinished" Checklist
These are the details that separate pros from amateurs:
- [ ] **Favicon** works in dark mode browsers (transparent PNG with contrast)
- [ ] **Touch icon** looks good when user adds to home screen
- [ ] **Theme color** meta tag matches brand (`<meta name="theme-color" content="#...">`)
- [ ] **Selection color** is on-brand (`::selection` background)
- [ ] **Scrollbars** are styled (or explicitly left default with reason)
- [ ] **Focus rings** are styled and visible (not browser default blue)
- [ ] **Form autofill** styles don't break design (`:-webkit-autofill`)
- [ ] **Horizontal rule** (`<hr>`) is styled if used
- [ ] **Blockquote** styling is defined if CMS content might use it
- [ ] **Table** styling is defined if any data presentation exists

---

---

# 🚀 Quick Reference: Daily Standup Questions

Ask these every day during build:

1. **"Is the content final?"** (Phase 0 gate)
2. **"Does it work without JS?"** (Phase 1 gate)
3. **"Can I see the scroll value?"** (Phase 2 gate)
4. **"Is the 3D piece tested standalone?"** (Phase 3 gate)
5. **"Are all hover states done?"** (Phase 4 gate)
6. **"What's the Lighthouse score on 4x throttle?"** (Phase 5 gate)
7. **"Has it been tested on real hardware?"** (Phase 6 gate)
8. **"Does the Slack preview look right?"** (Phase 7 gate)
9. **"Would a stranger know what to do?"** (Phase 8 gate)

---

# 📎 Appendix: Common Failure Modes

| Symptom | Likely Cause | Phase to Fix |
|---------|-------------|--------------|
| Layout breaks on real iPhone | Breakpoints only tested via resize | Phase 1 |
| Animations fire at wrong times | Multiple scroll controllers | Phase 2 |
| WebGL black screen on Safari | Unsupported extension or texture size | Phase 3 |
| Site feels "janky" | Micro-interactions added before structure | Phase 4 |
| 30fps on scroll | No GPU memory management | Phase 5 |
| Buttons unclickable on Android | Touch target too small or z-index issue | Phase 6 |
| Social share shows wrong image | OG tags not set per route | Phase 7 |
| "Something feels off" | No cold run-through done | Phase 8 |

---

*Framework inspired by igloo.inc build discipline and Awwwards jury criteria. Use ruthlessly. Ship confidently.*
