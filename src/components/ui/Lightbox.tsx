import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  images: string[];
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function Lightbox({ images, title, subtitle, isOpen, onClose, initialIndex = 0 }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, prev, next]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-ink)]/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="lightbox-panel"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex flex-col items-center gap-4 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-[var(--color-cream)] text-[var(--color-ink)] text-sm flex items-center justify-center shadow-md hover:bg-[var(--color-parchment)] transition-colors"
              aria-label="close"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--color-parchment)] shadow-xl">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-cream)]/80 text-[var(--color-ink)] text-xs flex items-center justify-center shadow hover:bg-[var(--color-cream)] transition-colors"
                    aria-label="previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-cream)]/80 text-[var(--color-ink)] text-xs flex items-center justify-center shadow hover:bg-[var(--color-cream)] transition-colors"
                    aria-label="next"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Caption + dots */}
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm font-medium text-[var(--color-cream)] leading-snug">{title}</p>
              {subtitle && <p className="text-xs text-[var(--color-sage-light)] font-light italic">{subtitle}</p>}
              {images.length > 1 && (
                <div className="flex gap-1.5 mt-1">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${i === index ? "bg-[var(--color-sage)]" : "bg-[var(--color-cream)]/40"}`}
                      aria-label={`go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
