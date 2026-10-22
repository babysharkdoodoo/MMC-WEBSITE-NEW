import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { FONTS, CSS } from "@/lib/design-tokens";
import "../circle.css";

export const metadata: Metadata = {
  title: "Our story | Melbourne Math Circle",
  description: "How students brought Orlando Math Circle to Melbourne, Florida, and what our local chapter does.",
};

export default function AboutPage() {
  return (
    <div className="circle-page">
      <style>{FONTS}</style><style>{CSS}</style>
      <section className="circle-section container circle-split">
        <div>
          <h1 className="serif">Our story</h1>
          <p className="circle-lead">A math circle closer to home.</p>
          <p>Melbourne Math Circle began in 2023, after a group of high school students took part in Orlando Math Circle and wanted to bring that experience to Melbourne.</p>
          <p>The idea was straightforward: make room for students to spend time on interesting math together, with older students helping younger ones along the way.</p>
          <p>We’re a chapter of Orlando Math Circle. Eshan Vipuil is our founder and president, and fellow student volunteers help run the circle.</p>
          <a href="https://www.orlandomathcircle.org/pages/about-us" target="_blank" rel="noopener noreferrer" className="circle-link">Meet our parent organization <ArrowRight size={16} /></a>
        </div>
        <figure className="circle-hero-photo">
          <Image src="/home-screen-photo.jpg" alt="The Melbourne Math Circle group gathered after a session" width={1345} height={690} sizes="(max-width: 800px) 100vw, 50vw" priority />
          <figcaption>Students and volunteers who make the circle possible.</figcaption>
        </figure>
      </section>
      <section className="circle-section circle-tint">
        <div className="container circle-split">
          <div>
            <h2 className="serif">The work we do</h2>
            <p>Our activities include monthly meetings and math outreach at IndiaFest and University Park Elementary. The gallery shows students and volunteers at those events.</p>
            <p>At a session, we introduce an idea, give students time to try problems, and compare solutions. The discussion matters as much as the final answer.</p>
            <Link href="/gallery" className="circle-link">See our meetings and outreach <ArrowRight size={16} /></Link>
          </div>
          <div>
            <h2 className="serif">Who it’s for</h2>
            <p>You don’t have to be on a math team or already feel confident in math. Our sessions are free, and students can join the discussion at their own pace.</p>
            <p>If you’re unsure whether a session is right for your child, or you need an accommodation, please ask us before signing up.</p>
            <Link href="/contact" className="circle-link">Talk to us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="circle-section container circle-split">
        <div>
          <h2 className="serif">The people behind it</h2>
          <p>We’re students with our own classes, interests, and questions. Some of us enjoy competition math; others come to it through coding, research, or puzzles. The circle is where we share that interest with other students.</p>
          <Link href="/team" className="circle-link">Meet the team <ArrowRight size={16} /></Link>
        </div>
        <div>
          <h2 className="serif">Join a session</h2>
          <p>Sign up to receive session announcements and RSVP links. For questions about volunteering or bringing an activity to your school, contact our team.</p>
          <div className="circle-actions">
            <Link href="/join-us" className="btn-primary">Get meeting updates <ArrowRight size={16} /></Link>
            <Link href="/contact" className="circle-link">Ask about volunteering</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
