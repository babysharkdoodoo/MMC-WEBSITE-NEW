import Link from "next/link";
import type { Metadata } from "next";
import { FONTS, CSS } from "@/lib/design-tokens";
import "../circle.css";

export const metadata: Metadata = {
  title: "Meetings and events | Melbourne Math Circle",
  description: "How to hear about upcoming Melbourne Math Circle sessions and see photos from our meetings and outreach.",
};

export default function EventsPage() {
  return (
    <div className="circle-page">
      <style>{FONTS}</style><style>{CSS}</style>
      <section className="circle-section container">
        <h1 className="serif">Meetings and events</h1>
        <p>Session announcements and RSVP links are sent by email. Check the event email for its date, time, location, and age group.</p>
        <p>There are no upcoming dates listed on this page right now. You can register to receive announcements, or contact us about the next session.</p>
        <div className="circle-actions">
          <Link href="/join-us" className="btn-primary">Get meeting updates</Link>
          <Link href="/contact" className="circle-link">Ask about the next session</Link>
        </div>
      </section>
      <section className="circle-section circle-tint">
        <div className="container circle-split">
          <div><h2 className="serif">Meetings and outreach in photos</h2><p>See the circle at monthly meetings, IndiaFest, and University Park Elementary.</p><Link href="/gallery" className="circle-link">Browse the gallery</Link></div>
          <div><h2 className="serif">Something to try meanwhile</h2><p>Our topic guides include explanations, practice problems, and hints. Pick a topic that interests you and take your time.</p><Link href="/topics" className="circle-link">Find a problem</Link></div>
        </div>
      </section>
    </div>
  );
}
