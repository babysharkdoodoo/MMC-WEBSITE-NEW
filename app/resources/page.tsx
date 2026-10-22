"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Download, Star, BookOpen, Youtube, Gamepad2, Globe, FileText } from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Page-specific CSS ───────────────────────────────────────────────────── */
const PAGE_CSS = `
  .hero-res {
    min-height: 52vh; display: flex; align-items: center;
    background: linear-gradient(180deg,#ffffff 0%,#f4f3ef 60%,#ffffff 100%);
    padding: clamp(72px,10vw,120px) 0 clamp(48px,7vw,88px);
    position: relative; overflow: hidden;
  }

  /* ── Section headers ── */
  .cat-header {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 28px; padding-bottom: 16px;
    border-bottom: 1px solid rgba(23,104,158,.12);
  }
  .cat-icon {
    width: 40px; height: 40px; border-radius: 12px;
    background: #e7e8e3; color: #45616b;
    display: grid; place-items: center; flex-shrink: 0;
  }
  .cat-title {
    font-family: 'Switzer', sans-serif;
    font-size: 1.85rem; font-weight: 400; color: #263238; line-height: 1;
  }
  .cat-count {
    margin-left: auto; font-size: .72rem; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase; color: #45616b;
    background: #e7e8e3; padding: 4px 10px; border-radius: 999px;
  }

  /* ── PDF cards ── */
  .pdf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
  .pdf-card {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 20px 22px; border-radius: 16px;
    border: 1px solid rgba(23,104,158,.12);
    background: #fff;
    transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
  }
  .pdf-card:hover { border-color: rgba(23,104,158,.35); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(10,45,68,.08); }
  .pdf-file-icon {
    width: 44px; height: 52px; border-radius: 8px;
    background: linear-gradient(160deg,#1e88c2,#45616b);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    flex-shrink: 0;
    position: relative; overflow: hidden;
  }
  .pdf-file-icon::before {
    content: 'PDF';
    font-size: .55rem; font-weight: 700; letter-spacing: .05em;
    color: rgba(255,255,255,.7); position: absolute; bottom: 6px;
  }
  .pdf-file-icon::after {
    content: '';
    position: absolute; top: 0; right: 0;
    width: 14px; height: 14px;
    background: rgba(255,255,255,.2);
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
  .pdf-dl-btn {
    display: inline-flex; align-items: center; gap: 7px;
    margin-top: 10px; padding: 6px 12px; border-radius: 6px;
    background: #e7e8e3; color: #45616b;
    font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    text-decoration: none; border: 1px solid rgba(23,104,158,.2);
    transition: background .15s ease, border-color .15s ease;
  }
  .pdf-dl-btn:hover { background: #d0e9f5; border-color: rgba(23,104,158,.4); }
  .pdf-topic {
    font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
    color: #45616b; margin-bottom: 5px;
  }

  /* ── Book cards ── */
  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  .book-card {
    border: 1px solid rgba(23,104,158,.10);
    background: #fff; border-radius: 16px; overflow: hidden;
    box-shadow: 0 6px 20px rgba(10,45,68,.05);
    display: flex; flex-direction: column;
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .book-card:hover { transform: translateY(-4px); box-shadow: 0 16px 44px rgba(10,45,68,.11); border-color: rgba(23,104,158,.25); }
  .book-spine {
    height: 6px; width: 100%;
  }
  .book-cover {
    background: #e7e8e3;
    aspect-ratio: 3/2;
    display: grid; place-items: center;
    font-family: 'Switzer', sans-serif;
    font-size: 2.2rem; color: #45616b; font-weight: 300;
  }
  .book-body { padding: 18px; flex: 1; display: flex; flex-direction: column; }
  .book-title { font-family: 'Switzer', sans-serif; font-size: 1.2rem; font-weight: 600; color: #263238; line-height: 1.2; margin-bottom: 4px; }
  .book-author { font-size: .78rem; color: #7a9eb0; margin-bottom: 12px; }
  .book-desc { font-size: .85rem; color: #263238; line-height: 1.7; font-weight: 300; flex: 1; margin-bottom: 14px; }
  .book-why {
    background: #f4f3ef; border-radius: 10px; padding: 10px 12px;
    font-size: .78rem; color: #263238; line-height: 1.6;
    border-left: 2px solid #45616b; margin-bottom: 14px;
  }
  .book-why strong { color: #263238; display: block; font-size: .7rem; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 3px; }

  /* ── Channel cards ── */
  .channel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }
  .channel-card {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 18px 20px; border-radius: 16px;
    border: 1px solid rgba(23,104,158,.10); background: #fff;
    box-shadow: 0 4px 14px rgba(10,45,68,.04);
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
    text-decoration: none; color: inherit;
  }
  .channel-card:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(10,45,68,.09); border-color: rgba(23,104,158,.28); }
  .channel-avatar {
    width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
    display: grid; place-items: center;
    font-family: 'Switzer', sans-serif; font-size: 1.4rem; font-weight: 600; color: #fff;
  }
  .channel-name { font-size: .97rem; font-weight: 700; color: #263238; margin-bottom: 3px; }
  .channel-by { font-size: .76rem; color: #7a9eb0; margin-bottom: 8px; }
  .channel-desc { font-size: .84rem; color: #263238; line-height: 1.65; font-weight: 300; }

  /* ── Tool cards ── */
  .tool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
  }
  .tool-card {
    padding: 18px 20px; border-radius: 14px;
    border: 1px solid rgba(23,104,158,.10); background: #fff;
    transition: border-color .2s ease, transform .2s ease;
    text-decoration: none; color: inherit; display: block;
  }
  .tool-card:hover { border-color: rgba(23,104,158,.35); transform: translateY(-2px); }
  .tool-name { font-weight: 700; font-size: .97rem; color: #263238; margin-bottom: 5px; }
  .tool-desc { font-size: .84rem; color: #263238; line-height: 1.65; font-weight: 300; margin-bottom: 10px; }
  .tool-tag { font-size: .68rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #45616b; }

  /* ── Website list ── */
  .site-list { display: grid; gap: 12px; }
  .site-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 16px 20px; border-radius: 12px;
    border: 1px solid rgba(23,104,158,.10); background: #fff;
    transition: border-color .2s ease;
    text-decoration: none; color: inherit;
    gap: 16px;
  }
  .site-item:hover { border-color: rgba(23,104,158,.35); }
  .site-name { font-weight: 700; font-size: .95rem; color: #45616b; margin-bottom: 4px; }
  .site-desc { font-size: .84rem; color: #263238; line-height: 1.6; font-weight: 300; }
  .site-arrow { color: #45616b; flex-shrink: 0; margin-top: 2px; }

  /* ── Level badge ── */
  .level { display: inline-block; padding: 2px 9px; border-radius: 999px; font-size: .68rem; font-weight: 700; letter-spacing: .06em; margin-bottom: 8px; }
  .level-beginner    { background: #e7e8e3; color: #45616b; }
  .level-intermediate { background: #fff4e6; color: #b07d00; }
  .level-advanced    { background: #fdf0f0; color: #b04040; }
  .level-all         { background: #f0f7ee; color: #3a7d44; }

  /* ── Team rec ── */
  .rec-card {
    border: 1px solid rgba(23,104,158,.10); background: #fff;
    border-radius: 18px; padding: 24px 26px;
    transition: transform .2s ease;
  }
  .rec-card:hover { transform: translateY(-2px); }
  .rec-quote-mark { font-family: 'Cormorant Garamond',serif; font-size: 3rem; color: #e7e8e3; line-height: 1; margin-bottom: 6px; }
  .rec-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: #e7e8e3; color: #45616b;
    display: grid; place-items: center;
    font-family: 'Cormorant Garamond',serif; font-size: 1.1rem; font-weight: 700;
  }

  /* ── CTA dark ── */
  .cta-dark { background: linear-gradient(180deg,#263238 0%,#263238 100%); padding: clamp(72px,10vw,112px) 0; position: relative; overflow: hidden; }

  /* ── Competition section ── */
  .comp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }
  .comp-card {
    padding: 22px 24px; border-radius: 16px;
    border: 1px solid rgba(23,104,158,.14); background: #fff;
    transition: border-color .2s ease, transform .2s ease;
  }
  .comp-card:hover { border-color: rgba(23,104,158,.4); transform: translateY(-2px); }
  .comp-card-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 12px;
  }
  .comp-num {
    width: 36px; height: 36px; border-radius: 10px;
    background: #263238; color: #fff;
    display: grid; place-items: center;
    font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 700;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .book-grid   { grid-template-columns: 1fr 1fr !important; }
    .channel-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 560px) {
    .book-grid { grid-template-columns: 1fr !important; }
    .pdf-grid  { grid-template-columns: 1fr !important; }
    .tool-grid { grid-template-columns: 1fr !important; }
    .comp-grid { grid-template-columns: 1fr !important; }
  }
`;

