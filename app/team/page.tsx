"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Optional animated icon example
function AnimatedArrow(props: any) {
  return (
    <motion.svg
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.95 }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </motion.svg>
  );
}

// 6 team members
const teamMembers = [
  {
    name: "Eshan Vipuil",
    role: "Founder & President",
    grade: "10th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Alex founded Melbourne Math Circle after noticing a lack of opportunities for students to explore advanced mathematics outside the classroom. A three-time AIME qualifier with a passion for number theory and cryptography.",
    image: "/placeholder.svg?height=400&width=400&text=AC",
    social: {
      email: "eshan@orlandomathcircle.org",
      github: "alexchen",
      linkedin: "alex-chen",
    },
  },
  {
    name: "Shoaib Ahmed",
    role: "Vice President",
    grade: "10th Grade",
    school: "West Shore Jr/Sr High",
    bio: "Jamie organizes our monthly workshops, coordinating speakers and developing engaging activities. Particularly interested in graph theory and topology, Jamie has presented at regional math conferences and mentors middle school math teams.",
    image: "/placeholder.svg?height=400&width=400&text=JR",
    social: {
      email: "shoaib@orlandomathcircle.org",
    },
  },
  {
    name: "Sid Patsamatla",
    role: "Vice President",
    grade: "10th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Taylor handles our community outreach, social media, and partnerships with local schools. A passionate advocate for making mathematics accessible to all students, Taylor has developed simplified explanations of complex concepts for younger audiences.",
    image: "/placeholder.svg?height=400&width=400&text=TK",
    social: {
      email: "taylor@melbournemathcircle.org",
      github: "taylorkim",
      linkedin: "taylor-kim",
    },
  },
  {
    name: "Faizan Ahmed",
    role: "Website Developer & Manager",
    grade: "8th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Jordan creates our workshop materials, handouts, and Math Bites content. With a talent for explaining complex ideas through visuals and analogies, Jordan has a particular fascination with fractals, chaos theory, and mathematical visualization.",
    image: "/placeholder.svg?height=400&width=400&text=JP",
    social: {
      email: "jordan@melbournemathcircle.org",
      github: "jordanpatel",
      linkedin: "jordan-patel",
    },
  },
  {
    name: "Morgan Zhang",
    role: "Technical Specialist",
    grade: "11th Grade",
    school: "Satellite High School",
    bio: "Morgan manages our website, digital resources, and technical aspects of our workshops. A competitive programmer and math enthusiast, Morgan enjoys exploring the intersection of mathematics and computer science.",
    image: "/placeholder.svg?height=400&width=400&text=MZ",
    social: {
      email: "morgan@melbournemathcircle.org",
      github: "morganzhang",
      linkedin: "morgan-zhang",
    },
  },
  {
    name: "Riley Johnson",
    role: "Event Coordinator",
    grade: "10th Grade",
    school: "West Shore Jr/Sr High",
    bio: "Riley handles the logistics of our in-person events, from venue arrangements to materials and refreshments. With exceptional organizational skills and a love for probability and statistics, Riley ensures our events run smoothly.",
    image: "/placeholder.svg?height=400&width=400&text=RJ",
    social: {
      email: "riley@melbournemathcircle.org",
      github: "rileyjohnson",
      linkedin: "riley-johnson",
    },
  },
];

export default function TeamPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Multi-layered gradient + subtle pattern (blue tones) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEEzRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none" />

        {/* Large floating shape for extra color/fluidity (blue tones) */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 rounded-full blur-3xl opacity-30"
          animate={{ rotate: [0, 90, -90, 0], x: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Our <span className="text-blue-200">Team</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-2xl md:text-3xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Meet the passionate students who organize and lead the Melbourne
              Math Circle.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
        <motion.div
          className="absolute -top-32 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 blur-3xl opacity-20"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 60, -60, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2
            className="font-mono text-4xl font-bold tracking-tight mb-16 text-blue-900 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Meet Our <span className="text-blue-600">Leaders</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <h3 className="font-mono text-xl font-bold text-blue-900">
                  {member.name}
                </h3>
                <p className="text-blue-900/70 text-sm">{member.role}</p>
                <div className="mt-4 flex flex-col gap-1 text-sm text-blue-900/80">
                  <span>
                    <strong className="text-blue-900">Grade:</strong>{" "}
                    {member.grade}
                  </span>
                  <span>
                    <strong className="text-blue-900">School:</strong>{" "}
                    {member.school}
                  </span>
                  <p className="text-blue-900/90 mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Socials */}
                <div className="mt-auto pt-4 flex items-center gap-3 text-blue-700">
                  {/* Email */}
                  {member.social.email && (
                    <Link
                      href={`mailto:${member.social.email}`}
                      className="hover:text-blue-500"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  )}
                  {/* GitHub */}
                  {member.social.github && (
                    <Link
                      href={`https://github.com/${member.social.github}`}
                      className="hover:text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  )}
                  {/* LinkedIn */}
                  {member.social.linkedin && (
                    <Link
                      href={`https://linkedin.com/in/${member.social.linkedin}`}
                      className="hover:text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
