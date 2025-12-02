# Free Bird Productions - Design Guidelines

## Design Approach

**Reference-Based Approach:** Drawing inspiration from high-end creative portfolios (Awwwards winners, Behance showcases) combined with modern publication aesthetics (Medium, Substack). The design prioritizes visual storytelling, cinematic presentation, and content hierarchy while maintaining exceptional readability.

## Core Design Principles

1. **Cinematic Scale:** Large, bold typography and generous whitespace create dramatic impact
2. **Content-First:** Let projects and knowledge shine without decorative interference  
3. **Fluid Motion:** Subtle, purposeful transitions that guide attention
4. **Hierarchical Clarity:** Clear visual distinction between primary, secondary, and tertiary content

## Typography System

**Font Families:**
- Primary: Inter or DM Sans (headers, UI elements) - modern, clean sans-serif
- Secondary: Merriweather or Lora (article bodies, long-form content) - readable serif
- Accent: Space Grotesk or Outfit (project titles, special callouts) - geometric, distinctive

**Type Scale:**
- Hero Titles: text-6xl md:text-7xl lg:text-8xl (72-96px)
- Section Headers: text-4xl md:text-5xl (36-48px)
- Project Titles: text-3xl md:text-4xl (30-36px)
- Body Large: text-xl md:text-2xl (20-24px)
- Body: text-base md:text-lg (16-18px)
- Captions: text-sm (14px)

**Hierarchy Rules:**
- Limit heading levels to H1-H3 for clarity
- Use font weight (regular vs bold) rather than size alone for differentiation
- Maintain 1.6-1.8 line height for body text, 1.2 for headlines

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 8, 12, 16, 20, 24, 32 (e.g., p-4, gap-8, my-12, py-16, mt-20, mb-24, py-32)

**Grid Systems:**
- Home/Marketing: Full-width sections with inner max-w-7xl containers
- Projects Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-8
- Project Details: max-w-4xl centered for text, full-width for media
- Knowledge Hub: max-w-6xl with sidebar layout (2/3 + 1/3 split on desktop)

**Responsive Breakpoints:**
- Mobile-first approach with progressive enhancement
- Critical breakpoints: md: (768px), lg: (1024px), xl: (1280px)

## Page-Specific Layouts

### Home Page
**Structure:** Staggered full-width project showcase (NOT traditional hero)
- Opening: Full-screen featured project image with minimal overlay text (project title + "View Project" CTA) - buttons with backdrop-blur-lg bg-white/10 treatment
- Intro Section: Large centered text (max-w-3xl) with "What I Do" heading - py-24
- Featured Projects: Asymmetric 2-column grid alternating image-text blocks (60/40 split)
- Newsletter CTA: Centered block with generous padding (py-32), large input field, prominent subscribe button
- Vertical rhythm: py-16 to py-32 between sections

### Projects Page
**Layout:** Masonry-inspired grid with filters
- Filter Bar: Sticky top navigation with category pills, search input (w-full md:w-96), sort dropdown
- Project Grid: Responsive cards with hover scale effect, overlay title on images
- Pagination: Centered numbered pagination with prev/next arrows
- Card Aspect: Vary heights slightly (aspect-video to aspect-square) for visual interest

### Project Detail Page
**Immersive Layout:**
- Hero: Full-bleed project image/video (min-h-screen with gradient overlay)
- Title Block: Centered max-w-4xl with large heading, client/year metadata, tools tags
- Long Description: Two-column layout on desktop (main content + sidebar with quick facts)
- Media Gallery: Full-width horizontal scroll slider with lightbox capability
- Knowledge Points: Card grid (2-3 columns) with icons, expandable sections
- Related Projects: 3-column grid at bottom
- Spacing: py-20 between major sections, py-8 within sections

### Knowledge Hub
**Magazine Layout:**
- Hero Article: Large featured card (50% viewport height) with image, category tag, title, excerpt
- Articles Grid: 3-column cards with thumbnail, title, date, read time, author
- Sidebar: Categories list, recent posts, newsletter signup
- Search: Prominent search bar in header

