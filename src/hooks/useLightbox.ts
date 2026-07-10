import { useState, useCallback } from "react";
import type { LightboxState } from "../components/ui/Lightbox";

/* Owns lightbox open/close state; spread the result into <Lightbox>. */
export function useLightbox() {
  const [state, setState] = useState<LightboxState | null>(null);
  const close = useCallback(() => setState(null), []);
  return { state, open: setState, close };
}
