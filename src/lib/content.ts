import { substackPosts } from "./posts.generated";

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

/* The one ordered link list — footer and contact page both read it */
export const socialLinks = (
  ["email", "linkedin", "github", "instagram", "bluesky", "substack"] as const
).map((label) => ({ label, href: socials[label] }));

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

/* empty until the case studies are written — WorkPage shows a placeholder and HomePage hides "selected work" */
export const projects: Project[] = [];

/* newest first; refresh with `npm run sync:substack` */
export const posts: Post[] = substackPosts;

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
    id: "dev-lab",
    label: "dev lab",
    description: "small experiments and side builds.",
    path: "/hobbies/dev-lab",
    layout: "post",
    items: [
      /* each served from its repo's own github pages site */
      {
        id: "weather-buddy",
        title: "weather buddy",
        subtitle: "a little animated desktop friend that changes with the weather.",
        date: "2026",
        link: "/weather-buddy/",
      },
      {
        id: "a-light-below",
        title: "a light below",
        subtitle: "a slow, quiet text game about a dying lamp, a buried city, and the long way up.",
        date: "2026",
        link: "/a-light-below/",
      },
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
  "currently reading: left on tenth by delia ephron.",
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
