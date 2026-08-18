# OKNO Modhomes — Process Page Implementation Specification

- **Page:** Process / The Journey
- **Route:** `/process`
- **Working branch:** `codex/page-process`
- **Document status:** Approved concept consolidated for implementation
- **Document version:** 1.0
- **Prepared:** 16 August 2026
- **Project type:** High-fidelity demo website

## 1. Purpose of this document

This document is the implementation source of truth for the OKNO Modhomes Process page. It consolidates:

- The approved page concept and information architecture.
- The content already present in `okno-modhomes.html`.
- The approved Forza reference imagery.
- The NRG Data Center Builder interaction reference.
- The scroll-driven animation plan.
- Demo-only assumptions and unverified claims.
- Responsive, accessibility, performance, and QA requirements.
- The expected Next.js component architecture.

The document intentionally separates approved requirements from implementation suggestions and future production requirements. It should be updated before implementation if any major decision changes.

## 2. Source material

### 2.1 Existing OKNO prototype

The primary content and visual language source is:

```text
/home/CodeAcc2007/Coding/Alphacode AI/OKNO Homes Website/okno-modhomes.html
```

Relevant material extracted from this file includes:

- Page title, introduction, and complete six-stop Process narrative.
- Expanded technical-detail copy for each stop.
- Five FAQ questions and answers.
- Bottom CTA copy.
- OKNO wordmark treatment.
- Placeholder footer structure and text.
- Embedded reference images.
- Color tokens and typography.
- Overall editorial design direction.

### 2.2 NRG interaction reference

The supplied screen recording is:

```text
/home/CodeAcc2007/Videos/Screencasts/Screencast_20260816_171616.webm
```

Reference characteristics:

- Duration: approximately 1 minute 50 seconds.
- Resolution: 2529 × 1517.
- Frame rate: 60 fps.
- Fixed isometric environment during immersive phases.
- Scroll-controlled progression through construction phases.
- Stylized architectural visualization instead of photorealistic simulation.
- Wireframes, overlays, highlights, hotspots, and assembly states.
- Large editorial typography between immersive scenes.
- Persistent phase indicator.
- Alternation between full-screen visual scenes and clean content sections.

The NRG site is inspiration only. The OKNO page must not copy its branding, exact layout, proprietary imagery, or distinctive text.

### 2.3 Approved Forza base image

The approved construction-animation base is Image 1:

```text
/tmp/codex-clipboard-2d66da66-b1fa-459c-a6c5-873b8f07cd79.png
```

Supporting images:

```text
/tmp/codex-clipboard-c2817ad0-5fe1-4a12-869e-8653175b8b71.png
/tmp/codex-clipboard-2ee8b82e-c560-4e5e-8316-44a345a83df1.png
```

Approved final appearance:

- Model: Forza.
- Primary finish: white exterior from Image 1.
- Secondary finish: warm timber accent at the central facade.
- Setting: tropical landscape with palms and water.
- Camera: front three-quarter architectural view.
- Final mood: clean daylight transitioning to a subtle dusk handover state.

The `/tmp` file paths are temporary. Before implementation, required images must be copied or recreated inside `public/process/` with stable filenames.

## 3. Product objective

The page must make OKNO's speed and process understandable through visual proof. Its main proposition is:

> A precision-manufactured OKNO home progresses from bare land to handover in 90 days, compared with an 18-month conventional industry journey.

The experience should show how the process works instead of relying only on text. It must communicate:

- Speed without appearing rushed or low quality.
- Manufacturing precision.
- A controlled studio-to-factory-to-site workflow.
- Minimal site disruption.
- A premium, calm, architectural brand character.
- Confidence at handover and beyond.

## 4. Experience principles

### 4.1 Editorial restraint

Typography, negative space, and pacing should feel premium. Animation should clarify the process and must not become a decorative technology demo.

### 4.2 Visual proof

Each stop must have an observable visual transformation. Avoid sections where only text fades into view.

### 4.3 Scroll as time

Scrolling represents progression from Day 0 to Day 90. Scrolling backward reverses the visual state wherever technically practical.

### 4.4 Conceptual honesty

No accurate CAD, engineering model, or construction-layer model has been supplied. The construction visuals must therefore be presented as conceptual demonstrations rather than certified engineering drawings.

