/**
 * @author Maram Aljhadli
 * @created 2026-10-20
 * @description The Surprise Me page. Shows the raffle, then the winning topic with
 *  an Explore button, or an empty state when every topic has been viewed.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SurpriseWheel from "../components/SurpriseWheel";
import { categories } from "../data/topics";
import { filterUnviewed, getAllTopics, getViewedIds } from "../lib/topicUtils";
import type { Topic } from "../types/topic";

const primaryButton =
  "inline-block rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#04231A]";

export default function SurprisePage() {
  const [eligible, setEligible] = useState<Topic[] | null>(null);
  const [winner, setWinner] = useState<Topic | null>(null);

  useEffect(() => {
    setEligible(filterUnviewed(getAllTopics(), getViewedIds()));
  }, []);

  const winnerCategory = winner
    ? categories.find((category) => category.id === winner.category)
    : null;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 text-center sm:px-8">
      <section className="py-14 sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Surprise <span className="text-[var(--accent)]">Me</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
          Press start and let Knowbit pick a topic you have not explored yet.
        </p>
      </section>

      {eligible === null && <p className="text-[var(--muted)]">Loading...</p>}

      {eligible !== null && eligible.length === 0 && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-xl font-semibold">{"You've explored all available topics!"}</p>
          <Link href="/" className={primaryButton}>
            Back to Home
          </Link>
        </div>
      )}

      {eligible !== null && eligible.length > 0 && (
        <div className="flex flex-col items-center gap-8">
          <SurpriseWheel
            eligible={eligible}
            onStart={() => setWinner(null)}
            onFinish={setWinner}
          />

          {winner && (
            <div className="flex flex-col items-center gap-4">
              <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                {winnerCategory?.name}
              </span>
              <h2 className="text-2xl font-bold">{winner.title}</h2>
              <Link href={`/topics/${winner.id}`} className={primaryButton}>
                Explore Topic
              </Link>
            </div>
          )}

          <Link href="/" className="text-sm text-[var(--muted)] underline">
            Back to Home
          </Link>
        </div>
      )}
    </main>
  );
}