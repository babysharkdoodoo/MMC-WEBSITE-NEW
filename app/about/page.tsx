"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Users, Brain, Heart } from "lucide-react";
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

const MARQUEE_ITEMS = [
  "Founded 2023","Orlando Math Circle Chapter","Student-Led","Problem Solving",
  "Brevard County","Free Events","Community Impact","Melbourne, FL",
  "Founded 2023","Orlando Math Circle Chapter","Student-Led","Problem Solving",
  "Brevard County","Free Events","Community Impact","Melbourne, FL",
];

const STATS = [
  { val: "2023", label: "Year founded" },
  { val: "100+", label: "Students reached" },
  { val: "20+", label: "Events hosted" },
  { val: "100+", label: "Volunteer hours" },
];

const MISSION_ITEMS = [
  { icon: Star, text: "Create a welcoming space for students to explore mathematics beyond the classroom curriculum." },
  { icon: Users, text: "Foster a community of young mathematicians who support and inspire each other." },
  { icon: Brain, text: "Develop problem-solving skills through engaging meetings and collaborative activities." },
  { icon: Heart, text: "Share the beauty and relevance of mathematics with our broader community." },
];

const VALUES = [
  { title: "Student-Led Meetings", description: "Our meetings are designed and led by students passionate about mathematics, creating an engaging collaborative atmosphere." },
  { title: "Peer Collaboration", description: "We foster an open environment where students work together, sharing ideas and tackling challenges collectively." },
  { title: "Collaborative Problem Solving", description: "We explore challenging problems together, learning from one another's approaches and insights." },
  { title: "Community Outreach", description: "We organize events to share our love for math with the broader community, inspiring curiosity and creativity." },
];

