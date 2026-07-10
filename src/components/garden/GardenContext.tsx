import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

const CHAPTERS = ["about", "work", "hobbies", "writing", "contact"] as const;
const SECRET_KEY = "awm:garden:secretFound";

interface GardenContextValue {
  /* chapters the visitor has explored this visit — feeds the scroll-garden strip */
  grown: string[];
  secretFound: boolean;
  foundSecret: () => void;
}

const GardenContext = createContext<GardenContextValue>({
  grown: [],
  secretFound: false,
  foundSecret: () => {},
});

/* Shared state for the garden easter eggs. Must render inside the router. */
export function GardenProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [grown, setGrown] = useState<string[]>([]);
  const [secretFound, setSecretFound] = useState(
    () => localStorage.getItem(SECRET_KEY) === "true"
  );

  // derive the explored-chapter list from the route during render
  const segment = location.pathname.split("/")[1];
  const chapter = (CHAPTERS as readonly string[]).includes(segment) ? segment : null;
  if (chapter && !grown.includes(chapter)) {
    setGrown([...grown, chapter]);
  }

  const foundSecret = useCallback(() => {
    setSecretFound(true);
    localStorage.setItem(SECRET_KEY, "true");
  }, []);

  return (
    <GardenContext.Provider value={{ grown, secretFound, foundSecret }}>
      {children}
    </GardenContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGarden() {
  return useContext(GardenContext);
}
