/**
 * @author Maram Aljhadli
 * @created 2026-10-20
 * @description A clickable category card with an icon, name and description. Opens a 
 * random unviewed topic from its category, or shows a message if all topics there have been viewed.
 */


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Network,
  Database,
  Code,
  ShieldCheck,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "../types/topic";
import { getRandomUnviewedTopic } from "../lib/topicUtils";

const icons: Record<CategoryId, LucideIcon> = {
  networking: Network,
  data: Database,
  "software-development": Code,
  cybersecurity: ShieldCheck,
  "ai-ml": Cpu,
};

interface CategoryCardProps {
  id: CategoryId;
  name: string;
  description: string;
}

export default function CategoryCard({ id, name, description }: CategoryCardProps) {
  const router = useRouter();
  const [allViewed, setAllViewed] = useState(false);
  const Icon = icons[id];

  function openTopic() {
    const topic = getRandomUnviewedTopic(id);
    if (!topic) {
      setAllViewed(true);
      return;
    }
    router.push(`/topics/${topic.id}`);
  }

  return (
    <button
      type="button"
      onClick={openTopic}
      className="flex flex-col gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <span className="mb-1 grid h-8 w-8 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
        <Icon size={16} />
      </span>
      <b className="text-sm">{name}</b>
      <small className="text-xs leading-snug text-[var(--muted)]">{description}</small>
      {allViewed && (
        <small className="text-xs font-semibold text-[var(--accent)]">
          All topics explored
        </small>
      )}
    </button>
  );
}