"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Users, BookOpen, MapPin } from "lucide-react";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
`;

const CSS = `
  /* ── Reset & base ── */
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

  /* ── Layout ── */
  .container {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
  }

  /* ── Scroll reveal ── */
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

  /* ── Tokens ── */
  .pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 14px; border-radius: 999px;
    background: #e7f4fb; color: #17689e;
    font-size: .76rem; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
  }
  .btn-primary, .btn-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 48px; padding: 0 24px; border-radius: 999px;
    text-decoration: none;
    transition: transform .2s ease, background .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
    font-size: .82rem; font-weight: 700;
    letter-spacing: .09em; text-transform: uppercase; white-space: nowrap;
  }
  .btn-primary { background: #17689e; color: #fff; box-shadow: 0 12px 30px rgba(23,104,158,.18); }
  .btn-primary:hover { transform: translateY(-2px); background: #0f557f; box-shadow: 0 16px 40px rgba(23,104,158,.25); }
  .btn-secondary { background: transparent; color: #17689e; border: 1.5px solid rgba(23,104,158,.28); }
  .btn-secondary:hover { transform: translateY(-2px); border-color: #17689e; background: rgba(23,104,158,.05); }

  /* ── Typography helpers ── */
  .section-kicker { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #17689e; margin-bottom: 14px; }
  .section-title   { font-size: clamp(2rem,4vw,3.2rem); line-height: 1.12; font-weight: 400; color: #0a2d44; }
  .section-text    { color: #4c6b7f; line-height: 1.85; font-size: 1rem; font-weight: 300; }

  /* ── Marquee ── */
  .marquee-wrap { overflow: hidden; }
  .marquee-track {
    display: flex; width: max-content;
    animation: marquee 30s linear infinite;
  }
  .marquee-track:hover { animation-play-state: paused; }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── Cards & surfaces ── */
  .glass-card {
    background: rgba(255,255,255,.76);
    border: 1px solid rgba(255,255,255,.55);
    backdrop-filter: blur(14px);
    box-shadow: 0 18px 60px rgba(10,45,68,.10);
  }
  .stat-card {
    border-top: 1px solid rgba(23,104,158,.18);
    padding-top: 24px;
    transition: border-color .2s ease, transform .2s ease;
  }
  .stat-card:hover { border-color: rgba(23,104,158,.7); transform: translateY(-2px); }
  .feature-card {
    border: 1px solid rgba(23,104,158,.10);
    background: rgba(255,255,255,.82);
    border-radius: 22px; padding: 24px;
    box-shadow: 0 12px 30px rgba(10,45,68,.05);
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .feature-card:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(10,45,68,.10); }
  .feature-icon {
    width: 48px; height: 48px; border-radius: 16px;
    display: grid; place-items: center;
    background: #e7f4fb; color: #17689e; margin-bottom: 16px;
  }
  .step-card {
    padding: 20px 22px; border-radius: 18px;
    border: 1px solid rgba(23,104,158,.10);
    background: #f9fcfe; color: #0a2d44;
    line-height: 1.65;
    transition: border-color .2s ease, transform .2s ease;
  }
  .step-card:hover { border-color: rgba(23,104,158,.35); transform: translateX(4px); }

  /* ── Misc ── */
  .soft-grid {
    background-image:
      linear-gradient(rgba(23,104,158,.05) 1px, transparent 1px),
      linear-gradient(90deg,rgba(23,104,158,.05) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  .video-wrap { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 18px; }
  .video-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  .divider { width: 44px; height: 2px; background: #17689e; border-radius: 999px; margin: 18px 0; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hide-mobile   { display: none !important; }
    .stats-grid    { grid-template-columns: 1fr 1fr !important; }
    .split-grid    { grid-template-columns: 1fr !important; }
    .features-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 560px) {
    .container  { width: min(100% - 32px, 1120px); }
    .stats-grid { grid-template-columns: 1fr !important; }
    .features-grid { grid-template-columns: 1fr !important; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
  { val: "20+",  label: "Events hosted" },
  { val: "100+", label: "Volunteer hours" },
  { val: "95%",  label: "Student satisfaction" },
];

const FEATURES = [
  { icon: BookOpen, title: "Deep problem solving", text: "We focus on ideas that stretch thinking, not just quick answers." },
  { icon: Users,    title: "Student-led",           text: "Students help guide the experience and shape the community." },
  { icon: Calendar, title: "Free events",            text: "No cost to attend, with open access for local students." },
  { icon: MapPin,   title: "Melbourne-based",        text: "Built for the Brevard County area and the surrounding student community." },
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

      {/* ── HERO ── */}
      <section
        className="soft-grid"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg,#ffffff 0%,#f7fbfe 52%,#ffffff 100%)",
          padding: "clamp(32px,6vw,72px) 0",
        }}
      >
        {/* Decorative large M */}
        <div
          className="serif hide-mobile"
          style={{
            position: "absolute", right: "clamp(-10px,1vw,18px)", top: "43%",
            transform: "translateY(-50%)",
            fontSize: "clamp(250px,30vw,470px)", lineHeight: 1, fontWeight: 700,
            color: "#e8f4fb", userSelect: "none", pointerEvents: "none",
            letterSpacing: "-0.03em",
          }}
        >
          M
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="split-grid"
            style={{
              display: "grid", gridTemplateColumns: "1.1fr .9fr",
              gap: "clamp(28px,5vw,58px)", alignItems: "center",
              minHeight: "calc(100vh - 90px)",
            }}
          >
            {/* Left */}
            <div style={{ paddingTop: 8 }}>
              <div className="pill reveal">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#17689e" }} />
                A chapter of Orlando Math Circle
              </div>

              <h1
                className="serif reveal reveal-d1"
                style={{
                  marginTop: 20,
                  fontSize: "clamp(3.6rem,7.4vw,7rem)",
                  lineHeight: 0.95, letterSpacing: "-0.03em",
                  fontWeight: 300, color: "#0a2d44", maxWidth: 680,
                }}
              >
                Melbourne <br />
                <span style={{ color: "#17689e", fontStyle: "italic" }}>Math</span> Circle
              </h1>

              <div className="divider reveal reveal-d2" style={{ margin: "22px 0 24px" }} />

              <p
                className="reveal reveal-d3"
                style={{
                  maxWidth: 560,
                  fontSize: "clamp(1rem,1.65vw,1.12rem)",
                  lineHeight: 1.85, color: "#4c6b7f", fontWeight: 300,
                }}
              >
                Igniting mathematical curiosity through interactive events,
                collaborative problem-solving, and the joy of discovery.
              </p>

              <div
                className="reveal reveal-d4"
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}
              >
                <Link href="/join-us" className="btn-primary">
                  Join our next event <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="btn-secondary">Our mission</Link>
              </div>
            </div>

            {/* Right card */}
            <div className="reveal reveal-d2">
              <div
                className="glass-card"
                style={{
                  borderRadius: 28, padding: 30,
                  background: "linear-gradient(180deg,rgba(255,255,255,.88) 0%,rgba(236,246,252,.96) 100%)",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#17689e", marginBottom: 12 }}>
                  Melbourne, FL
                </div>
                <div
                  className="serif"
                  style={{ fontSize: "clamp(2.1rem,3.2vw,3.2rem)", lineHeight: 0.98, color: "#0a2d44", fontWeight: 400, marginBottom: 16 }}
                >
                  Student-led<br />math community
                </div>
                <p style={{ color: "#4c6b7f", lineHeight: 1.82, fontWeight: 300, fontSize: "1rem", maxWidth: 430 }}>
                  Free, open events built around problem solving, discussion, and deeper mathematical thinking.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                  <Link href="/join-us" className="btn-primary">Get involved <ArrowRight size={16} /></Link>
                  <Link href="/about" className="btn-secondary">Learn more</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap" style={{ background: "#17689e", padding: "14px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                color: "rgba(255,255,255,.92)", fontSize: ".78rem", fontWeight: 600,
                letterSpacing: ".11em", textTransform: "uppercase",
                padding: "0 30px", display: "inline-flex", alignItems: "center",
                gap: 28, whiteSpace: "nowrap",
              }}
            >
              {item}
              <span style={{ opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ background: "#f4f9fc", padding: "clamp(54px,8vw,88px) 0" }}>
        <div className="container">
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
            {STATS.map((s, i) => (
              <div key={i} className={`stat-card reveal reveal-d${(i % 4) + 1}`}>
                <div className="serif" style={{ fontSize: "clamp(2.7rem,4vw,4rem)", lineHeight: 1, color: "#17689e", fontWeight: 600, marginBottom: 10 }}>
                  {s.val}
                </div>
                <div style={{ color: "#4c6b7f", fontSize: ".92rem", lineHeight: 1.6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ background: "#fff", padding: "clamp(72px,10vw,118px) 0" }}>
        <div className="container">
          <div
            className="split-grid"
            style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "clamp(32px,6vw,76px)", alignItems: "start" }}
          >
            <div className="reveal">
              <div className="section-kicker">Our mission</div>
              <div className="divider" />
            </div>
            <div>
              <h2 className="serif section-title reveal">
                Transforming mathematics from something students endure into something they seek out.
              </h2>
              <p className="section-text reveal reveal-d1" style={{ marginTop: 28, marginBottom: 18 }}>
                Melbourne Math Circle started after students attended Orlando Math Circle events and came back
                more curious, more confident, and more willing to sit with hard problems.
              </p>
              <p className="section-text reveal reveal-d2" style={{ marginBottom: 18 }}>
                That experience became a chapter. In Melbourne, FL, we are building a space where students
                explore real mathematical ideas because the thinking itself is worth doing.
              </p>
              <p className="section-text reveal reveal-d3">
                Our workshops and events are student-led, free, and open to anyone who wants more than what the classroom offers.
              </p>
              <div className="reveal reveal-d4" style={{ marginTop: 28 }}>
                <Link href="/about" className="btn-secondary" style={{ display: "inline-flex" }}>
                  Our story <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <div className="section-kicker">What students get</div>
            <h2 className="serif section-title">A place to think, ask, and build confidence.</h2>
          </div>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
            {FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="feature-card reveal reveal-d1">
                  <div className="feature-icon"><Icon size={22} /></div>
                  <div style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0a2d44", marginBottom: 10 }}>{item.title}</div>
                  <div style={{ color: "#4c6b7f", lineHeight: 1.7, fontWeight: 300 }}>{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#fff", padding: "clamp(72px,10vw,118px) 0" }}>
        <div className="container">
          <div
            className="split-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}
          >
            <div className="reveal">
              <div className="section-kicker">How it works</div>
              <h2 className="serif section-title">
                Structured enough to be meaningful.<br />Open enough to feel welcoming.
              </h2>
              <p className="section-text" style={{ marginTop: 20, maxWidth: 540 }}>
                Sessions are designed to be approachable, engaging, and focused on actual mathematical
                exploration. Students can participate at their own pace and still walk away with something useful.
              </p>
            </div>
            <div className="reveal reveal-d1" style={{ display: "grid", gap: 14 }}>
              {STEPS.map((item, i) => (
                <div key={i} className="step-card">
                  <span style={{ color: "#17689e", fontWeight: 700, marginRight: 10 }}>0{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 34 }}>
            <div className="section-kicker">Featured</div>
            <h2 className="serif section-title">
              Featured on the{" "}
              <em style={{ color: "#17689e", fontStyle: "italic" }}>Professor Kev Show</em>
            </h2>
          </div>
          <div className="video-wrap reveal" style={{ boxShadow: "0 20px 60px rgba(10,45,68,.12)", border: "1px solid rgba(255,255,255,.6)" }}>
            <iframe src="https://www.youtube.com/embed/bwqcqY0FlEE" title="Melbourne Math Circle — Professor Kev Show" allowFullScreen />
          </div>
          <p className="section-text reveal reveal-d1" style={{ marginTop: 22, maxWidth: 760 }}>
            Melbourne Math Circle was featured for its mission and the community it is building in Brevard County.
          </p>
        </div>
      </section>

      {/* ── PULLQUOTE ── */}
      <section style={{ background: "#fff", padding: "clamp(64px,9vw,96px) 0", borderTop: "1px solid #e1edf5", borderBottom: "1px solid #e1edf5" }}>
        <div className="container" style={{ maxWidth: 860, textAlign: "center" }}>
          <div
            className="serif reveal"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.32, color: "#0a2d44" }}
          >
            Math is not a subject you are born good or bad at. It is a way of thinking, and anyone can learn to enjoy it.
          </div>
          <div
            className="reveal reveal-d1"
            style={{ marginTop: 22, fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#17689e" }}
          >
            Melbourne Math Circle
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)",
          padding: "clamp(72px,10vw,116px) 0",
          position: "relative", overflow: "hidden",
        }}
      >
        <div
          className="serif hide-mobile"
          style={{
            position: "absolute", right: "-0.04em", bottom: "-0.14em",
            fontSize: "clamp(180px,25vw,360px)", fontWeight: 700, lineHeight: 1,
            color: "rgba(255,255,255,.04)", userSelect: "none", pointerEvents: "none",
          }}
        >
          ∑
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker" style={{ color: "#8bc4e2" }}>Get involved</div>
          <h2
            className="serif reveal"
            style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300 }}
          >
            Ready to explore{" "}
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>mathematics</em> with us?
          </h2>
          <p className="section-text reveal reveal-d1" style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18 }}>
            Our events are free, student-led, and open to any student in the Melbourne area who wants more than what the classroom offers.
          </p>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">
              Join an event <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ color: "rgba(255,255,255,.9)", borderColor: "rgba(255,255,255,.22)" }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}