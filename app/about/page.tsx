"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Users, Brain, Heart } from "lucide-react";

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
  .container { width: min(1120px, calc(100% - 48px)); margin: 0 auto; }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0; transform: translateY(22px);
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
  .pill-dark {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 14px; border-radius: 999px;
    background: rgba(255,255,255,.12); color: rgba(255,255,255,.9);
    font-size: .76rem; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,.18);
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
  .btn-primary-light { background: #fff; color: #0a2d44; box-shadow: 0 12px 30px rgba(0,0,0,.12); }
  .btn-primary-light:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,0,0,.18); }
  .btn-secondary { background: transparent; color: #17689e; border: 1.5px solid rgba(23,104,158,.28); }
  .btn-secondary:hover { transform: translateY(-2px); border-color: #17689e; background: rgba(23,104,158,.05); }
  .btn-ghost-light {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 48px; padding: 0 24px; border-radius: 999px;
    text-decoration: none;
    transition: transform .2s ease, border-color .2s ease, background .2s ease;
    font-size: .82rem; font-weight: 700;
    letter-spacing: .09em; text-transform: uppercase; white-space: nowrap;
    color: rgba(255,255,255,.9); border: 1.5px solid rgba(255,255,255,.25);
  }
  .btn-ghost-light:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.65); background: rgba(255,255,255,.06); }

  /* ── Typography helpers ── */
  .section-kicker { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #17689e; margin-bottom: 14px; }
  .section-kicker-light { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #8bc4e2; margin-bottom: 14px; }
  .section-title { font-size: clamp(2rem,4vw,3.2rem); line-height: 1.12; font-weight: 400; color: #0a2d44; }
  .section-text  { color: #4c6b7f; line-height: 1.85; font-size: 1rem; font-weight: 300; }
  .divider { width: 44px; height: 2px; background: #17689e; border-radius: 999px; margin: 18px 0; }

  /* ── Cards ── */
  .mission-item {
    display: flex; gap: 16px; padding: 20px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.06);
    backdrop-filter: blur(8px);
    transition: background .2s ease, transform .2s ease;
  }
  .mission-item:hover { background: rgba(255,255,255,.10); transform: translateX(4px); }
  .mission-icon {
    width: 44px; height: 44px; flex-shrink: 0; border-radius: 14px;
    display: grid; place-items: center;
    background: rgba(255,255,255,.12); color: #fff;
  }

  .value-card {
    border: 1px solid rgba(23,104,158,.10);
    background: rgba(255,255,255,.82);
    border-radius: 22px; padding: 24px;
    box-shadow: 0 12px 30px rgba(10,45,68,.05);
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .value-card:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(10,45,68,.10); }
  .value-icon {
    width: 48px; height: 48px; border-radius: 16px;
    display: grid; place-items: center;
    background: #e7f4fb; color: #17689e; margin-bottom: 16px;
  }

  .stat-card {
    border-top: 1px solid rgba(23,104,158,.18);
    padding-top: 24px;
    transition: border-color .2s ease, transform .2s ease;
  }
  .stat-card:hover { border-color: rgba(23,104,158,.7); transform: translateY(-2px); }

  /* ── Soft grid ── */
  .soft-grid {
    background-image:
      linear-gradient(rgba(23,104,158,.05) 1px, transparent 1px),
      linear-gradient(90deg,rgba(23,104,158,.05) 1px, transparent 1px);
    background-size: 36px 36px;
  }

  /* ── Marquee ── */
  .marquee-wrap { overflow: hidden; }
  .marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ── Image ── */
  .img-rounded { border-radius: 22px; overflow: hidden; box-shadow: 0 20px 60px rgba(10,45,68,.12); }
  .img-rounded img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
  .img-rounded:hover img { transform: scale(1.04); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hide-mobile   { display: none !important; }
    .split-grid    { grid-template-columns: 1fr !important; }
    .values-grid   { grid-template-columns: 1fr 1fr !important; }
    .stats-grid    { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 560px) {
    .container   { width: min(100% - 32px, 1120px); }
    .values-grid { grid-template-columns: 1fr !important; }
    .stats-grid  { grid-template-columns: 1fr !important; }
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
  "Founded 2023", "Orlando Math Circle Chapter", "Student-Led", "Problem Solving",
  "Brevard County", "Free Events", "Community Impact", "Melbourne, FL",
  "Founded 2023", "Orlando Math Circle Chapter", "Student-Led", "Problem Solving",
  "Brevard County", "Free Events", "Community Impact", "Melbourne, FL",
];

const STATS = [
  { val: "2023",  label: "Year founded" },
  { val: "100+",  label: "Students reached" },
  { val: "20+",   label: "Events hosted" },
  { val: "100+",  label: "Volunteer hours" },
];

const MISSION_ITEMS = [
  { icon: Star,   text: "Create a welcoming space for students to explore mathematics beyond the classroom curriculum." },
  { icon: Users,  text: "Foster a community of young mathematicians who support and inspire each other." },
  { icon: Brain,  text: "Develop problem-solving skills through engaging meetings and collaborative activities." },
  { icon: Heart,  text: "Share the beauty and relevance of mathematics with our broader community." },
];

const VALUES = [
  { title: "Student-Led Meetings",       description: "Our meetings are designed and led by students passionate about mathematics, creating an engaging collaborative atmosphere." },
  { title: "Peer Collaboration",         description: "We foster an open environment where students work together, sharing ideas and tackling challenges collectively." },
  { title: "Collaborative Problem Solving", description: "We explore challenging problems together, learning from one another's approaches and insights." },
  { title: "Community Outreach",         description: "We organize events to share our love for math with the broader community, inspiring curiosity and creativity." },
];

export default function AboutPage() {
  useReveal();

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section
        className="soft-grid"
        style={{
          minHeight: "72vh",
          position: "relative", overflow: "hidden",
          background: "linear-gradient(180deg,#ffffff 0%,#f7fbfe 60%,#ffffff 100%)",
          padding: "clamp(64px,10vw,120px) 0 clamp(48px,7vw,88px)",
          display: "flex", alignItems: "center",
        }}
      >
        {/* Decorative large A */}
        <div
          className="serif hide-mobile"
          style={{
            position: "absolute", right: "clamp(-10px,1vw,18px)", top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(220px,28vw,440px)", lineHeight: 1, fontWeight: 700,
            color: "#e8f4fb", userSelect: "none", pointerEvents: "none",
            letterSpacing: "-0.03em",
          }}
        >
          A
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="pill reveal">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#17689e" }} />
            A chapter of Orlando Math Circle
          </div>

          <h1
            className="serif reveal reveal-d1"
            style={{
              marginTop: 20, maxWidth: 700,
              fontSize: "clamp(3.4rem,7vw,6.5rem)",
              lineHeight: 0.95, letterSpacing: "-0.03em",
              fontWeight: 300, color: "#0a2d44",
            }}
          >
            About{" "}
            <em style={{ color: "#17689e", fontStyle: "italic" }}>Us</em>
          </h1>

          <div className="divider reveal reveal-d2" />

          <p
            className="reveal reveal-d3"
            style={{ maxWidth: 540, fontSize: "clamp(1rem,1.65vw,1.12rem)", lineHeight: 1.85, color: "#4c6b7f", fontWeight: 300 }}
          >
            Discover the story of Melbourne Math Circle — how we started, what we believe, and why we build community around mathematical thinking.
          </p>

          <div className="reveal reveal-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/join-us" className="btn-primary">Join us <ArrowRight size={16} /></Link>
            <Link href="/team" className="btn-secondary">Meet the team</Link>
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
                padding: "0 30px", display: "inline-flex", alignItems: "center", gap: 28, whiteSpace: "nowrap",
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

      {/* ── ORIGIN STORY ── */}
      <section style={{ background: "#fff", padding: "clamp(72px,10vw,118px) 0" }}>
        <div className="container">
          <div
            className="split-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,72px)", alignItems: "center" }}
          >
            {/* Image */}
            <div className="img-rounded reveal" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/about_1.jpg"
                alt="Melbourne Math Circle Origin Story"
                width={600} height={450}
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <div className="section-kicker reveal">Our origin story</div>
              <h2 className="serif section-title reveal reveal-d1">
                Built by students,<br />
                <em style={{ color: "#17689e", fontStyle: "italic" }}>for students.</em>
              </h2>
              <div className="divider reveal reveal-d1" />
              <p className="section-text reveal reveal-d2" style={{ marginBottom: 16 }}>
                Melbourne Math Circle, a chapter of the Orlando Math Circle (OMC), was founded in 2023 by a group
                of high school students inspired by their experiences at OMC.
              </p>
              <p className="section-text reveal reveal-d3" style={{ marginBottom: 16 }}>
                It all started as students witnessed the incredible work and dedication of older peers at OMC —
                and decided to bring those opportunities closer to home in Melbourne.
              </p>
              <p className="section-text reveal reveal-d4">
                Through close collaboration with our parent organization, we've built a vibrant community of
                young thinkers who believe math isn't just about numbers — it's about curiosity, creativity,
                and seeing the world through a sharper lens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION (dark) ── */}
      <section
        style={{
          background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)",
          padding: "clamp(72px,10vw,118px) 0",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Decorative ∑ */}
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

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="split-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,72px)", alignItems: "center" }}
          >
            {/* Text */}
            <div>
              <div className="section-kicker-light reveal">Our purpose</div>
              <h2
                className="serif reveal reveal-d1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.12, fontWeight: 400, color: "#fff", marginBottom: 10 }}
              >
                Our{" "}
                <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>Mission</em>
              </h2>
              <div style={{ width: 44, height: 2, background: "#8fd0ef", borderRadius: 999, margin: "18px 0 24px" }} className="reveal reveal-d1" />
              <p
                className="reveal reveal-d2"
                style={{ color: "rgba(255,255,255,.75)", lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}
              >
                At Melbourne Math Circle, we believe mathematics is a creative, collaborative, and joyful pursuit —
                accessible to every curious mind regardless of background or experience.
              </p>

              <div style={{ display: "grid", gap: 12 }}>
                {MISSION_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className={`mission-item reveal reveal-d${Math.min(i + 2, 4)}`}>
                      <div className="mission-icon"><Icon size={20} /></div>
                      <p style={{ color: "rgba(255,255,255,.85)", lineHeight: 1.7, fontWeight: 300, fontSize: ".95rem" }}>
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="reveal reveal-d4" style={{ marginTop: 32 }}>
                <Link href="/join-us" className="btn-primary-light btn-primary">
                  Join our mission <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="img-rounded reveal reveal-d2" style={{ aspectRatio: "1/1" }}>
              <Image
                src="/about_2.jpg"
                alt="Our Mission"
                width={500} height={500}
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BY STUDENTS FOR STUDENTS ── */}
      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 48 }}>
            <div className="section-kicker reveal">By students, for students</div>
            <h2 className="serif section-title reveal reveal-d1">
              What sets us apart is who runs it.
            </h2>
            <div className="divider reveal reveal-d1" />
            <p className="section-text reveal reveal-d2">
              Melbourne Math Circle is entirely driven and led by high school students. Peer-to-peer
              learning empowers everyone to ask questions, explore new ideas, and take intellectual risks
              in an environment where everyone genuinely gets it.
            </p>
          </div>

          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
            {VALUES.map((item, i) => (
              <div key={i} className="value-card reveal reveal-d1">
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "#17689e", color: "#fff",
                    display: "grid", placeItems: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem", fontWeight: 700, marginBottom: 16,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0a2d44", marginBottom: 10 }}>{item.title}</div>
                <div style={{ color: "#4c6b7f", lineHeight: 1.7, fontWeight: 300, fontSize: ".9rem" }}>{item.description}</div>
              </div>
            ))}
          </div>
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
          ∮
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker-light">Get involved</div>
          <h2
            className="serif reveal"
            style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300 }}
          >
            Ready to join the{" "}
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>circle</em>?
          </h2>
          <p className="section-text reveal reveal-d1" style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18 }}>
            Whether you're a math enthusiast or simply curious, we welcome all school students to our vibrant, student-led community.
          </p>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">
              Attend a meeting <ArrowRight size={16} />
            </Link>
            <Link href="/team" className="btn-ghost-light">
              Meet our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}