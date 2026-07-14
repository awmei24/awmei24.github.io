import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { hobbies } from "../../lib/content";

/* Returns true when an rgb(a) string reads as dark, null if fully transparent. */
function colorIsDark(color: string): boolean | null {
  const m = color.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  const alpha = m[4] !== undefined ? Number(m[4]) : 1;
  if (alpha === 0) return null;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

/* Nav text flips to a light tone when the bar sits over a dark section (e.g. the
   contact page) *and* its own cream background hasn't scrolled in yet. */
function useNavOverDark(headerRef: React.RefObject<HTMLElement | null>, menuOpen: boolean) {
  const { scrollY } = useScroll();
  const { pathname } = useLocation();
  const [sectionDark, setSectionDark] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const sampleRef = useRef<() => void>(() => {});

  /* once the cream backdrop is ~half faded-in, the bar reads as light again */
  useMotionValueEvent(scrollY, "change", (y) => setNavSolid(y > 45));

  useEffect(() => {
    function sample() {
      const header = headerRef.current;
      const y = header ? header.getBoundingClientRect().bottom + 4 : 76;
      /* the bar's overlay ends above this point, so we read the section behind */
      let node = document.elementFromPoint(window.innerWidth / 2, y) as HTMLElement | null;
      while (node) {
        const verdict = colorIsDark(getComputedStyle(node).backgroundColor);
        if (verdict !== null) {
          setSectionDark(verdict);
          return;
        }
        node = node.parentElement;
      }
      setSectionDark(false);
    }
    sampleRef.current = sample;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sample();
      });
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headerRef]);

  /* re-sample after navigation, once the page transition has settled */
  useEffect(() => {
    const timers = [80, 450, 850].map((ms) => setTimeout(() => sampleRef.current(), ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return sectionDark && !navSolid && !menuOpen;
}

/* only true sub-pages belong in the dropdown; "writing" is a top-level link */
const hobbySubLinks = hobbies
  .filter((h) => h.path.startsWith("/hobbies/"))
  .map((h) => ({ href: h.path, label: h.label }));

interface NavLink {
  href: string;
  label: string;
  subLinks?: { href: string; label: string }[];
  accent?: boolean;
}

const links: NavLink[] = [
  { href: "/about", label: "about" },
  { href: "/work", label: "work" },
  { href: "/hobbies", label: "hobbies", subLinks: hobbySubLinks },
  { href: "/writing", label: "writing" },
  { href: "/contact", label: "contact", accent: true },
];

const mobileLinks = [
  { href: "/about", label: "about" },
  { href: "/work", label: "work" },
  { href: "/hobbies", label: "hobbies" },
  ...hobbySubLinks.map((s) => ({ ...s, sub: true })),
  { href: "/writing", label: "writing" },
  { href: "/contact", label: "contact" },
];

/* ── Desktop nav item (with optional dropdown) ───────────────────────────── */
function NavItem({ link, overDark }: { link: NavLink; overDark: boolean }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active =
    location.pathname === link.href ||
    link.subLinks?.some((s) => location.pathname === s.href);

  const linkColor = link.accent
    ? "text-clay"
    : active
      ? "text-sage"
      : overDark
        ? "text-cream/90"
        : "text-stone dark:text-sage-light";

  function show() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function hideSoon() {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }

  /* Close only when focus leaves the item entirely (keyboard navigation) */
  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  }

  if (!link.subLinks) {
    return (
      <Link
        to={link.href}
        className={`link-sage font-mono text-xs tracking-[0.06em] transition-colors duration-200 ${linkColor}`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onFocus={show}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      {/* Main link — still navigates to /hobbies */}
      <Link
        to={link.href}
        aria-expanded={open}
        aria-haspopup="true"
        className={`link-sage font-mono text-xs tracking-[0.06em] transition-colors duration-200 flex items-center gap-1 ${linkColor}`}
      >
        {link.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] leading-none opacity-50"
          aria-hidden="true"
        >
          ▾
        </motion.span>
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full left-0 pt-3"
          >
            <div className="flex flex-col gap-0.5 bg-cream/95 dark:bg-night/95 backdrop-blur-md border border-parchment dark:border-night-raised rounded-xl px-3 py-2.5 shadow-sm min-w-[140px]">
              {link.subLinks.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  className={`font-mono text-xs tracking-[0.06em] py-1.5 px-2 rounded-lg link-sage transition-colors duration-150 ${
                    location.pathname === sub.href
                      ? "text-sage"
                      : "text-stone dark:text-sage-light"
                  }`}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
export function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overDark = useNavOverDark(headerRef, menuOpen);

  return (
    <>
      <motion.header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4">
        <motion.div
          className="absolute inset-0 bg-cream/90 dark:bg-night/90 backdrop-blur-md border-b border-parchment/60"
          style={{ opacity: bgOpacity }}
        />

        {/* Logo — logo.png mark + serif wordmark */}
        <Link to="/" className="relative z-10 flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            width={26}
            height={26}
            className="w-[26px] h-[26px] rounded-full object-cover group-hover:opacity-80 transition-opacity duration-200"
          />
          <span
            className={`font-serif text-lg transition-colors duration-300 ${
              overDark ? "text-cream" : "text-ink dark:text-cream"
            }`}
          >
            amanda wang mei
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="relative z-10 hidden sm:flex items-center gap-8" aria-label="Site navigation">
          {links.map((link) => (
            <NavItem key={link.href} link={link} overDark={overDark} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-10 sm:hidden flex flex-col gap-1.5 p-1"
          aria-label={menuOpen ? "close menu" : "open menu"}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className={`w-5 h-px block origin-center transition-colors duration-300 ${overDark ? "bg-cream" : "bg-ink dark:bg-cream"}`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`w-5 h-px block transition-colors duration-300 ${overDark ? "bg-cream" : "bg-ink dark:bg-cream"}`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className={`w-5 h-px block origin-center transition-colors duration-300 ${overDark ? "bg-cream" : "bg-ink dark:bg-cream"}`}
          />
        </button>
      </motion.header>

      {/* Mobile overlay */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.25 }}
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-cream/95 dark:bg-night/95 backdrop-blur-sm flex flex-col justify-center px-8"
      >
        <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
          {mobileLinks.map((link, i) => (
            <motion.div
              key={link.href}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: menuOpen ? i * 0.04 : 0, duration: 0.3 }}
            >
              <Link
                to={link.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className={`link-sage ${"sub" in link && link.sub ? "font-mono text-lg tracking-[0.06em] text-stone dark:text-sage-light pl-4" : "font-serif text-3xl text-ink dark:text-cream"}`}
              >
                {link.label.trim()}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
