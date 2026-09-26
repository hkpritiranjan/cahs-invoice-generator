import { useEffect, useRef, useState } from "react";

// Lazily reads `key` from localStorage on mount (SSR-safe: starts with
// `initialValue` on the server and during the first client render), then
// persists every subsequent change. Falls back to `initialValue` if the
// stored JSON is missing or corrupted.
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        // Hydration must happen post-mount (not during the lazy initial
        // render) so the server-rendered and first-client-rendered markup
        // match; this one-time effect-driven update is the sanctioned
        // exception to "don't setState in an effect".
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(parsed);
      }
    } catch {
      // Corrupted localStorage entry: keep the initial default value.
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable (private browsing, quota exceeded, etc).
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated];
}
