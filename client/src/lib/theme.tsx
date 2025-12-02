import { type ReactNode, useEffect } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Always apply dark theme
    const root = document.documentElement;
    root.classList.add("dark");
  }, []);

  return <>{children}</>;
}
