/**
 * @author Maram Aljhadli
 * @created 2026-10-19
 * @description A theme toggle button for dark and light modes, saving user preference to localStorage.
 */

"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("knowbit:theme", next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark and light theme"
      className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--accent)]"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}