export default function AboutPage() {
  useReveal();

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* HERO */}
      <section className="hero-light soft-grid">
        <div className="serif hide-mobile bg-letter" aria-hidden="true">A</div>
        <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="pill reveal">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#17689e" }} />
            A chapter of Orlando Math Circle
          </div>
          <h1 className="serif reveal reveal-d1" style={{ marginTop: 20, maxWidth: 720, fontSize: "clamp(3.4rem,7vw,6.6rem)", lineHeight: 0.94, letterSpacing: "-0.035em", fontWeight: 300, color: "#0a2d44" }}>
            About <em style={{ color: "#17689e", fontStyle: "italic" }}>Us</em>
          </h1>
          <div className="divider reveal reveal-d2" />
          <p className="reveal reveal-d3" style={{ maxWidth: 560, fontSize: "clamp(1rem,1.65vw,1.12rem)", lineHeight: 1.85, color: "#4c6b7f", fontWeight: 300 }}>
            Discover the story of Melbourne Math Circle, how we started, what we believe, and why we build community around mathematical thinking.
          </p>
          <div className="reveal reveal-d4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">Join us <ArrowRight size={16} /></Link>
            <Link href="/team" className="btn-secondary">Meet the team</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap" style={{ background: "#17689e", padding: "14px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} style={{ color: "rgba(255,255,255,.92)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".11em", textTransform: "uppercase", padding: "0 30px", display: "inline-flex", alignItems: "center", gap: 28, whiteSpace: "nowrap" }}>
              {item}<span style={{ opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ background: "#f4f9fc", padding: "clamp(54px,8vw,88px) 0" }}>
        <div className="container">
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
            {STATS.map((s, i) => (
              <div key={i} className={`stat-card reveal reveal-d${(i % 4) + 1}`}>
                <div className="serif" style={{ fontSize: "clamp(2.7rem,4vw,4rem)", lineHeight: 1, color: "#17689e", fontWeight: 600, marginBottom: 10 }}>{s.val}</div>
                <div style={{ color: "#4c6b7f", fontSize: ".92rem", lineHeight: 1.6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section style={{ background: "#fff", padding: "clamp(72px,10vw,118px) 0" }}>
        <div className="container">
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,72px)", alignItems: "center" }}>
            <div className="img-rounded reveal" style={{ aspectRatio: "4/3" }}>
              <Image src="/about_1.jpg" alt="Melbourne Math Circle origin story" width={600} height={450} sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
            </div>
            <div>
              <div className="section-kicker reveal">Our origin story</div>
              <h2 className="serif section-title reveal reveal-d1">Built by students,<br /><em style={{ color: "#17689e", fontStyle: "italic" }}>for students.</em></h2>
              <div className="divider reveal reveal-d1" />
              <p className="section-text reveal reveal-d2" style={{ marginBottom: 16 }}>Melbourne Math Circle, a chapter of the Orlando Math Circle (OMC), was founded in 2023 by a group of high school students inspired by their experiences at OMC.</p>
              <p className="section-text reveal reveal-d3" style={{ marginBottom: 16 }}>It began when students saw the impact of older peers at OMC and wanted to bring those opportunities closer to home in Melbourne.</p>
              <p className="section-text reveal reveal-d4">Through close collaboration with our parent organization, we have built a vibrant community of young thinkers who believe math is about curiosity, creativity, and seeing the world more clearly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION (dark) */}
      <section style={{ background: "linear-gradient(180deg,#0a2d44 0%,#082638 100%)", padding: "clamp(72px,10vw,118px) 0", position: "relative", overflow: "hidden" }}>
        <div className="serif hide-mobile bg-symbol" aria-hidden="true">∑</div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,72px)", alignItems: "center" }}>
            <div>
              <div className="section-kicker-light reveal">Our purpose</div>
              <h2 className="serif reveal reveal-d1" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.12, fontWeight: 400, color: "#fff", marginBottom: 10 }}>
                Our <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>Mission</em>
              </h2>
              <div style={{ width: 44, height: 2, background: "#8fd0ef", borderRadius: 999, margin: "18px 0 24px" }} className="reveal reveal-d1" />
              <p className="reveal reveal-d2" style={{ color: "rgba(255,255,255,.76)", lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>
                At Melbourne Math Circle, we believe mathematics is a creative, collaborative, and joyful pursuit, accessible to every curious mind regardless of background or experience.
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                {MISSION_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className={`mission-item reveal reveal-d${Math.min(i + 2, 4)}`}>
                      <div className="mission-icon"><Icon size={20} /></div>
                      <p style={{ color: "rgba(255,255,255,.86)", lineHeight: 1.7, fontWeight: 300, fontSize: ".95rem" }}>{item.text}</p>
                    </div>
                  );
                })}
              </div>
              <div className="reveal reveal-d4" style={{ marginTop: 32 }}>
                <Link href="/join-us" className="btn-primary">Join our mission <ArrowRight size={16} /></Link>
              </div>
            </div>
            <div className="img-rounded reveal reveal-d2" style={{ aspectRatio: "1/1" }}>
              <Image src="/about_2.jpg" alt="Melbourne Math Circle mission" width={500} height={500} sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div style={{ maxWidth: 680, marginBottom: 48 }}>
            <div className="section-kicker reveal">By students, for students</div>
            <h2 className="serif section-title reveal reveal-d1">What sets us apart is who runs it.</h2>
            <div className="divider reveal reveal-d1" />
            <p className="section-text reveal reveal-d2">Melbourne Math Circle is entirely driven and led by high school students. Peer-to-peer learning empowers everyone to ask questions, explore new ideas, and take intellectual risks in an environment where everyone genuinely gets it.</p>
          </div>
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
            {VALUES.map((item, i) => (
              <div key={i} className="value-card reveal reveal-d1">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#17689e", color: "#fff", display: "grid", placeItems: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, position: "relative", zIndex: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0a2d44", marginBottom: 10, position: "relative", zIndex: 1 }}>{item.title}</div>
                <div style={{ color: "#4c6b7f", lineHeight: 1.7, fontWeight: 300, fontSize: ".9rem", position: "relative", zIndex: 1 }}>{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ background: "#fff", padding: "clamp(64px,9vw,96px) 0", borderTop: "1px solid #e1edf5", borderBottom: "1px solid #e1edf5" }}>
        <div className="container" style={{ maxWidth: 860, textAlign: "center" }}>
          <div className="serif reveal" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.32, color: "#0a2d44" }}>
            Math is not a subject you are born good or bad at. It is a way of thinking, and anyone can learn to enjoy it.
          </div>
          <div className="reveal reveal-d1" style={{ marginTop: 22, fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#17689e" }}>Melbourne Math Circle</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-dark">
        <div className="serif hide-mobile bg-symbol" aria-hidden="true">∮</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker-light">Get involved</div>
          <h2 className="serif reveal" style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Ready to join the <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>circle</em>?
          </h2>
          <p className="section-text reveal reveal-d1" style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18 }}>Whether you are a math enthusiast or simply curious, we welcome all school students to our vibrant, student-led community.</p>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">Attend a meeting <ArrowRight size={16} /></Link>
            <Link href="/team" className="btn-ghost-light">Meet our team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}