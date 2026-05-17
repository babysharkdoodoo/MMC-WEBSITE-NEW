"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Linkedin } from "lucide-react";

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
  .btn-ghost-light {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 48px; padding: 0 24px; border-radius: 999px;
    text-decoration: none;
    transition: transform .2s ease, border-color .2s ease, background .2s ease;
    font-size: .82rem; font-weight: 700;
    letter-spacing: .09em; text-transform: uppercase; white-space: nowrap;
    color: rgba(255,255,255,.9); border: 1.5px solid rgba(255,255,255,.25);
  }
  .btn-ghost-light:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.65); background: rgba(255,255,255,.06); }

  /* ── Typography helpers ── */
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

  /* ── Team card ── */
  .team-card {
    border: 1px solid rgba(23,104,158,.10);
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(10,45,68,.06);
    display: flex;
    flex-direction: column;
    transition: transform .3s cubic-bezier(0.16,1,0.3,1), box-shadow .3s ease, border-color .3s ease;
  }
  .team-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(10,45,68,.13);
    border-color: rgba(23,104,158,.28);
  }

  .team-card-img {
    position: relative;
    aspect-ratio: 1/1;
    overflow: hidden;
    background: #eaf4fb;
  }
  .team-card-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .6s cubic-bezier(0.16,1,0.3,1);
  }
  .team-card:hover .team-card-img img { transform: scale(1.06); }

  /* Index badge on image */
  .team-card-badge {
    position: absolute;
    top: 16px; left: 16px;
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,.92);
    display: grid; place-items: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem; font-weight: 700;
    color: #17689e;
    box-shadow: 0 4px 12px rgba(10,45,68,.12);
    backdrop-filter: blur(6px);
  }

  .team-card-body {
    padding: 24px 24px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .team-card-role {
    display: inline-block;
    font-size: .72rem; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase;
    color: #17689e;
    margin-bottom: 8px;
  }

  .team-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem; font-weight: 400;
    color: #0a2d44; line-height: 1.1;
    margin-bottom: 6px;
  }

  .team-card-meta {
    font-size: .8rem; color: #4c6b7f; font-weight: 300;
    margin-bottom: 14px; line-height: 1.5;
  }

  .team-card-divider {
    width: 28px; height: 1.5px;
    background: rgba(23,104,158,.25);
    border-radius: 999px;
    margin-bottom: 14px;
  }

  .team-card-bio {
    color: #4c6b7f;
    font-size: .88rem;
    line-height: 1.78;
    font-weight: 300;
    flex: 1;
  }

  .team-card-footer {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid rgba(23,104,158,.08);
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .social-link {
    display: grid; place-items: center;
    width: 34px; height: 34px;
    border-radius: 10px;
    border: 1px solid rgba(23,104,158,.18);
    color: #17689e;
    text-decoration: none;
    transition: background .2s ease, border-color .2s ease, transform .2s ease, color .2s ease;
  }
  .social-link:hover {
    background: #17689e; border-color: #17689e; color: #fff;
    transform: translateY(-2px);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hide-mobile { display: none !important; }
    .team-grid   { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 560px) {
    .container { width: min(100% - 32px, 1120px); }
    .team-grid { grid-template-columns: 1fr !important; }
  }
`;

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

const MARQUEE_ITEMS = [
  "Student-Led", "West Shore High School", "Orlando Math Circle Chapter",
  "Founded 2023", "Melbourne, FL", "Peer Learning", "Problem Solving", "Community Impact",
  "Student-Led", "West Shore High School", "Orlando Math Circle Chapter",
  "Founded 2023", "Melbourne, FL", "Peer Learning", "Problem Solving", "Community Impact",
];

const teamMembers = [
  {
    name: "Eshan Vipuil",
    role: "Founder & President",
    grade: "11th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Eshan is a junior at West Shore Junior Senior High School with a strong interest in mathematics and computer science. He has won numerous awards in competitive math, including MathCounts, Math Kangaroo, and AMC, and serves as the President and Lead Instructor of the West Shore MathCounts Club. Outside of academics, Eshan is an avid tennis player on the West Shore Varsity Team.",
    image: "/pfps/eshan.png",
    social: {
      email: "eshan.mmc@orlandomathcircle.org",
      linkedin: "eshan-vipuil-8042952a3",
    },
  },
  {
    name: "Shoaib Ahmed",
    role: "Vice President",
    grade: "11th Grade",
    school: "West Shore Jr/Sr High",
    bio: "Shoaib Ahmed is a West Shore student driven by a passion for igniting curiosity and inspiring others. As an internationally award-winning Future Problem Solver and officially recognized in Math Kangaroo, he excels at tackling challenges with creative thinking. Beyond academics, he enjoys playing basketball and giving back to the community.",
    image: "/pfps/shoaib.png",
    social: {
      email: "shoaib.mmc@orlandomathcircle.org",
    },
  },
  {
    name: "Sidharth Patsamatla",
    role: "Volunteer",
    grade: "11th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Sidharth Patsamatla is a dedicated high school student focused on facilitating higher-order student learning. As an ISEF finalist and FPS international qualifier, Sidharth is highly experienced in mathematics, critical thinking, and problem-solving. Outside of academics, Sidharth enjoys playing basketball and board games.",
    image: "/pfps/sid.jpg",
    social: {},
  },
  {
    name: "Saaketh Kesireddy",
    role: "Alumni Advisor",
    grade: "Freshman",
    school: "University of Florida",
    bio: "Saaketh is a freshman at the University of Florida, Class of 2029, with a keen interest in computer science and finance. As a dedicated volunteer at Health First Palm Bay Hospital, he combines his academic pursuits with a passion for community service. Outside of school, Saaketh enjoys tennis and challenges himself with new ways to merge technology and business.",
    image: "/pfps/saaketh.png",
    social: {
      linkedin: "saaketh-kesireddy",
    },
  },
];

export default function TeamPage() {
  useReveal();

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
        {/* Decorative large T */}
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
          T
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
            <em style={{ color: "#17689e", fontStyle: "italic" }}>Team</em>
          </h1>

          <div className="divider reveal reveal-d2" />

          <p
            className="reveal reveal-d3"
            style={{
              maxWidth: 520,
              fontSize: "clamp(1rem,1.65vw,1.12rem)",
              lineHeight: 1.85, color: "#4c6b7f", fontWeight: 300,
            }}
          >
            Meet the passionate students who organize, lead, and shape the Melbourne Math Circle experience.
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

      {/* ── TEAM GRID ── */}
      <section style={{ background: "#f4f9fc", padding: "clamp(72px,10vw,112px) 0" }}>
        <div className="container">
          <div style={{ marginBottom: 52 }}>
            <div className="section-kicker reveal">The people behind it</div>
            <h2
              className="serif reveal reveal-d1"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.12, fontWeight: 400, color: "#0a2d44", maxWidth: 560 }}
            >
              Student leaders building something real.
            </h2>
          </div>

          <div
            className="team-grid reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card" style={{ transitionDelay: `${index * 0.06}s` }}>
                {/* Image */}
                <div className="team-card-img">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="team-card-badge">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Body */}
                <div className="team-card-body">
                  <span className="team-card-role">{member.role}</span>

                  <div className="team-card-name">
                    {member.social.linkedin ? (
                      <a
                        href={`https://linkedin.com/in/${member.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "none", transition: "color .2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#17689e")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#0a2d44")}
                      >
                        {member.name}
                      </a>
                    ) : (
                      member.name
                    )}
                  </div>

                  {(member.grade || member.school) && (
                    <div className="team-card-meta">
                      {member.grade && <span>{member.grade}</span>}
                      {member.grade && member.school && <span> · </span>}
                      {member.school && <span>{member.school}</span>}
                    </div>
                  )}

                  <div className="team-card-divider" />

                  <p className="team-card-bio">{member.bio}</p>

                  {(member.social.email || member.social.linkedin) && (
                    <div className="team-card-footer">
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="social-link"
                          title={`Email ${member.name}`}
                        >
                          <Mail size={15} />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.social.linkedin}`}
                          className="social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${member.name} on LinkedIn`}
                        >
                          <Linkedin size={15} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN THE TEAM ── */}
      <section style={{ background: "#fff", padding: "clamp(64px,9vw,96px) 0", borderTop: "1px solid #e1edf5" }}>
        <div className="container">
          <div
            style={{
              display: "grid", gridTemplateColumns: "1fr auto",
              gap: "clamp(24px,4vw,48px)", alignItems: "center",
            }}
            className="split-grid"
          >
            <div>
              <div className="section-kicker reveal">Get involved</div>
              <h2
                className="serif reveal reveal-d1"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1.15, fontWeight: 400, color: "#0a2d44", maxWidth: 560 }}
              >
                Interested in volunteering or joining the team?
              </h2>
              <p
                className="reveal reveal-d2"
                style={{ marginTop: 14, color: "#4c6b7f", lineHeight: 1.85, fontWeight: 300, maxWidth: 480 }}
              >
                We're always looking for students who are passionate about mathematics and community.
                Reach out and let's build something together.
              </p>
            </div>
            <div className="reveal reveal-d2" style={{ flexShrink: 0 }}>
              <Link href="/join-us" className="btn-primary">
                Get in touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA (dark) ── */}
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
          π
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div className="section-kicker-light">Attend a session</div>
          <h2
            className="serif reveal"
            style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.1, fontWeight: 300 }}
          >
            Ready to explore{" "}
            <em style={{ color: "#8fd0ef", fontStyle: "italic" }}>mathematics</em> with us?
          </h2>
          <p
            className="reveal reveal-d1"
            style={{ color: "rgba(255,255,255,.68)", maxWidth: 520, marginTop: 18, lineHeight: 1.85, fontWeight: 300 }}
          >
            Our events are free, student-led, and open to any student in the Melbourne area who wants more than what the classroom offers.
          </p>
          <div className="reveal reveal-d2" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link href="/join-us" className="btn-primary">
              Join an event <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-ghost-light">
              About us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}