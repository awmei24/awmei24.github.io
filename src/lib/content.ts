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


export const bio = {
  name: "amanda wang mei",
  tagline: "quietly building thoughtful things.",
  about: [
    "i graduated from mit in 2024 after studying biological engineering and education, earning my teaching license along the way, which deeply influenced how i think about people, empathy, and clarity. learning to teach reinforced the importance of meeting people where they are and designing with intention.‍",
    "i currently work in a mixed role as a data scientist, data engineer, and software engineer, building systems that transform raw information into something usable and meaningful for non-technical audiences. drawing on my engineering and research background, i approach product design through the lens of solving problems. this blend of design, engineering, and research helps me create intuitive, seamless experiences that truly resonate with users.",
    "outside of work, i explore design and creativity through a variety of mediums—writing, drawing, ceramics, code. for me, it’s a privilege to build things in any form, and i’m endlessly curious about how people interpret, feel, and connect with what’s been created.",
  ],
  location: "los angeles, ca",
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
    notes: ["minor in computer science, education",],
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
    items: [
      {
        id: "s-mar-apr-2026",
        title: "mar + apr 2026",
        subtitle: "thrown a bit off balance",
        date: "may 2026",
        link: "https://amandawangmei.substack.com/p/mar-apr-2026",
      },
      {
        id: "s-jan-feb-2026",
        title: "jan + feb 2026",
        subtitle: "making life upgrades this year :))",
        date: "march 2026",
        link: "https://amandawangmei.substack.com/p/jan-feb-2026",
      },
    ],
  },
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
