# Create New Page

## Task
Create a new page at `/pages/$PAGENAME.jsx`

## Requirements

### Structure
```jsx
import Layout from "@/src/layouts/Layout";
import Link from "next/link";

const $PAGENAME = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section gap">
        {/* Page content */}
      </section>
    </Layout>
  );
};

export default $PAGENAME;
```

### Styling
- Use existing CSS classes where possible
- Dark mode first
- Remotive red (#E63946) accents
- Consistent with other pages

### Navigation
- Add link to Header.js if needed
- Add link to MobileMenu.js if needed
- Add to Footer.js menu if appropriate

## Files to Touch
- `pages/$PAGENAME.jsx` (create)
- `src/layouts/Header.js` (add nav link)
- `src/layouts/MobileMenu.js` (add nav link)
- `src/layouts/Footer.js` (optional)

## Verification
1. `npm run build` passes
2. Page loads at `http://localhost:3000/$PAGENAME`
3. Navigation links work
4. Mobile menu includes link

## Definition of Done
- Page renders without errors
- Navigation works
- Matches site theme
- Build passes
