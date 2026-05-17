"use client";

import MathEquation from "@/components/math-equation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight, Sparkles } from "lucide-react";

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

  .reveal {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity .75s cubic-bezier(0.16,1,0.3,1), transform .75s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.in { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: .08s; }
  .reveal-d2 { transition-delay: .16s; }
  .reveal-d3 { transition-delay: .24s; }
  .reveal-d4 { transition-delay: .32s; }

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
  .btn-primary:hover  { transform: translateY(-2px); background: #0f557f; box-shadow: 0 16px 40px rgba(23,104,158,.25); }
  .btn-secondary { background: transparent; color: #17689e; border: 1.5px solid rgba(23,104,158,.28); }
  .btn-secondary:hover { transform: translateY(-2px); border-color: #17689e; background: rgba(23,104,158,.05); }

  .section-kicker { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #17689e; margin-bottom: 14px; }
  .section-title   { font-size: clamp(2rem,4vw,3.2rem); line-height: 1.12; font-weight: 400; color: #0a2d44; }
  .section-text    { color: #4c6b7f; line-height: 1.85; font-size: 1rem; font-weight: 300; }

  .soft-grid {
    background-image:
      linear-gradient(rgba(23,104,158,.05) 1px, transparent 1px),
      linear-gradient(90deg,rgba(23,104,158,.05) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  .glass-card {
    background: rgba(255,255,255,.76);
    border: 1px solid rgba(255,255,255,.55);
    backdrop-filter: blur(14px);
    box-shadow: 0 18px 60px rgba(10,45,68,.10);
  }
  .divider { width: 44px; height: 2px; background: #17689e; border-radius: 999px; margin: 18px 0; }

  /* Hero */
  .hero-bites {
    min-height: 48vh;
    display: flex; align-items: center;
    background: linear-gradient(160deg, #0a2d44 0%, #17689e 100%);
    position: relative; overflow: hidden;
    padding: clamp(72px,10vw,110px) 0;
  }
  .hero-bites::after {
    content: '∫';
    font-family: 'Cormorant Garamond', serif;
    position: absolute; right: clamp(-10px,2vw,20px); bottom: -0.12em;
    font-size: clamp(200px,28vw,420px); font-weight: 700; line-height: 1;
    color: rgba(255,255,255,.05); pointer-events: none; user-select: none;
  }

  /* Featured bite card */
  .featured-card {
    display: grid; grid-template-columns: 1fr 1fr;
    border: 1px solid rgba(23,104,158,.10);
    background: #fff;
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 20px 60px rgba(10,45,68,.10);
    transition: box-shadow .25s ease;
  }
  .featured-card:hover { box-shadow: 0 28px 80px rgba(10,45,68,.15); }

  /* Bite grid card */
  .bite-card {
    border: 1px solid rgba(23,104,158,.10);
    background: #fff;
    border-radius: 22px; overflow: hidden;
    box-shadow: 0 8px 24px rgba(10,45,68,.06);
    display: flex; flex-direction: column;
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .bite-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(10,45,68,.12); }
  .bite-card-body { padding: 22px; flex: 1; display: flex; flex-direction: column; }

  /* Tag chip */
  .tag-chip {
    display: inline-flex; align-items: center;
    padding: 4px 10px; border-radius: 999px;
    background: #e7f4fb; color: #17689e;
    font-size: .72rem; font-weight: 600; letter-spacing: .05em;
    text-decoration: none;
    transition: background .15s ease;
  }
  .tag-chip:hover { background: #cce8f8; }

  /* Meta row */
  .meta-row { display: flex; align-items: center; gap: 6px; color: #7a9eb0; font-size: .8rem; margin-bottom: 8px; }

  /* Avatar */
  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: #e7f4fb; color: #17689e;
    display: grid; place-items: center;
    font-weight: 700; font-size: .85rem;
  }

  /* Empty state */
  .empty-state {
    text-align: center; padding: 64px 32px;
    border: 1px solid rgba(23,104,158,.10);
    border-radius: 22px; background: #f9fcfe;
  }

  /* Submit CTA */
  .submit-cta {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: clamp(28px,5vw,60px); align-items: center;
  }

  @media (max-width: 900px) {
    .featured-card { grid-template-columns: 1fr !important; }
    .bites-grid    { grid-template-columns: 1fr 1fr !important; }
    .submit-cta    { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 560px) {
    .container  { width: min(100% - 32px, 1120px); }
    .bites-grid { grid-template-columns: 1fr !important; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const mathBites = [
  { id: "fibonacci-sequence",   title: "The Beauty of Fibonacci Sequences",              date: "April 5, 2023",    author: "Alex Chen",       excerpt: "Exploring how this famous sequence appears throughout nature and mathematics, from spiral patterns in sunflowers to the golden ratio.", tags: ["sequences","patterns","golden-ratio"],         image: "/placeholder.svg?height=300&width=500&text=Fibonacci",   equation: "F_n = F_{n-1} + F_{n-2}" },
  { id: "eulers-identity",      title: "Euler's Identity: The Most Beautiful Equation",  date: "March 22, 2023",   author: "Taylor Kim",      excerpt: "A deep dive into the equation that connects five fundamental constants of mathematics in one elegant formula.",                         tags: ["complex-numbers","constants","euler"],         image: "/placeholder.svg?height=300&width=500&text=Euler",       equation: "e^{i\\pi} + 1 = 0" },
  { id: "monty-hall-problem",   title: "The Monty Hall Problem Explained",               date: "March 10, 2023",   author: "Jamie Rodriguez", excerpt: "Why switching doors in this famous probability puzzle actually doubles your chances of winning, contrary to intuition.",               tags: ["probability","puzzles","paradoxes"],           image: "/placeholder.svg?height=300&width=500&text=Monty+Hall",  equation: "P(\\text{win}|\\text{switch}) = \\frac{2}{3}" },
  { id: "prime-numbers",        title: "Prime Numbers: Building Blocks of Mathematics",  date: "February 28, 2023",author: "Jordan Patel",    excerpt: "Exploring the mysteries of prime numbers, their distribution, and why they're crucial for modern cryptography.",                      tags: ["number-theory","primes","cryptography"],      image: "/placeholder.svg?height=300&width=500&text=Primes",      equation: "\\pi(n) \\sim \\frac{n}{\\ln(n)}" },
  { id: "modular-arithmetic",   title: "The Surprising Applications of Modular Arithmetic", date: "February 15, 2023", author: "Alex Chen",   excerpt: "From creating beautiful patterns to securing digital communications, modular arithmetic is everywhere.",                             tags: ["number-theory","applications","cryptography"],image: "/placeholder.svg?height=300&width=500&text=Modular",    equation: "a \\equiv b \\pmod{n}" },
  { id: "four-color-theorem",   title: "The Four Color Theorem",                         date: "January 30, 2023", author: "Taylor Kim",      excerpt: "How a seemingly simple map coloring problem required computational power to solve, changing mathematics forever.",                   tags: ["graph-theory","topology","proofs"],            image: "/placeholder.svg?height=300&width=500&text=Four+Color",  equation: "\\chi(G) \\leq 4" },
  { id: "cantors-diagonal",     title: "Cantor's Diagonal: Infinity Has Different Sizes", date: "January 18, 2023", author: "Jamie Rodriguez",excerpt: "A beautiful proof showing not all infinities are equal, and why the real numbers are 'more infinite' than the naturals.",             tags: ["infinity","set-theory","proofs"],              image: "/placeholder.svg?height=300&width=500&text=Cantor",      equation: "|\\mathbb{R}| > |\\mathbb{N}|" },
  { id: "mandelbrot-set",       title: "The Mandelbrot Set: Infinite Complexity",        date: "January 5, 2023",  author: "Jordan Patel",    excerpt: "How a deceptively simple equation creates one of the most complex and beautiful objects in mathematics.",                              tags: ["fractals","complex-numbers","chaos-theory"],  image: "/placeholder.svg?height=300&width=500&text=Mandelbrot",  equation: "z_{n+1} = z_n^2 + c" },
];

export default function MathBitesPage() {
  useReveal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = mathBites.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTag = selectedTag ? b.tags.includes(selectedTag) : true;
    return matchSearch && matchTag;
  });

  const [featured, ...rest] = filtered;

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="hero-bites">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill reveal" style={{ background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.9)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8fd0ef" }} />
            Student explorations
          </div>
          <h1
            className="serif reveal reveal-d1"
            style={{
              marginTop: 20,
              fontSize: "clamp(3.4rem,7vw,6.5rem)",
              lineHeight: 0.95, letterSpacing: "-0.03em",
              fontWeight: 300, color: "#fff",
            }}
          >
            Math<br />
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>Insights</em>
          </h1>
          <div className="divider reveal reveal-d2" style={{ background: "rgba(255,255,255,.35)", margin: "22px 0 24px" }} />
          <p
            className="reveal reveal-d3"
            style={{ maxWidth: 520, fontSize: "clamp(.95rem,1.5vw,1.1rem)", lineHeight: 1.85, color: "rgba(255,255,255,.75)", fontWeight: 300 }}
          >
            Concise, engaging mathematical explorations written by our students.
          </p>
        </div>
      </section>

      {/* ── SEARCH / FILTER ── */}
      <section className="soft-grid" style={{ background: "#f4f9fc", padding: "clamp(36px,5vw,56px) 0" }}>
        <div className="container">
          <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search articles…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: ".9rem", fontWeight: 300,
                padding: "11px 18px", borderRadius: 999,
                border: "1.5px solid rgba(23,104,158,.18)",
                background: "#fff", color: "#0a2d44", outline: "none",
                minWidth: 220,
              }}
            />
            {["number-theory","fractals","probability","proofs","sequences"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  padding: "7px 14px", borderRadius: 999,
                  border: "1.5px solid",
                  borderColor: selectedTag === tag ? "#17689e" : "rgba(23,104,158,.2)",
                  background: selectedTag === tag ? "#17689e" : "#fff",
                  color: selectedTag === tag ? "#fff" : "#17689e",
                  fontSize: ".76rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all .15s ease",
                }}
              >
                {tag}
              </button>
            ))}
            {(searchTerm || selectedTag) && (
              <button
                onClick={() => { setSearchTerm(""); setSelectedTag(null); }}
                style={{ fontFamily: "'Outfit', sans-serif", background: "none", border: "none", color: "#7a9eb0", fontSize: ".8rem", cursor: "pointer" }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      {featured && (
        <section style={{ background: "#fff", padding: "clamp(64px,9vw,100px) 0" }}>
          <div className="container">
            <div className="section-kicker reveal">Today's brain snack 🍭</div>
            <div className="featured-card reveal reveal-d1" style={{ marginTop: 20 }}>
              <div style={{ position: "relative", minHeight: 320, background: "#e7f4fb" }}>
                <Image src={featured.image || "/placeholder.svg"} alt={featured.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 16, right: 16, background: "#17689e", color: "#fff", padding: "5px 12px", borderRadius: 999, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", display: "flex", alignItems: "center", gap: 6 }}>
                  <Sparkles size={11} /> Featured
                </div>
              </div>
              <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column" }}>
                <div className="meta-row"><Calendar size={13} />{featured.date}</div>
                <h2 className="serif" style={{ fontSize: "clamp(1.6rem,2.6vw,2.4rem)", lineHeight: 1.12, fontWeight: 400, color: "#0a2d44", marginBottom: 14 }}>
                  {featured.title}
                </h2>
                <p className="section-text" style={{ marginBottom: 18 }}>{featured.excerpt}</p>
                <div style={{ marginBottom: 18 }}><MathEquation equation={featured.equation} /></div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {featured.tags.map((tag) => (
                    <button key={tag} onClick={() => setSelectedTag(tag)} className="tag-chip" style={{ fontFamily: "'Outfit', sans-serif", border: "none", cursor: "pointer" }}>
                      #{tag}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", marginBottom: 20 }}>
                  <div className="avatar">{featured.author.charAt(0)}</div>
                  <span style={{ color: "#4c6b7f", fontSize: ".85rem" }}>By {featured.author}</span>
                </div>
                <Link href={`/math-bites/${featured.id}`} className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Read full article <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── GRID ── */}
      <section style={{ background: "#f4f9fc", padding: "clamp(64px,9vw,100px) 0" }}>
        <div className="container">
          <div className="section-kicker reveal">Fresh math treats 🍪</div>
          <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 36 }}>
            More <em style={{ color: "#17689e", fontStyle: "italic" }}>explorations.</em>
          </h2>

          {rest.length > 0 ? (
            <div
              className="bites-grid reveal reveal-d2"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}
            >
              {rest.map((bite) => (
                <div key={bite.id} className="bite-card">
                  <div style={{ position: "relative", aspectRatio: "16/9", background: "#e7f4fb" }}>
                    <Image src={bite.image || "/placeholder.svg"} alt={bite.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="bite-card-body">
                    <div className="meta-row"><Calendar size={12} />{bite.date}</div>
                    <h3 className="serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: "#0a2d44", lineHeight: 1.2, marginBottom: 10 }}>
                      {bite.title}
                    </h3>
                    <p style={{ color: "#4c6b7f", fontSize: ".88rem", lineHeight: 1.7, fontWeight: 300, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {bite.excerpt}
                    </p>
                    <div style={{ marginBottom: 14 }}><MathEquation equation={bite.equation} /></div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                      {bite.tags.slice(0, 2).map((tag) => (
                        <button key={tag} onClick={() => setSelectedTag(tag)} className="tag-chip" style={{ fontFamily: "'Outfit', sans-serif", border: "none", cursor: "pointer" }}>#{tag}</button>
                      ))}
                      {bite.tags.length > 2 && (
                        <span style={{ padding: "4px 10px", borderRadius: 999, background: "#f4f9fc", color: "#7a9eb0", fontSize: ".72rem", fontWeight: 600 }}>+{bite.tags.length - 2}</span>
                      )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="avatar" style={{ width: 26, height: 26, fontSize: ".75rem" }}>{bite.author.charAt(0)}</div>
                        <span style={{ color: "#7a9eb0", fontSize: ".78rem" }}>{bite.author}</span>
                      </div>
                      <Link href={`/math-bites/${bite.id}`} style={{ color: "#17689e", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        Read <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state reveal">
              <p className="section-text" style={{ marginBottom: 20 }}>No articles match your search.</p>
              <button onClick={() => { setSearchTerm(""); setSelectedTag(null); }} className="btn-secondary" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── SUBMIT YOUR OWN ── */}
      <section style={{ background: "#fff", padding: "clamp(72px,10vw,112px) 0", borderTop: "1px solid #e1edf5" }}>
        <div className="container">
          <div className="submit-cta">
            <div>
              <div className="section-kicker reveal">Contribute</div>
              <h2 className="serif section-title reveal reveal-d1">
                Got a cool<br />
                <em style={{ color: "#17689e", fontStyle: "italic" }}>math idea? 💡</em>
              </h2>
              <p className="section-text reveal reveal-d2" style={{ marginTop: 18, maxWidth: 480 }}>
                Your Math Bite could explore an elegant proof, explain a counterintuitive result,
                or connect mathematics to the world around us. We'll help you refine your ideas.
              </p>
              <div className="reveal reveal-d3" style={{ marginTop: 28 }}>
                <a href="mailto:eshan@orlandomathcircle.org" className="btn-primary">
                  Submit your idea <ArrowRight size={15} />
                </a>
              </div>
            </div>
            <div className="reveal reveal-d2" style={{ position: "relative", aspectRatio: "4/3", borderRadius: 22, overflow: "hidden", background: "#e7f4fb" }}>
              <Image src="/placeholder.svg?height=400&width=600&text=Share+Your+Ideas" alt="Submit your idea" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)", padding: "clamp(72px,10vw,100px) 0", position: "relative", overflow: "hidden" }}>
        <div className="serif" style={{ position: "absolute", right: "-0.04em", bottom: "-0.14em", fontSize: "clamp(180px,25vw,340px)", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.04)", userSelect: "none", pointerEvents: "none" }}>
          Δ
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-kicker reveal" style={{ color: "#8bc4e2" }}>Get involved</div>
          <h2 className="serif reveal reveal-d1" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Ready to join<br />
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>the circle?</em>
          </h2>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/join-us" className="btn-primary">Join an event <ArrowRight size={15} /></Link>
            <Link href="/contact" className="btn-secondary" style={{ color: "rgba(255,255,255,.9)", borderColor: "rgba(255,255,255,.22)" }}>Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}