/* ── Data ──────────────────────────────────────────────────────────────── */

const FREE_PDFS = [
  {
    title: "OTIS Excerpts",
    author: "Evan Chen",
    topic: "All Topics",
    desc: "Beginner introductions to olympiad algebra, combinatorics, geometry, and number theory. Widely considered the best free starting point for proof-based math.",
    url: "https://web.evanchen.cc/excerpts.html",
    isDirect: false,
  },
  {
    title: "Olympiad Inequalities",
    author: "Evan Chen",
    topic: "Algebra",
    desc: "Standard strategies for olympiad inequalities, including SOS, Schur, Muirhead. Clear, concise, competition-ready.",
    url: "https://web.evanchen.cc/handouts/Ineq/en.pdf",
    isDirect: true,
  },
  {
    title: "A Beautiful Journey Through Olympiad Geometry",
    author: "Stefan Lozanovski",
    topic: "Geometry",
    desc: "The most beginner-friendly geometry olympiad book available for free. Step-by-step proofs with no skipped steps. Recommended by Evan Chen himself.",
    url: "https://www.olympiadgeometry.com/the-book.html",
    isDirect: false,
  },
  {
    title: "Modern Olympiad Number Theory",
    author: "Aditya Khurmi",
    topic: "Number Theory",
    desc: "The most comprehensive free olympiad number theory text available. Conceptual approach with challenging solved examples. Freely distributed by the author.",
    url: "https://www.academia.edu/44512122/Modern_Olympiad_Number_Theory",
    isDirect: false,
  },
  {
    title: "Expected Uses of Probability",
    author: "Evan Chen",
    topic: "Combinatorics",
    desc: "Expected value and the probabilistic method for olympiad problems. Originally presented at IMO 2014 by Po-Shen Loh, expanded by Chen.",
    url: "https://web.evanchen.cc/handouts/ProbabilisticMethod/PM.pdf",
    isDirect: true,
  },
  {
    title: "Olympiad NT Through Challenging Problems",
    author: "Justin Stevens",
    topic: "Number Theory",
    desc: "Introductory olympiad number theory — slightly easier than Chen's materials but well-structured for newcomers to proof-based competition math.",
    url: "https://s3.amazonaws.com/aops-cdn.artofproblemsolving.com/resources/articles/olympiad-number-theory.pdf",
    isDirect: true,
  },
  {
    title: "Yufei Zhao — Olympiad Handouts",
    author: "Yufei Zhao (MIT)",
    topic: "Multiple",
    desc: "A collection of handouts from MIT Professor Yufei Zhao covering geometry, combinatorics, algebra, and number theory — used at MOP and Canadian olympiad training.",
    url: "https://yufeizhao.com/olympiad/",
    isDirect: false,
  },
  {
    title: "AMC 8 (2024) Problems",
    author: "MAA",
    topic: "Competition",
    desc: "The actual 2024 AMC 8 exam. Official competition problems from the Mathematical Association of America. Direct PDF — no login required.",
    url: "https://www.isinj.com/mt-amc8/2024-AMC8-Problems.pdf",
    isDirect: true,
  },
  {
    title: "Proof-Writing Style Guide",
    author: "Evan Chen",
    topic: "Proof Writing",
    desc: "Essential stylistic advice for writing olympiad proofs clearly. Used at MOP (Math Olympiad Program). Short, practical, and immediately applicable.",
    url: "https://web.evanchen.cc/handouts/english/en.pdf",
    isDirect: true,
  },
];

