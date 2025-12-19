# Remotive Logistics — Claude Code Operating Rules

## Project Overview

- **Framework**: Next.js 13.4 (pages router)
- **Template**: QuickEat (adapted for logistics)
- **Style**: Dark mode first, Remotive red (#E63946) accents

## Quality Gates

### Before Every Change

1. List exact files you will touch
2. Keep changes small and focused
3. Prefer editing existing files over creating new ones

### After Every Change

1. Run `npm run build` — must pass
2. Run `npm run dev` and verify visually
3. Report: what changed + how to verify

### Non-Negotiables

- Do NOT break `npm run build`
- Do NOT migrate to app router (keep `/pages`)
- Do NOT add unnecessary dependencies
- Do NOT over-engineer or add features not requested

## File Organization

```
/pages          → Route pages (index.jsx, about.jsx, etc.)
/src/components → Reusable React components
/src/layouts    → Layout wrappers (Header, Footer, Layout)
/public/assets  → Static files (images, CSS)
/styles         → Global CSS
```

## Styling Goals

- Clean, modern, premium logistics feel
- Dark mode first
- Remotive red (#E63946) for accents
- Fewer gradients, fewer gimmicks
- More whitespace
- Poppins font family

## Color Palette

| Purpose                | Color   |
| ---------------------- | ------- |
| Primary (Remotive Red) | #E63946 |
| Dark Background        | #1a1a1a |
| Text Light             | #ffffff |
| Text Muted             | #787878 |
| Dark Gray              | #363636 |

## Verification Steps

```bash
# Must pass before committing
npm run build

# Visual verification
npm run dev
# Open http://localhost:3000
```

## Git Workflow

1. Make changes
2. Verify build passes
3. Commit with descriptive message
4. Push to origin

## Future Plans (Do Not Implement Yet)

- Inventory system (JSON → admin flow)
- Lead capture forms with spam protection
- Email/API endpoints for forms
