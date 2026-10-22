// ── Single source of truth for all page styling ──────────────────────────────
// Every page imports { FONTS, CSS } from here. No inline <style> duplication.

export const FONTS = "";

export const CSS = `
  /* ── Reset & base ── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body, #root {
    font-family: 'Switzer', sans-serif;
    color: #263238;
    background: #ffffff;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .serif { font-family: 'Switzer', sans-serif; }

  /* ── Layout ── */
  .container {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 1;
    transform: none;
    transition: opacity .75s cubic-bezier(0.16,1,0.3,1), transform .75s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.in { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: .08s; }
  .reveal-d2 { transition-delay: .16s; }
  .reveal-d3 { transition-delay: .24s; }
  .reveal-d4 { transition-delay: .32s; }

  /* ── Pill / badge ── */
  .pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 14px; border-radius: 999px;
    background: #e7e8e3; color: #45616b;
    font-size: .76rem; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
  }

  /* ── Buttons ── */
  .btn-primary, .btn-secondary, .btn-ghost-light {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 48px; padding: 0 24px; border-radius: 999px;
    text-decoration: none; cursor: pointer; border: none;
    transition: transform .2s ease, background .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
    font-family: 'Switzer', sans-serif;
    font-size: .82rem; font-weight: 700;
    letter-spacing: .09em; text-transform: uppercase; white-space: nowrap;
    will-change: transform;
  }
  .btn-primary {
    background: #45616b; color: #fff;
    box-shadow: 0 12px 30px rgba(23,104,158,.18);
  }
  .btn-primary:hover {
    transform: translateY(-2px); background: #45616b;
    box-shadow: 0 16px 40px rgba(23,104,158,.25);
  }
  .btn-primary:disabled { opacity: .6; cursor: not-allowed; transform: none; }

  .btn-secondary {
    background: transparent; color: #45616b;
    border: 1.5px solid rgba(23,104,158,.28);
  }
  .btn-secondary:hover {
    transform: translateY(-2px); border-color: #45616b;
    background: rgba(23,104,158,.05);
  }

  .btn-ghost-light {
    color: rgba(255,255,255,.9);
    border: 1.5px solid rgba(255,255,255,.25);
    background: transparent;
  }
  .btn-ghost-light:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,.65);
    background: rgba(255,255,255,.06);
  }

  /* ── Typography helpers ── */
  .section-kicker {
    font-size: .75rem; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: #45616b; margin-bottom: 14px;
  }
  .section-kicker-light {
    font-size: .75rem; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: #e7e8e3; margin-bottom: 14px;
  }
  .section-title {
    font-size: clamp(2rem,4vw,3.2rem); line-height: 1.12;
    font-weight: 400; color: #263238; letter-spacing: -0.02em;
  }
  .section-text {
    color: #263238; line-height: 1.85; font-size: 1rem; font-weight: 300;
  }
  .divider {
    width: 44px; height: 2px; background: #45616b;
    border-radius: 999px; margin: 18px 0;
  }

  /* ── Marquee ── */
  .marquee-wrap { overflow: hidden; }
  .marquee-track {
    display: flex; width: max-content;
    animation: marquee 30s linear infinite;
  }
  .marquee-track:hover { animation-play-state: paused; }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── Cards & surfaces ── */
  .glass-card {
    background: rgba(255,255,255,.76);
    border: 1px solid rgba(255,255,255,.55);
    backdrop-filter: blur(14px);
    box-shadow: 0 18px 60px rgba(10,45,68,.10);
  }
  .stat-card {
    border-top: 1px solid rgba(23,104,158,.18);
    padding-top: 24px;
    transition: border-color .2s ease, transform .2s ease;
  }
  .stat-card:hover { border-color: rgba(23,104,158,.7); transform: translateY(-2px); }

  .feature-card {
    border: 1px solid rgba(23,104,158,.10);
    background: rgba(255,255,255,.86);
    border-radius: 22px; padding: 24px;
    box-shadow: 0 12px 30px rgba(10,45,68,.05);
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(10,45,68,.10);
    border-color: rgba(23,104,158,.18);
  }
  .feature-icon {
    width: 48px; height: 48px; border-radius: 16px;
    display: grid; place-items: center;
    background: #e7e8e3; color: #45616b; margin-bottom: 16px;
  }

  .step-card {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 20px 22px; border-radius: 18px;
    border: 1px solid rgba(23,104,158,.10);
    background: #f4f3ef; color: #263238;
    line-height: 1.65;
    transition: border-color .2s ease, transform .2s ease, background .2s ease;
  }
  .step-card:hover {
    border-color: rgba(23,104,158,.35);
    transform: translateX(4px);
    background: #ffffff;
  }
  .step-num {
    flex: 0 0 auto;
    width: 36px; height: 36px; border-radius: 12px;
    display: grid; place-items: center;
    background: #e7e8e3; color: #45616b; font-weight: 800;
    font-size: .88rem;
  }

  .faq-card {
    border: 1px solid rgba(23,104,158,.10);
    background: rgba(255,255,255,.82);
    border-radius: 18px; padding: 24px 26px;
    box-shadow: 0 6px 24px rgba(10,45,68,.05);
    transition: transform .22s ease, box-shadow .22s ease;
  }
  .faq-card:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(10,45,68,.09); }

  .value-card {
    position: relative;
    border: 1px solid rgba(23,104,158,.10);
    background: rgba(255,255,255,.9);
    border-radius: 22px; padding: 24px;
    box-shadow: 0 12px 30px rgba(10,45,68,.05);
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
    overflow: hidden;
  }
  .value-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(23,104,158,.06), transparent 35%);
    opacity: .55;
    pointer-events: none;
  }
  .value-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(10,45,68,.10);
    border-color: rgba(23,104,158,.18);
  }

  /* ── Mission items (dark section) ── */
  .mission-item {
    display: flex; gap: 16px; padding: 18px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.11);
    background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.05));
    backdrop-filter: blur(10px);
    transition: transform .2s ease, background .2s ease, border-color .2s ease;
  }
  .mission-item:hover {
    transform: translateX(4px);
    background: linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.07));
    border-color: rgba(255,255,255,.18);
  }
  .mission-icon {
    width: 44px; height: 44px; flex-shrink: 0; border-radius: 14px;
    display: grid; place-items: center;
    background: rgba(255,255,255,.12); color: #fff;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
  }

  /* ── Image containers ── */
  .img-rounded {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(10,45,68,.12);
    border: 1px solid rgba(23,104,158,.08);
  }
  .img-rounded img {
    display: block;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .6s ease;
  }
  .img-rounded:hover img { transform: scale(1.04); }

  /* ── Form elements ── */
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label {
    font-size: .78rem; font-weight: 600;
    letter-spacing: .07em; text-transform: uppercase; color: #263238;
  }
  .field input, .field textarea {
    font-family: 'Switzer', sans-serif;
    font-size: .95rem; font-weight: 300;
    padding: 13px 16px; border-radius: 12px;
    border: 1.5px solid rgba(23,104,158,.18);
    background: #f4f3ef; color: #263238;
    outline: none; resize: vertical;
    transition: border-color .2s ease, box-shadow .2s ease;
  }
  .field input:focus, .field textarea:focus {
    border-color: #45616b;
    box-shadow: 0 0 0 3px rgba(23,104,158,.10);
  }
  .field input::placeholder, .field textarea::placeholder { color: #a0b8c8; }

  /* ── Info chip (contact page) ── */
  .info-chip {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 20px 22px; border-radius: 18px;
    border: 1px solid rgba(23,104,158,.12);
    background: #f4f3ef;
    transition: border-color .2s ease;
  }
  .info-chip:hover { border-color: rgba(23,104,158,.4); }
  .chip-icon {
    width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
    display: grid; place-items: center;
    background: #e7e8e3; color: #45616b;
  }

  /* ── Misc ── */
  .soft-grid {
    background-image:
      linear-gradient(rgba(23,104,158,.05) 1px, transparent 1px),
      linear-gradient(90deg,rgba(23,104,158,.05) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  .video-wrap {
    position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;
    border-radius: 18px; background: #dfeff8;
  }
  .video-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

  /* Level badges */
  .level-badge {
    display: inline-block;
    font-size: .72rem; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    margin-bottom: 4px;
  }
  .level-beginner { color: #45616b; }
  .level-intermediate { color: #263238; }
  .level-advanced { color: #264a6c; }
  .level-all { color: #45616b; }

  /* ── Hero variants ── */
  .hero-light {
    min-height: 60vh;
    position: relative; overflow: hidden;
    background: linear-gradient(180deg,#ffffff 0%,#f4f3ef 58%,#ffffff 100%);
    padding: clamp(68px,10vw,124px) 0 clamp(56px,7vw,92px);
    display: flex; align-items: center;
  }
  .hero-dark {
    min-height: 48vh;
    display: flex; align-items: center;
    background: linear-gradient(160deg, #263238 0%, #45616b 100%);
    position: relative; overflow: hidden;
    padding: clamp(72px,10vw,110px) 0;
  }

  /* ── Decorative background letter ── */
  .bg-letter {
    position: absolute;
    right: clamp(-10px,1vw,18px); top: 50%;
    transform: translateY(-50%);
    font-family: 'Switzer', sans-serif;
    font-size: clamp(220px,28vw,440px); line-height: 1;
    font-weight: 700; color: #e8f4fb;
    user-select: none; pointer-events: none;
    letter-spacing: -0.03em;
  }
  .bg-symbol {
    position: absolute;
    right: -0.04em; bottom: -0.14em;
    font-family: 'Switzer', sans-serif;
    font-size: clamp(180px,25vw,360px); font-weight: 700;
    line-height: 1; color: rgba(255,255,255,.04);
    user-select: none; pointer-events: none;
  }
  .bg-symbol-hero {
    font-family: 'Switzer', sans-serif;
    position: absolute; right: clamp(-10px,2vw,30px); bottom: -0.12em;
    font-size: clamp(200px,26vw,400px); font-weight: 700; line-height: 1;
    color: rgba(255,255,255,.05); pointer-events: none; user-select: none;
  }

  /* ── Dark CTA section (shared bottom of pages) ── */
  .cta-dark {
    background: linear-gradient(180deg,#263238 0%,#263238 100%);
    padding: clamp(72px,10vw,116px) 0;
    position: relative; overflow: hidden;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hide-mobile   { display: none !important; }
    .split-grid    { grid-template-columns: 1fr !important; }
    .stats-grid    { grid-template-columns: 1fr 1fr !important; }
    .features-grid { grid-template-columns: 1fr 1fr !important; }
    .values-grid   { grid-template-columns: 1fr 1fr !important; }
    .faq-grid      { grid-template-columns: 1fr !important; }
    .events-grid   { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 560px) {
    .container     { width: min(100% - 32px, 1120px); }
    .stats-grid    { grid-template-columns: 1fr !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .values-grid   { grid-template-columns: 1fr !important; }
  }
`;
