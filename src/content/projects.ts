export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  services: string[];
  metrics: { label: string; value: string }[];
  description: string;
  coverImage: string;
  challenge: string;
  solution: string;
  impactDescription: string;
  highlights: string[];
  gallery: string[];
  video?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const servicesData: Service[] = [
  {
    id: "smm",
    title: "Social Media Marketing",
    description: "Architecting high-engagement content architectures that capture eyeballs and trigger purchase behaviors. We grow real audiences, not bot counts.",
    deliverables: ["Platform Strategy", "Content Calendars", "Community Management", "Paid Social Orchestration"],
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "brand",
    title: "Branding",
    description: "Forging iconic identities for brands ready to leave an imprint. We build complete visual guidelines, typography sets, and tone-of-voice frameworks.",
    deliverables: ["Visual Identity Systems", "Brand Strategy", "Guidelines & Playbooks", "Custom Typography & Assets"],
    image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "perf",
    title: "Performance Marketing",
    description: "Hyper-targeted campaigns focused on conversion optimization. We optimize acquisition costs to drive scaling patterns and direct revenue increases.",
    deliverables: ["Paid Search (SEM)", "Funnel Engineering", "Conversion Rate Optimization (CRO)", "Analytics & Attribution"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "content",
    title: "Content Production",
    description: "Premium editorial and cinematic asset production. From high-fashion product shots to engaging short-form narratives, we define the visual standard.",
    deliverables: ["Commercial Ad Production", "Short-Form Video (Reels/TikToks)", "Visual Storytelling", "High-End Styling"],
    image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "web",
    title: "Website Design",
    description: "Immersive digital interfaces crafted with motion and editorial typography. We translate agency standards into responsive WebGL and React builds.",
    deliverables: ["UX/UI Design", "Interactive Mockups", "Responsive Layouts", "Next.js & Tailwind Coding"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "photo",
    title: "Photography & Videography",
    description: "Cinematic scale production. Capturing authentic moments and stylized studio aesthetics that project pure luxury and quality.",
    deliverables: ["Fashion & Product Photography", "Cinematic Commercial Shoots", "Direction & Scripting", "Color Grading & VFX"],
    image: "https://images.unsplash.com/photo-1478720143022-385f704d3b73?q=80&w=800&auto=format&fit=crop"
  }
];

export const caseStudiesData: CaseStudy[] = [
  {
    slug: "triss-salon",
    title: "TRISS Salon",
    subtitle: "Redefining Digital Hair Artistry",
    client: "TRISS Salon & Wellness Group",
    year: "2026",
    services: ["Branding", "Content Production", "Photography", "Social Media"],
    metrics: [
      { label: "Instagram Growth", value: "+320%" },
      { label: "Booking Increase", value: "+45%" },
      { label: "Digital ROI", value: "8.4x" }
    ],
    description: "TRISS, a high-end luxury salon, wanted to shift their physical excellence into a premium, digital brand experience that speaks to high-net-worth clients. We completely overhauled their brand identity, produced high-fashion campaign photography, and built a bespoke editorial booking platform.",
    coverImage: "/images/hero-mockup.jpg",
    challenge: "TRISS Salon operated with exceptional reputation offline, but their digital footprint looked like a generic neighborhood salon. Their social media was static, their website was a basic template, and booking required clunky third-party portals. High-paying clients searching for a premium wellness brand were left uninspired by their digital presentation.",
    solution: "We designed a dark editorial visual narrative, taking styling cues from top fashion houses. We shot a series of cinematic model shoots featuring their signature hair techniques and wellness spaces. We then engineered a Next.js digital experience featuring seamless booking pathways and custom micro-interactions that mimic a high-fashion portfolio.",
    impactDescription: "The transformation established TRISS as the definitive luxury salon in the region. Their social media channels exploded into a source of trend inspiration, and their average ticket value increased by 38% due to the premium positioning. The custom booking interface slashed drop-offs by half.",
    highlights: [
      "Designed and developed a custom booking funnel with direct API integration.",
      "Produced a complete editorial campaign photoshoot including 4K motion assets.",
      "Launched a hyper-targeted organic visual strategy focusing on luxury styling transformations."
    ],
    gallery: [
      "/images/about-aesthetic.jpg",
      "/images/hero-showcase.jpg"
    ],
    video: "/videos/triss-reel.mp4"
  },
  {
    slug: "editorial-photography",
    title: "Editorial Photography",
    subtitle: "High-Fashion Lookbook Campaign",
    client: "Studio Couture New York",
    year: "2025",
    services: ["Photography", "Creative Direction"],
    metrics: [
      { label: "Reach Generated", value: "2.5M+" },
      { label: "Brand Equity", value: "+150%" },
      { label: "Campaign ROI", value: "6.2x" }
    ],
    description: "Capturing high-contrast, black and white fashion lookbooks that articulate minimal silhouettes. We developed the creative direction, model selection, spatial staging, and final grading sequences.",
    coverImage: "/images/rashmeet-concert.jpg",
    challenge: "Fashion houses are flooded with standard catalog imagery. The client needed a striking campaign that emphasizes visual poetry, capturing the essence of fabric textures and raw shadows in an editorial format.",
    solution: "We directed and shot an elevated black-and-white lookbook in a brutalist architectural location. We combined high-exposure strobe setups with slow shutter-speed movements, producing high-fidelity cinematic shots.",
    impactDescription: "The campaign assets were published across top-tier international digital lookbooks, driving massive organic page reach and doubling brand inquiries for the collection within days of launch.",
    highlights: [
      "Art directed a full 3-day model campaign in brutalist coordinates.",
      "Produced 40+ high-resolution, print-ready editorial graphics.",
      "Crafted a looping motion teaser that trended heavily on visual platforms."
    ],
    gallery: [
      "/images/hero-featured.jpg",
      "/images/hero-campaign.jpg"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-in-sunglasses-turning-head-slow-motion-41558-large.mp4"
  },
  {
    slug: "website-design",
    title: "Website Design",
    subtitle: "Immersive WebGL & Motion Architecture",
    client: "Vance Vanguard Holdings",
    year: "2025",
    services: ["UI/UX", "Development"],
    metrics: [
      { label: "Load Velocity", value: "0.4s" },
      { label: "User Session", value: "+110%" },
      { label: "Conversions", value: "4.8%" }
    ],
    description: "Designing and engineering a React-based editorial architecture loaded with custom fluid WebGL transitions and sticky vertical product frames for a luxury brand.",
    coverImage: "/images/hero-showcase.jpg",
    challenge: "Standard templates offer zero emotional resonance. The client wanted a digital presence that feels like flipping through a heavy-paper design magazine, without sacrificing instant loading speeds.",
    solution: "We created a custom Next.js application with a headless CMS. We programmed high-performance GSAP ScrollTrigger pipelines and custom WebGL shaders to create page transitions that glide seamlessly.",
    impactDescription: "The website won structural accolades for its visual accessibility and performance. User session durations doubled, and bounce rates dropped to a historic low of 14%.",
    highlights: [
      "Implemented fully responsive headless CMS data pipes.",
      "Coded custom WebGL shader page wipes and fluid scroll components.",
      "Achieved 99/100 Lighthouse performance metrics for motion web pages."
    ],
    gallery: [
      "/images/hero-mockup.jpg",
      "/images/about-aesthetic.jpg"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-going-down-in-a-glass-elevator-in-a-skyscraper-43405-large.mp4"
  },
  {
    slug: "event-concert-coverage",
    title: "Event & Concert Coverage",
    subtitle: "Cinematic Live Event Storytelling",
    client: "Soundscape Live Productions",
    year: "2026",
    services: ["Photography", "Videography"],
    metrics: [
      { label: "Live Impressions", value: "5M+" },
      { label: "Ticket Sales", value: "+92%" },
      { label: "Video Views", value: "1.8M+" }
    ],
    description: "Capturing high-energy spatial visuals and concert movements. We deployed a multi-camera array to capture raw event moments, editing them into cinematic campaign trailers.",
    coverImage: "/images/hero-campaign.jpg",
    challenge: "Live events are chaotic. Creating content that translates the bass, the lights, and the crowd energy into structured marketing assets requires tactical positioning and elite grading.",
    solution: "We deployed a 4-person production crew with low-light lenses, gimbal rigs, and localized audio capturing arrays. We edited raw clips into a rapid, rhythmic, color-graded campaign trailer.",
    impactDescription: "The post-event recap assets drove viral social sharing, filling registration pools for the next two calendar events within hours of release.",
    highlights: [
      "Captured multi-angle 4K event footage with high-fidelity live audio.",
      "Color graded and edited a 60-second viral recap campaign loop.",
      "Produced 80+ high-dynamic-range crowd and performance shots."
    ],
    gallery: [
      "/images/rashmeet-concert.jpg",
      "/images/hero-featured.jpg"
    ],
    video: "https://assets.mixkit.co/videos/preview/mixkit-crowd-raising-hands-at-a-live-concert-34397-large.mp4"
  }
];

export const processData: ProcessStep[] = [
  {
    step: "01",
    title: "Deconstruct",
    description: "We audit your current audience analytics, brand metrics, and competitor models. We find the curve where standard scrolls end and interest begins.",
    details: "During this phase, we analyze user drop-offs, conduct brand workshops, and set strict performance goals. We identify the core visual assets needed to command attention."
  },
  {
    step: "02",
    title: "Formulate",
    description: "We establish the creative trajectory. Editorial themes, typography structures, asset moodboards, and animation pathways are locked in.",
    details: "We build out wireframes, motion prototypes, and campaign concepts. This ensures everyone aligns on the high-end direction before production begins."
  },
  {
    step: "03",
    title: "Produce",
    description: "We execute the high-fidelity elements. Shooting cinematic video assets, designing visual layouts, and rendering digital structures.",
    details: "Our camera crews and creative designers go to work producing custom imagery, 4K videos, copywriting, and interactive web elements of the highest caliber."
  },
  {
    step: "04",
    title: "Refine",
    description: "We build, polish, and code. Integrating GSAP timelines, optimizing media files, implementing SEO hooks, and testing performance.",
    details: "We convert all code to Next.js layouts, configure smooth Lenis page scrolls, optimize web assets, and check responsiveness on a huge matrix of mobile and desktop displays."
  }
];

export const testimonialsData: Testimonial[] = [
  {
    quote: "The Content Curve changed our agency standard. They didn't just design a website; they created a luxury digital ecosystem that completely redefined how clients perceive us.",
    author: "Elena Rostova",
    role: "Creative Director",
    company: "TRISS Salon & Wellness"
  },
  {
    quote: "Their cinematic storytelling approach transformed our property listings. We closed our largest real estate transaction ever in weeks of launching the new digital portal.",
    author: "Marcus Vance",
    role: "Managing Director",
    company: "Aurum Luxury Properties"
  },
  {
    quote: "Pure craft. The design is modern, the animations are buttery smooth, and the team communicates like a true strategic partner. Our conversion rates are up over 60%.",
    author: "Chef Alan Rossi",
    role: "Founder & Executive Chef",
    company: "Nostra Dining Group"
  }
];
