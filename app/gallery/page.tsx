"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

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
  .btn-ghost-light {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 48px; padding: 0 24px; border-radius: 999px; text-decoration: none;
    transition: transform .2s ease, border-color .2s ease, background .2s ease;
    font-size: .82rem; font-weight: 700;
    letter-spacing: .09em; text-transform: uppercase; white-space: nowrap;
    color: rgba(255,255,255,.9); border: 1.5px solid rgba(255,255,255,.25);
  }
  .btn-ghost-light:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.65); background: rgba(255,255,255,.06); }

  /* ── Typography ── */
  .section-kicker { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #17689e; margin-bottom: 14px; }
  .section-kicker-light { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #8bc4e2; margin-bottom: 14px; }
  .divider { width: 44px; height: 2px; background: #17689e; border-radius: 999px; margin: 18px 0; }

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

  /* ── Filter tabs ── */
  .filter-bar {
    display: flex; gap: 8px; flex-wrap: wrap;
  }
  .filter-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 18px; border-radius: 999px;
    font-size: .78rem; font-weight: 600;
    letter-spacing: .07em; text-transform: uppercase;
    border: 1.5px solid rgba(23,104,158,.18);
    background: transparent; color: #4c6b7f;
    cursor: pointer;
    transition: background .2s ease, color .2s ease, border-color .2s ease, transform .15s ease;
  }
  .filter-btn:hover { border-color: #17689e; color: #17689e; transform: translateY(-1px); }
  .filter-btn.active { background: #17689e; color: #fff; border-color: #17689e; }
  .filter-btn .count {
    background: rgba(255,255,255,.22); color: inherit;
    font-size: .68rem; padding: 1px 6px; border-radius: 999px;
    font-weight: 700;
  }
  .filter-btn:not(.active) .count { background: rgba(23,104,158,.1); }

  /* ── Section label ── */
  .gallery-section-label {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 24px;
  }
  .gallery-section-label-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 400; color: #0a2d44;
    white-space: nowrap;
  }
  .gallery-section-label-line {
    flex: 1; height: 1px; background: rgba(23,104,158,.15);
  }
  .gallery-section-label-count {
    font-size: .72rem; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #17689e;
    white-space: nowrap;
  }

  /* ── Photo grid ── */
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  /* ── Photo card ── */
  .photo-card {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    background: #eaf4fb;
    cursor: pointer;
    aspect-ratio: 4/3;
    box-shadow: 0 4px 16px rgba(10,45,68,.07);
    transition: transform .3s cubic-bezier(0.16,1,0.3,1), box-shadow .3s ease;
  }
  .photo-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 16px 40px rgba(10,45,68,.14);
  }
  .photo-card img {
    display: block; width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .5s cubic-bezier(0.16,1,0.3,1);
  }
  .photo-card:hover img { transform: scale(1.06); }
  .photo-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,45,68,.55) 0%, transparent 55%);
    opacity: 0;
    transition: opacity .3s ease;
    display: flex; align-items: flex-end;
    padding: 14px;
  }
  .photo-card:hover .photo-card-overlay { opacity: 1; }
  .photo-card-caption {
    color: rgba(255,255,255,.92); font-size: .75rem;
    font-weight: 500; line-height: 1.3;
  }

  /* ── Lightbox ── */
  .lightbox-backdrop {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(8,38,56,.96);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: fadeIn .2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .lightbox-inner {
    position: relative;
    width: 100%; max-width: 960px;
    animation: slideUp .25s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .lightbox-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 16px;
    overflow: hidden;
    background: #0a2d44;
    box-shadow: 0 40px 80px rgba(0,0,0,.5);
  }
  .lightbox-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px; border-radius: 999px;
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
    display: grid; place-items: center; cursor: pointer;
    color: #fff; backdrop-filter: blur(8px);
    transition: background .2s ease, transform .2s ease;
  }
  .lightbox-nav:hover { background: rgba(255,255,255,.22); transform: translateY(-50%) scale(1.08); }
  .lightbox-nav.prev { left: -56px; }
  .lightbox-nav.next { right: -56px; }
  .lightbox-close {
    position: absolute; top: -48px; right: 0;
    width: 36px; height: 36px; border-radius: 999px;
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);
    display: grid; place-items: center; cursor: pointer; color: #fff;
    transition: background .2s ease;
  }
  .lightbox-close:hover { background: rgba(255,255,255,.22); }
  .lightbox-meta {
    margin-top: 16px; text-align: center;
  }
  .lightbox-caption { color: rgba(255,255,255,.85); font-size: .9rem; font-weight: 300; }
  .lightbox-counter { color: rgba(255,255,255,.4); font-size: .75rem; margin-top: 4px; letter-spacing: .06em; }

  /* ── Responsive ── */
  @media (max-width: 1024px) { .photo-grid { grid-template-columns: repeat(3,1fr) !important; } }
  @media (max-width: 900px) {
    .hide-mobile { display: none !important; }
    .photo-grid  { grid-template-columns: repeat(2,1fr) !important; }
    .lightbox-nav.prev { left: 8px; }
    .lightbox-nav.next { right: 8px; }
  }
  @media (max-width: 560px) {
    .container { width: min(100% - 32px, 1120px); }
    .photo-grid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }
  }
