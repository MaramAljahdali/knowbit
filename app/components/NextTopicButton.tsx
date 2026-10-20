/**
 * @author Maram Aljhadli
 * @created 2026-10-20
 * @description A client component button that lets users discover and navigate 
 * to another random unviewed topic within the same category, showing a helpful 
 * message if all topics in the category have already been explored.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomUnviewedTopic } from "../lib/topicUtils";
import type { CategoryId } from "../types/topic";

interface NextTopicButtonProps {
  currentId: string;
  category: CategoryId;
}

export default function NextTopicButton({ currentId, category }: NextTopicButtonProps) {
  const router = useRouter();
  const [empty, setEmpty] = useState(false);

  function openNext() {
    const topic = getRandomUnviewedTopic(category, currentId);
    if (!topic) {
      setEmpty(true);
      return;
    }
    router.push(`/topics/${topic.id}`);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={openNext}
        className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#04231A]"
      >
        Discover another topic
      </button>
      {empty && (
        <small className="text-xs text-[var(--accent)]">
          {"You've explored all topics in this category!"}
        </small>
      )}
    </div>
  );
}