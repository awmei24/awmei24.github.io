export interface CaseStudySection {
  label: string;
  body: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  year: string;
  description: string;
  link?: string;
  featured?: boolean;
  caseStudy?: {
    overview?: string;
    sections?: CaseStudySection[];
    images?: string[];
  };
}

export interface Post {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  link?: string;
}

export interface Role {
  company: string;
  title: string;
  period: string;
  notes: string[];
}

export interface HobbyItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  image?: string;
  images?: string[];
  link?: string;
  tags?: string[];
}

export interface HobbyCategory {
  id: string;
  label: string;
  description: string;
  path: string;
  layout: "image" | "post" | "card";
  items: HobbyItem[];
}


/* Canonical outbound links — single source for the footer, contact page, etc. */
export const socials = {
  email: "mailto:amandawangmei.design@gmail.com",
  linkedin: "https://www.linkedin.com/in/amandawangmei/",
  github: "https://github.com/awmei24/",
  instagram: "https://www.instagram.com/amand.amei/",
  bluesky: "https://bsky.app/profile/amandawangmei.bsky.social",
  substack: "https://amandawangmei.substack.com",
};

export const bio = {
  name: "amanda wang mei",
  tagline: "quietly building thoughtful things.",
  intro:
    "designer & engineer turning raw data into things people actually understand — with ceramics, writing, and code on the side.",
  about: [
    "i graduated from mit in 2024 after studying biological engineering and education, earning my teaching license along the way, which deeply influenced how i think about people, empathy, and clarity. learning to teach reinforced the importance of meeting people where they are and designing with intention.‍",
    "i currently work in a mixed role as a data scientist, data engineer, and software engineer, building systems that transform raw information into something usable and meaningful for non-technical audiences. drawing on my engineering and research background, i approach product design through the lens of solving problems. this blend of design, engineering, and research helps me create intuitive, seamless experiences that truly resonate with users.",
    "outside of work, i explore design and creativity through a variety of mediums—writing, drawing, ceramics, code. for me, it’s a privilege to build things in any form, and i’m endlessly curious about how people interpret, feel, and connect with what’s been created.",
  ],
  location: "new york, ny",
  available: true,
};

export const projects: Project[] = [
  {
    id: "social-energy-tracker",
    title: "social energy tracker",
    tagline: "a tool for understanding your own social patterns over time.",
    tags: ["ui/ux design", "data analysis", "self-reflection"],
    year: "apr 2026",
    featured: true,
    description:
      "an introspective journaling app that tracks how social interactions affect your energy—built for introverts and ambiverts who want to understand their own rhythms without judgment.",
  },
  {
    id: "weather-buddy",
    title: "weather buddy",
    tagline: "hyperlocal weather with mood-aware framing.",
    tags: ["react", "api", "visual design"],
    year: "mar 2026",
    featured: true,
    description:
      "a simple weather web app that combines local forecasts using the OpenWeatherAPI with detailed visual designs.",
  },
];

export const posts: Post[] = [
  {
    id: "may-jun-2026",
    title: "may + jun 2026",
    date: "jul 2026",
    readTime: "5 min",
    excerpt: "easily the best months of 2026 so far",
    link: "https://amandawangmei.substack.com/p/may-jun-2026",
  },
  {
    id: "goodbye-la",
    title: "what i'm going to miss about los angeles",
    date: "jun 2026",
    readTime: "5 min",
    excerpt: "no time for goodbyes ... see you soon !",
    link: "https://amandawangmei.substack.com/p/what-im-going-to-miss-about-los-angeles",
  },
  {
    id: "mar-apr-2026",
    title: "mar + apr 2026",
    date: "may 2026",
    readTime: "5 min",
    excerpt: "thrown a bit off balance",
    link: "https://amandawangmei.substack.com/p/mar-apr-2026",
  },
  {
    id: "jan-feb-2026",
    title: "jan + feb 2026",
    date: "march 2026",
    readTime: "5 min",
    excerpt: "making life upgrades this year :))",
    link: "https://amandawangmei.substack.com/p/jan-feb-2026",
  },
];

export const experience: Role[] = [
  {
    company: "terracotta group",
    title: "senior analyst, data analytics & engineering",
    period: "2024 – present",
    notes: [
      "building tools conscious of non-technical user needs", 
      "translating complex data into clear narratives for cross-functional teams",
      "collaborating closely with investments team to identify opportunities and inform strategy",
    ],
  },
  {
    company: "massachusetts institute of technology",
    title: "b.s. biological engineering",
    period: "2020 – 2024",
    notes: ["minors in computer science, education, asian diaspora studies",],
  },
];

export const hobbies: HobbyCategory[] = [
  {
    id: "ceramics",
    label: "ceramics",
    description: "finding stillness in clay.",
    path: "/hobbies/ceramics",
    layout: "image",
    items: [
      { id: "c1", title: "traditional landscape painting series (灵枝)", subtitle: "wheel-thrown, various glazes", date: "2026" },
      { id: "c2", title: "traditional birds series (飞翼)", subtitle: "wheel-thrown, various glazes", date: "2026" },
    ],
  },
  {
    id: "dancing",
    label: "dancing",
    description: "expressing myself through movement.",
    path: "/hobbies/dancing",
    layout: "image",
    items: [
      { id: "d1", title: "random dance classes", subtitle: "epicenter + bzcc, mL, rüts", date: "ongoing" },
      { id: "d2", title: "team choreography", subtitle: "with mit missbehavior", date: "2022-2024" },
      { id: "d4", title: "chinese traditional dance", subtitle: "with mit adt", date: "2020-2024" },
    ],
  },
  {
    id: "writing",
    label: "writing",
    description: "essays, updates, and half-formed thoughts—published on substack.",
    path: "/writing",
    layout: "post",
    /* the two most recent posts, kept in sync with `posts` above */
    items: posts.slice(0, 2).map((post) => ({
      id: `s-${post.id}`,
      title: post.title,
      subtitle: post.excerpt,
      date: post.date,
      link: post.link,
    })),
  },
];

/* Rotating almanac marginalia — one is shown per visit (easter egg #11).*/
export const marginNotes = [
  "on the pottery shelf: not throwing yet, but working on getting a membership at a nearby studio!",
  "the garden grows slowly, and that's okay!",
  "currently reading: 107 days by kamala harris.",
  "note to self: remember to water the plants.",
  "lots of half-formed thoughts included—more welcome!",
];

/* Chapter index — used on homepage to link to each section page */
export const chapters = [
  {
    id: "about",
    path: "/about",
    label: "about",
    description: "who i am, where i've been, what i care about.",
    index: "01",
  },
  {
    id: "work",
    path: "/work",
    label: "work",
    description: "product and engineering case studies.",
    index: "02",
  },
  {
    id: "hobbies",
    path: "/hobbies",
    label: "hobbies",
    description: "a peek into how i spend my time outside of work",
    index: "03",
  },
  {
    id: "writing",
    path: "/writing",
    label: "writing",
    description: "essays, notes, and half-formed thoughts.",
    index: "04",
  },
  {
    id: "contact",
    path: "/contact",
    label: "contact",
    description: "let's talk about something interesting.",
    index: "05",
  },
];
