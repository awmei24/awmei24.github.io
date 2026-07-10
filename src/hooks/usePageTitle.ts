import { useEffect } from "react";

const SITE_NAME = "amanda wang mei";

/* Keeps the document title in sync with the current page for SEO and tab labels. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}
