import { Sprout } from "../decorative/Botanical";
import { useGarden } from "../garden/GardenContext";

const footerLinks = [
  { label: "email", href: "mailto:amandawangmei.design@gmail.com" },
  { label: "linkedin", href: "https://www.linkedin.com/in/amandawangmei/" },
  { label: "github", href: "https://github.com/awmei24/" },
  { label: "instagram", href: "https://www.instagram.com/amand.amei/" },
  { label: "bluesky", href: "https://bsky.app/profile/amandawangmei.bsky.social" },
  { label: "substack", href: "https://amandawangmei.substack.com" },
];

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
              className="font-mono text-xs tracking-[0.06em] text-sage-light hover:text-sage transition-colors duration-200 link-sage"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="font-serif italic text-sm text-sage flex items-center gap-2">
          {secretFound && (
            <span title="you found the garden" aria-label="you found the garden">
              <Sprout size={16} className="inline-block" />
            </span>
          )}
          designed &amp; built in the garden ✦
        </p>
      </div>
    </footer>
  );
}
