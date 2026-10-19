/* Boolean flags in localStorage. Storage can throw (private windows, blocked
   site data), so every access is guarded — the easter eggs just forget. */
export function readFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

export function writeFlag(key: string, value: boolean) {
  try {
    if (value) localStorage.setItem(key, "true");
    else localStorage.removeItem(key);
  } catch {
    /* not persisted this visit */
  }
}
