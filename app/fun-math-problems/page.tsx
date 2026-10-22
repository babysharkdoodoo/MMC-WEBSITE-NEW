"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";

const GRADES = ["all", "elementary", "middle", "high", "open"];
const SKILLS = ["all", "starter", "builder", "solver", "olympiad"];

function choose(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let res = 1;
  for (let i = 1; i <= k; i++) res = (res * (n - k + i)) / i;
  return Math.round(res);
}

function buildProblem(seed, variant) {
  const template = seed % 10;

  if (template === 0) {
    const r = 3 + (variant % 5);
    const c = 3 + ((variant * 2) % 5);
    return {
      id: seed,
      title: `${r}×${c} Grid Paths`,
      topic: "Combinatorics",
      difficulty: variant % 3 === 0 ? "challenge" : "warm-up",
      grades: ["elementary", "middle", "high"],
      skills: ["starter", "builder"],
      body: `How many paths go from the bottom-left to the top-right corner of a ${r}×${c} grid if you can only move right or up?`,
      hint: `A path uses exactly ${r} right moves and ${c} up moves.`,
      solution: `Choose the ${r} right moves among ${r + c} total moves: C(${r + c}, ${r}) = ${choose(r + c, r)}.`,
    };
  }

  if (template === 1) {
    const people = 10 + (variant % 20);
    return {
      id: seed,
      title: `${people} People at a Party`,
      topic: "Combinatorics",
      difficulty: "warm-up",
      grades: ["elementary", "middle", "high"],
      skills: ["starter", "builder"],
      body: `If everyone in a group of ${people} people shakes hands with everyone else exactly once, how many handshakes occur?`,
      hint: "Each handshake is a pair of people.",
      solution: `Choose 2 people from ${people}: C(${people}, 2) = ${choose(people, 2)}.`,
    };
  }

  if (template === 2) {
    const sides = 5 + (variant % 10);
    return {
      id: seed,
      title: `${sides}-Sided Polygon`,
      topic: "Geometry",
      difficulty: "warm-up",
      grades: ["elementary", "middle", "high"],
      skills: ["starter", "builder"],
      body: `What is the sum of the interior angles of a convex polygon with ${sides} sides?`,
      hint: "Draw diagonals from one vertex to make triangles.",
      solution: `The polygon splits into ${sides - 2} triangles, so the sum is ${(sides - 2) * 180} degrees.`,
    };
  }

  if (template === 3) {
    const n = 13 + (variant % 20);
    return {
      id: seed,
      title: `Pigeonhole Group of ${n}`,
      topic: "Combinatorics",
      difficulty: "warm-up",
      grades: ["elementary", "middle", "high"],
      skills: ["starter"],
      body: `In any group of ${n} people, prove that at least two were born in the same month.`,
      hint: "There are only 12 months.",
      solution: `With ${n} people and 12 months, the Pigeonhole Principle guarantees at least one month has at least 2 people.`,
    };
  }

  if (template === 4) {
    const target = 5 + (variant % 7);
    let count = 0;
    for (let a = 1; a <= 6; a++) {
      for (let b = 1; b <= 6; b++) {
        if (a + b === target) count++;
      }
    }
    return {
      id: seed,
      title: `Two Dice Sum ${target}`,
      topic: "Probability",
      difficulty: variant % 4 === 0 ? "medium" : "warm-up",
      grades: ["middle", "high", "open"],
      skills: ["builder", "solver"],
      body: `What is the probability that the sum of two fair six-sided dice is ${target}?`,
      hint: "Count the ordered pairs that make the target sum.",
      solution: `${count} ordered outcomes out of 36 give sum ${target}, so the probability is ${count}/36.`,
    };
  }

  if (template === 5) {
    const n = 8 + (variant % 12);
    return {
      id: seed,
      title: `Complete Graph K${n}`,
      topic: "Graph Theory",
      difficulty: "warm-up",
      grades: ["middle", "high", "open"],
      skills: ["builder", "solver"],
      body: `How many edges does the complete graph on ${n} vertices have?`,
      hint: "Each edge joins a pair of vertices.",
      solution: `Choose 2 vertices from ${n}: K${n} has C(${n}, 2) = ${choose(n, 2)} edges.`,
    };
  }

  if (template === 6) {
    const n = 2 + (variant % 20);
    return {
      id: seed,
      title: `Triangular Number T${n}`,
      topic: "Number Theory",
      difficulty: "warm-up",
      grades: ["middle", "high", "open"],
      skills: ["builder"],
      body: `Find the ${n}th triangular number and compute it.`,
      hint: "The nth triangular number is 1 + 2 + ... + n.",
      solution: `T${n} = ${n}(${n} + 1)/2 = ${(n * (n + 1)) / 2}.`,
    };
  }

  if (template === 7) {
    const n = 5 + (variant % 10);
    return {
      id: seed,
      title: `${n} Intersecting Circles`,
      topic: "Combinatorics",
      difficulty: "challenge",
      grades: ["high", "open"],
      skills: ["solver", "olympiad"],
      body: `${n} circles are drawn so every pair intersects in exactly two points and no three meet at a point. Into how many regions is the plane divided?`,
      hint: "Each new circle is cut into more arcs by previous circles.",
      solution: `The number of regions is n² - n + 2, so for n = ${n}, the answer is ${n * n - n + 2}.`,
    };
  }

  if (template === 8) {
    return {
      id: seed,
      title: "Rope Timing",
      topic: "Logic",
      difficulty: "medium",
      grades: ["high", "open"],
      skills: ["solver"],
      body: "You have two ropes that each burn for 60 minutes, but not evenly. How can you measure exactly 45 minutes using only matches?",
      hint: "Use one rope from both ends.",
      solution:
        "Light rope A at both ends and rope B at one end. When A burns out in 30 minutes, light the other end of B. B then finishes in 15 more minutes, totaling 45.",
    };
  }

  return {
    id: seed,
    title: "Diagonal Argument",
    topic: "Set Theory",
    difficulty: "challenge",
    grades: ["high", "open"],
    skills: ["solver", "olympiad"],
    body: "Explain why the real numbers between 0 and 1 cannot be listed in a sequence.",
    hint: "Create a number that differs from the nth listed number in the nth digit.",
    solution:
      "Cantor's diagonal argument builds a new number not on the list, so the interval (0, 1) is uncountable.",
  };
}

