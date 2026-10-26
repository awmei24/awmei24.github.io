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

/* Copy still waiting on amanda starts with this marker; anything that renders it
   checks isTodo() and hides itself, so a placeholder never ships. */
export const TODO = "TODO(amanda)";
export const isTodo = (value: string | undefined) => !value || value.startsWith(TODO);

export const bio = {
  name: "amanda wang mei",
  /* shown under the name in the home hero, e.g. the job title you're applying for */
  role: "software engineer and product designer",
  tagline: "quietly building thoughtful things.",
  intro:
    "i build data tools for people who don't code. \noff the clock: clay, essays, and small games.",
  about: [
    "i graduated from mit in 2024 after studying biological engineering and education, earning my teaching license along the way, which deeply influenced how i think about people, empathy, and clarity. learning to teach reinforced the importance of meeting people where they are and designing with intention.‍",
    "i currently work in a mixed role as a data scientist, data engineer, and software engineer, building systems that transform raw information into something usable and meaningful for non-technical audiences. drawing on my engineering and research background, i approach product design through the lens of solving problems. in a previous role, i designed and implemented an internal automated underwriting tool for CRE lending, improving efficiency for investments team members in the due diligence process.",
    "outside of work, i explore design and creativity through a variety of mediums—writing, drawing, ceramics, code. for me, it’s a privilege to build things in any form, and i’m endlessly curious about how people interpret, feel, and connect with what’s been created.",
  ],
  location: "new york, ny",
  available: true,
};

/* WorkPage shows a placeholder and HomePage hides "selected work" while this is empty */
export const projects: Project[] = [
  {
    id: "social-energy-tracker",
    featured: true,
    year: "2026",
    title: "social energy tracker",
    tagline: "a tool for understanding your own social patterns over time.",
    description:
      "a mobile self-tracking app for young professionals: log a social interaction in under 10 seconds, then see which kinds drain or restore your energy.",
    tags: ["ui/ux design", "data analysis", "self-reflection", "react", "capacitor"],
  },
];

/* newest first; refresh with `npm run sync:substack` */
export const posts: Post[] = substackPosts;

export const experience: Role[] = [
  {
    company: "tidalwave",
    title: "software engineer",
    period: "2026 - present",
    notes: [
      "building AI-powered mortgage experiences around borrower and lending-team needs",
      "turning complex financial documents and underwriting requirements into clear, actionable next steps",
      "creating and using AI evaluations and product feedback to identify gaps and improve the lending experience",
    ],
  },
  {
    company: "terracotta group",
    title: "senior analyst, data analytics & engineering",
    period: "2024 – 2026",
    notes: [
      "designed mockups and created working prototypes of internal automated underwriting system for national CRE lending",
      "built tools conscious of non-technical user needs", 
      "translated complex data into clear narratives for cross-functional teams",
      "collaborated closely with investments team to identify opportunities and inform strategy",
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
      { id: "koi", title: "traditional koi fish series (鲤跃)", subtitle: "wheel-thrown, underglazed", date: "oct 2026" },
      { id: "qipao", title: "traditional qipao series (缝鬓)", subtitle: "wheel-thrown, underglazed", date: "sept 2026" },
      { id: "bird", title: "traditional birds series (飞翼)", subtitle: "wheel-thrown, underglazed", date: "may 2026" },
      { id: "landscape", title: "traditional landscape painting series (灵枝)", subtitle: "wheel-thrown, underglazed or various glazes", date: "apr 2026" },
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
    description: "essays and drafts, published on substack.",
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

/* What the site actually shows: gallery items without a photo are hidden, and a gallery
   category with no photos at all is hidden entirely (pages, cards, nav). Add an `image`
   or `images` to an item and it reappears. */
const hasPhoto = (item: HobbyItem) => Boolean(item.image || item.images?.length);
export const visibleHobbies: HobbyCategory[] = hobbies
  .map((c) => (c.layout === "image" ? { ...c, items: c.items.filter(hasPhoto) } : c))
  .filter((c) => c.items.length > 0);

/* Rotating almanac marginalia — one is shown per visit (easter egg #11).*/
export const marginNotes = [
  "on the pottery shelf: vases and useful home trinkets",
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
    description: "essays, notes, and drafts.",
    index: "04",
  },
  {
    id: "contact",
    path: "/contact",
    label: "contact",
    description: "tell me about something you made.",
    index: "05",
  },
];
