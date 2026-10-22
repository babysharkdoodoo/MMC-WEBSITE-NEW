"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { FONTS, CSS } from "@/lib/design-tokens";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const mathBites = [
  {
    id: "counting-in-nature",
    title: "Counting in Nature",
    excerpt:
      "Find numbers in flowers, shells, leaves, and animals. Nature is full of patterns that make counting fun.",
    tags: ["counting", "patterns", "nature"],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "shapes-everywhere",
    title: "Shapes Everywhere!",
    excerpt:
      "Circles, squares, triangles, and rectangles are all around us. Learn how shapes help build the world.",
    tags: ["shapes", "geometry", "everyday-math"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "what-is-pi",
    title: "What Is Pi?",
    excerpt:
      "Pi is a special number used with circles. It helps us understand wheels, pizzas, and round objects.",
    tags: ["circles", "pi", "measurements"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "skip-counting",
    title: "Skip Counting Made Easy",
    excerpt:
      "Skip counting by 2s, 5s, and 10s helps you count faster. It is useful for coins, groups, and games.",
    tags: ["counting", "multiples", "math-skills"],
    image:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "fractions-for-pizza",
    title: "Fractions for Pizza",
    excerpt:
      "Fractions show parts of a whole. A pizza can help explain halves, quarters, and other parts.",
    tags: ["fractions", "food-math", "parts"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "symmetry-art",
    title: "Symmetry in Art",
    excerpt:
      "Symmetry means both sides match. It makes drawings, butterflies, and snowflakes look balanced.",
    tags: ["symmetry", "art", "patterns"],
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "math-and-games",
    title: "Math and Games",
    excerpt:
      "Games use numbers, turns, scoring, and strategy. Math helps us play fair and keep track.",
    tags: ["games", "logic", "numbers"],
    image:
      "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "patterns-and-sequences",
    title: "Patterns and Sequences",
    excerpt:
      "A sequence is a group of numbers that follows a rule. Once you spot the pattern, you can guess what comes next.",
    tags: ["patterns", "sequences", "logic"],
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "measuring-things",
    title: "Measuring Things",
    excerpt:
      "Math helps us measure height, length, and time. Measuring tells us how big or how long something is.",
    tags: ["measurement", "units", "numbers"],
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop",
  },
  // {
  //   id: "math-in-puzzles",
  //   title: "Math in Puzzles",
  //   excerpt:
  //     "Puzzles use clues, patterns, and logic. Solving them is a great way to train your brain.",
  //   tags: ["puzzles", "logic", "brain-teasers"],
  //   image:
  //     "https://images.unsplash.com/photo-1579758629938-0fa64c8a16f1?q=80&w=1600&auto=format&fit=crop",
  // },
];

export default function MathBitesPage() {
  useReveal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = mathBites.filter((b) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    const matchTag = selectedTag ? b.tags.includes(selectedTag) : true;
    return matchSearch && matchTag;
  });

  const [featured, ...rest] = filtered;

  return (
    <div>
      <style>{FONTS}</style>
      <style>{CSS}</style>
      <style>{`
        .featured-card {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          border: 1px solid rgba(23,104,158,.10);
          background: #fff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 70px rgba(10,45,68,.10);
          transition: transform .25s ease, box-shadow .25s ease;
          min-height: 560px;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 90px rgba(10,45,68,.16);
        }
        .bite-card {
          border: 1px solid rgba(23,104,158,.10);
          background: #fff;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(10,45,68,.07);
          display: flex;
          flex-direction: column;
          transition: transform .25s ease, box-shadow .25s ease;
          min-height: 100%;
        }
        .bite-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(10,45,68,.12);
        }
        .bite-card-body {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .tag-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 999px;
          background: #e7e8e3;
          color: #45616b;
          font-size: .74rem;
          font-weight: 700;
          letter-spacing: .05em;
          text-decoration: none;
          transition: background .15s ease, transform .15s ease;
          font-family: 'Switzer', sans-serif;
          border: none;
          cursor: pointer;
        }
        .tag-chip:hover {
          background: #cce8f8;
          transform: translateY(-1px);
        }
        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #e7e8e3;
          color: #45616b;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: .9rem;
        }
        .empty-state {
          text-align: center;
          padding: 72px 32px;
          border: 1px solid rgba(23,104,158,.10);
          border-radius: 24px;
          background: #f4f3ef;
        }
        .submit-cta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px,5vw,60px);
          align-items: center;
        }
        @media (max-width: 980px) {
          .featured-card {
            grid-template-columns: 1fr !important;
          }
          .bites-grid {
            grid-template-columns: 1fr !important;
          }
          .submit-cta {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section className="hero-dark">
        <div className="serif bg-symbol-hero" aria-hidden="true">
          ∫
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="pill reveal"
            style={{ background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.9)" }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#e7e8e3",
              }}
            />
            Student explorations
          </div>
          <h1
            className="serif reveal reveal-d1"
            style={{
              marginTop: 20,
              fontSize: "clamp(3.4rem,7vw,6.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              fontWeight: 300,
              color: "#fff",
            }}
          >
            Math
            <br />
            <em style={{ color: "#e7e8e3", fontStyle: "italic" }}>Insights</em>
          </h1>
          <div
            className="divider reveal reveal-d2"
            style={{ background: "rgba(255,255,255,.35)", margin: "22px 0 24px" }}
          />
          <p
            className="reveal reveal-d3"
            style={{
              maxWidth: 520,
              fontSize: "clamp(.95rem,1.5vw,1.1rem)",
              lineHeight: 1.85,
              color: "rgba(255,255,255,.75)",
              fontWeight: 300,
            }}
          >
            Simple, fun math ideas written for curious young readers.
          </p>
        </div>
      </section>

      <section
        className="soft-grid filter-section"
        style={{ background: "#f4f3ef" }}
      >
        <div className="container">
          <div
            className="reveal"
            style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
          >
            <input
              type="text"
              placeholder="Search articles…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: ".95rem",
                fontWeight: 300,
                padding: "13px 18px",
                borderRadius: 999,
                border: "1.5px solid rgba(23,104,158,.18)",
                background: "#fff",
                color: "#263238",
                outline: "none",
                minWidth: 240,
              }}
            />
            {[
              "counting",
              "patterns",
              "shapes",
              "geometry",
              "fractions",
              "games",
              "puzzles",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "1.5px solid",
                  borderColor: selectedTag === tag ? "#45616b" : "rgba(23,104,158,.2)",
                  background: selectedTag === tag ? "#45616b" : "#fff",
                  color: selectedTag === tag ? "#fff" : "#45616b",
                  fontSize: ".76rem",
                  fontWeight: 700,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .15s ease",
                }}
              >
                {tag}
              </button>
            ))}
            {(searchTerm || selectedTag) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTag(null);
                }}
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  background: "none",
                  border: "none",
                  color: "#7a9eb0",
                  fontSize: ".82rem",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {featured && (
        <section className="section-space" style={{ background: "#fff" }}>
          <div className="container">
            <div className="section-kicker reveal">Featured pick</div>
            <div className="featured-card reveal reveal-d1">
              <div className="featured-image" style={{ position: "relative", background: "#e7e8e3" }}>
                <Image
                  src={featured.image || "/placeholder.svg"}
                  alt={featured.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    background: "#45616b",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 999,
                    fontSize: ".72rem",
                    fontWeight: 800,
                    letterSpacing: ".08em",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Sparkles size={11} />
                  Featured
                </div>
              </div>
              <div
                style={{
                  padding: "clamp(24px,3vw,40px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(1.9rem,3vw,2.8rem)",
                    lineHeight: 1.08,
                    fontWeight: 400,
                    color: "#263238",
                    marginBottom: 18,
                  }}
                >
                  {featured.title}
                </h2>
                <p className="section-text" style={{ marginBottom: 22, fontSize: "1.02rem" }}>
                  {featured.excerpt}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {featured.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="tag-chip"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <Link
                  href={`/math-bites/${featured.id}`}
                  className="btn-primary"
                  style={{ alignSelf: "flex-start" }}
                >
                  Read full article <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-space" style={{ background: "#f4f3ef" }}>
        <div className="container">
          <div className="section-kicker reveal">More to explore</div>
          <h2 className="serif section-title reveal reveal-d1" style={{ marginBottom: "var(--mmc-content-gap)" }}>
            Bigger, easier, <em style={{ color: "#45616b", fontStyle: "italic" }}>more fun.</em>
          </h2>

          {rest.length > 0 ? (
            <div
              className="bites-grid reveal reveal-d2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 28,
              }}
            >
              {rest.map((bite) => (
                <div key={bite.id} className="bite-card">
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "16/10",
                      background: "#e7e8e3",
                    }}
                  >
                    <Image
                      src={bite.image || "/placeholder.svg"}
                      alt={bite.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="bite-card-body">
                    <h3
                      className="serif"
                      style={{
                        fontSize: "1.55rem",
                        fontWeight: 400,
                        color: "#263238",
                        lineHeight: 1.15,
                        marginBottom: 12,
                      }}
                    >
                      {bite.title}
                    </h3>
                    <p
                      style={{
                        color: "#263238",
                        fontSize: ".98rem",
                        lineHeight: 1.75,
                        fontWeight: 300,
                        marginBottom: 18,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {bite.excerpt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 24,
                      }}
                    >
                      {bite.tags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="tag-chip"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="avatar">{bite.title.charAt(0)}</div>
                        <span style={{ color: "#7a9eb0", fontSize: ".82rem" }}>
                          Math Bite
                        </span>
                      </div>
                      <Link
                        href={`/math-bites/${bite.id}`}
                        style={{
                          color: "#45616b",
                          fontWeight: 700,
                          fontSize: ".85rem",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        Read <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state reveal">
              <p className="section-text" style={{ marginBottom: 20 }}>
                No articles match your search.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTag(null);
                }}
                className="btn-secondary"
                style={{ fontFamily: "'Switzer', sans-serif" }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section-space"
        style={{
          background: "#fff",
          borderTop: "1px solid #e1edf5",
        }}
      >
        <div className="container">
          <div className="submit-cta">
            <div>
              <div className="section-kicker reveal">Contribute</div>
              <h2 className="serif section-title reveal reveal-d1">
                Got a cool
                <br />
                <em style={{ color: "#45616b", fontStyle: "italic" }}>math idea? 💡</em>
              </h2>
              <p
                className="section-text reveal reveal-d2"
                style={{ marginTop: 18, maxWidth: 480 }}
              >
                Share a fun idea, a pattern you noticed, or a math question you want
                explained. We will help turn it into a Math Bite.
              </p>
              <div className="reveal reveal-d3" style={{ marginTop: 28 }}>
                <a href="mailto:eshan@orlandomathcircle.org" className="btn-primary">
                  Submit your idea <ArrowRight size={15} />
                </a>
              </div>
            </div>
            <div
              className="reveal reveal-d2"
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: 24,
                overflow: "hidden",
                background: "#e7e8e3",
              }}
            >
              <Image
                src="/placeholder.svg?height=700&width=900&text=Share+Your+Ideas"
                alt="Submit your idea"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-dark">
        <div className="serif bg-symbol" aria-hidden="true">
          Δ
        </div>
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, maxWidth: 700 }}
        >
          <div className="section-kicker reveal" style={{ color: "#e7e8e3" }}>
            Get involved
          </div>
          <h2
            className="serif reveal reveal-d1"
            style={{
              color: "#fff",
              fontSize: "clamp(2.2rem,4.5vw,3.6rem)",
              lineHeight: 1.1,
              fontWeight: 300,
            }}
          >
            Ready to join
            <br />
            <em style={{ color: "#e7e8e3", fontStyle: "italic" }}>the circle?</em>
          </h2>
          <div
            className="reveal reveal-d2"
            style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}
          >
            <Link href="/join-us" className="btn-primary">
              Join an event <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