`;

type Category = "all" | "monthly-meetings" | "indiafest";

const galleryImages = [
  // Monthly Meetings
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    src: `/photos/monthly_meetings/${i + 1}.png`,
    alt: `Monthly Meeting Photo #${i + 1}`,
    caption: `Monthly Meeting · #${i + 1}`,
    category: "monthly-meetings" as const,
  })),
  // IndiaFest
  ...Array.from({ length: 3 }, (_, i) => ({
    id: 16 + i,
    src: `/Photos/IndiaFest/${i + 1}.png`,
    alt: `IndiaFest Photo #${i + 1}`,
    caption: `IndiaFest · #${i + 1}`,
    category: "indiafest" as const,
  })),
];

const SECTIONS: Array<{ key: Exclude<Category,"all">; label: string }> = [
  { key: "monthly-meetings", label: "Monthly Meetings" },
  { key: "indiafest",        label: "IndiaFest" },
];

const MARQUEE_ITEMS = [
  "Monthly Meetings", "IndiaFest", "Melbourne, FL", "Student-Led Events",
  "Community Impact", "Math Outreach", "Problem Solving", "Founded 2023",
  "Monthly Meetings", "IndiaFest", "Melbourne, FL", "Student-Led Events",
  "Community Impact", "Math Outreach", "Problem Solving", "Founded 2023",
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function GalleryPage() {
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  useReveal();

  const lightboxImage = galleryImages.find((img) => img.id === lightboxId) ?? null;
  const lightboxIndex = lightboxImage ? galleryImages.findIndex((img) => img.id === lightboxId) : -1;

  const navigate = useCallback((dir: "prev" | "next") => {
    if (lightboxIndex < 0) return;
    const next = dir === "prev"
      ? (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
      : (lightboxIndex + 1) % galleryImages.length;
    setLightboxId(galleryImages[next].id);
  }, [lightboxIndex]);

  const close = useCallback(() => setLightboxId(null), []);

  useEffect(() => {
    if (lightboxId === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxId, navigate, close]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxId !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxId]);

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section
        className="soft-grid"
        style={{
          minHeight: "60vh",
          position: "relative", overflow: "hidden",
          background: "linear-gradient(180deg,#ffffff 0%,#f7fbfe 60%,#ffffff 100%)",
          padding: "clamp(64px,10vw,120px) 0 clamp(48px,7vw,88px)",
          display: "flex", alignItems: "center",
        }}
      >
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
          G
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="pill reveal">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#17689e" }} />
            Melbourne Math Circle
          </div>

          <h1
            className="serif reveal reveal-d1"
            style={{
              marginTop: 20, maxWidth: 680,
              fontSize: "clamp(3.4rem,7vw,6.5rem)",
              lineHeight: 0.95, letterSpacing: "-0.03em",
              fontWeight: 300, color: "#0a2d44",
            }}
          >
            Our{" "}
            <em style={{ color: "#17689e", fontStyle: "italic" }}>Gallery</em>
          </h1>

          <div className="divider reveal reveal-d2" />

          <p
            className="reveal reveal-d3"
            style={{
              maxWidth: 500,
              fontSize: "clamp(1rem,1.65vw,1.12rem)",
              lineHeight: 1.85, color: "#4c6b7f", fontWeight: 300,
            }}
          >
            A look at our meetings, events, and the community we're building — one session at a time.
          </p>
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

      {/* ── GALLERY ── */}
      <section style={{ background: "#f4f9fc", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">

          {/* Header row + filter */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <div>
              <div className="section-kicker reveal">Browse photos</div>
              <h2
                className="serif reveal reveal-d1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.12, fontWeight: 400, color: "#0a2d44" }}
              >
                Moments worth sharing.
              </h2>
            </div>

          </div>

          <div style={{ display: "grid", gap: 56 }}>
            {SECTIONS.map(({ key, label }) => {
              const imgs = galleryImages.filter((img) => img.category === key);
              return (
                <div key={key} className="reveal">
                  <div className="gallery-section-label">
                    <span className="gallery-section-label-text">{label}</span>
                    <span className="gallery-section-label-line" />
                    <span className="gallery-section-label-count">{imgs.length} photos</span>
                  </div>
                  <div className="photo-grid">
                    {imgs.map((img, i) => (
                      <div
                        key={img.id}
                        className="photo-card"
                        style={{ animationDelay: `${i * 0.04}s` }}
                        onClick={() => setLightboxId(img.id)}
                        role="button"
                        aria-label={`Open ${img.caption}`}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setLightboxId(img.id)}
                      >
                        <Image src={img.src} alt={img.alt} fill sizes="(max-width:560px) 50vw,(max-width:900px) 33vw,25vw" />
                        <div className="photo-card-overlay">
                          <span className="photo-card-caption">{img.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SUBMIT CTA ── */}
      <section style={{ background: "#fff", padding: "clamp(64px,9vw,96px) 0", borderTop: "1px solid #e1edf5" }}>
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(24px,4vw,48px)", alignItems: "center" }}
            className="split-grid"
          >
            <div>
              <div className="section-kicker reveal">Share a moment</div>
              <h2
                className="serif reveal reveal-d1"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1.15, fontWeight: 400, color: "#0a2d44", maxWidth: 520 }}
              >
                Have a photo from one of our events?
              </h2>
              <p
                className="reveal reveal-d2"
                style={{ marginTop: 14, color: "#4c6b7f", lineHeight: 1.85, fontWeight: 300, maxWidth: 440 }}
              >
                Send us your snapshots from Monthly Meetings or IndiaFest and we'll add them to the gallery.
              </p>
            </div>
            <div className="reveal reveal-d2" style={{ flexShrink: 0 }}>
              <Link href="/contact#submit-photos" className="btn-primary">
                Submit photos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA DARK ── */}
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
          ∞
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker-light">Get involved</div>
          <h2
            className="serif reveal"
            style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300 }}
          >
            Want to be part of the{" "}
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>story</em>?
          </h2>
          <p
            className="reveal reveal-d1"
            style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18, lineHeight: 1.85, fontWeight: 300 }}
          >
            Attend a session and be part of the community we're building in Melbourne, FL.
          </p>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">
              Join an event <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-ghost-light">About us</Link>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxId !== null && lightboxImage && (
        <div
          className="lightbox-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="lightbox-inner">
            {/* Close */}
            <button className="lightbox-close" onClick={close} aria-label="Close lightbox">
              <X size={16} />
            </button>

            {/* Prev */}
            <button
              className="lightbox-nav prev hide-mobile"
              onClick={() => navigate("prev")}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image */}
            <div className="lightbox-img-wrap">
              <Image
                key={lightboxImage.id}
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Next */}
            <button
              className="lightbox-nav next hide-mobile"
              onClick={() => navigate("next")}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Meta */}
            <div className="lightbox-meta">
              <p className="lightbox-caption">{lightboxImage.caption}</p>
              <p className="lightbox-counter">
                {lightboxIndex + 1} / {galleryImages.length} &nbsp;·&nbsp; ← → to navigate &nbsp;·&nbsp; ESC to close
              </p>
            </div>

            {/* Mobile nav */}
            <div
              style={{
                display: "flex", justifyContent: "center", gap: 12, marginTop: 16,
              }}
              className="mobile-nav"
            >
              <button
                onClick={() => navigate("prev")}
                style={{
                  background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)",
                  borderRadius: 999, padding: "10px 20px", color: "#fff", cursor: "pointer",
                  fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase",
                }}
              >
                ← Prev
              </button>
              <button
                onClick={() => navigate("next")}
                style={{
                  background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)",
                  borderRadius: 999, padding: "10px 20px", color: "#fff", cursor: "pointer",
                  fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}