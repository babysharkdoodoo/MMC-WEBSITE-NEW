"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const MARQUEE_ITEMS = [
  "Problem Solving", "Student-Led", "Math Competitions", "Creative Thinking",
  "Collaborative Workshops", "Community Impact", "Mathematical Exploration", "Melbourne, FL",
  "Problem Solving", "Student-Led", "Math Competitions", "Creative Thinking",
  "Collaborative Workshops", "Community Impact", "Mathematical Exploration", "Melbourne, FL",
];

const STATS = [
  { val: "100+", label: "Students reached" },
  { val: "20+", label: "Events hosted" },
  { val: "100+", label: "Volunteer hours" },
  { val: "95%", label: "Student satisfaction" },
];

const FEATURES = [
  { num: "01", title: "Deep problem solving", text: "We focus on ideas that stretch thinking, not just quick answers." },
  { num: "02", title: "Student-led", text: "Students help guide the experience and shape the community." },
  { num: "03", title: "Free events", text: "No cost to attend, with open access for local students." },
  { num: "04", title: "Melbourne-based", text: "Built for the Brevard County area and the surrounding student community." },
];

const STEPS = [
  "Short introductions to the idea of the day",
  "Guided problem-solving in small groups",
  "Discussion, sharing, and different solution paths",
  "A closing takeaway students can reuse later",
];

