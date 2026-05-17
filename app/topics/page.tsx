"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";
import { getAllTopics } from "@/lib/topics";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const MARQUEE_ITEMS = [
  "Number Theory",
  "Graph Theory",
  "Topology",
  "Game Theory",
  "Fractals & Chaos",
  "Combinatorics",
  "Cryptography",
  "Probability",
  "Number Theory",
  "Graph Theory",
  "Topology",
  "Game Theory",
  "Fractals & Chaos",
  "Combinatorics",
  "Cryptography",
  "Probability",
];

const CONNECTIONS = [
  {
    a: "Number Theory",
    b: "Cryptography",
    aId: "number-theory",
    bId: "cryptography",
    desc: "Prime number properties are the mathematical foundation of RSA encryption, the algorithm securing HTTPS connections across the internet.",
  },
  {
    a: "Topology",
    b: "Graph Theory",
    aId: "topology",
    bId: "graph-theory",
    desc: "Both study structure and connectivity: one through continuous deformation, the other through discrete networks.",
  },
  {
    a: "Fractals",
    b: "Probability",
    aId: "fractals",
    bId: "probability",
    desc: "Chaos theory reveals how deterministic rules can generate unpredictable behavior, bridging fractal geometry and probabilistic thinking.",
  },
];

export default function TopicsPage() {
  useReveal();
  const topics = getAllTopics();

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>
      <style>{`
        .topic-card {
          border: 1px solid rgba(23,104,158,.10);
          background: rgba(255,255,255,.92);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(10,45,68,.06);
          display: flex;
          flex-direction: column;
          transition: box-shadow .28s ease, border-color .28s ease, background-color .28s ease;
          text-decoration: none;
          color: inherit;
          height: 100%;
          min-height: 520px;
          backdrop-filter: blur(8px);
        }
        .topic-card:hover {
          box-shadow: 0 22px 52px rgba(10,45,68,.12);
          border-color: rgba(23,104,158,.24);
        }
        .topic-card-img {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #eaf4fb;
          flex-shrink: 0;
        }
        .topic-card-img img {
          transition: transform .6s cubic-bezier(0.16,1,0.3,1);
        }
        .topic-card:hover .topic-card-img img {
          transform: scale(1.05);
        }
        .topic-card-body {
          padding: 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: #e7f4fb;
          color: #17689e;
          display: grid;
          place-items: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 14px;
          flex-shrink: 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.65);
        }
        .connection-card {
          border: 1px solid rgba(23,104,158,.10);
          background: rgba(255,255,255,.92);
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 10px 26px rgba(10,45,68,.05);
          transition: box-shadow .22s ease, border-color .22s ease, background-color .22s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 210px;
          backdrop-filter: blur(8px);
        }
        .connection-card:hover {
          border-color: rgba(23,104,158,.24);
          box-shadow: 0 18px 40px rgba(10,45,68,.09);
        }
        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #17689e;
          font-weight: 700;
          letter-spacing: .07em;
          text-transform: uppercase;
          font-size: .78rem;
        }
        .topic-meta {
          font-size: .72rem;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #17689e;
          margin-bottom: 6px;
        }
      `}</style>

      <section className="hero-light soft-grid">
        <div className="serif hide-mobile bg-letter" aria-hidden="true">F</div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill reveal">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#17689e",
              }}
            />
            Mathematical fields
          </div>

          <h1
            className="serif reveal reveal-d1"
            style={{
              marginTop: 20,
              fontSize: "clamp(3.2rem,6.5vw,6.4rem)",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              fontWeight: 300,
              color: "#0a2d44",
              maxWidth: 720,
            }}
          >
            Fields We <em style={{ color: "#17689e", fontStyle: "italic" }}>Orbit</em>
          </h1>

          <div className="divider reveal reveal-d2" />

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
            Explore the branches of mathematics we cover in our sessions, from the structure of integers to the mathematics of infinite complexity.
          </p>

          <div
            className="reveal reveal-d4"
            style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}
          >
            <Link href="/join-us" className="btn-primary">
              Join a session <ArrowRight size={16} />
            </Link>
            <Link href="/fun-math-problems" className="btn-secondary">
              Try some problems
            </Link>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" style={{ background: "#17689e", padding: "14px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                color: "rgba(255,255,255,.92)",
                fontSize: ".78rem",
                fontWeight: 700,
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
              <span style={{ opacity: 0.35 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      <section style={{ background: "#f4f9fc", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div className="section-kicker reveal">All topics</div>
          <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 40 }}>
            Where curiosity <em style={{ color: "#17689e", fontStyle: "italic" }}>leads.</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 28,
              alignItems: "stretch",
            }}
          >
            {topics.map((topic, i) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="topic-card reveal"
                style={{ transitionDelay: `${(i % 4) * 0.05}s` }}
              >
                <div className="topic-card-img">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width:900px) 100vw, 25vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(10,45,68,.55) 0%, transparent 62%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {topic.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "rgba(255,255,255,.18)",
                            backdropFilter: "blur(6px)",
                            color: "rgba(255,255,255,.9)",
                            fontSize: ".68rem",
                            fontWeight: 600,
                            letterSpacing: ".07em",
                            padding: "3px 9px",
                            borderRadius: 999,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="topic-card-body">
                  <div className="icon-badge">{topic.icon}</div>

                  <div className="topic-meta">{topic.level}</div>

                  <div
                    className="serif"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 400,
                      color: "#0a2d44",
                      lineHeight: 1.1,
                      marginBottom: 6,
                    }}
                  >
                    {topic.title}
                  </div>

                  <div
                    style={{
                      fontSize: ".8rem",
                      color: "#7a9eb0",
                      fontStyle: "italic",
                      marginBottom: 12,
                    }}
                  >
                    {topic.tagline}
                  </div>

                  <p
                    style={{
                      color: "#4c6b7f",
                      fontSize: ".86rem",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      marginBottom: 16,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {topic.description}
                  </p>

                  <div className="cta-link" style={{ marginTop: "auto" }}>
                    Explore <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "clamp(72px,10vw,112px) 0",
          borderTop: "1px solid #e1edf5",
        }}
      >
        <div className="container">
          <div className="section-kicker reveal">Featured topic</div>
          <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 40 }}>
            Fractals & <em style={{ color: "#17689e", fontStyle: "italic" }}>Chaos Theory</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(280px, 0.95fr) minmax(320px, 1.05fr)",
              gap: "clamp(28px,5vw,64px)",
              alignItems: "center",
            }}
          >
            <div
              className="reveal"
              style={{
                position: "relative",
                aspectRatio: "1/1",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(10,45,68,.12)",
                border: "1px solid rgba(23,104,158,.08)",
                background: "#eaf4fb",
              }}
            >
              <Image
                src="/placeholder.svg?height=500&width=500&text=Mandelbrot+Set"
                alt="Mandelbrot Set"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <p className="section-text reveal" style={{ marginBottom: 18 }}>
                Fractals arise from iterating simple rules indefinitely. The Mandelbrot set, one of the most complex objects in mathematics, emerges from a single equation: <strong>z → z² + c</strong>.
              </p>
              <p className="section-text reveal reveal-d1" style={{ marginBottom: 18 }}>
                Chaos theory shows that deterministic systems can still produce unpredictable outcomes, often described as the butterfly effect. Weather, ecosystems, and financial markets are all chaotic in this precise sense.
              </p>

              <div
                className="reveal reveal-d2"
                style={{
                  borderRadius: 18,
                  padding: 20,
                  marginBottom: 24,
                  border: "1px solid rgba(23,104,158,.10)",
                  background: "rgba(255,255,255,.92)",
                  boxShadow: "0 10px 26px rgba(10,45,68,.05)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: ".8rem",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#17689e",
                    marginBottom: 8,
                  }}
                >
                  Did you know?
                </div>
                <p style={{ color: "#4c6b7f", fontSize: ".9rem", lineHeight: 1.7, fontWeight: 300 }}>
                  The Mandelbrot set has infinite perimeter but finite area, and fractal antennas inspired by it are used in modern smartphones.
                </p>
              </div>

              <div className="reveal reveal-d3">
                <Link href="/topics/fractals" className="btn-primary">
                  Explore fractals <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#eaf4fb", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div className="section-kicker reveal">Cross-field connections</div>
          <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 36 }}>
            Mathematics is <em style={{ color: "#17689e", fontStyle: "italic" }}>one unified story.</em>
          </h2>
          <p className="section-text reveal reveal-d2" style={{ maxWidth: 560, marginBottom: 40 }}>
            One of the most beautiful aspects of mathematics is how separate-seeming fields are deeply intertwined.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 22,
              alignItems: "stretch",
            }}
          >
            {CONNECTIONS.map((c, i) => (
              <div key={i} className={`connection-card reveal reveal-d${i + 1}`}>
                <p
                  style={{
                    color: "#4c6b7f",
                    fontSize: ".9rem",
                    lineHeight: 1.75,
                    fontWeight: 300,
                    marginBottom: 20,
                  }}
                >
                  {c.desc}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <Link href={`/topics/${c.aId}`} className="cta-link" style={{ fontSize: ".76rem" }}>
                    {c.a} <ChevronRight size={14} />
                  </Link>
                  <Link href={`/topics/${c.bId}`} className="cta-link" style={{ fontSize: ".76rem" }}>
                    {c.b} <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-dark">
        <div className="serif hide-mobile bg-symbol" aria-hidden="true">∞</div>

        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-kicker-light reveal">Explore in person</div>
          <h2
            className="serif reveal reveal-d1"
            style={{
              color: "#fff",
              fontSize: "clamp(2.2rem,4.5vw,3.6rem)",
              lineHeight: 1.1,
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Come explore these <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>ideas with us.</em>
          </h2>

          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/join-us" className="btn-primary">
              Join an event <ArrowRight size={15} />
            </Link>
            <Link href="/fun-math-problems" className="btn-ghost-light">
              Try problems
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}