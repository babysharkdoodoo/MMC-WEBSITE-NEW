"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";

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

type Category = "all" | "monthly-meetings" | "indiafest" | "university-park";

const galleryImages = [
  ...Array.from({ length: 15 }, (_, i) => ({ id: i + 1, src: `/Photos/monthly_meetings/${i + 1}.png`, alt: `Monthly Meeting Photo #${i + 1}`, caption: `Monthly Meeting · #${i + 1}`, category: "monthly-meetings" as const })),
  ...Array.from({ length: 3 }, (_, i) => ({ id: 16 + i, src: `/Photos/IndiaFest/${i + 1}.png`, alt: `IndiaFest Photo #${i + 1}`, caption: `IndiaFest · #${i + 1}`, category: "indiafest" as const })),
  ...Array.from({ length: 7 }, (_, i) => ({ id: 19 + i, src: `/Photos/university_park/${i + 1}.png`, alt: `University Park Elementary Photo #${i + 1}`, caption: `University Park Elementary · #${i + 1}`, category: "university-park" as const })),
];

const SECTIONS: Array<{ key: Exclude<Category, "all">; label: string }> = [
  { key: "monthly-meetings", label: "Monthly Meetings" },
  { key: "indiafest", label: "IndiaFest" },
  { key: "university-park", label: "University Park Elementary" },
];

const MARQUEE_ITEMS = [
  "Monthly Meetings", "IndiaFest", "Melbourne, FL", "Student-Led Events",
  "Community Impact", "Math Outreach", "Problem Solving", "Founded 2023",
  "Monthly Meetings", "IndiaFest", "Melbourne, FL", "Student-Led Events",
  "Community Impact", "Math Outreach", "Problem Solving", "Founded 2023",
];