const BOOKS = [
  {
    title: "The Art and Craft of Problem Solving",
    author: "Paul Zeitz",
    level: "Intermediate",
    spineColor: "#45616b",
    symbol: "∑",
    desc: "The best single book for getting into mathematical olympiad thinking. Covers strategy, tactics, and mindset across all competition topics.",
    why: "If you only buy one book, make it this one. Evan Chen recommends it as the best general introduction to olympiad problem-solving.",
    link: "https://www.amazon.com/Art-Craft-Problem-Solving/dp/0471789011",
  },
  {
    title: "The Joy of X",
    author: "Steven Strogatz",
    level: "Beginner",
    spineColor: "#3a7d44",
    symbol: "x",
    desc: "A guided tour through mathematics — connecting calculus, number theory, and topology to everyday life. Written for a general audience but deeply insightful.",
    why: "This book makes people fall in love with math. Assign it to anyone who thinks they don't like the subject.",
    link: "https://www.amazon.com/Joy-x-Guided-Tour-Math/dp/0544105850",
  },
  {
    title: "Fermat's Enigma",
    author: "Simon Singh",
    level: "Beginner",
    spineColor: "#b07d00",
    symbol: "π",
    desc: "The 358-year story of Fermat's Last Theorem — the most dramatic mathematical problem ever posed. Reads like a thriller while teaching real mathematics.",
    why: "Proof that math has stakes, drama, and human cost. Essential for any student who thinks math is bloodless.",
    link: "https://www.amazon.com/Fermats-Enigma-Greatest-Mathematical-Problem/dp/0385493622",
  },
  {
    title: "Gödel, Escher, Bach",
    author: "Douglas Hofstadter",
    level: "Advanced",
    spineColor: "#7c3570",
    symbol: "∞",
    desc: "A Pulitzer-winning exploration of self-reference, logic, consciousness, and meaning. Connects mathematical logic to music, art, and the nature of thought.",
    why: "There is no book quite like this. It will permanently change how you think about formal systems, recursion, and intelligence.",
    link: "https://www.amazon.com/Gödel-Escher-Bach-Eternal-Golden/dp/0465026567",
  },
];

