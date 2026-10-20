/**
 * @author Maram Aljhadli
 * @created 2026-10-19
 * @description The main entry page for Knowbit, designed to engage users with a daily tech 
 * quote/call-to-action and present 5 distinct learning categories with icons and descriptions.
 */
import Link from "next/link";
import CategoryCard from "./components/CategoryCard";
import { categories } from "./data/topics";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-8">
      <section className="relative isolate py-14 text-center sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--glow), transparent 70%)",
          }}
        />

        <p className="text-[11px] font-semibold tracking-wider text-[var(--accent)]">
          Small bits. Big knowledge
        </p>

        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          What Should I Learn{" "}
          <span className="text-[var(--accent)]">Today?</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[var(--muted)]">
          Your daily dose of tech knowledge.
        </p>

        <Link
          href="/surprise"
          className="mt-7 inline-block rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#04231A]"
        >
          Surprise Me
        </Link>
      </section>

      <section className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
          />
        ))}
      </section>
    </main>
  );
}