### 4.5 Progressive enhancement

The complete narrative, timeline, FAQ, and CTA must remain usable if advanced motion is reduced or unavailable.

## 5. Page structure

The final page order is:

1. Persistent navigation.
2. Entry transition and hero.
3. Day 0–90 timeline with six stops.
4. Stop 05 expanded assembly sequence.
5. FAQ section.
6. Primary CTA.
7. Placeholder global footer.

## 6. Navigation

### 6.1 Desktop navigation

Required items:

- OKNO wordmark.
- Projects.
- Models.
- Hospitality.
- Process — active state.
- Journal.
- Gold Enquire button.

Behavior:

- Fixed or sticky at the top.
- Visible on initial entry.
- Hides while the user scrolls down after leaving the hero.
- Reappears when the user scrolls upward.
- Gains a cream/glass background after leaving the hero.
- Process receives a gold active-state marker.
- The Enquire button retains a distinct bronze/gold fill.

### 6.2 Mobile navigation

- Wordmark on the left.
- Menu button on the right.
- Full-screen or large-sheet navigation when opened.
- Process marked as active.
- Enquire remains visible in the menu.
- No horizontally scrolling desktop navigation links.

### 6.3 Demo routing

Current and future routes should be respected. Where an internal page is not yet built, an existing safe external URL or a clearly intentional placeholder may be used. No link should fail silently.

## 7. Entry transition and hero

### 7.1 Entry behavior

The long-term concept begins with a camera push through a wall in an immersive homepage room. The current Process-page branch does not own that homepage transition.

For this demo:

- Direct entry to `/process` uses a self-contained cinematic reveal.
- The page begins dark for a brief moment.
- A vertical or architectural line opens the scene into the cream theme.
- The hero typography reveals in a controlled sequence.
- Reduced-motion users receive a simple opacity transition.

The future homepage may pass navigation state to trigger the full wall-push transition, but this is not required for the first Process-page implementation.

### 7.2 Hero content

Overline:

> THE JOURNEY

Headline:

> From bare land to a lit window.

Subtext:

> Ninety days, six stops. Travel the whole route, or open any stop for the detail beneath it. The line below is drawn as you go—it is the same line our studio draws first.

Optional supporting comparison:

```text
OKNO — 90 DAYS
CONVENTIONAL — UP TO 18 MONTHS
```

This comparison should be visually quiet and must not compete with the headline.

### 7.3 Hero visual behavior

- Minimum height: approximately 90–100 viewport heights.
- Cream/light background with subtle paper grain.
- A fine gold line begins below the headline.
- The line becomes the timeline spine.
- A small “Scroll to begin” cue can appear near the bottom edge.

## 8. Timeline system

### 8.1 Spine

- A delicate central bronze/gold line anchors the desktop timeline.
- The line starts at zero length.
- Its visible length maps to page progress.
- Stop markers activate when the corresponding stop enters the primary viewport zone.
- The mobile line shifts to the left edge of the content.
- The line must remain visible without covering text or imagery.

### 8.2 Zigzag layout

Desktop alternation:

| Stop | Left side | Right side |
|---|---|---|
| 01 | Narrative | Animation |
| 02 | Animation | Narrative |
| 03 | Narrative | Animation |
| 04 | Animation | Narrative |
| 05 | Narrative | Major assembly animation |
| 06 | Completed-home visual | Narrative |

On mobile, animation appears before or immediately after its associated narrative. Reading order must remain logical in the DOM.

### 8.3 Stop activation

When a stop activates:

- Its marker fills with gold.
- The stop label becomes high contrast.
- Narrative content reveals with a short upward motion.
- The visual window begins or scrubs to its active animation.
- The persistent day counter transitions to the stop's day range.

## 9. Persistent progress tracker

Desktop concept:

```text
01  LAND
02  DRAWING
03  FACTORY
04  ROAD
05  SITE
06  HANDOVER

DAY 00 ━━━━━━━━━━━━━━━━━ DAY 90
```

Required behavior:

- Fixed to the right or left edge without obstructing the central narrative.
- Current stop highlighted in gold.
- Completed stops remain visibly completed but quieter than the active stop.
- Day value updates continuously rather than jumping only at stop boundaries.
- Desktop stop labels are clickable and smoothly navigate to the stop.
- Mobile uses a compact bar with the current stop and day number.
- Accessibility label announces current phase without excessive live-region updates.

