import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { teamMembers } from "@/lib/team";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "The people | Melbourne Math Circle", description: "Meet the student volunteers and alumni behind Melbourne Math Circle." };

export default function TeamPage() {
  return (
    <div className="people-page">
      <section className="chapter chapter-red people-page-opening"><h1>Meet the circle.</h1><p>Students who like a good problem.<br />People who make room for someone else to try.</p></section>
      {teamMembers.map((member, i) => (
        <section key={member.name} className={`chapter team-member ${i % 2 === 0 ? "chapter-paper" : "chapter-mustard"}`}>
          <figure><Image src={member.image} alt={member.name} width={600} height={700} sizes="(max-width: 750px) 100vw, 30vw" priority={i === 0} /></figure>
          <div><p className="member-role">{member.role}</p><h2>{member.name}</h2><p className="member-school">{member.school}</p><p className="member-bio">{member.bio}</p><div className="member-links">{member.social.email && <a href={`mailto:${member.social.email}`}><Mail size={18} /> Email {member.name.split(" ")[0]}</a>}{member.social.linkedin && <a href={`https://www.linkedin.com/in/${member.social.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={18} /></a>}</div></div>
        </section>
      ))}
      <section className="chapter chapter-slate volunteer-invitation"><h2>Pass it on.</h2><div><p>If you enjoy math and want to help other students, we’d like to hear from you.</p><Link href="/contact" className="text-link">Ask about volunteering <ArrowUpRight size={20} /></Link></div></section>
    </div>
  );
}
