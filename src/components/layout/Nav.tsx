import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import logo from "../../assets/logo.png";
import { hobbies } from "../../lib/content";

const hobbySubLinks = hobbies.map((h) => ({ href: h.path, label: h.label }));

const links = [
  { href: "/about", label: "about" },
  { href: "/work", label: "work" },
  { href: "/hobbies", label: "hobbies", subLinks: hobbySubLinks },
  { href: "/contact", label: "contact" },
];

/* ── Desktop nav item (with optional dropdown) ───────────────────────────── */
function NavItem({ link }: { link: typeof links[number] }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active =
    location.pathname === link.href ||
    link.subLinks?.some((s) => location.pathname === s.href);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }

  if (!link.subLinks) {
    return (
      <Link
        to={link.href}
        className={`link-sage text-sm font-light transition-colors duration-200 ${
          active ? "text-[var(--color-sage)]" : "text-[var(--color-stone)] dark:text-[var(--color-sage-light)]"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main link — still navigates to /hobbies */}
      <Link
        to={link.href}
        className={`link-sage text-sm font-light transition-colors duration-200 flex items-center gap-1 ${
          active ? "text-[var(--color-sage)]" : "text-[var(--color-stone)] dark:text-[var(--color-sage-light)]"
        }`}
      >
        {link.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] leading-none opacity-50"
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
            <div className="flex flex-col gap-0.5 bg-[var(--color-cream)]/95 dark:bg-[var(--color-night)]/95 backdrop-blur-md border border-[var(--color-parchment)] dark:border-[var(--color-night-raised)] rounded-xl px-3 py-2.5 shadow-sm min-w-[140px]">
              {link.subLinks.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  className={`text-xs font-light py-1.5 px-2 rounded-lg link-sage transition-colors duration-150 ${
                    location.pathname === sub.href
                      ? "text-[var(--color-sage)]"
                      : "text-[var(--color-stone)] dark:text-[var(--color-sage-light)]"
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

  const mobileLinks = [
    { href: "/about", label: "about" },
    { href: "/work", label: "work" },
    { href: "/hobbies", label: "hobbies" },
    ...hobbySubLinks.map((s) => ({ href: s.href, label: s.label, sub: true })),
    { href: "/contact", label: "contact" },
  ];

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4">
        <motion.div
          className="absolute inset-0 bg-[var(--color-cream)]/90 dark:bg-[var(--color-night)]/90 backdrop-blur-md border-b border-[var(--color-parchment)]/60"
          style={{ opacity: bgOpacity }}
        />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center group">
          <img
            src={logo}
            alt="amanda wang mei"
            className="h-8 w-auto object-contain group-hover:opacity-75 transition-opacity duration-200"
          />
          <span className="text-base font-light text-[var(--color-stone)] dark:text-[var(--color-sage-light)] ml-2">
            amanda wang mei
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="relative z-10 hidden sm:flex items-center gap-8" aria-label="Site navigation">
          {links.map((link) => (
            <NavItem key={link.href} link={link} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-10 sm:hidden flex flex-col gap-1.5 p-1"
          aria-label={menuOpen ? "close menu" : "open menu"}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-5 h-px bg-[var(--color-ink)] dark:bg-[var(--color-cream)] block origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-px bg-[var(--color-ink)] dark:bg-[var(--color-cream)] block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-5 h-px bg-[var(--color-ink)] dark:bg-[var(--color-cream)] block origin-center"
          />
        </button>
      </motion.header>

      {/* Mobile overlay */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-[var(--color-cream)]/95 dark:bg-[var(--color-night)]/95 backdrop-blur-sm flex flex-col justify-center px-8"
      >
        <nav className="flex flex-col gap-5">
          {mobileLinks.map((link, i) => (
            <motion.div
              key={link.href}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: menuOpen ? i * 0.04 : 0, duration: 0.3 }}
            >
              <Link
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-light text-[var(--color-ink)] dark:text-[var(--color-cream)] link-sage ${"sub" in link && link.sub ? "text-xl text-[var(--color-stone)] pl-4" : "text-3xl"}`}
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