Day mapping:

| Page stage | Day range |
|---|---:|
| Hero | 0 |
| Stop 01 | 0–1 |
| Stop 02 | 1–14 |
| Stop 03 | 14–48 |
| Stop 04 | 48–52 |
| Stop 05 | 52–80 |
| Stop 06 | 80–90 |

## 10. Stop 01 — The Land

### 10.1 Label

```text
STOP 01 — DAY 0
```

### 10.2 Narrative

> It begins with a walk on your plot. We survey, we listen to the slope and the sun, and we mark the one line every drawing will answer to.

### 10.3 Visual

The visual begins with an empty tropical plot inspired by the environment in Image 1.

Animation sequence:

1. Soft aerial/isometric plot becomes visible.
2. Survey points scan across the site.
3. Topographic contour lines draw progressively.
4. Plot boundaries appear.
5. A sun/path orientation line moves across the site.
6. Gold foundation points appear.
7. The proposed footprint is marked without building the house yet.

Caption:

```text
SITE — 14 630
```

Implementation form:

- SVG and CSS animation.
- Optional canvas noise/point field for the scanning effect.
- No external video required.

### 10.4 Expanded detail

Accordion label:

> FOR THE DETAIL-MINDED

Body copy:

> Topographic survey, soil assessment and access study within the first week. Foundation type is fixed here—screw pile, strip or raft—and priced in writing before anything else moves.

### 10.5 Demo disclaimer

Foundation choices and timing are sourced from the prototype and are not independently verified.

## 11. Stop 02 — The Drawing

### 11.1 Label

```text
STOP 02 — DAYS 1–14
```

### 11.2 Narrative

> In the studio, the home takes its exact shape—plans, elevations, materials, and a price fixed to every sheet. What is drawn here is what gets built. Precisely.

### 11.3 Visual

Animation sequence:

1. A dark or cream technical grid appears.
2. A conceptual Forza footprint draws itself.
3. Interior and exterior wall lines appear.
4. Dimensions and architectural annotations fade in.
5. The 2D lines lift vertically.
6. The drawing becomes a white 3D-style wireframe silhouette.
7. The final wireframe rotates or settles slightly into the approved Image 1 viewing angle.

Caption:

```text
THE DRAWING — SCALE 1:75
```

Implementation form:

- Inline SVG using grouped paths.
- CSS transforms or canvas projection for the extrusion illusion.
- No claim that the displayed plan is the actual Forza floor plan.

### 11.4 Expanded detail

Accordion label:

> HOW THE STUDIO ENGAGES

Body copy:

> Signature models are adapted to your site and palette. Bespoke begins from a blank sheet. Either way, engineering and design happen at one table, so nothing drawn is undeliverable.

### 11.5 Demo disclaimer

The plan and dimensions shown are conceptual visualization assets created from the available exterior imagery.

## 12. Stop 03 — The Factory

### 12.1 Label

```text
STOP 03 — DAYS 14–48
```

### 12.2 Narrative

> At Kothur, your home becomes panels—framed, insulated, wired and finished indoors, to a tolerance rain and improvisation never allow.

### 12.3 Visual

Animation sequence:

1. A dark precision-grid window opens.
2. A floor frame assembles from line segments.
3. LGSF wall panels descend and lock into place.
4. Connection nodes briefly pulse in bronze/gold.
5. Measurement lines animate around a panel.
6. A quality-control scan passes across the frame.
7. The assembled frame holds as the scroll reaches the detail zoom.

Caption:

```text
LINE 02 — PANEL 07 OF 11 · ±2 MM
```

Implementation form:

- SVG paths, masks, transforms, and line-drawing animations.
- Conceptual frame geometry matched approximately to the Forza silhouette.
- No factory footage required.

### 12.4 First immersive wall zoom

At the key engineering moment:

1. The camera/viewport pushes toward one highlighted frame connection.
2. Surrounding geometry fades or blurs.
3. The connection enlarges into a clean technical diagram.
4. Fastener, stud, and joint shapes separate slightly.
5. Labels identify the view as conceptual.
6. The layers reconnect.
7. The camera pulls back to the complete frame.