### About Me
**Storytelling Flow:**
- Hero: Large portrait image (aspect-[4/5]) + name/tagline (side-by-side on desktop)
- Mission Statement: max-w-3xl centered, large text (text-2xl)
- Journey Timeline: Vertical timeline with alternating left/right content blocks
- Skills: Badge cloud or progress bars, grouped by category
- No traditional centered hero - lead with visual impact

### Contact Page
**Two-Column Split:**
- Left (60%): Contact form with large input fields (h-12 for text, h-32 for textarea)
- Right (40%): Contact info cards, social links (large icons), availability status
- Forms: Generous spacing (space-y-6), clear labels above inputs

### Subscribers Area
**Dashboard Layout:**
- Sidebar Navigation: Tier badge, profile summary, menu items
- Main Content: Card-based layout for exclusive content, progress trackers
- Subscription Tiers: Comparison cards with feature lists, prominent CTA buttons

### Admin Panel
**Functional Dashboard:**
- Top Stats Bar: 4-column metric cards
- Content Management: Table views with action buttons, filters
- Upload Forms: Multi-step wizards with preview panes
- Clean, utilitarian design prioritizing efficiency over aesthetics

## Component Library

**Navigation:**
- Header: Transparent on scroll-top, solid with backdrop-blur on scroll
- Logo/wordmark left, navigation center or right, CTA button far right
- Mobile: Slide-in drawer with large touch targets (min-h-12)

**Cards:**
- Project Cards: Image-dominant with minimal overlay text, hover reveals full title/description
- Article Cards: Thumbnail (aspect-video), title, excerpt (2-3 lines), metadata row
- Rounded corners: rounded-lg to rounded-xl

**Buttons:**
- Primary: Large (h-12 px-8), bold text, full rounded (rounded-full)
- Secondary: Outline variant with border-2
- On Images: backdrop-blur-lg bg-white/10 border border-white/20 - no custom hover states

**Forms:**
- Input fields: h-12, rounded-lg, border-2, px-4
- Focus states: ring-2 offset treatment
- Labels: mb-2, font-medium

**Video Players:**
- Custom controls with play/pause, timeline scrubbing, fullscreen
- Thumbnail preview on hover

**Image Galleries:**
- Horizontal scroll with snap-scroll behavior
- Lightbox modal for full-screen viewing
- Navigation arrows + thumbnail strip

## Images

**Hero Image:** Yes - Full-screen featured project image on homepage opening (min-h-screen), high-quality creative work showcase

**Image Specifications:**
- Homepage Hero: Full-bleed landscape, min 1920x1080, cinematic aspect ratio
- Project Cards: aspect-video (16:9), consistent across grid
- Project Detail Hero: Full-width landscape or cinematic ultra-wide
- Gallery Images: Varied aspects (portraits, squares, panoramas acceptable)
- About Portrait: aspect-[4/5] portrait orientation, professional creative headshot
- Article Thumbnails: aspect-video, consistent sizing
- All images: High resolution, optimized WebP format with fallbacks

**Image Placement:**
- Lead with images, not text-first layouts
- Use images to break up text-heavy sections every 2-3 paragraphs
- Full-bleed treatment for primary project images
- Constrained widths (max-w-4xl) only for supporting images in articles

## Animations

**Minimal, Purposeful Motion:**
- Page transitions: Simple fade-in (200ms)
- Scroll reveals: Subtle opacity + translateY on section entry
- Hover effects: Scale (scale-105) on cards, underline expansion on links
- NO parallax effects, NO complex scroll-triggered animations
- Transition duration: 200-300ms for most interactions

## Accessibility

- Maintain WCAG AA contrast ratios for all text
- Focus visible states on all interactive elements (ring-2 treatment)
- Form inputs with associated labels, error states with clear messaging
- Alt text for all images, aria-labels for icon-only buttons
- Keyboard navigation fully supported across all components