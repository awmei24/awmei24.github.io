import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LightboxState {
  images: string[];
  title: string;
  subtitle?: string;
  initialIndex?: number;
}

interface LightboxProps {
  state: LightboxState | null;
  onClose: () => void;
}

export function Lightbox({ state, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {state && <LightboxPanel {...state} onClose={onClose} />}
    </AnimatePresence>
  );
}

/* Mounted only while open, so gallery state resets naturally on close. */
function LightboxPanel({
  images,
  title,
  subtitle,
  onClose,
  initialIndex = 0,
}: LightboxState & { onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const panelRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  /* Keyboard controls + focus trap; lock body scroll and restore focus on close */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        key="lightbox-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col items-center gap-4 max-w-3xl w-full outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-cream text-ink text-sm flex items-center justify-center shadow-md hover:bg-parchment transition-colors"
          aria-label="close"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-parchment shadow-xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${title} — ${index + 1} of ${images.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-h-[70vh] object-contain"
            />
          </AnimatePresence>

          {/* Prev / next */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream/80 text-ink text-xs flex items-center justify-center shadow hover:bg-cream transition-colors"
                aria-label="previous"
              >
                ←
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream/80 text-ink text-xs flex items-center justify-center shadow hover:bg-cream transition-colors"
                aria-label="next"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Caption + dots */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-cream leading-snug">{title}</p>
          {subtitle && <p className="text-xs text-sage-light font-light italic">{subtitle}</p>}
          {images.length > 1 && (
            <div className="flex gap-1.5 mt-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === index ? "bg-sage" : "bg-cream/40"}`}
                  aria-label={`go to image ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
