"use client";

import RegistrationForm from "@/components/registration-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

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

  /* Scroll reveal */
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

  /* Tokens */
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
  .btn-primary { background: #17689e; color: #fff; box-shadow: 0 12px 30px rgba(23,104,158,.18); }
  .btn-primary:hover { transform: translateY(-2px); background: #0f557f; box-shadow: 0 16px 40px rgba(23,104,158,.25); }
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

  /* Event card */
  .event-card {
    border: 1px solid rgba(23,104,158,.10);
    background: rgba(255,255,255,.9);
    border-radius: 22px; padding: 28px;
    box-shadow: 0 12px 30px rgba(10,45,68,.06);
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .event-card:hover { transform: translateY(-4px); box-shadow: 0 24px 52px rgba(10,45,68,.12); border-color: rgba(23,104,158,.28); }

  .meta-row {
    display: flex; align-items: center; gap: 8px;
    font-size: .84rem; color: #4c6b7f; font-weight: 400;
    margin-bottom: 6px;
  }

  /* Step items */
  .step-item {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 18px 22px; border-radius: 16px;
    border: 1px solid rgba(23,104,158,.10);
    background: #f9fcfe;
    transition: border-color .2s ease, transform .2s ease;
  }
  .step-item:hover { border-color: rgba(23,104,158,.3); transform: translateX(4px); }

  /* Hero */
  .hero-join {
    min-height: 52vh;
    display: flex; align-items: center;
    background: linear-gradient(160deg, #0a2d44 0%, #17689e 100%);
    position: relative; overflow: hidden;
    padding: clamp(72px,10vw,110px) 0;
  }
  .hero-join::after {
    content: 'π';
    font-family: 'Cormorant Garamond', serif;
    position: absolute; right: clamp(-10px,2vw,30px); bottom: -0.12em;
    font-size: clamp(200px,26vw,400px); font-weight: 700; line-height: 1;
    color: rgba(255,255,255,.05); pointer-events: none; user-select: none;
  }

  /* Registration wrapper — let RegistrationForm keep its own styling */
  .reg-wrapper {
    background: #fff;
    border: 1px solid rgba(23,104,158,.12);
    border-radius: 24px;
    padding: 36px 32px;
    box-shadow: 0 20px 60px rgba(10,45,68,.09);
  }

  @media (max-width: 900px) {
    .split-grid   { grid-template-columns: 1fr !important; }
    .events-grid  { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 560px) {
    .container { width: min(100% - 32px, 1120px); }
    .reg-wrapper { padding: 24px 18px; }
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

const HOW_IT_WORKS = [
  "Sign up once using the form below",
  "Receive RSVP email links for every future event",
  "Attend free, student-led problem-solving sessions",
  "Bring a friend — all skill levels are welcome",
];

export default function JoinUsPage() {
  useReveal();

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="hero-join">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill reveal" style={{ background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.9)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8fd0ef" }} />
            Melbourne, FL
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
            Join <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>Us</em>
          </h1>
          <div className="divider reveal reveal-d2" style={{ background: "rgba(255,255,255,.35)", margin: "22px 0 24px" }} />
          <p
            className="reveal reveal-d3"
            style={{ maxWidth: 520, fontSize: "clamp(.95rem,1.5vw,1.12rem)", lineHeight: 1.85, color: "rgba(255,255,255,.75)", fontWeight: 300 }}
          >
            Sign up once and receive free RSVP links for every upcoming event.
          </p>
          <div className="reveal reveal-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <a href="#register" className="btn-primary">
              Register now <ArrowRight size={16} />
            </a>
            <a href="/about" className="btn-secondary" style={{ color: "rgba(255,255,255,.9)", borderColor: "rgba(255,255,255,.22)" }}>
              Our mission
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="soft-grid" style={{ background: "linear-gradient(180deg,#fff 0%,#f4f9fc 100%)", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div
            className="split-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}
          >
            <div>
              <div className="section-kicker reveal">How it works</div>
              <h2 className="serif section-title reveal reveal-d1">
                One sign-up.<br />
                <em style={{ color: "#17689e", fontStyle: "italic" }}>Unlimited events.</em>
              </h2>
              <p className="section-text reveal reveal-d2" style={{ marginTop: 20, maxWidth: 480 }}>
                Register once and we'll take care of the rest. You'll get notified
                by email whenever a new session opens up — no need to check back.
              </p>
            </div>
            <div className="reveal reveal-d2" style={{ display: "grid", gap: 12 }}>
              {HOW_IT_WORKS.map((item, i) => (
                <div key={i} className="step-item">
                  <span style={{ color: "#17689e", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1, minWidth: 28 }}>0{i + 1}</span>
                  <span style={{ color: "#0a2d44", lineHeight: 1.65, fontSize: ".95rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTRATION FORM ── */}
      <section
        id="register"
        style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0", position: "relative", overflow: "hidden" }}
      >
        {/* Decorative large letter */}
        <div
          className="serif"
          style={{
            position: "absolute", right: "-0.06em", top: "50%", transform: "translateY(-50%)",
            fontSize: "clamp(200px,26vw,420px)", fontWeight: 700, lineHeight: 1,
            color: "rgba(23,104,158,.06)", pointerEvents: "none", userSelect: "none",
          }}
        >
          ∞
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-kicker reveal">Registration</div>
              <h2 className="serif section-title reveal reveal-d1">
                RSVP <em style={{ color: "#17689e", fontStyle: "italic" }}>one time</em>
              </h2>
              <p className="section-text reveal reveal-d2" style={{ marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>
                Complete this form once and we'll email you RSVP links for all
                future Melbourne Math Circle events. Free and open to anyone.
              </p>
            </div>

            <div className="reg-wrapper reveal reveal-d3">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)", padding: "clamp(72px,10vw,100px) 0", position: "relative", overflow: "hidden" }}>
        <div
          className="serif"
          style={{ position: "absolute", right: "-0.04em", bottom: "-0.14em", fontSize: "clamp(180px,25vw,340px)", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.04)", userSelect: "none", pointerEvents: "none" }}
        >
          √
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-kicker reveal" style={{ color: "#8bc4e2" }}>Already signed up?</div>
          <h2 className="serif reveal reveal-d1" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Check your email for<br />
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>RSVP links.</em>
          </h2>
          <p className="section-text reveal reveal-d2" style={{ color: "rgba(255,255,255,.68)", maxWidth: 480, marginTop: 16 }}>
            If you have any questions, reach out and we'll get back to you shortly.
          </p>
          <div className="reveal reveal-d3" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/contact" className="btn-primary">
              Contact us <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-secondary" style={{ color: "rgba(255,255,255,.9)", borderColor: "rgba(255,255,255,.22)" }}>
              Our story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}