export default function HomePage() {
  useReveal();

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>
      <style>{`

        /* ── HERO ─────────────────────────────────────────────── */
        .hero-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(32px,5vw,60px) 0 0;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 70% 0%, rgba(23,104,158,.07) 0%, transparent 55%),
            linear-gradient(180deg, #f7fbfe 0%, #fff 100%);
        }
        .hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero-title {
          font-size: clamp(4.2rem, 11vw, 11rem);
          line-height: 0.88;
          letter-spacing: -0.045em;
          font-weight: 300;
          color: #0a2d44;
          margin: clamp(24px,4vw,44px) 0 0;
        }
        .hero-bottom-bar {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(20px,4vw,56px);
          align-items: end;
          border-top: 1px solid #cfe3ef;
          margin-top: clamp(24px,4vw,44px);
          padding: clamp(20px,3vw,32px) 0 clamp(32px,5vw,56px);
        }
        .hero-desc {
          font-size: clamp(1rem, 1.5vw, 1.1rem);
          line-height: 1.85;
          color: #4c6b7f;
          font-weight: 300;
          max-width: 480px;
        }
        .hero-cta-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          flex-shrink: 0;
        }

        /* ── STATS STRIP ──────────────────────────────────────── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #17689e;
        }
        .stats-cell {
          padding: clamp(22px,3.5vw,38px) clamp(22px,3vw,36px);
          border-right: 1px solid rgba(255,255,255,.14);
          transition: background .2s;
        }
        .stats-cell:last-child { border-right: none; }
        .stats-cell:hover { background: rgba(255,255,255,.05); }
        .stats-val {
          font-size: clamp(2.6rem, 4.5vw, 4rem);
          color: #fff;
          line-height: 1;
          font-weight: 300;
          letter-spacing: -0.035em;
        }
        .stats-label {
          font-size: .72rem;
          color: rgba(255,255,255,.6);
          letter-spacing: .1em;
          text-transform: uppercase;
          font-weight: 600;
          margin-top: 10px;
        }

        /* ── MISSION ──────────────────────────────────────────── */
        .mission-shell {
          background: #fff;
          padding: clamp(72px,10vw,120px) 0;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(40px,7vw,96px);
          align-items: start;
        }
        .mission-sticky {
          position: sticky;
          top: 88px;
        }
        .mission-quote {
          font-size: clamp(1.7rem,3vw,2.9rem);
          font-weight: 300;
          color: #0a2d44;
          line-height: 1.2;
          font-style: italic;
          margin: 0 0 28px;
        }

        /* ── FEATURES TABLE ───────────────────────────────────── */
        .features-shell {
          background: #f4f9fc;
          padding: clamp(72px,10vw,112px) 0;
        }
        .features-header {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(40px,7vw,96px);
          align-items: end;
          margin-bottom: clamp(28px,4vw,48px);
        }
        .feature-row {
          display: grid;
          grid-template-columns: 52px 1fr 2fr;
          gap: clamp(16px,2.5vw,36px);
          align-items: baseline;
          padding: clamp(18px,2.5vw,28px) 0;
          border-bottom: 1px solid #cfe3ef;
        }
        .feature-row:first-of-type { border-top: 1px solid #cfe3ef; }
        .feature-num {
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .14em;
          color: #17689e;
          padding-top: 2px;
        }
        .feature-name {
          font-size: 1rem;
          font-weight: 700;
          color: #0a2d44;
          line-height: 1.4;
        }
        .feature-desc {
          font-size: .95rem;
          color: #4c6b7f;
          line-height: 1.72;
          font-weight: 300;
        }

        /* ── HOW IT WORKS ─────────────────────────────────────── */
        .steps-shell {
          background: #fff;
          padding: clamp(72px,10vw,118px) 0;
        }
        .steps-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px,5vw,64px);
          align-items: end;
          margin-bottom: clamp(28px,4vw,48px);
        }
        .steps-tiles {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 3px;
        }
        .step-tile {
          padding: clamp(22px,3vw,36px);
          background: #eaf4fb;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .step-tile:nth-child(even) { background: #f4f9fc; }
        .step-big {
          font-size: clamp(3.5rem,6vw,6rem);
          font-weight: 300;
          color: rgba(23,104,158,.14);
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .step-body {
          font-size: .93rem;
          color: #4c6b7f;
          line-height: 1.72;
          font-weight: 300;
        }

        /* ── VIDEO ────────────────────────────────────────────── */
        .video-shell {
          background: #0a2d44;
          padding: clamp(64px,9vw,104px) 0;
        }
        .video-inner {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: clamp(32px,5vw,64px);
          align-items: center;
        }
        .video-meta-title {
          font-size: clamp(1.6rem,2.8vw,2.6rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.18;
        }

        /* ── QUOTE ────────────────────────────────────────────── */
        .quote-shell {
          background: #fff;
          padding: clamp(72px,9vw,108px) 0;
          border-top: 1px solid #e1edf5;
          border-bottom: 1px solid #e1edf5;
        }
        .quote-layout {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(16px,2.5vw,28px);
          align-items: start;
          max-width: 920px;
        }
        .quote-glyph {
          font-size: clamp(5rem,9vw,9rem);
          color: #d0e8f4;
          line-height: .7;
          font-weight: 300;
          user-select: none;
          flex-shrink: 0;
        }
        .quote-body {
          font-size: clamp(1.45rem,2.6vw,2.3rem);
          font-weight: 300;
          color: #0a2d44;
          line-height: 1.38;
          font-style: italic;
        }
        .quote-attr {
          margin-top: 20px;
          font-size: .74rem;
          font-weight: 700;
          letter-spacing: .13em;
          text-transform: uppercase;
          color: #17689e;
        }

        /* ── RESPONSIVE ───────────────────────────────────────── */
        @media (max-width: 960px) {
          .mission-grid    { grid-template-columns: 1fr; }
          .mission-sticky  { position: static; }
          .features-header { grid-template-columns: 1fr; }
          .steps-header    { grid-template-columns: 1fr; }
          .video-inner     { grid-template-columns: 1fr; }
          .steps-tiles     { grid-template-columns: 1fr 1fr; }
          .stats-strip     { grid-template-columns: 1fr 1fr; }
          .stats-cell:nth-child(2) { border-right: none; }
        }
        @media (max-width: 600px) {
          .hero-bottom-bar { grid-template-columns: 1fr; }
          .hero-cta-stack  { align-items: flex-start; flex-direction: row; flex-wrap: wrap; }
          .feature-row     { grid-template-columns: 40px 1fr; row-gap: 4px; }
          .feature-desc    { grid-column: 2; }
          .steps-tiles     { grid-template-columns: 1fr; }
          .stats-strip     { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-shell soft-grid">
        <div
          className="serif bg-letter hide-mobile"
          aria-hidden="true"
          style={{ top: "14%", right: "-1%", fontSize: "clamp(220px,26vw,420px)", color: "#e8f4fb" }}
        >
          M
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-top reveal">
            <div className="pill" style={{ margin: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#17689e" }} />
              A chapter of Orlando Math Circle
            </div>
            <span style={{
              fontSize: ".72rem", fontWeight: 700, letterSpacing: ".13em",
              textTransform: "uppercase", color: "#17689e",
            }}>
              Melbourne, FL
            </span>
          </div>

          <h1 className="serif hero-title reveal reveal-d1">
            Melbourne<br />
            <em style={{ color: "#17689e", fontStyle: "italic" }}>Math</em> Circle
          </h1>

          <div className="hero-bottom-bar reveal reveal-d2">
            <p className="hero-desc">
              Igniting mathematical curiosity through interactive events,
              collaborative problem-solving, and the joy of discovery.
              Free and open to all students.
            </p>
            <div className="hero-cta-stack">
              <Link href="/join-us" className="btn-primary">
                Join our next event <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-secondary">
                Our mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div className="marquee-wrap" style={{ background: "#17689e", padding: "14px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={`${item}-${i}`}
              style={{
                color: "rgba(255,255,255,.92)",
                fontSize: ".78rem", fontWeight: 600,
                letterSpacing: ".11em", textTransform: "uppercase",
                padding: "0 30px", display: "inline-flex",
                alignItems: "center", gap: 28, whiteSpace: "nowrap",
              }}
            >
              {item}
              <span style={{ opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS STRIP ──────────────────────────────────── */}
      <div className="stats-strip">
        {STATS.map((s, i) => (
          <div key={i} className={`stats-cell reveal reveal-d${i + 1}`}>
            <div className="serif stats-val">{s.val}</div>
            <div className="stats-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="mission-shell">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-sticky reveal">
              <div className="section-kicker">Our mission</div>
              <div className="divider" />
              <blockquote className="serif mission-quote">
                Transforming mathematics from something students endure into something they seek out.
              </blockquote>
              <Link href="/about" className="btn-secondary" style={{ display: "inline-flex" }}>
                Our story <ArrowRight size={16} />
              </Link>
            </div>

            <div>
              <p className="section-text reveal" style={{ marginBottom: 20 }}>
                Melbourne Math Circle started after students attended Orlando Math Circle events and came back
                more curious, more confident, and more willing to sit with hard problems.
              </p>
              <p className="section-text reveal reveal-d1" style={{ marginBottom: 20 }}>
                That experience became a chapter. In Melbourne, FL, we are building a space where students
                explore real mathematical ideas because the thinking itself is worth doing.
              </p>
              <p className="section-text reveal reveal-d2">
                Our workshops and events are student-led, free, and open to anyone who wants more than
                what the classroom offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES TABLE ───────────────────────────────── */}
      <section className="features-shell">
        <div className="container">
          <div className="features-header">
            <div className="reveal">
              <div className="section-kicker">What students get</div>
              <h2 className="serif section-title" style={{ margin: 0 }}>
                A place to think, ask, and build confidence.
              </h2>
            </div>
            <p className="section-text reveal reveal-d1" style={{ margin: 0, maxWidth: 460 }}>
              Every session is designed so students leave with something real — a new idea,
              a different way of thinking, or just the confidence that hard problems are worth trying.
            </p>
          </div>

          <div>
            {FEATURES.map((item, i) => (
              <div key={i} className={`feature-row reveal reveal-d${i + 1}`}>
                <div className="feature-num">{item.num}</div>
                <div className="feature-name">{item.title}</div>
                <div className="feature-desc">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="steps-shell">
        <div className="container">
          <div className="steps-header">
            <div className="reveal">
              <div className="section-kicker">How it works</div>
              <h2 className="serif section-title" style={{ margin: 0 }}>
                Structured enough to be meaningful.
                <br />Open enough to feel welcoming.
              </h2>
            </div>
            <p className="section-text reveal reveal-d1" style={{ margin: 0, maxWidth: 440 }}>
              Sessions are approachable and focused on real mathematical exploration.
              Students participate at their own pace and still walk away with something useful.
            </p>
          </div>

          <div className="steps-tiles">
            {STEPS.map((item, i) => (
              <div key={i} className={`step-tile reveal reveal-d${i + 1}`}>
                <div className="serif step-big">0{i + 1}</div>
                <div className="step-body">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO ────────────────────────────────────────── */}
      <section className="video-shell">
        <div className="container">
          <div className="video-inner">
            <div className="reveal">
              <div className="section-kicker" style={{ color: "#8bc4e2" }}>Featured</div>
              <h2 className="serif video-meta-title">
                Featured on the{" "}
                <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>Professor Kev Show</em>
              </h2>
              <p className="section-text reveal reveal-d1"
                style={{ color: "rgba(255,255,255,.52)", marginTop: 18, maxWidth: 380 }}>
                Melbourne Math Circle was featured for its mission and the community it is building
                in Brevard County.
              </p>
            </div>
            <div className="video-wrap reveal reveal-d1"
              style={{ border: "1px solid rgba(255,255,255,.1)", boxShadow: "0 24px 64px rgba(0,0,0,.3)" }}>
              <iframe
                src="https://www.youtube.com/embed/bwqcqY0FlEE"
                title="Melbourne Math Circle - Professor Kev Show"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ────────────────────────────────────────── */}
      <section className="quote-shell">
        <div className="container">
          <div className="quote-layout reveal">
            <div className="serif quote-glyph" aria-hidden="true">"</div>
            <div>
              <div className="serif quote-body">
                Math is not a subject you are born good or bad at. It is a way of thinking,
                and anyone can learn to enjoy it.
              </div>
              <div className="quote-attr">Melbourne Math Circle</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-dark">
        <div className="serif hide-mobile bg-symbol" aria-hidden="true">∑</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker" style={{ color: "#8bc4e2" }}>Get involved</div>
          <h2 className="serif reveal" style={{
            color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300,
          }}>
            Ready to explore{" "}
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>mathematics</em> with us?
          </h2>
          <p className="section-text reveal reveal-d1"
            style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18 }}>
            Our events are free, student-led, and open to any student in the Melbourne area
            who wants more than what the classroom offers.
          </p>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">
              Join an event <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              Contact us <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}