const CHANNELS = [
  {
    name: "3Blue1Brown",
    by: "Grant Sanderson",
    level: "All Levels",
    color: "#45616b",
    desc: "Animated visualizations of calculus, linear algebra, probability, and number theory. Build the kind of geometric intuition that no textbook can.",
    url: "https://www.youtube.com/@3blue1brown",
    pick: "Start with \"Essence of Linear Algebra\" or \"But what is the Fourier Transform?\"",
  },
  {
    name: "Numberphile",
    by: "Brady Haran",
    level: "All Levels",
    color: "#3a7d44",
    desc: "Research mathematicians talking about the numbers, theorems, and results they personally love. Genuine enthusiasm, no watered-down explanations.",
    url: "https://www.youtube.com/@numberphile",
    pick: "Start with any video featuring Ben Sparks or James Grime.",
  },
  {
    name: "Stand-up Maths",
    by: "Matt Parker",
    level: "All Levels",
    color: "#b07d00",
    desc: "Applied math and comedy. Matt finds real-world problems — license plates, spreadsheet errors, brick patterns — and does proper mathematics on them.",
    url: "https://www.youtube.com/@standupmaths",
    pick: "Start with \"The Problems with Secret Santa\" or \"Parker Square\" history.",
  },
  {
    name: "Mathologer",
    by: "Burkard Polster",
    level: "Intermediate",
    color: "#993556",
    desc: "Deep, rigorous dives into beautiful theorems with actual proofs. Covers material most channels are afraid to touch — Q-series, generating functions, Ramanujan.",
    url: "https://www.youtube.com/@Mathologer",
    pick: "Start with \"The almost impossible chessboard puzzle\" or \"Ramanujan: Making sense of 1+2+3+...\".",
  },
];

