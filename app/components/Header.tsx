/**
 * @author Maram Aljhadli
 * @created 2026-10-19
 * @description Header component that renders the application logo, main navigation, and dark/light theme switch.
 */


import Link from "next/link";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-10">
      <Link href="/" className="flex items-center gap-2 text-[15px] font-bold">
        <Sparkles size={16} className="text-[var(--accent)]" />
        Knowbit
      </Link>

      <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
        <Link href="/">Home</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}