This effect may be simulated using scale, clip-path, SVG viewBox interpolation, and opacity rather than an actual 3D camera.

### 12.5 Expanded detail

Accordion label:

> TOLERANCES & CAPACITY

Body copy:

> LGSF sections cold-formed to ±2 mm. Every panel is QC-checked against the drawing before it ships. Current capacity: twelve units a month—hospitality programmes are scheduled as production slots, not construction seasons.

### 12.6 Demo disclaimer

The ±2 mm tolerance and twelve-unit monthly capacity are prototype claims requiring company approval before production publication.

## 13. Stop 04 — The Road

### 13.1 Label

```text
STOP 04 — DAYS 48–52
```

### 13.2 Narrative

> Containerised and sequenced, the house travels—to a Lonavala hillside, a Coorg estate, or once, across an ocean to the United States.

### 13.3 Visual

Animation sequence:

1. A topographic route line draws from Hyderabad.
2. A wireframe truck enters the frame.
3. Panel silhouettes appear sequenced inside a container.
4. The truck follows the route line.
5. Lonavala and Coorg markers briefly illuminate.
6. The route expands toward a port/ocean motif.
7. A final destination marker appears.

Caption:

```text
HYD → SITE · 500 KM INCLUDED
```

Implementation form:

- SVG/CSS illustration.
- No transport video or photographic asset required.

### 13.4 Expanded detail

Accordion label:

> THE EXPORT CAPABILITY

Body copy:

> Export 01 proved the system ships: panels packed to marine standard, assembled by a local crew to our drawings and video protocol. If your site has a road—or a port—we can reach it.

### 13.5 Demo disclaimer

The 500 km inclusion, marine-standard packaging, and United States export claims require company confirmation before production publication.

## 14. Stop 05 — The Site

### 14.1 Label

```text
STOP 05 — DAYS 52–80
```

### 14.2 Narrative

> Panels rise in days. The land is disturbed as little as the neighbours; the trees you kept stay kept. A house appearing between two Mondays.

### 14.3 Primary progressive-assembly scene

This is the page's most important visual interaction. It receives more scroll distance and a larger visual window than the other stops.

Assembly states:

1. Empty tropical plot.
2. Foundation footprint appears.
3. Ground/floor frame assembles.
4. LGSF wall frames descend or rise into position.
5. Roof structure locks in.
6. Insulation fills the frame bays.
7. Sheathing and protective layers wrap the house.
8. White exterior finish and timber accent appear.
9. Windows and doors pop into place.
10. The visual resolves into a clean version of approved Image 1.

Caption:

```text
ASSEMBLY — DAYS, NOT SEASONS
```

### 14.4 Assembly implementation strategy

No true 3D model or supplied construction video is available. The approved strategy is browser-native conceptual animation:

- Build the intermediate house as layered SVG groups.
- Align the silhouette to the Forza proportions visible in Image 1.
- Use transforms, masks, path drawing, opacity, and clip paths.
- Crossfade the final vector state into a cleaned/cropped Forza image.
- Drive all states from normalized scroll progress.
- Reverse states on upward scroll.
- Use a poster/static state for reduced motion.

If a generated image sequence is created later, it may replace the vector crossfade without changing the timeline content structure.

### 14.5 Second immersive wall zoom

During the sheathing stage:

1. A wall panel highlights.
2. The visual zooms toward the panel.
3. An exploded conceptual cross-section fills the animation window.
4. Layers separate in order:
   - Interior board.
   - Light-gauge steel frame.
   - Insulation.
   - Exterior sheathing.
   - Protective/waterproofing membrane.
   - White exterior finish.
5. A short label explains that the visualization is conceptual.
6. Layers reconnect.
7. The camera returns to the whole house.

No unverified layer thicknesses, U-values, product brands, or fire ratings should appear.

### 14.6 Expanded detail

Accordion label:

> WHAT YOU ARRANGE

Body copy:

> Almost nothing. Power and water connection points, and any local approvals we haven't already handled with you. Our crew manages the rest, and leaves the site clean.

### 14.7 Demo disclaimer

The animation is a conceptual explanation of assembly sequence, not a construction manual or engineering representation.

## 15. Stop 06 — The Handover

### 15.1 Label

```text
STOP 06 — DAY 90
```

### 15.2 Approved demo narrative

