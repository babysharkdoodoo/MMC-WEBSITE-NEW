import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CounterGame from "@/components/counter-game";

export default function HomePage() {
  return (
    <div className="mmc-home">
      <section className="chapter chapter-red home-opening">
        <div className="opening-title"><h1><span>Melbourne</span><span>Math Circle</span></h1></div>
        <div className="opening-bottom">
          <div className="opening-copy">
            <p>Good problems bring people together. We’re students making room for more of that in Melbourne, Florida.</p>
            <Link href="/join-us" className="mmc-button button-paper">Come join us <ArrowUpRight size={22} /></Link>
            <p className="opening-note">Free sessions. All experience levels.<br />A chapter of Orlando Math Circle.</p>
          </div>
          <figure className="opening-photo">
            <Image src="/home-screen-photo.jpg" alt="Melbourne Math Circle students and volunteers gathered in front of a whiteboard" width={1345} height={690} priority sizes="(max-width: 750px) 100vw, 65vw" />
            <figcaption>The people make the circle.</figcaption>
          </figure>
        </div>
      </section>

      <section className="chapter chapter-paper circle-intro">
        <div className="chapter-heading"><h2>Off the<br />worksheet.</h2><p>A chance to wonder, try something, get stuck, and figure it out with someone else.</p></div>
        <div className="intro-bottom">
          <figure><Image src="/Photos/monthly_meetings/13.png" alt="Melbourne Math Circle participants standing together in front of a whiteboard" width={1080} height={1080} sizes="(max-width: 750px) 100vw, 50vw" /><figcaption>A group photo from one of our monthly meetings.</figcaption></figure>
          <div className="intro-text"><p>We start with an idea, give everyone time to try it, and compare the ways we got there. High school volunteers guide the conversation. Questions are part of the work.</p><p>You don’t have to be on a math team. You don’t have to arrive with the answer. You just need a place to start.</p><Link className="text-link" href="/about">How the circle began <ArrowRight size={20} /></Link></div>
        </div>
      </section>

      <section className="chapter chapter-mustard game-chapter" id="try-a-problem">
        <div className="game-intro"><h2>Try a game</h2><p className="large-copy">Fifteen counters.<br />Take one, two, or three.<br />Whoever takes the last one wins.</p><p>You go first. Play a round, then try to find a strategy that always works.</p><p className="game-context">A small game about thinking ahead.<br />No timer. Take your time.</p></div>
        <CounterGame />
      </section>

      <section className="chapter chapter-slate community-chapter">
        <div className="chapter-heading"><h2>Math goes places.</h2><div><p>To a table at IndiaFest. To a classroom at University Park Elementary. To a room full of students with different ways of seeing a problem.</p><Link href="/gallery" className="text-link">Take a look around <ArrowRight size={20} /></Link></div></div>
        <div className="documentary-pair">
          <figure><Image src="/Photos/IndiaFest/1.png" alt="Students and families working on math activities around a table at IndiaFest" width={1080} height={1080} sizes="(max-width: 750px) 100vw, 50vw" /><figcaption>IndiaFest · At the activity table.</figcaption></figure>
          <figure><Image src="/Photos/university_park/1.png" alt="Student volunteers discussing a logic puzzle at University Park Elementary, with pupils’ faces covered in the original photo" width={1600} height={900} sizes="(max-width: 750px) 100vw, 50vw" /><figcaption>University Park Elementary · A logic puzzle, together.</figcaption></figure>
        </div>
      </section>

      <section className="chapter chapter-maroon people-chapter">
        <div className="people-copy"><h2>Students<br />behind it.</h2><p>The circle began in 2023, when students who had taken part in Orlando Math Circle brought the idea closer to home.</p><p>Eshan Vipuil is our founder and president. Fellow students help run the circle, share their interests, and welcome younger learners.</p><Link href="/team" className="text-link">Meet the whole team <ArrowRight size={20} /></Link><a href="https://www.orlandomathcircle.org/pages/about-us" target="_blank" rel="noopener noreferrer" className="parent-link">Part of Orlando Math Circle <ArrowUpRight size={16} /></a></div>
        <figure className="founder-photo"><Image src="/pfps/eshan.png" alt="Eshan Vipuil, Melbourne Math Circle founder and president" width={600} height={700} sizes="(max-width: 750px) 100vw, 40vw" /><figcaption>Eshan Vipuil · Founder &amp; president</figcaption></figure>
      </section>

      <section className="chapter chapter-paper interview-chapter">
        <div className="interview-copy">
          <h2>Professor Kev Show</h2>
          <p>Melbourne Math Circle was featured on the Professor Kev Show. Watch the conversation about the circle and our work in Melbourne.</p>
          <a href="https://www.youtube.com/watch?v=bwqcqY0FlEE" target="_blank" rel="noopener noreferrer" className="text-link">Watch on YouTube <ArrowUpRight size={20} /></a>
        </div>
        <div className="interview-preview">
          <iframe
            src="https://www.youtube.com/embed/bwqcqY0FlEE?rel=0"
            title="Melbourne Math Circle on the Professor Kev Show"
            width="560"
            height="315"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="chapter chapter-paper explore-chapter">
        <div className="chapter-heading"><h2>Follow<br />the question.</h2><p>A few places to go when a problem stays with you after the meeting.</p></div>
        <nav className="big-index" aria-label="Explore mathematics">
          <Link href="/topics"><span>Find an idea</span><span>Topic guides &amp; problems</span><ArrowUpRight /></Link>
          <Link href="/resources"><span>Go a little deeper</span><span>Books, handouts &amp; practice</span><ArrowUpRight /></Link>
          <Link href="/math-bites"><span>Read a little math</span><span>Short reads in Math Bites</span><ArrowUpRight /></Link>
        </nav>
      </section>

      <Link href="/join-us" className="join-chapter"><span>Meet the circle. Register for session announcements and RSVP links.</span><ArrowUpRight aria-hidden="true" /><strong>Join us.</strong></Link>
    </div>
  );
}
