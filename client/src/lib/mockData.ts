import type { User, Project, Article, SubscriptionTierDetails } from "./schema";

// Demo users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@freebirdproductions.com",
    password: "admin123",
    name: "Alex Rivera",
    role: "admin",
    subscriptionTier: "enterprise",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
    role: "subscriber",
    subscriptionTier: "pro",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-06-01T00:00:00Z",
  },
];

// Project categories
export const projectCategories = [
  "All",
  "Film",
  "Photography",
  "Design",
  "Animation",
  "Music",
  "Branding",
];

// Mock projects
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Echoes of Tomorrow",
    slug: "echoes-of-tomorrow",
    category: "Film",
    client: "Independent",
    year: "2024",
    overview: "A cinematic short film exploring the intersection of memory and technology in a near-future society.",
    longDescription: `"Echoes of Tomorrow" is an ambitious short film that delves deep into the human condition through the lens of speculative fiction. Set in a world where memories can be digitally preserved and replayed, the film follows Maya, a memory archivist who discovers an anomaly in the system that challenges everything she believes about reality.

The visual language draws inspiration from neo-noir aesthetics while incorporating warm, nostalgic tones for flashback sequences. Every frame was carefully composed to reflect the emotional state of our protagonist, using color grading techniques that subtly shift as the narrative progresses.

Our team spent six months in pre-production, developing a unique visual style that blends practical effects with minimal CGI enhancements. The score, composed specifically for this project, weaves electronic elements with orchestral arrangements to create an auditory experience that mirrors the film's themes of technological humanity.`,
    tools: ["DaVinci Resolve", "Cinema 4D", "After Effects", "Premiere Pro"],
    featuredImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=1200&h=800&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    knowledgePoints: [
      {
        title: "Color Psychology in Film",
        description: "Learn how we used color theory to enhance emotional storytelling and guide viewer attention through each scene.",
        icon: "palette",
      },
      {
        title: "Practical Lighting Techniques",
        description: "Discover the low-budget lighting setups that created our distinctive neo-noir aesthetic without expensive equipment.",
        icon: "lightbulb",
      },
      {
        title: "Sound Design Principles",
        description: "Explore how we crafted an immersive soundscape using layers of ambient audio, foley, and musical scoring.",
        icon: "volume-2",
      },
    ],
    resources: [
      { title: "Behind the Scenes Documentary", url: "#", type: "video" },
      { title: "Color Grading Preset Pack", url: "#", type: "download" },
      { title: "Production Notes PDF", url: "#", type: "document" },
    ],
    relatedProjectIds: ["2", "5"],
    isFeatured: true,
    isPublished: true,
    createdAt: "2024-10-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Urban Solitude",
    slug: "urban-solitude",
    category: "Photography",
    client: "Gallery Modern",
    year: "2024",
    overview: "A photography series capturing the quiet beauty of city life in the early morning hours.",
    longDescription: `"Urban Solitude" is a year-long photography project documenting the liminal spaces of major cities during the blue hour—that magical time between night and dawn when cities hold their breath before the daily chaos begins.

Shot across twelve cities on four continents, this series explores the universal language of urban emptiness. From Tokyo's neon-lit alleyways to Paris's cobblestone streets, each image tells a story of spaces usually crowded with humanity, now resting in momentary peace.

The technical approach combines long exposures with careful composition to capture both the architectural grandeur and intimate details of urban environments. Post-processing emphasizes the natural blue tones of dawn while maintaining the warmth of artificial lighting.`,
    tools: ["Sony A7R IV", "Lightroom", "Photoshop", "Capture One"],
    featuredImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&h=800&fit=crop",
    ],
    knowledgePoints: [
      {
        title: "Blue Hour Photography",
        description: "Master the technical settings and timing required to capture the perfect blue hour shot in any city.",
        icon: "camera",
      },
      {
        title: "Composition in Urban Spaces",
        description: "Learn to find compelling compositions among the chaos of city architecture and infrastructure.",
        icon: "grid",
      },
    ],
    resources: [
      { title: "Lightroom Preset Collection", url: "#", type: "download" },
      { title: "Location Scouting Guide", url: "#", type: "document" },
    ],
    relatedProjectIds: ["1", "4"],
    isFeatured: true,
    isPublished: true,
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Harmonic Resonance",
    slug: "harmonic-resonance",
    category: "Music",
    client: "Indie Label Records",
    year: "2024",
    overview: "An experimental album blending electronic production with organic instrumentation.",
    longDescription: `"Harmonic Resonance" represents a two-year journey into the intersection of digital and analog sound production. This twelve-track album explores how electronic music can maintain the warmth and humanity often associated with purely acoustic performances.

Each track began as a simple acoustic recording—a guitar riff, a piano melody, or even field recordings from nature—before being transformed through layers of synthesis and processing. The result is music that feels simultaneously futuristic and nostalgic, mechanical and organic.

The production process involved custom-built synthesizers, vintage tape machines, and cutting-edge plugins, all working in harmony to create a unique sonic palette that defines the album's distinct character.`,
    tools: ["Ableton Live", "Pro Tools", "Analog Synths", "Logic Pro"],
    featuredImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&h=1080&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&h=800&fit=crop",
    ],
    knowledgePoints: [
      {
        title: "Hybrid Production Techniques",
        description: "Discover methods for seamlessly blending analog warmth with digital precision in your productions.",
        icon: "music",
      },
      {
        title: "Field Recording Integration",
        description: "Learn how to incorporate environmental sounds into electronic compositions for added depth.",
        icon: "mic",
      },
    ],
    resources: [
      { title: "Sample Pack (500+ Sounds)", url: "#", type: "download" },
      { title: "Production Breakdown Video", url: "#", type: "video" },
    ],
    relatedProjectIds: ["1", "6"],
    isFeatured: false,
    isPublished: true,
    createdAt: "2024-08-15T00:00:00Z",
  },
  {
    id: "4",
    title: "Metamorphosis",
    slug: "metamorphosis",
    category: "Animation",
    client: "Self-Published",
    year: "2024",
    overview: "A hand-drawn animated short exploring themes of personal transformation and growth.",
    longDescription: `"Metamorphosis" is a passion project three years in the making, consisting of over 8,000 individually hand-drawn frames. The animation follows a unnamed protagonist through an abstract journey of self-discovery, using visual metaphor to explore themes of change, fear, and ultimately acceptance.

The visual style deliberately eschews modern digital shortcuts in favor of traditional animation techniques, giving the film a textured, organic quality that reinforces its themes. Each frame was drawn on paper before being scanned and composited digitally.

Color plays a crucial role in the storytelling, with the palette evolving from muted grays at the beginning to vibrant, saturated hues as the character progresses through their transformation. The score, created in collaboration with local musicians, mirrors this progression from discordant to harmonious.`,
    tools: ["Hand Drawing", "After Effects", "Procreate", "TVPaint"],
    featuredImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1080&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1633186223077-8327c5b96633?w=1200&h=800&fit=crop",
    ],
    knowledgePoints: [
      {
        title: "Traditional Animation Workflow",
        description: "An in-depth look at maintaining traditional techniques while leveraging digital tools for efficiency.",
        icon: "pen-tool",
      },
      {
        title: "Color Scripting",
        description: "How to use color evolution as a narrative device throughout your animated projects.",
        icon: "palette",
      },
    ],
    resources: [
      { title: "Character Design Sheets", url: "#", type: "download" },
      { title: "Animation Principles Guide", url: "#", type: "document" },
    ],
    relatedProjectIds: ["1", "5"],
    isFeatured: true,
    isPublished: true,
    createdAt: "2024-07-20T00:00:00Z",
  },
  {
    id: "5",
    title: "Essence Brand Identity",
    slug: "essence-brand-identity",
    category: "Branding",
    client: "Essence Perfumery",
    year: "2023",
    overview: "A complete brand identity system for a luxury artisan perfume house.",
    longDescription: `The Essence brand identity project represents a comprehensive visual language for a new luxury perfume house focused on sustainably-sourced, artisan fragrances. The brief called for elegance with an edge—something that felt premium but not pretentious, sophisticated but approachable.

The logotype draws inspiration from Art Deco typography while maintaining contemporary minimalism. The custom letterforms feature subtle asymmetries that suggest the organic, handcrafted nature of the products. The color palette centers on deep botanical greens and warm golds, evoking both nature and luxury.

Beyond the core identity, the project encompassed packaging design, retail space guidelines, digital presence, and print collateral. Each touchpoint was carefully considered to create a cohesive brand experience that reflects Essence's commitment to quality and sustainability.`,
    tools: ["Illustrator", "Figma", "InDesign", "Dimension"],
    featuredImage: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1920&h=1080&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop",
    ],
    knowledgePoints: [
      {
        title: "Typography as Brand Voice",
        description: "Creating custom letterforms that embody brand personality and values.",
        icon: "type",
      },
      {
        title: "Sustainable Packaging Design",
        description: "Balancing luxury aesthetics with environmentally conscious material choices.",
        icon: "package",
      },
    ],
    resources: [
      { title: "Brand Guidelines PDF", url: "#", type: "document" },
      { title: "Logo Usage Examples", url: "#", type: "download" },
    ],
    relatedProjectIds: ["6", "2"],
    isFeatured: false,
    isPublished: true,
    createdAt: "2023-12-01T00:00:00Z",
  },
  {
    id: "6",
    title: "Digital Dreamscape",
    slug: "digital-dreamscape",
    category: "Design",
    client: "Tech Conference 2024",
    year: "2024",
    overview: "An immersive visual identity system for a major technology conference.",
    longDescription: `"Digital Dreamscape" served as the visual identity for TechForward 2024, a premier technology conference bringing together innovators, entrepreneurs, and thought leaders. The challenge was creating a visual language that felt cutting-edge without relying on clichéd tech tropes.

The design system draws inspiration from generative art and data visualization, using algorithmic patterns that suggest both complexity and beauty in technology. The primary motif—flowing particle systems—was generated through custom code and then refined by hand to ensure each application felt intentional.

The identity extended across signage, mobile apps, merchandise, stage design, and digital assets. The modular system allowed for endless variations while maintaining strong brand recognition throughout the three-day event.`,
    tools: ["Processing", "Figma", "Blender", "After Effects"],
    featuredImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    ],
    knowledgePoints: [
      {
        title: "Generative Design Systems",
        description: "Using code to create flexible, scalable visual identities that maintain consistency.",
        icon: "code",
      },
      {
        title: "Event Branding",
        description: "Creating immersive brand experiences across physical and digital touchpoints.",
        icon: "layout",
      },
    ],
    resources: [
      { title: "Processing Code Library", url: "#", type: "download" },
      { title: "Event Design Case Study", url: "#", type: "document" },
    ],
    relatedProjectIds: ["5", "3"],
    isFeatured: false,
    isPublished: true,
    createdAt: "2024-03-10T00:00:00Z",
  },
];

