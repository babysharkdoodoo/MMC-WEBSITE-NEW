"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Users, BookOpen, MapPin, ChevronRight } from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
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
  { val: "20+", label: "Events hosted" },
  { val: "100+", label: "Volunteer hours" },
  { val: "95%", label: "Student satisfaction" },
];

const FEATURES = [
  { icon: BookOpen, title: "Deep problem solving", text: "We focus on ideas that stretch thinking, not just quick answers." },
  { icon: Users, title: "Student-led", text: "Students help guide the experience and shape the community." },
  { icon: Calendar, title: "Free events", text: "No cost to attend, with open access for local students." },
  { icon: MapPin, title: "Melbourne-based", text: "Built for the Brevard County area and the surrounding student community." },
];

const STEPS = [
  "Short introductions to the idea of the day",
  "Guided problem-solving in small groups",
  "Discussion, sharing, and different solution paths",
  "A closing takeaway students can reuse later",
];

function SectionHeader({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="reveal" style={{ maxWidth: 760 }}>
      <div className="section-kicker">{kicker}</div>
      <h2 className="serif section-title">{title}</h2>
      {text ? <p className="section-text" style={{ marginTop: 18 }}>{text}</p> : null}
    </div>
  );
}

export default function HomePage() {
  useReveal();

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>
      <style>{`
        .hero-shell {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 20% 20%, rgba(23,104,158,.08), transparent 24%),
            radial-gradient(circle at 80% 10%, rgba(23,104,158,.05), transparent 20%),
            linear-gradient(180deg, #ffffff 0%, #f7fbfe 52%, #ffffff 100%);
          padding: clamp(32px, 6vw, 72px) 0;
        }
        .hero-title {
          font-size: clamp(3.4rem, 7vw, 7rem);
          line-height: .94;
          letter-spacing: -0.04em;
          font-weight: 300;
          color: #0a2d44;
          max-width: 680px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          gap: clamp(28px, 5vw, 58px);
          align-items: center;
          min-height: calc(100vh - 90px);
        }
        .hero-panel {
          border-radius: 28px;
          padding: 30px;
          background: linear-gradient(180deg, rgba(255,255,255,.92) 0%, rgba(236,246,252,.98) 100%);
        }
        .cta-strip {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 32px;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; min-height: auto; }
        }
        @media (max-width: 560px) {
          .hero-panel { padding: 22px; }
        }
      `}</style>

      <section className="hero-shell soft-grid">
        <div
          className="serif hide-mobile bg-letter"
          aria-hidden="true"
          style={{ top: "43%", fontSize: "clamp(250px,30vw,470px)", color: "#e8f4fb" }}
        >
          M
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-grid">
            <div style={{ paddingTop: 8 }}>
              <div className="pill reveal">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#17689e" }} />
                A chapter of Orlando Math Circle
              </div>

              <h1 className="serif hero-title reveal reveal-d1" style={{ marginTop: 20 }}>
                Melbourne <br />
                <span style={{ color: "#17689e", fontStyle: "italic" }}>Math</span> Circle
              </h1>

              <div className="divider reveal reveal-d2" style={{ margin: "22px 0 24px" }} />

              <p
                className="reveal reveal-d3"
                style={{
                  maxWidth: 560,
                  fontSize: "clamp(1rem,1.65vw,1.12rem)",
                  lineHeight: 1.85,
                  color: "#4c6b7f",
                  fontWeight: 300,
                }}
              >
                Igniting mathematical curiosity through interactive events,
                collaborative problem-solving, and the joy of discovery.
              </p>

              <div className="reveal reveal-d4 cta-strip">
                <Link href="/join-us" className="btn-primary">
                  Join our next event <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Our mission
                </Link>
              </div>
            </div>

            <div className="reveal reveal-d2">
              <div className="glass-card hero-panel">
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#17689e", marginBottom: 12 }}>
                  Melbourne, FL
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: "clamp(2.1rem,3.2vw,3.2rem)",
                    lineHeight: 0.98,
                    color: "#0a2d44",
                    fontWeight: 400,
                    marginBottom: 16,
                  }}
                >
                  Student-led
                  <br />
                  math community
                </div>
                <p style={{ color: "#4c6b7f", lineHeight: 1.82, fontWeight: 300, fontSize: "1rem", maxWidth: 430 }}>
                  Free, open events built around problem solving, discussion, and deeper mathematical thinking.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                  <Link href="/join-us" className="btn-primary">
                    Get involved <ArrowRight size={16} />
                  </Link>
                  <Link href="/about" className="btn-secondary">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" style={{ background: "#17689e", padding: "14px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={`${item}-${i}`}
              style={{
                color: "rgba(255,255,255,.92)",
                fontSize: ".78rem",
                fontWeight: 600,
                letterSpacing: ".11em",
                textTransform: "uppercase",
                padding: "0 30px",
                display: "inline-flex",
                alignItems: "center",
                gap: 28,
                whiteSpace: "nowrap",
              }}
            >
              {item}
              <span style={{ opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

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

      <section style={{ background: "#fff", padding: "clamp(72px,10vw,118px) 0" }}>
        <div className="container">
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "220px 1fr", alignItems: "start", gap: "clamp(28px,5vw,64px)" }}>
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

      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <SectionHeader kicker="What students get" title="A place to think, ask, and build confidence." />
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginTop: 36 }}>
            {FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`feature-card reveal reveal-d${(i % 4) + 1}`}>
                  <div className="feature-icon"><Icon size={22} /></div>
                  <div style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0a2d44", marginBottom: 10 }}>{item.title}</div>
                  <div style={{ color: "#4c6b7f", lineHeight: 1.7, fontWeight: 300 }}>{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "clamp(72px,10vw,118px) 0" }}>
        <div className="container">
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}>
            <div className="reveal">
              <div className="section-kicker">How it works</div>
              <h2 className="serif section-title">
                Structured enough to be meaningful.
                <br />Open enough to feel welcoming.
              </h2>
              <p className="section-text" style={{ marginTop: 20, maxWidth: 540 }}>
                Sessions are designed to be approachable, engaging, and focused on actual mathematical
                exploration. Students can participate at their own pace and still walk away with something useful.
              </p>
            </div>
            <div className="reveal reveal-d1" style={{ display: "grid", gap: 14 }}>
              {STEPS.map((item, i) => (
                <div key={i} className="step-card">
                  <div className="step-num">0{i + 1}</div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 34 }}>
            <div className="section-kicker">Featured</div>
            <h2 className="serif section-title">
              Featured on the <em style={{ color: "#17689e", fontStyle: "italic" }}>Professor Kev Show</em>
            </h2>
          </div>
          <div className="video-wrap reveal" style={{ boxShadow: "0 20px 60px rgba(10,45,68,.12)", border: "1px solid rgba(255,255,255,.6)" }}>
            <iframe
              src="https://www.youtube.com/embed/bwqcqY0FlEE"
              title="Melbourne Math Circle - Professor Kev Show"
              allowFullScreen
            />
          </div>
          <p className="section-text reveal reveal-d1" style={{ marginTop: 22, maxWidth: 760 }}>
            Melbourne Math Circle was featured for its mission and the community it is building in Brevard County.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "clamp(64px,9vw,96px) 0", borderTop: "1px solid #e1edf5", borderBottom: "1px solid #e1edf5" }}>
        <div className="container" style={{ maxWidth: 860, textAlign: "center" }}>
          <div
            className="serif reveal"
            style={{
              fontSize: "clamp(2rem,4vw,3.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.32,
              color: "#0a2d44",
            }}
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

      <section className="cta-dark">
        <div className="serif hide-mobile bg-symbol" aria-hidden="true">∑</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker" style={{ color: "#8bc4e2" }}>Get involved</div>
          <h2 className="serif reveal" style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Ready to explore <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>mathematics</em> with us?
          </h2>
          <p className="section-text reveal reveal-d1" style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18 }}>
            Our events are free, student-led, and open to any student in the Melbourne area who wants more than what the classroom offers.
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
