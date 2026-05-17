// /app/topics/[id]/page.tsx
// Dynamic topic detail page. Set up: add this file at app/topics/[id]/page.tsx
// Add lib/topics.ts to your project root.
// Each topic is defined in lib/topics.ts — add/edit topics there.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { getTopicById, getRelatedTopics, generateTopicStaticParams } from "@/lib/topics";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body, #root { font-family: 'Outfit', sans-serif; color: #0a2d44; background: #fff; -webkit-font-smoothing: antialiased; }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .container { width: min(1120px, calc(100% - 48px)); margin: 0 auto; }
  .section-kicker { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #17689e; margin-bottom: 14px; }
  .section-kicker-light { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #8bc4e2; margin-bottom: 14px; }
  .section-text { color: #4c6b7f; line-height: 1.85; font-size: 1rem; font-weight: 300; }
  .divider { width: 44px; height: 2px; background: #17689e; border-radius: 999px; margin: 18px 0; }
  .soft-grid { background-image: linear-gradient(rgba(23,104,158,.05) 1px,transparent 1px), linear-gradient(90deg,rgba(23,104,158,.05) 1px,transparent 1px); background-size: 36px 36px; }

  .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 28px; border-radius: 999px; text-decoration: none; font-family: 'Outfit',sans-serif; font-size: .82rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; background: #17689e; color: #fff; box-shadow: 0 12px 30px rgba(23,104,158,.18); transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
  .btn-primary:hover { transform: translateY(-2px); background: #0f557f; }
  .btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 28px; border-radius: 999px; text-decoration: none; font-family: 'Outfit',sans-serif; font-size: .82rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; background: transparent; color: #17689e; border: 1.5px solid rgba(23,104,158,.28); transition: transform .2s ease, border-color .2s ease; }
  .btn-secondary:hover { transform: translateY(-2px); border-color: #17689e; }
  .btn-ghost-light { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 28px; border-radius: 999px; text-decoration: none; font-family: 'Outfit',sans-serif; font-size: .82rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: rgba(255,255,255,.9); border: 1.5px solid rgba(255,255,255,.25); transition: transform .2s ease, border-color .2s ease, background .2s ease; }
  .btn-ghost-light:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.65); background: rgba(255,255,255,.06); }

  /* Hero */
  .topic-hero { background: linear-gradient(160deg, #0a2d44 0%, #17689e 100%); padding: clamp(72px,10vw,110px) 0; position: relative; overflow: hidden; }

  /* Prose */
  .prose { font-family: 'Outfit',sans-serif; font-size: 1.05rem; line-height: 1.9; color: #0a2d44; font-weight: 300; }
  .prose h2 { font-family: 'Cormorant Garamond',serif; font-size: clamp(1.6rem,2.5vw,2.2rem); font-weight: 400; color: #0a2d44; margin: 2.4em 0 .8em; line-height: 1.2; }
  .prose p { margin-bottom: 1.4em; }

  /* Problem card */
  .problem-card { border: 1px solid rgba(23,104,158,.12); background: #f9fcfe; border-radius: 18px; padding: 22px 24px; transition: border-color .2s ease, transform .2s ease; }
  .problem-card:hover { border-color: rgba(23,104,158,.35); transform: translateY(-2px); }

  /* Fact item */
  .fact-item { display: flex; align-items: flex-start; gap: 14px; padding: 16px; border-radius: 14px; background: rgba(23,104,158,.05); }

  /* Related card */
  .related-card { border: 1px solid rgba(23,104,158,.10); background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 6px 20px rgba(10,45,68,.06); text-decoration: none; color: inherit; display: flex; flex-direction: column; transition: transform .25s ease, box-shadow .25s ease; }
  .related-card:hover { transform: translateY(-4px); box-shadow: 0 18px 44px rgba(10,45,68,.12); }

  /* Back link */
  .back-link { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,.75); text-decoration: none; font-size: .82rem; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; transition: color .15s; margin-bottom: 28px; }
  .back-link:hover { color: #fff; }

  /* Tag chip on dark bg */
  .tag-chip-dark { display: inline-flex; align-items: center; padding: 5px 12px; border-radius: 999px; background: rgba(255,255,255,.14); color: rgba(255,255,255,.9); font-size: .72rem; font-weight: 600; letter-spacing: .06em; }

  @media (max-width: 900px) { .split-grid { grid-template-columns: 1fr !important; } .col-3 { grid-template-columns: 1fr 1fr !important; } }
  @media (max-width: 560px) { .container { width: min(100% - 32px, 1120px); } .col-3 { grid-template-columns: 1fr !important; } }
`;

export async function generateStaticParams() {
  return generateTopicStaticParams();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const topic = getTopicById(params.id);
  if (!topic) return { title: "Topic | Melbourne Math Circle" };
  return { title: `${topic.title} | Melbourne Math Circle`, description: topic.description };
}

export default function TopicDetailPage({ params }: { params: { id: string } }) {
  const topic = getTopicById(params.id);
  if (!topic) notFound();

  const related = getRelatedTopics(params.id);

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="topic-hero">
        <div style={{ position: "absolute", right: "-0.04em", bottom: "-0.1em", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(200px,28vw,400px)", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.06)", userSelect: "none", pointerEvents: "none" }}>
          {topic.icon}
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/topics" className="back-link"><ArrowLeft size={14} /> All Topics</Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {topic.tags.map((tag) => <span key={tag} className="tag-chip-dark">#{tag}</span>)}
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(3rem,6vw,5.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 300, color: "#fff", maxWidth: 720, marginBottom: 16 }}>
            {topic.title}
          </h1>
          <div style={{ width: 44, height: 2, background: "rgba(255,255,255,.4)", borderRadius: 999, margin: "18px 0 22px" }} />
          <p style={{ maxWidth: 560, fontSize: "clamp(1rem,1.5vw,1.1rem)", lineHeight: 1.85, color: "rgba(255,255,255,.75)", fontWeight: 300 }}>
            {topic.description}
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, background: "rgba(255,255,255,.1)", padding: "6px 14px", borderRadius: 999, color: "rgba(255,255,255,.85)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
            {topic.level}
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,60px) 0" }}>
        <div className="container">
          <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", aspectRatio: "16/9", borderRadius: 22, overflow: "hidden", boxShadow: "0 24px 64px rgba(10,45,68,.13)", background: "#e7f4fb" }}>
            {topic.image && (
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            )}
          </div>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className="soft-grid" style={{ background: "linear-gradient(180deg,#fff 0%,#f9fcfe 100%)", padding: "clamp(48px,7vw,80px) 0" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="prose">
              {topic.sections.map((sec, i) => (
                <div key={i}>
                  <h2>{sec.heading}</h2>
                  <p>{sec.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY FACTS ── */}
      <section style={{ background: "#eaf4fb", padding: "clamp(56px,8vw,88px) 0" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="section-kicker">Key facts</div>
            <h2 className="serif" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 400, color: "#0a2d44", lineHeight: 1.1, marginBottom: 28 }}>
              Things worth <em style={{ color: "#17689e", fontStyle: "italic" }}>remembering.</em>
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              {topic.keyFacts.map((fact, i) => (
                <div key={i} className="fact-item">
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#17689e", color: "#fff", display: "grid", placeItems: "center", fontSize: ".8rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ color: "#0a2d44", fontSize: ".95rem", lineHeight: 1.7, fontWeight: 300 }}>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section style={{ background: "#fff", padding: "clamp(56px,8vw,88px) 0" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="section-kicker">Try it yourself</div>
            <h2 className="serif" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 400, color: "#0a2d44", lineHeight: 1.1, marginBottom: 28 }}>
              Practice <em style={{ color: "#17689e", fontStyle: "italic" }}>problems.</em>
            </h2>
            <div style={{ display: "grid", gap: 16 }}>
              {topic.problems.map((prob, i) => (
                <div key={i} className="problem-card">
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "#17689e", fontWeight: 700, fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", lineHeight: 1, minWidth: 28 }}>{i + 1}.</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#0a2d44", fontWeight: 500, lineHeight: 1.7, marginBottom: 12 }}>{prob.question}</p>
                      <details style={{ cursor: "pointer" }}>
                        <summary style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#17689e", fontWeight: 600, fontSize: ".8rem", letterSpacing: ".06em", textTransform: "uppercase", listStyle: "none", userSelect: "none" }}>
                          <Lightbulb size={13} /> Show hint
                        </summary>
                        <p style={{ marginTop: 12, color: "#4c6b7f", fontSize: ".9rem", lineHeight: 1.7, fontWeight: 300, background: "#f4f9fc", padding: "12px 16px", borderRadius: 10, borderLeft: "2px solid #17689e" }}>{prob.hint}</p>
                      </details>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <Link href="/fun-math-problems" className="btn-secondary">See more problems <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED TOPICS ── */}
      {related.length > 0 && (
        <section style={{ background: "#f4f9fc", padding: "clamp(56px,8vw,88px) 0" }}>
          <div className="container">
            <div className="section-kicker">Keep exploring</div>
            <h2 className="serif" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 400, color: "#0a2d44", lineHeight: 1.1, marginBottom: 28 }}>
              Related <em style={{ color: "#17689e", fontStyle: "italic" }}>fields.</em>
            </h2>
            <div className="col-3" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(related.length, 3)},1fr)`, gap: 20 }}>
              {related.map((rel) => (
                <Link key={rel.id} href={`/topics/${rel.id}`} className="related-card">
                  <div style={{ position: "relative", aspectRatio: "16/9", background: "#eaf4fb" }}>
                    {rel.image && (
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 400, color: "#0a2d44", marginBottom: 6 }}>{rel.title}</div>
                    <p style={{ color: "#4c6b7f", fontSize: ".86rem", lineHeight: 1.65, fontWeight: 300 }}>{rel.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)", padding: "clamp(72px,10vw,100px) 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-0.04em", bottom: "-0.14em", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(180px,25vw,340px)", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.04)", userSelect: "none", pointerEvents: "none" }}>{topic.icon}</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-kicker-light">Explore in person</div>
          <h2 className="serif" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Discuss <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>{topic.title}</em> with us.
          </h2>
          <p style={{ color: "rgba(255,255,255,.68)", maxWidth: 480, marginTop: 14, lineHeight: 1.85, fontWeight: 300, fontSize: "1rem" }}>
            Our sessions regularly explore topics like this one through collaborative problem-solving.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/join-us" className="btn-primary">Join an event <ArrowRight size={15} /></Link>
            <Link href="/topics" className="btn-ghost-light">All topics</Link>
          </div>
        </div>
      </section>
    </div>
  );
}