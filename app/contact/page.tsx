"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Send } from "lucide-react";
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

const FAQS = [
  { q: "How can I join Melbourne Math Circle?", a: "Complete the registration form on the Join Us page. We’ll email session announcements and RSVP links; use each event’s link to sign up for that session." },
  { q: "Is there a fee to attend meetings?", a: "No. Our sessions are free." },
  { q: "How can I support Melbourne Math Circle?", a: "If you’d like to volunteer or ask about bringing a math activity to your school, send us a message." },
  { q: "Can parents attend meetings with their children?", a: "Parents are welcome to attend and observe. We believe family involvement enhances the learning experience." },
  { q: "Do I need any special background to participate?", a: "Not at all. Our events cater to various skill levels — from math novices to competition-ready enthusiasts." },
  { q: "Where are the events held?", a: "Check the session email for the location and arrival details. If anything is unclear, contact us before the meeting." },
  { q: "Are events online or in-person?", a: "The session announcement will say whether to come to a venue or join online, with the details you need to attend." },
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
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await res.json();
      if (result.success) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "", hidden: "" }); }
      else { setStatus("error"); setErrorMsg(result.error || "Submission failed."); }
    } catch { setStatus("error"); setErrorMsg("Network error. Try again later."); }
  };

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* HERO */}
      <section className="hero-dark">
        <div className="serif bg-symbol-hero" aria-hidden="true">∑</div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill reveal" style={{ background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.9)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e7e8e3" }} />
            Get in touch
          </div>
          <h1 className="serif reveal reveal-d1" style={{ marginTop: 20, fontSize: "clamp(3.2rem,6.5vw,6rem)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 300, color: "#fff" }}>
            Contact <em style={{ color: "#e7e8e3", fontStyle: "italic" }}>Us</em>
          </h1>
          <div className="divider reveal reveal-d2" style={{ background: "rgba(255,255,255,.35)", margin: "22px 0 24px" }} />
          <p className="reveal reveal-d3" style={{ maxWidth: 540, fontSize: "clamp(.95rem,1.5vw,1.1rem)", lineHeight: 1.85, color: "rgba(255,255,255,.75)", fontWeight: 300 }}>
            Have questions or want to learn more about Melbourne Math Circle? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="section-space soft-grid" style={{ background: "linear-gradient(180deg,#fff 0%,#f4f3ef 100%)" }}>
        <div className="container">
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "clamp(36px,6vw,80px)", alignItems: "start" }}>
            <div>
              <div className="section-kicker reveal">Send a message</div>
              <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 32 }}>We're happy to<br /><em style={{ color: "#45616b", fontStyle: "italic" }}>hear from you.</em></h2>
              {status === "success" ? (
                <div className="reveal glass-card" style={{ borderRadius: 22, padding: "32px 28px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>✓</div>
                  <div className="serif" style={{ fontSize: "1.6rem", color: "#263238", fontWeight: 400, marginBottom: 10 }}>Message sent!</div>
                  <p className="section-text">We'll get back to you as soon as we can.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <input type="text" name="hidden" value={form.hidden} onChange={handleChange} style={{ display: "none" }} autoComplete="off" tabIndex={-1} />
                  <div className="field reveal reveal-d1"><label htmlFor="name">Name</label><input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" /></div>
                  <div className="field reveal reveal-d2"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@domain.com" /></div>
                  <div className="field reveal reveal-d3"><label htmlFor="subject">Subject</label><input id="subject" name="subject" required value={form.subject} onChange={handleChange} placeholder="What is this regarding?" /></div>
                  <div className="field reveal reveal-d4"><label htmlFor="message">Message</label><textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Your message…" /></div>
                  {errorMsg && <p style={{ color: "#c0392b", fontSize: ".88rem" }}>{errorMsg}</p>}
                  <div className="reveal">
                    <button type="submit" className="btn-primary" disabled={status === "submitting"} style={{ width: "100%", justifyContent: "center" }}>
                      {status === "submitting" ? "Sending…" : <><Send size={15} /> Send Message</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div style={{ paddingTop: 8 }}>
              <div className="section-kicker reveal">Contact information</div>
              <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 32 }}>Reach us<br /><em style={{ color: "#45616b", fontStyle: "italic" }}>directly.</em></h2>
              <div className="reveal reveal-d2">
                <div className="info-chip">
                  <div className="chip-icon"><Mail size={18} /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".9rem", color: "#263238", marginBottom: 6 }}>Email</div>
                    <div style={{ fontSize: ".82rem", color: "#263238", marginBottom: 6 }}>General Inquiries</div>
                    <a href="mailto:eshan.mmc@orlandomathcircle.org" style={{ color: "#45616b", fontWeight: 600, fontSize: ".9rem", textDecoration: "none" }}>eshan.mmc@orlandomathcircle.org</a>
                  </div>
                </div>
              </div>
              <div className="glass-card reveal reveal-d3" style={{ borderRadius: 22, padding: 28, marginTop: 28 }}>
                <div className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, color: "#263238", marginBottom: 12 }}>A chapter of Orlando Math Circle</div>
                <p className="section-text" style={{ fontSize: ".9rem" }}>Melbourne Math Circle is a student-led, free community dedicated to mathematical exploration in the Melbourne, FL area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-space" style={{ background: "#e7e8e3" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-kicker reveal">FAQ</div>
            <h2 className="serif section-title reveal reveal-d1">Frequently asked <em style={{ color: "#45616b", fontStyle: "italic" }}>questions.</em></h2>
          </div>
          <div className="faq-grid reveal reveal-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {FAQS.map((item, i) => (
              <div key={i} className="faq-card">
                <div style={{ fontWeight: 700, fontSize: ".95rem", color: "#263238", marginBottom: 8 }}>{item.q}</div>
                <p style={{ color: "#263238", fontSize: ".9rem", lineHeight: 1.75, fontWeight: 300 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-dark">
        <div className="serif bg-symbol" aria-hidden="true">∂</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-kicker reveal" style={{ color: "#e7e8e3" }}>Join us</div>
          <h2 className="serif reveal reveal-d1" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Ready to explore <em style={{ color: "#e7e8e3", fontStyle: "italic" }}>mathematics</em> with us?
          </h2>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/join-us" className="btn-primary">Join an event <ArrowRight size={16} /></Link>
            <Link href="/about" className="btn-ghost-light">Our story</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