const TOOLS = [
  {
    name: "Alcumus (AoPS)",
    desc: "Free adaptive problem practice from Art of Problem Solving. Adjusts difficulty in real time. The best free competition math trainer that exists.",
    url: "https://artofproblemsolving.com/alcumus",
    tag: "Free · Problem Practice",
  },
  {
    name: "Desmos Graphing",
    desc: "The best free graphing calculator. Plots functions, handles implicit curves, and lets you animate variables. Cleaner than TI-84, faster than Wolfram.",
    url: "https://www.desmos.com/calculator",
    tag: "Free · Graphing",
  },
  {
    name: "GeoGebra",
    desc: "Dynamic geometry construction tool — draw, drag, and explore theorems interactively. Better than any textbook for building geometric intuition.",
    url: "https://www.geogebra.org/geometry",
    tag: "Free · Geometry",
  },
  {
    name: "Euclidea",
    desc: "120+ geometric construction puzzles using only compass and straightedge. Builds proof intuition through elegant, progressively harder puzzles.",
    url: "https://www.euclidea.xyz/",
    tag: "Free · Puzzles",
  },
  {
    name: "Project Euler",
    desc: "600+ math problems that require both mathematical insight and some programming to solve. Perfect for the intersection of math and CS.",
    url: "https://projecteuler.net/",
    tag: "Free · Computational",
  },
  {
    name: "Brilliant.org",
    desc: "Guided interactive courses in math, science, and CS. Their guided-discovery approach is genuinely effective for building intuition before drilling problems.",
    url: "https://brilliant.org/",
    tag: "Freemium · Courses",
  },
];

const WEBSITES = [
  {
    name: "Art of Problem Solving",
    desc: "The definitive platform for competition math. Problems, forums, courses, and community. Nearly every US olympian trained here.",
    url: "https://artofproblemsolving.com/",
  },
  {
    name: "Mathigon",
    desc: "Interactive math textbooks with beautiful visualizations and embedded explorations. The closest thing to a mathematics textbook reimagined from scratch.",
    url: "https://mathigon.org/",
  },
  {
    name: "NRICH (Cambridge)",
    desc: "Thousands of rich math problems from Cambridge, organized by topic and difficulty. Excellent for school-age students who want depth beyond the curriculum.",
    url: "https://nrich.maths.org/",
  },
  {
    name: "Cut-the-Knot",
    desc: "Alexander Bogomolny's decades-long collection of mathematical gems — interactive Java applets, proofs, and problems across every area of mathematics.",
    url: "https://www.cut-the-knot.org/",
  },
  {
    name: "Wolfram MathWorld",
    desc: "The most comprehensive mathematics reference on the internet. Every theorem, formula, and definition, with derivations and cross-references.",
    url: "https://mathworld.wolfram.com/",
  },
];

const COMPETITION_RESOURCES = [
  {
    name: "AMC / AIME Past Problems",
    by: "Art of Problem Solving Wiki",
    desc: "Every AMC 8, 10, 12, and AIME problem with community solutions going back to 1950. Free, searchable, and the single best source for competition practice.",
    url: "https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions",
  },
  {
    name: "MATHCOUNTS Past Competitions",
    by: "MATHCOUNTS Foundation",
    desc: "Last year's school, chapter, and state competitions are always available for free. Purchase past years for deeper practice.",
    url: "https://www.mathcounts.org/resources/past-competitions",
  },
  {
    name: "Evan Chen's Olympiad Articles",
    by: "Evan Chen (IMO Gold, MIT)",
    desc: "Handouts on inequalities, summation, probability, CRT, proof-writing, and more — all freely downloadable. Used at MOP and international training programs.",
    url: "https://web.evanchen.cc/olympiad.html",
  },
  {
    name: "Po-Shen Loh — LIVE Platform",
    by: "Po-Shen Loh",
    desc: "Free past AMC 8 and AMC 10 problems with solutions, from the former USA IMO team coach. Clean interface, mobile-friendly, with real-time solve sessions.",
    url: "https://live.poshenloh.com/past-contests",
  },
];