function generateProblems(count = 100) {
  return Array.from({ length: count }, (_, i) => buildProblem(i + 1, i + 1));
}

function labelGrade(v) {
  if (v === "all") return "All grades";
  if (v === "elementary") return "Elementary";
  if (v === "middle") return "Middle";
  if (v === "high") return "High school";
  return "Open";
}

function labelSkill(v) {
  if (v === "all") return "All skills";
  if (v === "starter") return "Starter";
  if (v === "builder") return "Builder";
  if (v === "solver") return "Solver";
  return "Olympiad";
}

export default function FunMathProblemsPage() {
  const [allProblems, setAllProblems] = useState(generateProblems(100));
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState("all");
  const [skill, setSkill] = useState("all");
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(null); // "hint" | "solution" | null
  const [done, setDone] = useState({});

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch("/api/fun-math-problems", { cache: "no-store" });
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        const items = Array.isArray(data) ? data : data?.problems;
        if (alive && Array.isArray(items) && items.length) {
          setAllProblems(items.slice(0, 100));
        }
      } catch {
        // keep generated fallback
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return allProblems.filter((p) => {
      const gradeOk = grade === "all" || p.grades.includes(grade);
      const skillOk = skill === "all" || p.skills.includes(skill);
      return gradeOk && skillOk;
    });
  }, [allProblems, grade, skill]);

  const current = filtered[index] || filtered[0] || null;
  const total = filtered.length;

  useEffect(() => {
    setIndex(0);
    setShow(null);
  }, [grade, skill]);

  useEffect(() => {
    if (index >= filtered.length) setIndex(0);
  }, [index, filtered.length]);

  function next() {
    if (!filtered.length) return;
    setIndex((i) => (i + 1) % filtered.length);
    setShow(null);
  }

  function prev() {
    if (!filtered.length) return;
    setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    setShow(null);
  }

  function randomPick() {
    if (!filtered.length) return;
    const r = Math.floor(Math.random() * filtered.length);
    setIndex(r);
    setShow(null);
  }

  function markDone(id) {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const progress = total ? ((index + 1) / total) * 100 : 0;

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>
      <style>{`
        .page-shell {
          min-height: 100vh;
          background: linear-gradient(180deg,#fff 0%,#f7fbfe 55%,#fff 100%);
        }
        .panel {
          border: 1px solid rgba(23,104,158,.10);
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(10,45,68,.05);
        }
        .chip {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(23,104,158,.14);
          background: #fff;
          padding: 9px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: .76rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #4c6b7f;
          cursor: pointer;
          transition: all .18s ease;
        }
        .chip:hover {
          border-color: rgba(23,104,158,.3);
          color: #17689e;
          background: #f7fbfe;
        }
        .chip.active {
          background: #17689e;
          color: #fff;
          border-color: #17689e;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 999px;
          padding: 11px 16px;
          border: 1px solid transparent;
          font-family: 'Outfit', sans-serif;
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .18s ease;
        }
        .btn.btn-fill {
          background: #17689e;
          color: #fff;
        }
        .btn.btn-fill:hover {
          background: #0f557f;
        }
        .btn.btn-outline {
          background: #fff;
          color: #17689e;
          border-color: rgba(23,104,158,.18);
        }
        .btn.btn-outline:hover {
          background: #f7fbfe;
        }
        .muted {
          color: #4c6b7f;
          line-height: 1.85;
          font-weight: 300;
        }
        .title {
          font-size: clamp(2.6rem, 5.5vw, 5.2rem);
          line-height: .98;
          letter-spacing: -0.03em;
          font-weight: 300;
          color: #0a2d44;
        }
        .meta {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 5px 12px;
          background: #f4f9fc;
          border: 1px solid rgba(23,104,158,.10);
          color: #4c6b7f;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .bar {
          height: 9px;
          border-radius: 999px;
          background: #e7f4fb;
          overflow: hidden;
        }
        .bar > span {
          display: block;
          height: 100%;
          background: #17689e;
          border-radius: inherit;
        }
        .card {
          border-radius: 22px;
          border: 1px solid rgba(23,104,158,.10);
          background: #fff;
          padding: 22px;
          box-shadow: 0 8px 24px rgba(10,45,68,.05);
        }
      `}</style>

      <div className="page-shell">
        <section className="section-space soft-grid">
          <div className="container">
            <div className="max-w-3xl">
              <div className="pill">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#17689e" }} />
                One problem at a time
              </div>
              <h1 className="serif title" style={{ marginTop: 18, maxWidth: 760 }}>
                Fun Math Problems
              </h1>
              <p className="muted" style={{ marginTop: 16, maxWidth: 650, fontSize: "1rem" }}>
                Pick a level, then move through the problems one by one. No giant board, no clutter, just a simple flow.
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: "0 0 var(--mmc-section-space)" }}>
          <div className="container">
            <div
              className="panel"
              style={{
                padding: 18,
                marginBottom: 18,
                display: "grid",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`chip ${grade === g ? "active" : ""}`}
                      onClick={() => setGrade(g)}
                    >
                      {labelGrade(g)}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <button type="button" className="btn btn-secondary" onClick={prev}>
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={next}>
                    Next <ChevronRight size={14} />
                  </button>
                  <button type="button" className="btn btn-primary" onClick={randomPick}>
                    <Shuffle size={14} /> Random
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SKILLS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`chip ${skill === s ? "active" : ""}`}
                    onClick={() => setSkill(s)}
                  >
                    {labelSkill(s)}
                  </button>
                ))}
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: ".8rem", color: "#6d8798" }}>
                  <span>{loading ? "Loading..." : `${total} problems in this set`}</span>
                  <span>{total ? `${index + 1} / ${total}` : "0 / 0"}</span>
                </div>
                <div className="bar">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{
                maxWidth: 820,
                margin: "0 auto",
              }}
            >
              {current ? (
                <>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    <span className="meta">{current.topic}</span>
                    <span className="meta">{current.difficulty}</span>
                    <span className="meta">{done[current.id] ? "Done" : "In progress"}</span>
                  </div>

                  <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", lineHeight: 1.05, fontWeight: 400, color: "#0a2d44", marginBottom: 12 }}>
                    {current.title}
                  </h2>

                  <p style={{ color: "#0a2d44", lineHeight: 1.9, fontSize: "1rem", marginBottom: 18 }}>
                    {current.body}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                    <button
                      type="button"
                      className={`btn ${show === "hint" ? "btn-primary" : "btn-secondary"}`}
                      onClick={() => setShow(show === "hint" ? null : "hint")}
                    >
                      Hint
                    </button>
                    <button
                      type="button"
                      className={`btn ${show === "solution" ? "btn-primary" : "btn-secondary"}`}
                      onClick={() => setShow(show === "solution" ? null : "solution")}
                    >
                      Solution
                    </button>
                    <button
                      type="button"
                      className={done[current.id] ? "btn btn-primary" : "btn btn-secondary"}
                      onClick={() => markDone(current.id)}
                    >
                      <CheckCircle2 size={14} />
                      {done[current.id] ? "Completed" : "Mark complete"}
                    </button>
                  </div>

                  {show === "hint" && (
                    <div
                      style={{
                        borderRadius: 18,
                        background: "#f7fbfe",
                        border: "1px solid #e1edf5",
                        padding: 16,
                        marginBottom: 14,
                      }}
                    >
                      <div style={{ fontSize: ".72rem", fontWeight: 700, color: "#17689e", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
                        Hint
                      </div>
                      <p className="muted" style={{ margin: 0 }}>
                        {current.hint}
                      </p>
                    </div>
                  )}

                  {show === "solution" && (
                    <div
                      style={{
                        borderRadius: 18,
                        background: "#edf7fc",
                        border: "1px solid #dbe9f3",
                        padding: 16,
                        marginBottom: 14,
                      }}
                    >
                      <div style={{ fontSize: ".72rem", fontWeight: 700, color: "#0f557f", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
                        Solution
                      </div>
                      <p style={{ margin: 0, color: "#0a2d44", lineHeight: 1.85 }}>
                        {current.solution}
                      </p>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
                    <div style={{ color: "#6d8798", fontSize: ".9rem" }}>
                      {current.grades.map((g) => labelGrade(g)).join(" · ")} 
                    </div>
                    <div style={{ color: "#6d8798", fontSize: ".9rem" }}>
                      {current.skills.map((s) => labelSkill(s)).join(" · ")}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 10px" }}>
                  <Sparkles size={28} style={{ color: "#17689e", marginBottom: 10 }} />
                  <h2 className="serif" style={{ margin: 0, fontSize: "2rem", fontWeight: 400, color: "#0a2d44" }}>
                    No problems match this set
                  </h2>
                  <p className="muted" style={{ marginTop: 12 }}>
                    Try a different grade or skill level.
                  </p>
                </div>
              )}
            </div>

            <div style={{ maxWidth: 820, margin: "18px auto 0", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <Link href="/join-us" className="btn btn-secondary">
                Join an event <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn btn-primary">
                Submit a problem <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
