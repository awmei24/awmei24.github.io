import { Sprout } from "../decorative/Botanical";
import { useGarden } from "../garden/GardenContext";
import { bio, socials } from "../../lib/content";

const footerLinks = (
  ["email", "linkedin", "github", "instagram", "bluesky", "substack"] as const
).map((label) => ({ label, href: socials[label] }));

/* Ink footer band — mono link row left, serif garden sign-off right. */
export function Footer() {
  const { secretFound } = useGarden();

  return (
    <footer className="bg-ink dark:bg-night-raised px-6 md:px-14 py-9">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <nav aria-label="Social links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="font-mono text-[13px] md:text-xs tracking-[0.06em] text-sage-light hover:text-sage transition-colors duration-200 link-sage"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-start sm:items-end gap-1.5">
          <p className="font-serif italic text-sm text-sage flex items-center gap-2">
            {secretFound && (
              <span title="you found the garden" aria-label="you found the garden">
                <Sprout size={16} className="inline-block" />
              </span>
            )}
            designed &amp; built in the garden ✦
          </p>
          <p className="font-mono text-[11px] tracking-[0.06em] text-sage-light/70">
            © 2026 {bio.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