const TEAM_RECS = [
  { q: "The Princeton Companion to Mathematics is my go-to reference. It provides accessible introductions to every major branch of mathematics — written by actual experts.", name: "Eshan Vipuil", role: "Founder & President" },
  { q: "Vi Hart's mathematical doodling videos changed how I think about creativity. Math as art, not just calculation.", name: "Shoaib Ahmed", role: "Vice President" },
  { q: "'Proofs from THE BOOK' by Aigner and Ziegler shows the most elegant proofs known. Hilbert said there's a book with the perfect proof of every theorem. This is it.", name: "Sidharth Patsamatla", role: "Volunteer" },
  { q: "Project Euler showed me that math and programming aren't separate — they're two faces of the same coin. Start with problem 1 and you won't stop.", name: "Saaketh Kesireddy", role: "Alumni Advisor" },
];

const MARQUEE_ITEMS = [
  "Books", "Free PDFs", "YouTube", "Tools", "Competition Prep", "AoPS", "Evan Chen",
  "Desmos", "GeoGebra", "3Blue1Brown", "AMC", "MATHCOUNTS", "Numberphile", "Project Euler",
  "Books", "Free PDFs", "YouTube", "Tools", "Competition Prep", "AoPS", "Evan Chen",
  "Desmos", "GeoGebra", "3Blue1Brown", "AMC", "MATHCOUNTS", "Numberphile", "Project Euler",
];

