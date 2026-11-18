import { Fragment, createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export type MotionLevel = "full" | "off";

const STORAGE_KEY = "andres-motion";

const MotionPreferenceContext = createContext<{
  level: MotionLevel;
  setLevel: (level: MotionLevel) => void;
}>({ level: "full", setLevel: () => {} });

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<MotionLevel>("full");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "off" || saved === "full") setLevelState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", level);
  }, [level]);

  const setLevel = useCallback((next: MotionLevel) => {
    setLevelState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <MotionPreferenceContext.Provider value={{ level, setLevel }}>
      <MotionConfig
        reducedMotion={level === "off" ? "always" : "user"}
        {...(level === "off" ? { transition: { duration: 0 } } : {})}
      >
        {/* Remount on change so "off" renders every animated block in its final, static state. */}
        <Fragment key={level}>{children}</Fragment>
      </MotionConfig>
    </MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionPreferenceContext);
}

/** True when animations should play. */
export function useMotionOn() {
  return useMotionPreference().level === "full";
}
