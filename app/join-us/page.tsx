"use client";

import RegistrationForm from "@/components/registration-form";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";

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
      <style>{`
        .hero-join::after {
          content: 'π';
          font-family: 'Switzer', sans-serif;
          position: absolute; right: clamp(-10px,2vw,30px); bottom: -0.12em;
          font-size: clamp(200px,26vw,400px); font-weight: 700; line-height: 1;
          color: rgba(255,255,255,.05); pointer-events: none; user-select: none;
        }
        .reg-wrapper {
          background: #fff;
          border: 1px solid rgba(23,104,158,.12);
          border-radius: 24px;
          padding: 36px 32px;
          box-shadow: 0 20px 60px rgba(10,45,68,.09);
        }
        @media (max-width: 560px) {
          .reg-wrapper { padding: 24px 18px; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-dark hero-join">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill reveal" style={{ background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.9)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e7e8e3" }} />
            Melbourne, FL
          </div>
          <h1 className="serif reveal reveal-d1" style={{ marginTop: 20, fontSize: "clamp(3.4rem,7vw,6.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 300, color: "#fff" }}>
            Join <em style={{ color: "#e7e8e3", fontStyle: "italic" }}>Us</em>
          </h1>
          <div className="divider reveal reveal-d2" style={{ background: "rgba(255,255,255,.35)", margin: "22px 0 24px" }} />
          <p className="reveal reveal-d3" style={{ maxWidth: 520, fontSize: "clamp(.95rem,1.5vw,1.12rem)", lineHeight: 1.85, color: "rgba(255,255,255,.75)", fontWeight: 300 }}>
            Sign up once and receive free RSVP links for every upcoming event.
          </p>
          <div className="reveal reveal-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <a href="#register" className="btn-primary">Register now <ArrowRight size={16} /></a>
            <a href="/about" className="btn-ghost-light">Our mission</a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-space soft-grid" style={{ background: "linear-gradient(180deg,#fff 0%,#f4f3ef 100%)" }}>
        <div className="container">
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
            <div>
              <div className="section-kicker reveal">How it works</div>
              <h2 className="serif section-title reveal reveal-d1">Sign up for<br /><em style={{ color: "#45616b", fontStyle: "italic" }}>meeting updates.</em></h2>
              <p className="section-text reveal reveal-d2" style={{ marginTop: 20, maxWidth: 480 }}>Register below to receive session announcements and RSVP links with the date, time, and location. The form asks for student, parent, and emergency contact information, followed by the participation agreements.</p>
            </div>
            <div className="reveal reveal-d2" style={{ display: "grid", gap: 12 }}>
              {HOW_IT_WORKS.map((item, i) => (
                <div key={i} className="step-card">
                  <span style={{ color: "#45616b", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1, minWidth: 28 }}>0{i + 1}</span>
                  <span style={{ color: "#263238", lineHeight: 1.65, fontSize: ".95rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="section-space" id="register" style={{ background: "#e7e8e3", position: "relative", overflow: "hidden" }}>
        <div className="serif" style={{ position: "absolute", right: "-0.06em", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(200px,26vw,420px)", fontWeight: 700, lineHeight: 1, color: "rgba(23,104,158,.06)", pointerEvents: "none", userSelect: "none" }}>∞</div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "var(--mmc-content-gap)" }}>
              <div className="section-kicker reveal">Registration</div>
              <h2 className="serif section-title reveal reveal-d1">Register for <em style={{ color: "#45616b", fontStyle: "italic" }}>the circle</em></h2>
              <p className="section-text reveal reveal-d2" style={{ marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>Complete this form once to register with the circle and receive meeting updates. Then use the RSVP link in each event email to sign up for that session.</p>
            </div>
            <div className="reg-wrapper reveal reveal-d3">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-dark">
        <div className="serif bg-symbol" aria-hidden="true">√</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-kicker reveal" style={{ color: "#e7e8e3" }}>Already signed up?</div>
          <h2 className="serif reveal reveal-d1" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Check your email for<br /><em style={{ color: "#e7e8e3", fontStyle: "italic" }}>RSVP links.</em>
          </h2>
          <p className="section-text reveal reveal-d2" style={{ color: "rgba(255,255,255,.68)", maxWidth: 480, marginTop: 16 }}>If you have any questions, reach out and we'll get back to you shortly.</p>
          <div className="reveal reveal-d3" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/contact" className="btn-primary">Contact us <ArrowRight size={16} /></Link>
            <Link href="/about" className="btn-ghost-light">Our story</Link>
          </div>
        </div>
      </section>
    </div>
  );
}