The prototype references an aerial photograph that has not been supplied. Use this adjusted demo copy:

> A dated key, kept. The home is finished, the final checks are signed, and the windows are lit. Then a year of care begins.

Do not use “the photograph on the left is not an illustration” unless an appropriate real completed-home photograph is supplied.

### 15.3 Visual

Animation sequence:

1. Completed Forza house holds in daylight.
2. Construction annotations fade away.
3. A subtle day-to-dusk grade passes across the image.
4. Interior windows illuminate.
5. A quality-control/check marker resolves.
6. A minimal key or handover mark appears.
7. The day counter reaches 90.
8. The progress line completes in gold.

Caption:

```text
DAY 90 — LIGHTS ON
```

### 15.4 Expanded detail

Accordion label:

> AFTER THE KEY

Body copy:

> A twelve-month comprehensive care period covers settling, seals and systems. Structural warranty runs far longer—the steel is designed for generations, not seasons.

### 15.5 Demo disclaimer

Available screenshots mention a 20-year warranty. The Process page should use the more conservative prototype wording unless the exact 20-year terms are confirmed.

## 16. FAQ section

### 16.1 Transition

- The gold timeline spine terminates visibly.
- The background transitions to linen or a dark premium section.
- A centered divider introduces “Before You Begin.”

### 16.2 Heading

> The five questions every buyer asks.

### 16.3 Accordion items

#### 01. Will a bank finance a panelised home?

> Yes—as a permanent structure on owned land, Okno homes qualify for standard home-construction loans with the major lenders. We provide the documentation package your bank asks for, and we've walked this path with dozens of owners.

#### 02. What approvals does my land need?

> The same as any permanent home: sanctioned plans per your local authority. Our studio prepares the drawings for sanction and guides the application—for most plots this runs parallel to production, not before it.

#### 03. What does my land need to be ready?

> Legal title, road access for a container truck—or a plan for the last stretch—and connection points for power and water. The survey at Stop 01 settles everything else.

#### 04. How long does it actually last?

> The LGSF structure is engineered for a design life measured in generations—steel doesn't rot, warp or feed termites. The envelope carries a comprehensive first-year care period and a long structural warranty, stated in writing.

#### 05. What does maintenance look like?

> Less than a conventional build: an annual inspection of seals and finishes, standard servicing of systems. No repainting cycles for the structure, no seasonal crack-filling.

### 16.4 Interaction

- Native semantic accordion behavior preferred.
- Gold-reactive question text.
- Plus icon rotates into a close icon.
- Smooth height/opacity transition where browser support allows.
- Keyboard and screen-reader accessible.
- Multiple answers may remain open unless the final design explicitly uses a single-open accordion.

### 16.5 Claim status

FAQ answers are demo copy sourced from the prototype. Financing, approvals, structural life, care, and maintenance statements require company/legal approval before a production launch.

## 17. Primary CTA

CTA text:

> THE JOURNEY ENDS AT YOUR DOOR — CONFIGURE IT →

Visual treatment:

- Solid bronze/tan block.
- High-contrast light text.
- Generous spacing.
- Arrow moves horizontally on hover.
- Background deepens to bronze-dark on hover.
- Clear keyboard focus treatment.

Destination:

- Preferred future destination: `/models`.
- Temporary demo fallback: the existing external OKNO Models URL if the local page is unavailable.

## 18. Footer

The demo footer should reuse the structure from `okno-modhomes.html`.

Required placeholder groups:

- OKNO MODHOMES wordmark.
- Short precision-manufactured homes statement.
- Explore links.
- Models/Services links.
- Hyderabad contact/location placeholder.
- Enquiry contact placeholder.
- Copyright line.
- Privacy and terms placeholders if necessary.

The footer must clearly look intentional even when contact details are placeholders.

## 19. Visual system

### 19.1 Color tokens

Use the prototype values as the default Process-page palette:

```css
--white: #F7F4F0;
--linen: #E8E2DA;
--sand: #C4BAB0;
--bronze: #A0845C;
--bronze-dark: #7A6244;
--gold: #C9A96A;
--stone: #7A746E;
--ink-soft: #2E2B28;
--ink: #1C1917;
--night: #111009;
```

### 19.2 Typography

Prototype font system:

