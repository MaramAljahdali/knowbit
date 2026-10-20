/**
 * @author Maram Aljhadli
 * @created 2026-10-20S
 * @description TThe topic details page. Shows the title, definition, analogy, why it matters, 
 * and a key takeaway. Shows a clear not-found state for invalid IDs.
 */
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Lightbulb } from "lucide-react";
import MarkViewed from "../../components/MarkViewed";
import NextTopicButton from "../../components/NextTopicButton";
import { categories } from "../../data/topics";
import { getTopicById } from "../../lib/topicUtils";

const primaryButton =
  "inline-block rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#04231A]";

type PageProps = { params: Promise<{ id: string }> };

async function TopicContent({ params }: PageProps) {
  const { id } = await params;
  const topic = getTopicById(id);

  if (!topic) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Topic not found</h1>
        <p className="mt-3 text-[var(--muted)]">
          This topic does not exist, or the link is incorrect.
        </p>
        <Link href="/" className={`${primaryButton} mt-7`}>
          Back to Home
        </Link>
      </main>
    );
  }

  const category = categories.find((item) => item.id === topic.category);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 sm:px-8">
      <MarkViewed id={topic.id} />

      <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
        <ArrowLeft size={16} />
        Back
      </Link>

      <header className="mt-6">
        <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
          {category?.name}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{topic.title}</h1>
        <p className="mt-3 text-[var(--muted)]">{topic.description}</p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-bold">What is it?</h2>
        <p className="mt-2 leading-relaxed text-[var(--muted)]">{topic.definition}</p>
      </section>

      <section className="mt-8 rounded-xl border border-[var(--callout-border)] bg-[var(--callout-bg)] p-5">
        <h2 className="flex items-center gap-2 text-base font-bold text-[var(--callout-title)]">
          <Lightbulb size={16} />
          Think of it like this
        </h2>
        <p className="mt-2 leading-relaxed text-[var(--muted)]">{topic.analogy}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">How does it work?</h2>
        <p className="mt-2 leading-relaxed text-[var(--muted)]">{topic.howItWorks}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Why do I need to know it?</h2>
        <p className="mt-2 leading-relaxed text-[var(--muted)]">{topic.whyItMatters}</p>
      </section>

      <section className="mt-8 rounded-xl border border-[var(--accent)] bg-[var(--surface-2)] p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
          Key takeaway
        </h2>
        <p className="mt-2 font-semibold">{topic.keyTakeaway}</p>
      </section>

      <nav className="mt-10 flex flex-wrap items-start justify-between gap-3 border-t border-[var(--border)] pt-6">
        <Link href="/" className="py-3 text-sm text-[var(--muted)]">
          Back to Home
        </Link>
        <NextTopicButton currentId={topic.id} category={topic.category} />
      </nav>
    </main>
  );
}

export default function TopicPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={<p className="px-4 py-24 text-center text-[var(--muted)]">Loading...</p>}
    >
      <TopicContent params={params} />
    </Suspense>
  );
}