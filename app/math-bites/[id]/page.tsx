import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPostIds, getPostData } from "@/lib/blog";
import MathContent from "@/components/math-content";
import RelatedPosts from "@/components/related-posts";
import InteractiveGeometryExplorer from "@/components/interactive-geometry-explorer";
import InteractiveNumberTheory from "@/components/interactive-number-theory";
import InteractiveFunctionGraph from "@/components/interactive-function-graph";

// ── Shared design tokens ──────────────────────────────────────────────────────
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body, #root {
    font-family: 'Outfit', sans-serif;
    color: #0a2d44;
    background: #ffffff;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  .container {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
  }

  .pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 14px; border-radius: 999px;
    background: #e7f4fb; color: #17689e;
    font-size: .76rem; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
  }
  .btn-primary, .btn-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 48px; padding: 0 28px; border-radius: 999px;
    text-decoration: none; cursor: pointer; border: none;
    transition: transform .2s ease, background .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
    font-family: 'Outfit', sans-serif;
    font-size: .82rem; font-weight: 700;
    letter-spacing: .09em; text-transform: uppercase; white-space: nowrap;
  }
  .btn-primary  { background: #17689e; color: #fff; box-shadow: 0 12px 30px rgba(23,104,158,.18); }
  .btn-primary:hover  { transform: translateY(-2px); background: #0f557f; }
  .btn-secondary { background: transparent; color: #17689e; border: 1.5px solid rgba(23,104,158,.28); }
  .btn-secondary:hover { transform: translateY(-2px); border-color: #17689e; background: rgba(23,104,158,.05); }

  .section-kicker { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #17689e; margin-bottom: 14px; }
  .section-title   { font-size: clamp(2rem,4vw,3.2rem); line-height: 1.12; font-weight: 400; color: #0a2d44; }
  .section-text    { color: #4c6b7f; line-height: 1.85; font-size: 1rem; font-weight: 300; }

  .divider { width: 44px; height: 2px; background: #17689e; border-radius: 999px; margin: 18px 0; }

  .soft-grid {
    background-image:
      linear-gradient(rgba(23,104,158,.05) 1px, transparent 1px),
      linear-gradient(90deg,rgba(23,104,158,.05) 1px, transparent 1px);
    background-size: 36px 36px;
  }

  /* Hero */
  .hero-detail {
    background: linear-gradient(160deg, #0a2d44 0%, #17689e 100%);
    position: relative; overflow: hidden;
    padding: clamp(72px,10vw,110px) 0 clamp(48px,6vw,72px);
  }
  .hero-detail::after {
    content: attr(data-char);
    font-family: 'Cormorant Garamond', serif;
    position: absolute; right: clamp(-10px,2vw,20px); bottom: -0.12em;
    font-size: clamp(200px,28vw,420px); font-weight: 700; line-height: 1;
    color: rgba(255,255,255,.05); pointer-events: none; user-select: none;
  }

  /* Tag */
  .tag-chip {
    display: inline-flex; align-items: center;
    padding: 5px 12px; border-radius: 999px;
    background: rgba(255,255,255,.14); color: rgba(255,255,255,.9);
    font-size: .72rem; font-weight: 600; letter-spacing: .06em;
    text-decoration: none;
    transition: background .15s ease;
  }
  .tag-chip:hover { background: rgba(255,255,255,.22); }

  /* Article prose */
  .prose-body {
    font-family: 'Outfit', sans-serif;
    font-size: 1.05rem; line-height: 1.9; color: #0a2d44; font-weight: 300;
  }
  .prose-body h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem,2.5vw,2.2rem); font-weight: 400; color: #0a2d44; margin: 2.4em 0 .8em; line-height: 1.2; }
  .prose-body h3 { font-family: 'Outfit', sans-serif; font-size: 1.05rem; font-weight: 700; color: #0a2d44; margin: 2em 0 .6em; letter-spacing: .02em; }
  .prose-body p  { margin-bottom: 1.4em; }
  .prose-body ul, .prose-body ol { margin: 1em 0 1.4em 1.4em; }
  .prose-body li { margin-bottom: .5em; }
  .prose-body blockquote {
    margin: 2em 0; padding: 18px 24px;
    border-left: 3px solid #17689e;
    background: #f4f9fc; border-radius: 0 12px 12px 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-style: italic; color: #0a2d44; line-height: 1.6;
  }
  .prose-body a { color: #17689e; text-decoration: underline; text-decoration-color: rgba(23,104,158,.35); }
  .prose-body a:hover { text-decoration-color: #17689e; }

  /* Interactive section */
  .interactive-wrap {
    background: #f4f9fc;
    border: 1px solid rgba(23,104,158,.12);
    border-radius: 22px; padding: 32px;
    margin-top: 48px;
  }

  /* Author card */
  .author-card {
    display: flex; align-items: center; gap: 16px;
    padding: 24px; border-radius: 18px;
    border: 1px solid rgba(23,104,158,.12);
    background: #f9fcfe;
    margin-top: 48px;
  }
  .author-avatar {
    width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0;
    background: #e7f4fb; color: #17689e;
    display: grid; place-items: center;
    font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600;
  }

  /* Back link */
  .back-link {
    display: inline-flex; align-items: center; gap: 8px;
    color: rgba(255,255,255,.75); text-decoration: none;
    font-size: .82rem; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
    transition: color .15s ease;
  }
  .back-link:hover { color: #fff; }

  /* Meta */
  .meta-row { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,.65); font-size: .85rem; }

  @media (max-width: 560px) {
    .container { width: min(100% - 32px, 1120px); }
  }
`;

export async function generateStaticParams() {
  return getAllPostIds("blog");
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const post = await getPostData(params.id, "blog");
    return { title: `${post.title} | Melbourne Math Circle`, description: post.excerpt };
  } catch {
    return { title: "Math Bite | Melbourne Math Circle", description: "A student-written exploration of a mathematical concept." };
  }
}

export default async function MathBitePage({ params }: { params: { id: string } }) {
  try {
    const post = await getPostData(params.id, "blog");

    const hasGeometry   = post.tags.some((t) => ["geometry","shapes","area","perimeter"].includes(t));
    const hasNumberTheory = post.tags.some((t) => ["number-theory","primes","factors","gcd","lcm"].includes(t));
    const hasFunctions  = post.tags.some((t) => ["functions","graphs","calculus","trigonometry"].includes(t));

    // Pick a decorative character from the title's math tags
    const decorChar = hasGeometry ? "△" : hasNumberTheory ? "∑" : hasFunctions ? "∫" : "∞";

    return (
      <div>
        <style>{FONTS}</style>
        <style>{CSS}</style>

        {/* ── HERO ── */}
        <section className="hero-detail" data-char={decorChar}>
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <Link href="/math-bites" className="back-link" style={{ marginBottom: 28, display: "inline-flex" }}>
              <ArrowLeft size={14} /> Back to Math Bites
            </Link>

            <div className="meta-row" style={{ marginBottom: 16 }}>
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>

            <h1
              className="serif"
              style={{
                fontSize: "clamp(2.6rem,5.5vw,5rem)",
                lineHeight: 1.0, letterSpacing: "-0.02em",
                fontWeight: 300, color: "#fff",
                maxWidth: 840, marginBottom: 24,
              }}
            >
              {post.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.18)", color: "#fff", display: "grid", placeItems: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600 }}>
                {post.author.charAt(0)}
              </div>
              <span style={{ color: "rgba(255,255,255,.8)", fontSize: ".88rem" }}>By {post.author}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {post.tags.map((tag) => (
                <Link key={tag} href={`/math-bites/tag/${tag}`} className="tag-chip">#{tag}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED IMAGE ── */}
        <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0" }}>
          <div className="container">
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 22, overflow: "hidden", boxShadow: "0 20px 60px rgba(10,45,68,.12)" }}>
                <Image
                  src={post.image || "/placeholder.svg?height=600&width=1200&text=Math+Bite"}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLE CONTENT ── */}
        <section className="soft-grid" style={{ background: "linear-gradient(180deg,#fff 0%,#f9fcfe 100%)", padding: "clamp(48px,7vw,80px) 0" }}>
          <div className="container">
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <div className="prose-body">
                <MathContent content={post.content} />
              </div>

              {/* Interactive explorer */}
              {(hasGeometry || hasNumberTheory || hasFunctions) && (
                <div className="interactive-wrap">
                  <div className="section-kicker">Interactive explorer</div>
                  <h2 className="serif" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 400, color: "#0a2d44", marginBottom: 24 }}>
                    Explore the concepts
                  </h2>
                  {hasGeometry && (
                    <div style={{ marginBottom: 32 }}>
                      <div style={{ fontWeight: 600, fontSize: ".9rem", color: "#0a2d44", marginBottom: 14 }}>Geometric Concepts</div>
                      <InteractiveGeometryExplorer />
                    </div>
                  )}
                  {hasNumberTheory && (
                    <div style={{ marginBottom: 32 }}>
                      <div style={{ fontWeight: 600, fontSize: ".9rem", color: "#0a2d44", marginBottom: 14 }}>Number Theory</div>
                      <InteractiveNumberTheory />
                    </div>
                  )}
                  {hasFunctions && (
                    <div>
                      <div style={{ fontWeight: 600, fontSize: ".9rem", color: "#0a2d44", marginBottom: 14 }}>Functions & Graphs</div>
                      <InteractiveFunctionGraph />
                    </div>
                  )}
                </div>
              )}

              {/* Author card */}
              <div className="author-card">
                <div className="author-avatar">{post.author.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".9rem", color: "#0a2d44", marginBottom: 4 }}>About the Author</div>
                  <p style={{ color: "#4c6b7f", fontSize: ".88rem", lineHeight: 1.65, fontWeight: 300 }}>
                    {post.author} is a student at Melbourne High School and a member of the Melbourne Math Circle.
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
                <Link href="/math-bites" className="btn-secondary">
                  <ArrowLeft size={14} /> All articles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED POSTS ── */}
        <section style={{ background: "#eaf4fb", padding: "clamp(64px,9vw,100px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="section-kicker">Keep reading</div>
              <h2 className="serif section-title">
                More <em style={{ color: "#17689e", fontStyle: "italic" }}>math bites.</em>
              </h2>
            </div>
            <RelatedPosts currentPostId={post.id} tags={post.tags} contentType="blog" />
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)", padding: "clamp(72px,10vw,100px) 0", position: "relative", overflow: "hidden" }}>
          <div className="serif" style={{ position: "absolute", right: "-0.04em", bottom: "-0.14em", fontSize: "clamp(180px,25vw,340px)", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.04)", userSelect: "none", pointerEvents: "none" }}>
            {decorChar}
          </div>
          <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
            <div className="section-kicker" style={{ color: "#8bc4e2" }}>Get involved</div>
            <h2 className="serif" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
              Want to explore<br />
              <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>math with us?</em>
            </h2>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
              <Link href="/join-us" className="btn-primary">Join an event <ArrowRight size={15} /></Link>
              <Link href="/contact" className="btn-secondary" style={{ color: "rgba(255,255,255,.9)", borderColor: "rgba(255,255,255,.22)" }}>Contact us</Link>
            </div>
          </div>
        </section>
      </div>
    );
  } catch {
    notFound();
  }
}