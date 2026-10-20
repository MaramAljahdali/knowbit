/**
 * @author Maram Aljhadli
 * @created 2026-10-20
 * @description TA tiny client component that records a topic as viewed when its page
 *  opens. It renders nothing.
 */


"use client";

import { useEffect } from "react";
import { markViewed } from "../lib/topicUtils";

export default function MarkViewed({ id }: { id: string }) {
  useEffect(() => {
    markViewed(id);
  }, [id]);

  return null;
}