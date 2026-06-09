# Design Guidelines — Interview Insight Plus

## Color Palette
- Primary: Deep navy blue (#1A2B4A) — conveys trust and professionalism
- Accent: Electric teal (#00C2B2) — modern, analytical, highlights CTAs
- Background: Off-white (#F7F9FC) — clean and readable
- Surface: White (#FFFFFF) with subtle card shadows
- Text primary: Charcoal (#1C1C2E)
- Text secondary: Cool gray (#6B7A99)
- Success: Emerald (#22C55E)
- Warning: Amber (#F59E0B)
- Destructive: Soft red (#EF4444)

## Typography
- Font family: Inter (sans-serif) — clear and modern
- Headings: 600–700 weight, tight tracking
- Body: 400–500 weight, relaxed line-height (1.6)
- Monospace (for transcripts): JetBrains Mono

## Elevation & Depth
- Cards: 1px border (#E2E8F0) + box-shadow: 0 2px 8px rgba(0,0,0,0.06)
- Modals: 0 8px 32px rgba(0,0,0,0.14)
- No heavy drop shadows — subtle depth preferred

## Components
- Navigation: Left sidebar with icon + label, collapsible
- Tables: Striped rows, sortable headers, inline action menus
- Buttons: Rounded (8px radius), primary uses accent teal, secondary uses outlined navy
- Tags/badges: Pill-shaped, color-coded by category
- Progress indicators: Horizontal bar with label for analysis state
- Charts: Clean line and bar charts, teal palette
- Video player: Embedded, minimal controls, synchronized transcript panel

## Layout
- Max content width: 1280px
- Sidebar width: 240px (collapsed: 64px)
- Content padding: 32px
- Grid: 12-column, 24px gutter
- Responsive down to 1024px (tablet landscape)

## Accessibility
- WCAG AA contrast minimum
- Keyboard-navigable sidebar and tables
- Focus rings on all interactive elements
