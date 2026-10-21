
# Knowbit

**Small bits. Big knowledge.**

Knowbit is a lightweight micro-learning web app that helps you learn one foundational tech concept at a time, in just a few minutes. Every topic is explained in beginner-friendly language, with a real-world analogy.

**Live demo:** [[link here]](https://knowbit-zeta.vercel.app/)

![Knowbit preview](./public/preview.png)

> Add a screenshot at `public/preview.png`, or remove the line above.

## Why Knowbit?

Learning tech can feel overwhelming. Most resources are long, full of jargon, and assume you already know the basics. Knowbit takes the opposite approach: **one concept, a few minutes, plain language.** You either pick an area you are curious about or press **Surprise Me** and let the app choose for you.

## Features

- **50 topics in 5 categories:** Networking, Data, Software Development, Cybersecurity, and AI & Machine Learning (10 topics each).
- **Clear structure for every topic:** *What is it?*, *How does it work?*, *Why do I need to know it?*, plus a real-world analogy and a key takeaway.
- **Surprise Me:** a raffle-style animation that lands on a random topic.
- **Discover another topic:** opens a new topic from the same category you chose.
- **No repeats:** topics you have opened are remembered and left out of future picks.
- **Dark and light mode:** dark by default, the choice is saved.
- **Responsive and accessible:** works on mobile, tablet and desktop, with keyboard support.

## User flow

```
Home ──┬── Choose a category ──┐
       └── Surprise Me ────────┤
                               ▼
                  Pick a random unread topic
                               ▼
                       Topic page (read)
                               ▼
               ┌───────────────┴───────────────┐
               ▼                               ▼
   Discover another topic (same category)     Back to Home
```

## Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- Lucide React (icons)
- Local static data and browser `localStorage`. No database, backend or external APIs.
- Designed in Figma, deployed on Vercel.

## Getting started

Requirements: Node.js 18 or newer.

```bash
git clone https://github.com/MaramAljhadli/knowbit.git
cd knowbit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
├── layout.tsx          # Root layout: font, theme script, header, footer
├── page.tsx            # Home page
├── globals.css         # Dark and light theme colors (CSS variables)
├── surprise/           # Surprise Me page
├── topics/[id]/        # Topic details page
├── components/         # Header, ThemeToggle, CategoryCard, SurpriseWheel,
│                       # NextTopicButton, MarkViewed
├── data/topics.ts      # Categories and all topics
├── lib/topicUtils.ts   # Find, filter and pick topics; viewed history
└── types/topic.ts      # Topic and Category types
```

Each topic has a stable, unique `id` (for example `dns-001`). **Never change an existing ID**, because it is used to remember what a visitor has already read. To add a topic, add a new object to `app/data/topics.ts` with a new ID.

Viewed topics and the theme are stored in the browser under `knowbit:viewedTopics` and `knowbit:theme`. History is kept per browser and is not synced between devices.

## Challenges and solutions

### 1. "Discover another topic" sent users to the Surprise Me page

**Problem:** On a topic page, the **Discover another topic** button took the user to `/surprise` instead of opening another topic. It also did not match the intended flow, where the user should stay in the category they chose.

**Cause:** The button was a plain link (`<Link href="/surprise">`). A link can only go to a fixed address, but the next topic has to be calculated: it must be unread, different from the current one, and from the same category.

**Solution:** The link was replaced with a small client component, `NextTopicButton`. When clicked, it:

1. reads the viewed topics from `localStorage`,
2. opens the chosen topic with `router.push("/topics/<id>")`.

If every topic in the category has been read, it shows a message ("You've explored all topics in this category!") instead of repeating old topics. The topic page passes its own category to the button, so the user always stays in the category they started from, whether they arrived from a category card or from Surprise Me.

### 2. The animation must land on the topic that opens

**Problem:** In Surprise Me, the animation could end on one title while a different topic opened.

**Solution:** The winner is chosen **before** the animation starts. The animation only decides how it looks, and it always stops on that winner. Timers are cleared when the user leaves the page, and the button is disabled while spinning.

### 3. The yellow analogy box did not change in light mode

**Problem:** The analogy box stayed dark when switching to light mode.

**Cause:** Its color variables were defined for the dark theme only, so light mode reused them.

**Solution:** Every color variable is now defined in **both** theme blocks in `globals.css`.

## Future improvements

- **Mark as Learned** button, so the user decides when a topic counts as read.
- **Progress view** showing how many topics have been completed in each category.
- **More topics and categories**, such as Cloud Computing, Web Development and Operating Systems.
- **AI-generated topics:** creating and improving topic content with an AI model instead of a hand-written data file.

## Deployment

The project is deployed on [Vercel](https://vercel.com/). Every push to `main` creates a new deployment.
