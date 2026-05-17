"use client";

import { useEffect, useState } from "react";
import { Mail, Send } from "lucide-react";

// ── Shared design tokens (mirrors homepage) ──────────────────────────────────
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
  .btn-primary:disabled { opacity: .6; cursor: not-allowed; transform: none; }
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

  /* Form elements */
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label { font-size: .78rem; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: #0a2d44; }
  .field input, .field textarea {
    font-family: 'Outfit', sans-serif;
    font-size: .95rem; font-weight: 300;
    padding: 13px 16px; border-radius: 12px;
    border: 1.5px solid rgba(23,104,158,.18);
    background: #f9fcfe; color: #0a2d44;
    outline: none; resize: vertical;
    transition: border-color .2s ease, box-shadow .2s ease;
  }
  .field input:focus, .field textarea:focus {
    border-color: #17689e;
    box-shadow: 0 0 0 3px rgba(23,104,158,.10);
  }
  .field input::placeholder, .field textarea::placeholder { color: #a0b8c8; }

  /* FAQ card */
  .faq-card {
    border: 1px solid rgba(23,104,158,.10);
    background: rgba(255,255,255,.82);
    border-radius: 18px; padding: 24px 26px;
    box-shadow: 0 6px 24px rgba(10,45,68,.05);
    transition: transform .22s ease, box-shadow .22s ease;
  }
  .faq-card:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(10,45,68,.09); }

  /* Hero */
  .hero-contact {
    min-height: 46vh;
    display: flex; align-items: center;
    background: linear-gradient(160deg, #0a2d44 0%, #17689e 100%);
    position: relative; overflow: hidden;
    padding: clamp(72px,10vw,110px) 0;
  }
  .hero-contact::after {
    content: '∑';
    font-family: 'Cormorant Garamond', serif;
    position: absolute; right: -0.04em; bottom: -0.18em;
    font-size: clamp(180px,24vw,340px); font-weight: 700; line-height: 1;
    color: rgba(255,255,255,.05); pointer-events: none; user-select: none;
  }

  /* Info chip */
  .info-chip {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 20px 22px; border-radius: 18px;
    border: 1px solid rgba(23,104,158,.12);
    background: #f4f9fc;
    transition: border-color .2s ease;
  }
  .info-chip:hover { border-color: rgba(23,104,158,.4); }
  .chip-icon {
    width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
    display: grid; place-items: center;
    background: #e7f4fb; color: #17689e;
  }

  @media (max-width: 900px) {
    .split-grid { grid-template-columns: 1fr !important; }
    .faq-grid   { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 560px) {
    .container { width: min(100% - 32px, 1120px); }
  }
`;

// ── Scroll reveal hook ────────────────────────────────────────────────────────
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

const FAQS = [
  { q: "How can I join Melbourne Math Circle?", a: "Register for our next meeting on the Join Us page and fill out the registration form." },
  { q: "Is there a fee to attend meetings?", a: "No — our meetings are completely free. We're a nonprofit dedicated to making mathematics accessible to all students." },
  { q: "How can I support Melbourne Math Circle?", a: "We welcome volunteers and donations. Reach out directly for more information." },
  { q: "Can parents attend meetings with their children?", a: "Parents are welcome to attend and observe. We believe family involvement enhances the learning experience." },
  { q: "Do I need any special background to participate?", a: "Not at all. Our events cater to various skill levels — from math novices to competition-ready enthusiasts." },
  { q: "Where are the events held?", a: "Events take place at a variety of local venues around Melbourne, FL, and occasionally online. Check the Join Us page for details." },
  { q: "Are events online or in-person?", a: "We host both. Some sessions are fully online; others happen in-person. We note location details in each event listing." },
  { q: "How can I stay updated on future events?", a: "Sign up once on the Join Us page and we'll email RSVP links whenever a new event is scheduled." },
];

export default function ContactPage() {
  useReveal();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", hidden: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (form.hidden.trim() !== "") { setErrorMsg("Spam detected."); return; }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", hidden: "" });
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Submission failed.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again later.");
    }
  };

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="hero-contact">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill reveal" style={{ background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.9)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8fd0ef" }} />
            Get in touch
          </div>
          <h1
            className="serif reveal reveal-d1"
            style={{
              marginTop: 20,
              fontSize: "clamp(3.2rem,6.5vw,6rem)",
              lineHeight: 0.95, letterSpacing: "-0.03em",
              fontWeight: 300, color: "#fff",
            }}
          >
            Contact <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>Us</em>
          </h1>
          <div className="divider reveal reveal-d2" style={{ background: "rgba(255,255,255,.35)", margin: "22px 0 24px" }} />
          <p
            className="reveal reveal-d3"
            style={{ maxWidth: 540, fontSize: "clamp(.95rem,1.5vw,1.1rem)", lineHeight: 1.85, color: "rgba(255,255,255,.75)", fontWeight: 300 }}
          >
            Have questions or want to learn more about Melbourne Math Circle?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="soft-grid" style={{ background: "linear-gradient(180deg,#fff 0%,#f4f9fc 100%)", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div
            className="split-grid"
            style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "clamp(36px,6vw,80px)", alignItems: "start" }}
          >
            {/* ── Form ── */}
            <div>
              <div className="section-kicker reveal">Send a message</div>
              <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 32 }}>
                We're happy to<br />
                <em style={{ color: "#17689e", fontStyle: "italic" }}>hear from you.</em>
              </h2>

              {status === "success" ? (
                <div
                  className="reveal glass-card"
                  style={{ borderRadius: 22, padding: "32px 28px", textAlign: "center" }}
                >
                  <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>✓</div>
                  <div className="serif" style={{ fontSize: "1.6rem", color: "#0a2d44", fontWeight: 400, marginBottom: 10 }}>
                    Message sent!
                  </div>
                  <p className="section-text">We'll get back to you as soon as we can.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Honeypot */}
                  <input type="text" name="hidden" value={form.hidden} onChange={handleChange} style={{ display: "none" }} autoComplete="off" tabIndex={-1} />

                  <div className="field reveal reveal-d1">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
                  </div>
                  <div className="field reveal reveal-d2">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@domain.com" />
                  </div>
                  <div className="field reveal reveal-d3">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" required value={form.subject} onChange={handleChange} placeholder="What is this regarding?" />
                  </div>
                  <div className="field reveal reveal-d4">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Your message…" />
                  </div>

                  {errorMsg && <p style={{ color: "#c0392b", fontSize: ".88rem" }}>{errorMsg}</p>}

                  <div className="reveal">
                    <button type="submit" className="btn-primary" disabled={status === "submitting"} style={{ width: "100%", justifyContent: "center" }}>
                      {status === "submitting" ? "Sending…" : <><Send size={15} /> Send Message</>}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Info ── */}
            <div style={{ paddingTop: 8 }}>
              <div className="section-kicker reveal">Contact information</div>
              <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 32 }}>
                Reach us<br />
                <em style={{ color: "#17689e", fontStyle: "italic" }}>directly.</em>
              </h2>

              <div className="reveal reveal-d2">
                <div className="info-chip">
                  <div className="chip-icon"><Mail size={18} /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".9rem", color: "#0a2d44", marginBottom: 6 }}>Email</div>
                    <div style={{ fontSize: ".82rem", color: "#4c6b7f", marginBottom: 6 }}>General Inquiries</div>
                    <a
                      href="mailto:eshan.mmc@orlandomathcircle.org"
                      style={{ color: "#17689e", fontWeight: 600, fontSize: ".9rem", textDecoration: "none" }}
                    >
                      eshan.mmc@orlandomathcircle.org
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card reveal reveal-d3" style={{ borderRadius: 22, padding: 28, marginTop: 28 }}>
                <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, color: "#0a2d44", marginBottom: 12 }}>
                  A chapter of Orlando Math Circle
                </div>
                <p className="section-text" style={{ fontSize: ".9rem" }}>
                  Melbourne Math Circle is a student-led, free community dedicated to mathematical exploration in the Melbourne, FL area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-kicker reveal">FAQ</div>
            <h2 className="serif section-title reveal reveal-d1">
              Frequently asked <em style={{ color: "#17689e", fontStyle: "italic" }}>questions.</em>
            </h2>
          </div>

          <div
            className="faq-grid reveal reveal-d2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {FAQS.map((item, i) => (
              <div key={i} className="faq-card">
                <div style={{ fontWeight: 700, fontSize: ".95rem", color: "#0a2d44", marginBottom: 8 }}>{item.q}</div>
                <p style={{ color: "#4c6b7f", fontSize: ".9rem", lineHeight: 1.75, fontWeight: 300 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)", padding: "clamp(72px,10vw,100px) 0", position: "relative", overflow: "hidden" }}>
        <div className="serif" style={{ position: "absolute", right: "-0.04em", bottom: "-0.14em", fontSize: "clamp(180px,25vw,340px)", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.04)", userSelect: "none", pointerEvents: "none" }}>
          ∂
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-kicker reveal" style={{ color: "#8bc4e2" }}>Join us</div>
          <h2 className="serif reveal reveal-d1" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Ready to explore <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>mathematics</em> with us?
          </h2>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <a href="/join-us" className="btn-primary">Join an event</a>
            <a href="/about" className="btn-secondary" style={{ color: "rgba(255,255,255,.9)", borderColor: "rgba(255,255,255,.22)" }}>Our story</a>
          </div>
        </div>
      </section>
    </div>
  );
}