export default function GalleryPage() {
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  useReveal();

  const lightboxImage = galleryImages.find((img) => img.id === lightboxId) ?? null;
  const lightboxIndex = lightboxImage ? galleryImages.findIndex((img) => img.id === lightboxId) : -1;

  const navigate = useCallback((dir: "prev" | "next") => {
    if (lightboxIndex < 0) return;
    const next = dir === "prev" ? (lightboxIndex - 1 + galleryImages.length) % galleryImages.length : (lightboxIndex + 1) % galleryImages.length;
    setLightboxId(galleryImages[next].id);
  }, [lightboxIndex]);

  const close = useCallback(() => setLightboxId(null), []);

  useEffect(() => {
    if (lightboxId === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxId, navigate, close]);

  useEffect(() => {
    document.body.style.overflow = lightboxId !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxId]);

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>
      <style>{`
        .gallery-section-label { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .gallery-section-label-text { font-family: 'Switzer', sans-serif; font-size: 1.6rem; font-weight: 400; color: #263238; }
        .gallery-section-label-line { flex: 1; height: 1px; background: rgba(23,104,158,.15); }
        .gallery-section-label-count { font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #45616b; white-space: nowrap; }
        .photo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .photo-card { position: relative; border-radius: 14px; overflow: hidden; background: #e7e8e3; cursor: pointer; aspect-ratio: 4/3; box-shadow: 0 4px 16px rgba(10,45,68,.07); transition: transform .3s cubic-bezier(0.16,1,0.3,1), box-shadow .3s ease; }
        .photo-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 16px 40px rgba(10,45,68,.14); }
        .photo-card img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(0.16,1,0.3,1); }
        .photo-card:hover img { transform: scale(1.06); }
        .photo-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,45,68,.55) 0%, transparent 55%); opacity: 0; transition: opacity .3s ease; display: flex; align-items: flex-end; padding: 14px; }
        .photo-card:hover .photo-card-overlay { opacity: 1; }
        .photo-card-caption { color: rgba(255,255,255,.92); font-size: .75rem; font-weight: 500; line-height: 1.3; }
        .lightbox-backdrop { position: fixed; inset: 0; z-index: 9999; background: rgba(8,38,56,.96); display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-inner { position: relative; width: 100%; max-width: 960px; animation: slideUp .25s cubic-bezier(0.16,1,0.3,1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .lightbox-img-wrap { position: relative; width: 100%; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; background: #263238; box-shadow: 0 40px 80px rgba(0,0,0,.5); }
        .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 999px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2); display: grid; place-items: center; cursor: pointer; color: #fff; backdrop-filter: blur(8px); transition: background .2s ease, transform .2s ease; }
        .lightbox-nav:hover { background: rgba(255,255,255,.22); transform: translateY(-50%) scale(1.08); }
        .lightbox-nav.prev { left: -56px; }
        .lightbox-nav.next { right: -56px; }
        .lightbox-close { position: absolute; top: -48px; right: 0; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18); display: grid; place-items: center; cursor: pointer; color: #fff; transition: background .2s ease; }
        .lightbox-close:hover { background: rgba(255,255,255,.22); }
        @media (max-width: 1024px) { .photo-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 900px) { .photo-grid { grid-template-columns: repeat(2,1fr) !important; } .lightbox-nav.prev { left: 8px; } .lightbox-nav.next { right: 8px; } }
        @media (max-width: 560px) { 
          .photo-grid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; } 
          .gallery-section-label { flex-direction: column; align-items: flex-start; gap: 8px; }
          .gallery-section-label-text { font-size: 1.4rem; white-space: normal; line-height: 1.2; }
          .gallery-section-label-line { display: none; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-light soft-grid">
        <div className="serif hide-mobile bg-letter" aria-hidden="true">G</div>
        <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div className="pill reveal">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#45616b" }} />
            Melbourne Math Circle
          </div>
          <h1 className="serif reveal reveal-d1" style={{ marginTop: 20, maxWidth: 680, fontSize: "clamp(3.4rem,7vw,6.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 300, color: "#263238" }}>
            Our <em style={{ color: "#45616b", fontStyle: "italic" }}>Gallery</em>
          </h1>
          <div className="divider reveal reveal-d2" />
          <p className="reveal reveal-d3" style={{ maxWidth: 500, fontSize: "clamp(1rem,1.65vw,1.12rem)", lineHeight: 1.85, color: "#263238", fontWeight: 300 }}>A look at our meetings, events, and the community we're building — one session at a time.</p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap" style={{ background: "#45616b", padding: "14px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} style={{ color: "rgba(255,255,255,.92)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".11em", textTransform: "uppercase", padding: "0 30px", display: "inline-flex", alignItems: "center", gap: 28, whiteSpace: "nowrap" }}>
              {item}<span style={{ opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* GALLERY */}
      <section className="section-space" style={{ background: "#f4f3ef" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: "var(--mmc-content-gap)" }}>
            <div>
              <div className="section-kicker reveal">Browse photos</div>
              <h2 className="serif reveal reveal-d1" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.12, fontWeight: 400, color: "#263238" }}>Moments worth sharing.</h2>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--mmc-layout-gap)" }}>
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
                    {imgs.map((img) => (
                      <div key={img.id} className="photo-card" onClick={() => setLightboxId(img.id)} role="button" aria-label={`Open ${img.caption}`} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setLightboxId(img.id)}>
                        <Image src={img.src} alt={img.alt} fill sizes="(max-width:560px) 50vw,(max-width:900px) 33vw,25vw" />
                        <div className="photo-card-overlay"><span className="photo-card-caption">{img.caption}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBMIT CTA */}
      <section className="section-space" style={{ background: "#fff", borderTop: "1px solid #e1edf5" }}>
        <div className="container">
          <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(24px,4vw,48px)", alignItems: "center" }}>
            <div>
              <div className="section-kicker reveal">Share a moment</div>
              <h2 className="serif reveal reveal-d1" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1.15, fontWeight: 400, color: "#263238", maxWidth: 520 }}>Have a photo from one of our events?</h2>
              <p className="reveal reveal-d2" style={{ marginTop: 14, color: "#263238", lineHeight: 1.85, fontWeight: 300, maxWidth: 440 }}>Send us your snapshots from Monthly Meetings or IndiaFest and we'll add them to the gallery.</p>
            </div>
            <div className="reveal reveal-d2" style={{ flexShrink: 0 }}>
              <Link href="/contact#submit-photos" className="btn-primary">Submit photos <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA DARK */}
      <section className="cta-dark">
        <div className="serif hide-mobile bg-symbol" aria-hidden="true">∞</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker-light">Get involved</div>
          <h2 className="serif reveal" style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Want to be part of the <em style={{ color: "#e7e8e3", fontStyle: "italic" }}>story</em>?
          </h2>
          <p className="reveal reveal-d1" style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18, lineHeight: 1.85, fontWeight: 300 }}>Attend a session and be part of the community we're building in Melbourne, FL.</p>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">Join an event <ArrowRight size={16} /></Link>
            <Link href="/about" className="btn-ghost-light">About us</Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxId !== null && lightboxImage && (
        <div className="lightbox-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <div className="lightbox-inner">
            <button className="lightbox-close" onClick={close} aria-label="Close lightbox"><X size={16} /></button>
            <button className="lightbox-nav prev hide-mobile" onClick={() => navigate("prev")} aria-label="Previous image"><ChevronLeft size={20} /></button>
            <div className="lightbox-img-wrap">
              <Image key={lightboxImage.id} src={lightboxImage.src} alt={lightboxImage.alt} fill className="object-contain" sizes="90vw" priority />
            </div>
            <button className="lightbox-nav next hide-mobile" onClick={() => navigate("next")} aria-label="Next image"><ChevronRight size={20} /></button>
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,.85)", fontSize: ".9rem", fontWeight: 300 }}>{lightboxImage.caption}</p>
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".75rem", marginTop: 4, letterSpacing: ".06em" }}>{lightboxIndex + 1} / {galleryImages.length} &nbsp;·&nbsp; ← → to navigate &nbsp;·&nbsp; ESC to close</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
              <button onClick={() => navigate("prev")} style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "10px 20px", color: "#fff", cursor: "pointer", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>← Prev</button>
              <button onClick={() => navigate("next")} style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "10px 20px", color: "#fff", cursor: "pointer", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}