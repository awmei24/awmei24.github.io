import { motion } from "framer-motion";
import { LeafSprig } from "../decorative/Botanical";
import type { HobbyItem } from "../../lib/content";
import type { LightboxState } from "./Lightbox";
import { springPop } from "../../lib/motion";

interface GalleryCardProps {
  item: HobbyItem;
  /* "preview" = compact card on the hobbies index; "full" = detail-page card */
  variant?: "preview" | "full";
  onOpenLightbox: (state: LightboxState) => void;
}

/* Image card for hobby galleries; opens the lightbox when the item has images. */
export function GalleryCard({ item, variant = "full", onOpenLightbox }: GalleryCardProps) {
  const galleryImages = item.images ?? (item.image ? [item.image] : []);
  const hasGallery = galleryImages.length > 0;
  const thumbnail = item.image ?? item.images?.[0];
  const preview = variant === "preview";

  const imageArea = (
    <div className="aspect-square w-full overflow-hidden rounded-xl bg-parchment dark:bg-night-raised flex items-center justify-center relative">
      {thumbnail ? (
        <>
          <img
            src={thumbnail}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {galleryImages.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-ink/60 text-cream text-[10px] px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              +{galleryImages.length - 1}
            </span>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full opacity-30">
          <LeafSprig size={preview ? 36 : 40} color="var(--color-sage)" />
        </div>
      )}
    </div>
  );

  return (
    <motion.div variants={springPop} className="flex flex-col group">
      {hasGallery ? (
        <button
          type="button"
          onClick={() =>
            onOpenLightbox({ images: galleryImages, title: item.title, subtitle: item.subtitle })
          }
          aria-label={`view images of ${item.title}`}
          className="cursor-pointer text-left rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          {imageArea}
        </button>
      ) : (
        imageArea
      )}

      {preview ? (
        <>
          <p className="text-xs font-medium text-stone mt-2 leading-snug">{item.title}</p>
          {item.date && <p className="font-mono text-[10px] text-sage-light mt-0.5">{item.date}</p>}
        </>
      ) : (
        <div className="mt-3">
          <p className="font-serif text-base text-ink dark:text-cream leading-snug">{item.title}</p>
          {item.subtitle && (
            <p className="font-serif italic text-xs text-stone font-light mt-0.5">{item.subtitle}</p>
          )}
          {item.date && <p className="font-mono text-[10px] text-sage-light mt-1">{item.date}</p>}
        </div>
      )}
    </motion.div>
  );
}