// Mock articles
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Art of Visual Storytelling: Crafting Narratives Through Imagery",
    slug: "art-of-visual-storytelling",
    excerpt: "Explore how to create compelling visual narratives that captivate audiences and communicate complex ideas through thoughtful composition and design.",
    content: `Visual storytelling is more than just creating pretty pictures—it's about communicating ideas, emotions, and narratives through imagery. In this comprehensive guide, we'll explore the fundamental principles that separate good visual storytelling from great visual storytelling.

## Understanding Visual Hierarchy

The first step in effective visual storytelling is establishing a clear hierarchy. Your audience should immediately understand what's most important in your frame or composition. This is achieved through:

- **Scale and Proportion**: Larger elements draw attention first
- **Contrast**: High contrast areas command focus
- **Color**: Saturated or unique colors pop against neutral backgrounds
- **Position**: Elements in the center or at key intersection points (rule of thirds) receive priority

## The Power of Sequence

Great visual stories unfold over time, whether in a single complex image or across a series. Consider how your viewer's eye will travel through the work. Create pathways using:

- Leading lines
- Repeating elements
- Color progression
- Light and shadow patterns

## Emotional Resonance

Technical skill means nothing without emotional impact. The best visual stories connect with universal human experiences—love, loss, triumph, struggle, wonder. Before creating any visual piece, ask yourself: what do I want my audience to feel?

## Practical Application

Let's examine a real-world example from my recent project "Urban Solitude"...`,
    category: "article",
    tags: ["storytelling", "visual design", "composition", "creativity"],
    featuredImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=600&fit=crop",
    readTime: 12,
    author: "Alex Rivera",
    isPublished: true,
    isPremium: false,
    createdAt: "2024-10-20T00:00:00Z",
  },
  {
    id: "2",
    title: "Mastering Color Grading: From Concept to Execution",
    slug: "mastering-color-grading",
    excerpt: "A deep dive into professional color grading techniques that will transform your footage and establish your unique visual signature.",
    content: `Color grading is often described as the last and most crucial step in the filmmaking process. It's where good footage becomes great cinema. In this tutorial, we'll break down professional color grading from initial concept through final delivery.

## The Psychology of Color

Before touching any tools, understand what colors communicate:

- **Warm tones (reds, oranges, yellows)**: Energy, passion, danger, comfort
- **Cool tones (blues, greens, purples)**: Calm, sadness, professionalism, mystery
- **Desaturated palettes**: Realism, bleakness, sophistication
- **High saturation**: Fantasy, energy, youthfulness

## Technical Foundation

### Understanding Scopes
Your color grading decisions should be informed by technical analysis, not just visual intuition. Learn to read:
- Waveforms for luminance
- Vectorscopes for color balance
- RGB parade for individual channel analysis

### Node-Based vs. Layer-Based
Different tools offer different workflows. DaVinci Resolve's node-based system offers flexibility, while Premiere's Lumetri layers provide simplicity. Master both approaches.

## Building Your Look

Start with correction, then move to creativity:
1. Balance your footage (white balance, exposure)
2. Match shots within scenes
3. Apply primary grade (overall look)
4. Secondary corrections (specific elements)
5. Final polish and refinements

## Project Walkthrough

Let me walk you through my process on "Echoes of Tomorrow"...`,
    category: "tutorial",
    tags: ["color grading", "film", "DaVinci Resolve", "post-production"],
    featuredImage: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&h=600&fit=crop",
    readTime: 18,
    author: "Alex Rivera",
    isPublished: true,
    isPremium: true,
    createdAt: "2024-10-15T00:00:00Z",
  },
  {
    id: "3",
    title: "Quick Tip: The 2-Second Rule for Better Compositions",
    slug: "2-second-rule-compositions",
    excerpt: "A simple technique that will immediately improve your photography and video compositions.",
    content: `Here's a quick tip that transformed my composition work: the 2-second rule.

## The Concept

Before pressing the shutter or hitting record, wait 2 seconds while looking at your frame. In those 2 seconds, your subconscious will reveal problems your conscious mind overlooked:

- That distracting element in the corner
- The slightly crooked horizon
- The missed focus point
- The better angle just to your left

## Why It Works

Our brains are wired to process information quickly—often too quickly. The initial excitement of finding a shot can blind us to imperfections. The 2-second pause forces a micro-reflection that catches these issues before they become problems in post.

## Practice Exercise

Take 20 photos today. For 10, shoot immediately as you normally would. For the other 10, implement the 2-second rule. Compare the results. You'll be surprised.`,
    category: "tip",
    tags: ["composition", "photography", "quick tips", "workflow"],
    featuredImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=600&fit=crop",
    readTime: 3,
    author: "Alex Rivera",
    isPublished: true,
    isPremium: false,
    createdAt: "2024-10-10T00:00:00Z",
  },
  {
    id: "4",
    title: "Building a Sustainable Creative Career",
    slug: "sustainable-creative-career",
    excerpt: "Lessons learned from a decade in the creative industry—how to build a career that lasts without burning out.",
    content: `After ten years in the creative industry, I've learned that talent alone doesn't sustain a career. Here's what does.

## The Burnout Trap

Creative work is emotional work. Every project demands a piece of you. Without boundaries, you'll deplete yourself long before you reach your potential. I learned this the hard way.

## Sustainable Practices

### 1. Separate Creation from Consumption
Dedicate specific times for learning and inspiration. Don't let doom-scrolling disguise itself as research.

### 2. Say No Strategically
Not every project deserves your best work. Some deserve none of your work at all. Learn to identify and decline energy-draining opportunities.

### 3. Build Systems, Not Just Skills
Repeatable processes free mental energy for actual creative problem-solving. Template your admin work, automate what you can, document your workflows.

### 4. Invest in Recovery
Rest isn't the opposite of productivity—it's a prerequisite for it. Schedule downtime like you schedule client meetings.

## The Long Game

Your career is a marathon, not a sprint. The creatives who last decades aren't necessarily the most talented—they're the ones who learned to pace themselves.`,
    category: "article",
    tags: ["career", "burnout", "sustainability", "advice"],
    featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    readTime: 8,
    author: "Alex Rivera",
    isPublished: true,
    isPremium: false,
    createdAt: "2024-10-05T00:00:00Z",
  },
  {
    id: "5",
    title: "Sound Design Fundamentals: Creating Immersive Audio Experiences",
    slug: "sound-design-fundamentals",
    excerpt: "Learn the core principles of sound design that will elevate your video projects from amateur to professional.",
    content: `Sound is half the experience. Yet many visual creators treat audio as an afterthought. Let's change that.

## The Three Layers of Sound

Every well-designed audio landscape consists of three layers:

### 1. Dialogue/Primary Audio
Your main content—the voice, the music, the central sound. This layer carries your message.

### 2. Ambiance/Environment
The sonic "room" your primary audio exists within. Indoor reverb, outdoor atmosphere, environmental sounds.

### 3. Details/Foley
The subtle sounds that make scenes feel real—footsteps, clothing rustle, object interactions.

## Building Your Soundscape

Start with layer 1 and work outward:
1. Clean and process your primary audio
2. Add ambiance that matches your visual environment
3. Layer in details that support the action
4. Balance all elements in the final mix

## Common Mistakes

- **Over-processing dialogue**: Keep it natural
- **Inconsistent ambiance**: Room tone should be continuous
- **Neglecting low end**: Bass adds power and presence
- **Mixing too loud**: Leave headroom for dynamics`,
    category: "tutorial",
    tags: ["sound design", "audio", "production", "film"],
    featuredImage: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=1200&h=600&fit=crop",
    readTime: 15,
    author: "Alex Rivera",
    isPublished: true,
    isPremium: true,
    createdAt: "2024-09-28T00:00:00Z",
  },
  {
    id: "6",
    title: "Quick Tip: The Magic of L-Cuts and J-Cuts",
    slug: "l-cuts-j-cuts-magic",
    excerpt: "Two simple editing techniques that will make your video transitions feel smoother and more professional.",
    content: `If there's one editing technique that separates amateur work from professional productions, it's the strategic use of L-cuts and J-cuts.

## What Are They?

**L-Cut**: Audio from the current clip extends into the next shot
**J-Cut**: Audio from the next clip begins before we see the image

Named for the shape they create in your editing timeline.

## Why They Work

Hard cuts (where audio and video change at the same moment) can feel jarring. L-cuts and J-cuts smooth transitions by giving your audience an audio bridge between scenes.

## When to Use Each

**L-Cuts work great for:**
- Scene transitions where we're leaving emotion behind
- Showing a speaker's effect on listeners
- Creating natural conversation flow

**J-Cuts excel at:**
- Building anticipation for an upcoming scene
- Creating tension or curiosity
- Smoothing into flashbacks or memories

Try incorporating these into your next edit. The difference is immediately noticeable.`,
    category: "tip",
    tags: ["editing", "video", "technique", "quick tips"],
    featuredImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=600&fit=crop",
    readTime: 4,
    author: "Alex Rivera",
    isPublished: true,
    isPremium: false,
    createdAt: "2024-09-20T00:00:00Z",
  },
];

