/**
 * @author Maram Aljhadli
 * @created 2026-10-20
 * @description Reusable functions for reading topics, finding them by ID, tracking viewed topics
 *  in localStorage, and picking a random eligible topic. Keeps selection logic out of the page components.
 */

import { topics } from "../data/topics";
import type { CategoryId, Topic } from "../types/topic";

const STORAGE_KEY = "knowbit:viewedTopics";

// Used when localStorage is unavailable.
let memoryFallback: string[] = [];

export function getAllTopics(): Topic[] {
  return topics;
}

export function getTopicsByCategory(category: CategoryId): Topic[] {
  return topics.filter((topic) => topic.category === category);
}

export function getTopicById(id: string): Topic | undefined {
  return topics.find((topic) => topic.id === id);
}

export function getViewedIds(): string[] {
  if (typeof window === "undefined") return memoryFallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return memoryFallback;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return memoryFallback;
  }
}

export function markViewed(id: string): void {
  if (!getTopicById(id)) return;
  const current = getViewedIds();
  if (current.includes(id)) return;
  const next = [...current, id];
  memoryFallback = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable: the in-memory fallback is used instead.
  }
}

export function filterUnviewed(list: Topic[], viewedIds: string[]): Topic[] {
  return list.filter((topic) => !viewedIds.includes(topic.id));
}

export function pickRandomTopic(list: Topic[], excludeId?: string): Topic | null {
  const eligible = list.filter((topic) => topic.id !== excludeId);
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export function getRandomUnviewedTopic(
  category?: CategoryId,
  excludeId?: string
): Topic | null {
  const pool = category ? getTopicsByCategory(category) : getAllTopics();
  return pickRandomTopic(filterUnviewed(pool, getViewedIds()), excludeId);
}