- Display/headlines: DM Serif Display.
- Body/UI: Inter.
- Technical labels: DM Mono.
- Safe display fallback: Georgia.
- Safe body fallback: system sans-serif.
- Safe technical fallback: ui-monospace.

Typography behavior:

- Headlines use editorial scale and tight line height.
- Body text remains restrained and readable.
- Technical labels use uppercase and wide tracking.
- Avoid excessive bold weights.

### 19.3 Texture

- Subtle paper/noise texture may be applied globally.
- Texture opacity must remain low.
- Grain must not reduce text clarity.
- Disable animated grain when reduced motion is active.

### 19.4 Animation windows

- Dark charcoal/night background.
- Thin bronze/gold technical lines.
- Rounded corners should be minimal or absent unless matching the final navigation.
- Captions sit inside or directly beneath the window.
- Visual windows use consistent aspect ratios.

## 20. Motion system

### 20.1 General easing

Primary easing from prototype:

```css
cubic-bezier(.22, .8, .24, 1)
```

### 20.2 Scroll animation rules

- Scroll animation must be deterministic.
- Every animation state derives from normalized scroll progress.
- Avoid timers that continue independently of page position.
- Avoid large layout shifts during pinned sequences.
- Update DOM transforms through `requestAnimationFrame`.
- Use passive scroll listeners where applicable.
- Prefer CSS custom properties for progress-driven visual state.

### 20.3 Reveal motion

- Text reveal distance: restrained, approximately 16–28 px.
- Opacity and transform may combine.
- No bouncing or elastic easing.
- Technical lines draw at a measured, mechanical pace.
- Stop transitions should feel continuous rather than six unrelated animations.

### 20.4 Reverse motion

Scrolling upward should reverse:

- Spine progress.
- Day counter.
- Assembly layers.
- Wireframe extrusion.
- Route progress.

Opened accordions do not need to close when scrolling upward.

## 21. Technical architecture

### 21.1 Framework

- Next.js 16 App Router.
- React 19.
- TypeScript.
- CSS Modules for page-specific styling.
- Server-rendered page shell and content.
- Client components only where scroll state or interactive behavior requires them.

### 21.2 Proposed file structure

```text
src/
├── app/
│   └── process/
│       ├── page.tsx
│       └── process.module.css
├── components/
│   └── process/
│       ├── ProcessHero.tsx
│       ├── ProcessJourney.tsx
│       ├── ProcessProgress.tsx
│       ├── ProcessStop.tsx
│       ├── ProcessFaq.tsx
│       ├── ProcessCta.tsx
│       ├── ProcessFooter.tsx
│       ├── processData.ts
│       └── visuals/
│           ├── LandVisual.tsx
│           ├── DrawingVisual.tsx
│           ├── FactoryVisual.tsx
│           ├── RoadVisual.tsx
│           ├── AssemblyVisual.tsx
│           └── HandoverVisual.tsx
└── hooks/
    └── useScrollProgress.ts

public/
└── process/
    ├── forza-base.webp
    ├── forza-handover.webp
    └── poster-reduced-motion.webp
```

The exact split may be reduced if individual components become unnecessarily small. Content data should remain separate from animation implementation.

### 21.3 Content data

Each stop should be represented as structured data containing:

- ID.
- Stop number.
- Day start.
- Day end.
- Title.
- Narrative.
- Detail title.
- Detail body.
- Caption.
- Visual type.
- Claim/disclaimer status.

### 21.4 Scroll measurement

Recommended approach:

- A client-side journey controller measures each section.
- `IntersectionObserver` identifies active stops.
- `requestAnimationFrame` computes fine progress for the active visual.
- CSS custom properties expose progress to SVG/CSS.
- ResizeObserver or window resize recalculates section geometry.
- Scroll state should not trigger React rendering on every frame if direct CSS-variable updates are sufficient.

No new animation library is required for the first implementation. Add one only if native browser APIs prove insufficient and the dependency is justified.

### 21.5 Image handling

- Copy stable source assets into `public/process/`.
- Convert screenshots to WebP/AVIF where appropriate.
- Remove or crop screenshot navigation and UI from the final Forza visual.
- Use `next/image` for static photographic assets.
- Provide explicit dimensions or responsive `fill` containers.
- Avoid loading all heavy assets before the hero is usable.

