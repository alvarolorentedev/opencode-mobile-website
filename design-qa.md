# Design QA — Landing Product Imagery

- Source visual truth: `/Users/alvarolorente/Downloads/scteenshots/Screenshot_20260719-215511.png`, `Screenshot_20260719-215529.png`, and `Screenshot_20260719-215552.png`
- Implementation screenshots: `/tmp/opencode-landing-hero-final.png`, `/tmp/opencode-landing-product-final.png`, and `/tmp/opencode-landing-mobile-final.png`
- Combined comparison: `/tmp/opencode-design-qa-comparison.png`
- Viewports: 1280 × 720 desktop and 390 × 844 mobile
- State: dark theme, landing hero and `#product` section

## Full-view comparison evidence

The combined comparison places the approved task-screen capture beside the corrected desktop hero and Product section. The hero and gallery now use the approved captures directly rather than a redrawn approximation. The hero keeps the task screen large enough to identify its title, session tabs, starter tasks, and mint actions. The Product section gives each real capture a dedicated portrait column with adjacent benefit-led copy.

## Focused region comparison evidence

The hero product-image region was inspected separately at 1280 × 720. Its source is exactly `/img/product/task-session.webp`, which was derived from the approved screenshot, so control geometry, typography, colors, and content are preserved. At 390 × 844 the same image renders at approximately 298 px wide with no horizontal overflow. A separate focused crop was not needed because the direct source asset and its full rendered bounds were clearly readable in the comparison.

## Comparison history

### Initial findings

- **P1 — Product fidelity drift:** The generated Remotion phone interface differed visibly from the real app and weakened trust.
- **P1 — Product imagery was too small:** A landscape explainer was placed inside a portrait-oriented hero slot, making both its text and recreated controls difficult to understand.
- **P2 — Hero conversion action fell below the 720 px viewport:** The primary CTA was not fully visible above the fold.
- **P2 — Walkthrough poster used the wrong aspect ratio:** A portrait screenshot was cropped inside a 16:9 video element.

### Fixes made

- Restored approved screenshots 1–3 as the hero and Product gallery assets.
- Rebuilt the Remotion walkthrough around those real captures; Remotion now adds only large explanatory copy and motion.
- Rebalanced hero typography and spacing so the primary CTA ends at 709 px in a 720 px viewport.
- Rendered a dedicated 16:9 poster from the corrected Remotion composition.
- Removed synthetic Workspace, Connection, and Chat stills from public landing and documentation surfaces.

### Post-fix evidence

- Hero asset: `/img/product/task-session.webp`.
- Product assets: task, voice, and usage approved captures.
- Walkthrough poster: `/img/product/walkthrough-poster.png`.
- Desktop and mobile widths show no horizontal overflow.
- Product navigation moves to `#product` with the heading visible below the sticky navigation.
- Browser console contains no relevant warnings or errors.

## Required fidelity surfaces

- **Fonts and typography:** IBM Plex Mono presentation remains consistent with the landing system. Headline size was reduced only enough to preserve hierarchy and keep the CTA above the fold.
- **Spacing and layout rhythm:** The hero is balanced as copy plus a portrait product view. The Product gallery restores three equal columns on desktop and one readable column on mobile.
- **Colors and visual tokens:** The warm black, off-white, thin borders, and mint accent remain unchanged. Real captures preserve the app's actual mint and surface colors.
- **Image quality and asset fidelity:** Hero and Product imagery now use the approved captures directly. No recreated UI, glyph approximations, or synthetic phone controls remain on public surfaces.
- **Copy and content:** Product descriptions now explain the user outcome while screenshot captions and alt text identify the exact capability shown.

## Interaction and accessibility checks

- Primary Android CTA is visible above the fold at 1280 × 720.
- Product navigation link reaches `#product`.
- Video retains native controls and a matching 16:9 poster.
- Images retain descriptive alt text.
- Desktop and mobile layouts have no horizontal overflow.
- Console errors/warnings: none.

## Follow-up polish

- P3: A future sanitized Workspace or Terminal capture would allow those capabilities to appear as real product imagery too. Current documentation keeps them text-only instead of showing an inaccurate recreation.

final result: passed