// Subscription tiers
export const subscriptionTiers: SubscriptionTierDetails[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "Access to public articles",
      "Weekly newsletter",
      "Community forum access",
      "Basic project showcases",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 9,
    features: [
      "Everything in Free",
      "Premium tutorials",
      "Downloadable resources",
      "Monthly Q&A sessions",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    features: [
      "Everything in Starter",
      "Exclusive project breakdowns",
      "Behind-the-scenes content",
      "Early access to new content",
      "1-on-1 monthly feedback",
      "Private Discord channel",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    features: [
      "Everything in Pro",
      "Custom consultation calls",
      "Team access (up to 5)",
      "White-label resources",
      "Priority support",
      "Custom content requests",
    ],
  },
];

// Article tags for filtering
export const articleTags = [
  "storytelling",
  "visual design",
  "composition",
  "creativity",
  "color grading",
  "film",
  "DaVinci Resolve",
  "post-production",
  "photography",
  "quick tips",
  "workflow",
  "career",
  "burnout",
  "sustainability",
  "advice",
  "sound design",
  "audio",
  "production",
  "editing",
  "video",
  "technique",
];

// Skills for about page
export const creatorSkills = [
  { category: "Video Production", skills: ["Cinematography", "Directing", "Color Grading", "Editing", "Motion Graphics"] },
  { category: "Photography", skills: ["Landscape", "Portrait", "Street", "Product", "Architectural"] },
  { category: "Audio", skills: ["Sound Design", "Music Production", "Mixing", "Foley", "Voice Recording"] },
  { category: "Design", skills: ["Brand Identity", "UI/UX", "Print Design", "Typography", "Illustration"] },
  { category: "Software", skills: ["DaVinci Resolve", "Premiere Pro", "After Effects", "Figma", "Lightroom", "Ableton Live"] },
];

// Timeline for about page
export const journeyTimeline = [
  {
    year: "2014",
    title: "The Beginning",
    description: "Started creating videos and photography as a hobby while studying design. First camera: a Canon Rebel T3.",
  },
  {
    year: "2016",
    title: "First Client Work",
    description: "Landed first paid gig shooting local business profiles. Realized creative work could be a career, not just a hobby.",
  },
  {
    year: "2018",
    title: "Going Full-Time",
    description: "Left corporate job to pursue creative work full-time. Scary but transformative. Started Free Bird Productions as a solo venture.",
  },
  {
    year: "2020",
    title: "Teaching Journey",
    description: "Launched educational content to share knowledge gained from years of trial and error. First course reached 5,000 students.",
  },
  {
    year: "2022",
    title: "Festival Recognition",
    description: "Short film 'Parallel Lives' selected for three international film festivals. Validation of years of dedicated craft refinement.",
  },
  {
    year: "2024",
    title: "Knowledge Hub Launch",
    description: "Expanded Free Bird Productions into a full knowledge platform, combining projects showcase with in-depth educational resources.",
  },
];

// Social links
export const socialLinks = [
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { name: "YouTube", url: "https://youtube.com", icon: "youtube" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Vimeo", url: "https://vimeo.com", icon: "film" },
];