## 22. Responsive behavior

### 22.1 Desktop — 1200 px and above

- Full zigzag layout.
- Central spine.
- Edge progress tracker with labels.
- Large animation windows.
- Pinned or extended Stop 05 assembly sequence.
- Two immersive wall zooms.

### 22.2 Tablet — 768–1199 px

- Reduced content gap.
- Spine may shift off center to preserve visual room.
- Shorter pinned duration.
- Simplified tracker labels.
- Wall zooms remain but use reduced scale.

### 22.3 Mobile — below 768 px

- Single-column timeline.
- Spine positioned at the left edge.
- Visual and narrative stack together.
- Compact bottom progress indicator.
- No long desktop-style pin that traps the user.
- Assembly animation uses fewer simultaneously animated details.
- Wall cross-section appears as a contained overlay rather than a full camera dive.
- Touch targets at least 44 × 44 CSS pixels.

## 23. Reduced motion and fallback behavior

For `prefers-reduced-motion: reduce`:

- Disable smooth scroll-driven transforms.
- Disable camera dives.
- Disable animated grain.
- Show each visual at a representative final state.
- Keep the timeline and day labels visible.
- Use subtle opacity changes only if allowed.
- Keep accordions fully interactive.

If advanced visual code fails:

- Text and semantic timeline remain visible.
- Static poster images appear in animation windows.
- Navigation, FAQ, CTA, and footer remain functional.

## 24. Accessibility requirements

- Use semantic `<main>`, `<section>`, `<article>`, headings, and lists.
- Maintain one clear `<h1>`.
- Timeline stops use sequential heading levels.
- Decorative SVGs use `aria-hidden="true"`.
- Meaningful visuals receive concise accessible descriptions.
- FAQ controls expose expanded/collapsed state.
- All interactive controls are keyboard accessible.
- Visible focus states use bronze with adequate offset.
- No information is available only through color or motion.
- Text contrast meets WCAG AA where practical.
- Progress tracker clicks have accessible labels.
- Avoid rapidly updating screen-reader announcements for every day value.
- No autoplay audio.

## 25. Performance targets

### 25.1 Experience targets

- Smooth desktop animation on a typical modern laptop.
- No continuous layout recalculation during scroll.
- No visible image shifting.
- No scroll-lock traps.
- Main content should remain usable before secondary animations fully load.

### 25.2 Asset targets

- Initial Process route image payload kept as small as practical.
- Hero and first-stop assets prioritized.
- Later stop images lazy-loaded.
- Forza base/final image optimized to modern formats.
- SVG visuals preferred over raster frame sequences for the first demo.

### 25.3 Code targets

- No unnecessary animation dependency.
- Avoid one React state update per scroll frame.
- Clean up observers and event listeners.
- Use transform and opacity for high-frequency motion.
- Pause passive loops when their section is off screen.

## 26. SEO and metadata

Recommended title:

```text
The 90-Day Building Process — OKNO Modhomes
```

Recommended description:

```text
Follow an OKNO home from bare land to handover through design, precision factory production, transport, and rapid on-site assembly.
```

Other requirements:

- Canonical URL to be added when deployment domain is confirmed.
- Future Open Graph image should feature the completed white Forza home with the Day 90 line.
- Page content should remain indexable without executing animation code.

## 27. Demo claims and approval matrix

The following claims are available in the source materials but are not independently verified:

| Claim | Source | Demo use | Production requirement |
|---|---|---|---|
| 90-day build/move-in | HTML and screenshots | Primary demo proposition | Confirm start/end conditions and guarantee terms |
| Six stops | HTML | Use | Confirm official workflow naming |
| ±2 mm tolerance | HTML | Use with demo status | Engineering approval |
| Twelve units/month | HTML | Use with demo status | Operations approval |
| 500 km included | HTML | Use with demo status | Commercial approval and exclusions |
| United States export | HTML | Use with demo status | Confirm project and wording |
| One-year care period | HTML | Use with demo status | Warranty/service approval |
| 20-year warranty | Screenshot | Do not foreground | Confirm exact covered items and terms |
| Earthquake/storm proof | Screenshot | Exclude from Process page | Engineering/legal approval |
| Bank finance eligibility | HTML FAQ | Use as demo copy | Lender/legal approval |
| Structural life measured in generations | HTML FAQ | Use conservatively | Engineering/legal approval |

