/**
 * @author Maram Aljhadli
 * @created 2026-10-20
 * @description The raffle animation. It picks the winning topic first, cycles through 
 * random titles with gradually slowing timing, then lands on the winner and notifies the parent.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import type { Topic } from "../types/topic";
import { pickRandomTopic } from "../lib/topicUtils";

interface SurpriseWheelProps {
  eligible: Topic[];
  onStart?: () => void;
  onFinish: (topic: Topic) => void;
}

const STEPS = 22;

export default function SurpriseWheel({ eligible, onStart, onFinish }: SurpriseWheelProps) {
  const [display, setDisplay] = useState("?");
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastId = useRef<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function start() {
    if (spinning) return;

    // The winner is chosen BEFORE the animation, so it always matches what opens.
    // If only one topic is left, it may repeat because nothing else is available.
    const winner =
      pickRandomTopic(eligible, lastId.current) ?? pickRandomTopic(eligible);
    if (!winner) return;
    lastId.current = winner.id;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduceMotion ? 0 : STEPS;
    let step = 0;

    setSpinning(true);
    setLanded(false);
    onStart?.();

    const tick = () => {
      step += 1;
      if (step > total) {
        setDisplay(winner.title);
        setSpinning(false);
        setLanded(true);
        onFinish(winner);
        return;
      }
      const random = eligible[Math.floor(Math.random() * eligible.length)];
      setDisplay(random.title);
      timer.current = setTimeout(tick, 60 + step * step * 0.6);
    };

    tick();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        aria-live="polite"
        className={`flex min-h-[7rem] w-full max-w-xl items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-center text-2xl font-extrabold tracking-tight sm:text-4xl ${
          spinning ? "text-[var(--muted)] blur-[1px]" : "text-[var(--text)]"
        }`}
      >
        {display}
      </div>

      <button
        type="button"
        onClick={start}
        disabled={spinning}
        className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#04231A] disabled:opacity-50"
      >
        {spinning ? "Spinning..." : landed ? "Spin again" : "Start"}
      </button>
    </div>
  );
}