/* ── Component ─────────────────────────────────────────────────────────── */
export default function ResourcesPage() {
  useReveal();

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>
      <style>{PAGE_CSS}</style>

      {/* ── HERO ── */}
      <section className="hero-res soft-grid">
        <div className="serif hide-mobile" style={{ position: "absolute", right: "clamp(-10px,1vw,18px)", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(220px,28vw,440px)", lineHeight: 1, fontWeight: 700, color: "#e8f4fb", userSelect: "none", pointerEvents: "none", letterSpacing: "-0.03em" }}>R</div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="pill reveal">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#45616b" }} />
            Curated by the team
          </div>
          <h1 className="serif reveal reveal-d1" style={{ marginTop: 20, fontSize: "clamp(3.2rem,6.8vw,6.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 300, color: "#263238", maxWidth: 680 }}>
            Resources
          </h1>
          <div className="divider reveal reveal-d2" />
          <p className="reveal reveal-d3" style={{ maxWidth: 540, fontSize: "clamp(1rem,1.65vw,1.12rem)", lineHeight: 1.85, color: "#263238", fontWeight: 300 }}>
            The books, videos, tools, and free PDFs our team actually uses — not a generic list. Every item here was chosen because it genuinely works.
          </p>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap" style={{ background: "#45616b", padding: "14px 0" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} style={{ color: "rgba(255,255,255,.92)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".11em", textTransform: "uppercase", padding: "0 30px", display: "inline-flex", alignItems: "center", gap: 28, whiteSpace: "nowrap" }}>
              {item}<span style={{ opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FREE PDFs ── */}
      <section className="section-space" style={{ background: "#f4f3ef" }}>
        <div className="container">
          <div className="cat-header reveal">
            <div className="cat-icon"><FileText size={20} /></div>
            <h2 className="cat-title">Free Downloads</h2>
            <span className="cat-count">{FREE_PDFS.length} PDFs</span>
          </div>
          <p className="section-text reveal reveal-d1" style={{ marginBottom: 32, maxWidth: 640 }}>
            Legitimate free PDFs — no piracy, no sketchy sites. Most are freely released by the authors themselves. Direct download links where available.
          </p>

          <div className="pdf-grid">
            {FREE_PDFS.map((pdf, i) => (
              <div key={i} className={`pdf-card reveal reveal-d${(i % 3) + 1}`}>
                <div className="pdf-file-icon">
                  <FileText size={18} color="rgba(255,255,255,.8)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="pdf-topic">{pdf.topic}</div>
                  <div style={{ fontWeight: 700, fontSize: ".92rem", color: "#263238", marginBottom: 3, lineHeight: 1.3 }}>{pdf.title}</div>
                  <div style={{ fontSize: ".76rem", color: "#7a9eb0", marginBottom: 8 }}>by {pdf.author}</div>
                  <div style={{ fontSize: ".82rem", color: "#263238", lineHeight: 1.65, fontWeight: 300, marginBottom: 10 }}>{pdf.desc}</div>
                  <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="pdf-dl-btn">
                    {pdf.isDirect ? <Download size={12} /> : <ExternalLink size={12} />}
                    {pdf.isDirect ? "Download PDF" : "Get it free"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPETITION PREP ── */}
      <section className="section-space" style={{ background: "#fff", borderTop: "1px solid #e1edf5" }}>
        <div className="container">
          <div className="cat-header reveal">
            <div className="cat-icon" style={{ background: "#263238", color: "#fff" }}>
              <Star size={20} />
            </div>
            <h2 className="cat-title">Competition Prep</h2>
            <span className="cat-count">AMC · AIME · MATHCOUNTS</span>
          </div>
          <p className="section-text reveal reveal-d1" style={{ marginBottom: 32, maxWidth: 640 }}>
            Where to find past problems, official archives, and the people who actually coach olympiad teams.
          </p>
          <div className="comp-grid">
            {COMPETITION_RESOURCES.map((c, i) => (
              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className={`comp-card reveal reveal-d${(i % 3) + 1}`} style={{ textDecoration: "none", display: "block" }}>
                <div className="comp-card-header">
                  <div className="comp-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: ".95rem", color: "#263238", lineHeight: 1.2 }}>{c.name}</div>
                    <div style={{ fontSize: ".75rem", color: "#7a9eb0" }}>by {c.by}</div>
                  </div>
                </div>
                <p style={{ fontSize: ".86rem", color: "#263238", lineHeight: 1.7, fontWeight: 300, marginBottom: 12 }}>{c.desc}</p>
                <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#45616b", letterSpacing: ".06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
                  Visit <ExternalLink size={11} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKS ── */}
      <section className="section-space" style={{ background: "#e7e8e3" }}>
        <div className="container">
          <div className="cat-header reveal">
            <div className="cat-icon"><BookOpen size={20} /></div>
            <h2 className="cat-title">Books Worth Buying</h2>
            <span className="cat-count">{BOOKS.length} picks</span>
          </div>
          <p className="section-text reveal reveal-d1" style={{ marginBottom: 32, maxWidth: 640 }}>
            Not an exhaustive list — a deliberate short one. These are the books our team returns to.
          </p>
          <div className="book-grid">
            {BOOKS.map((b, i) => (
              <div key={i} className={`book-card reveal reveal-d${(i % 4) + 1}`}>
                <div className="book-spine" style={{ background: b.spineColor }} />
                <div className="book-cover">
                  <span style={{ opacity: 0.3, fontSize: "3rem" }}>{b.symbol}</span>
                </div>
                <div className="book-body">
                  <span className={`level level-${b.level.toLowerCase()}`}>{b.level}</span>
                  <div className="book-title">{b.title}</div>
                  <div className="book-author">by {b.author}</div>
                  <p className="book-desc">{b.desc}</p>
                  <div className="book-why">
                    <strong>Why we recommend it</strong>
                    {b.why}
                  </div>
                  <a href={b.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: ".74rem", minHeight: 36, padding: "0 14px", justifyContent: "center" }}>
                    Find on Amazon <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <section className="section-space" style={{ background: "#fff", borderTop: "1px solid #e1edf5" }}>
        <div className="container">
          <div className="cat-header reveal">
            <div className="cat-icon" style={{ background: "#fdf0f0", color: "#b04040" }}><Youtube size={20} /></div>
            <h2 className="cat-title">YouTube Channels</h2>
            <span className="cat-count">{CHANNELS.length} channels</span>
          </div>
          <p className="section-text reveal reveal-d1" style={{ marginBottom: 32, maxWidth: 640 }}>
            All free. All genuinely good. Each comes with a suggested starting video because it's easy to land on the wrong one first.
          </p>
          <div className="channel-grid">
            {CHANNELS.map((ch, i) => (
              <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className={`channel-card reveal reveal-d${(i % 3) + 1}`}>
                <div className="channel-avatar" style={{ background: ch.color }}>
                  {ch.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="channel-name">{ch.name}</div>
                  <div className="channel-by">by {ch.by} · <span className={`level level-${ch.level.toLowerCase().replace(/\s+/g, "-").replace("–", "-")}`}>{ch.level}</span></div>
                  <p className="channel-desc" style={{ marginBottom: 8 }}>{ch.desc}</p>
                  <div style={{ fontSize: ".78rem", color: "#45616b", fontWeight: 600 }}>
                    ↳ {ch.pick}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TOOLS ── */}
      <section className="section-space" style={{ background: "#f4f3ef" }}>
        <div className="container">
          <div className="cat-header reveal">
            <div className="cat-icon"><Gamepad2 size={20} /></div>
            <h2 className="cat-title">Interactive Tools</h2>
            <span className="cat-count">{TOOLS.length} tools</span>
          </div>
          <p className="section-text reveal reveal-d1" style={{ marginBottom: 32, maxWidth: 640 }}>
            Use these to explore, visualize, and practice. Most are completely free.
          </p>
          <div className="tool-grid">
            {TOOLS.map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" className={`tool-card reveal reveal-d${(i % 3) + 1}`}>
                <div className="tool-name">{t.name}</div>
                <p className="tool-desc">{t.desc}</p>
                <div className="tool-tag">{t.tag}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEBSITES ── */}
      <section className="section-space" style={{ background: "#fff", borderTop: "1px solid #e1edf5" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "clamp(32px,6vw,72px)", alignItems: "start" }} className="split-grid">
            <div>
              <div className="cat-header reveal" style={{ borderBottom: "none", marginBottom: 16, paddingBottom: 0 }}>
                <div className="cat-icon"><Globe size={20} /></div>
                <h2 className="cat-title">Websites</h2>
              </div>
              <p className="section-text reveal reveal-d1">
                Reference sites, problem archives, and community hubs worth bookmarking.
              </p>
            </div>
            <div className="site-list reveal reveal-d2">
              {WEBSITES.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="site-item">
                  <div>
                    <div className="site-name">{s.name}</div>
                    <div className="site-desc">{s.desc}</div>
                  </div>
                  <ArrowRight size={16} className="site-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM RECOMMENDATIONS ──
      <section className="section-space" style={{ background: "#e7e8e3" }}>
        <div className="container">
          <div className="section-kicker reveal">From our team</div>
          <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: 36 }}>
            Personal <em style={{ color: "#45616b", fontStyle: "italic" }}>recommendations.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {TEAM_RECS.map((r, i) => (
              <div key={i} className={`rec-card reveal reveal-d${(i % 2) + 1}`}>
                <div className="rec-quote-mark">"</div>
                <p style={{ color: "#263238", fontStyle: "italic", lineHeight: 1.75, marginBottom: 18, fontWeight: 300, fontSize: ".92rem" }}>{r.q}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="rec-avatar">{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: ".85rem", color: "#263238" }}>{r.name}</div>
                    <div style={{ fontSize: ".75rem", color: "#7a9eb0" }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      <section className="cta-dark">
        <div className="serif hide-mobile" style={{ position: "absolute", right: "-0.04em", bottom: "-0.14em", fontSize: "clamp(180px,25vw,340px)", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,.04)", userSelect: "none", pointerEvents: "none" }}>∑</div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <div className="section-kicker-light reveal">Suggest a resource</div>
          <h2 className="serif reveal reveal-d1" style={{ color: "#fff", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", lineHeight: 1.1, fontWeight: 300 }}>
            Found something <em style={{ color: "#e7e8e3", fontStyle: "italic" }}>we should include?</em>
          </h2>
          <p className="section-text reveal reveal-d2" style={{ color: "rgba(255,255,255,.68)", maxWidth: 500, marginTop: 14 }}>
            We'd love your recommendations. Send us a book, PDF, or site that changed how you think about math.
          </p>
          <div className="reveal reveal-d3" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/contact" className="btn-primary">
              Suggest a resource <ArrowRight size={15} />
            </Link>
            <Link href="/join-us" className="btn-ghost-light">
              Join an event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}