No visual disclaimer needs to dominate the demo page, but the implementation and handoff must clearly document these statuses.

## 28. Explicitly out of scope

The first Process-page implementation will not include:

- A true 3D/WebGL house model.
- Certified floor plans.
- Accurate structural simulation.
- Real factory footage.
- Real transport footage.
- A production-grade model configurator.
- Forza pricing and specification selector.
- Material-selection controls.
- Homepage 3D room implementation.
- Backend enquiry submission.
- Production analytics unless separately requested.
- Legal verification of company claims.

## 29. Acceptance criteria

### 29.1 Content

- Hero copy matches this specification.
- All six stops appear in order.
- Every stop contains label, narrative, visual, caption, and expandable detail.
- FAQ contains all five questions.
- CTA and footer are present.

### 29.2 Interaction

- Scroll spine progresses from hero through Stop 06.
- Active stop updates accurately.
- Day tracker progresses from 0 to 90.
- Stop 05 visibly assembles the house in ordered layers.
- Upward scroll reverses main visual progression.
- Stop 03 and Stop 05 contain conceptual zoom/detail moments.
- Accordions work by pointer and keyboard.
- Navigation returns on upward scroll.

### 29.3 Visual quality

- Page reads as premium architectural editorial design.
- White Forza finish from Image 1 is clearly represented.
- Animation style is consistent with the supplied NRG reference without copying it.
- Technical windows feel coherent across all six stops.
- No unfinished browser-default styling is visible.
- Placeholder logo and footer appear deliberate.

### 29.4 Responsive quality

- Desktop zigzag layout remains balanced.
- Mobile reading order is clear.
- No horizontal overflow.
- No text overlaps sticky animation scenes.
- Progress indicator remains usable on mobile.

### 29.5 Accessibility and fallback

- Keyboard journey through navigation, accordions, and CTA is possible.
- Reduced-motion mode is complete and understandable.
- Page remains readable if visual JavaScript fails.
- Focus states are visible.

### 29.6 Engineering quality

- `npm run lint` passes.
- `npm run build` passes.
- TypeScript has no errors.
- No unhandled console errors during page interaction.
- Observers/listeners are cleaned up.
- Existing routes are not unintentionally broken.

## 30. Verification plan

Implementation should be verified in this order:

1. Static content and route rendering.
2. Desktop layout at 1440 × 900.
3. Desktop layout at 1920 × 1080.
4. Tablet layout around 1024 × 768.
5. Mobile layout around 390 × 844.
6. Full forward scroll.
7. Full reverse scroll.
8. Timeline stop navigation.
9. FAQ keyboard behavior.
10. Reduced-motion mode.
11. Lint and production build.
12. Visual screenshots at hero, each stop, FAQ, and CTA.

## 31. Approved decisions summary

- Build the Process page first on its own branch.
- Branch: `codex/page-process`.
- Use the existing HTML for content, brand direction, logo treatment, images, and placeholder footer.
- Use the supplied NRG screen recording as interaction inspiration.
- Use Forza as the house model.
- Use Image 1 as the base reference.
- Use the white exterior finish.
- Do not require a 3D model, factory video, transport video, textures, or CAD drawings.
- Create a browser-native conceptual animation.
- Use SVG/CSS/masks and optional generated image layers.
- Treat construction visuals as conceptual.
- Include two immersive engineering zoom moments.
- Include a persistent Day 0–90 tracker.
- Reverse main animation on upward scroll.
- Use placeholder logo/footer details for the demo.
- Do not include Models-page pricing/configuration controls on the Process page.

## 32. Remaining implementation-time judgments

The following may be decided during implementation as long as they remain consistent with this specification:

- Exact duration and scroll height of each stop.
- Exact progress-tracker edge placement.
- Exact SVG geometry used for conceptual Forza construction states.
- Whether the FAQ background is linen or dark.
- Whether the final CTA is integrated with the FAQ section or separated.
- Exact image cleanup/cropping method.
- Minor copy punctuation required for responsive line breaks.

Any change that removes a stop, changes the core narrative, alters the white Forza choice, introduces unverified technical measurements, or replaces the scroll-driven assembly with a passive video requires user approval.
