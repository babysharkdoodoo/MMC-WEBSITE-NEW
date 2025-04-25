"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Optional animated icon example
function AnimatedArrow(props: any) {
  // Subtle interactive effect on hover/tap
  return (
    <motion.svg
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.95 }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 5l7 7-7 7" />
    </motion.svg>
  );
}

// 6 team members, with last two replaced
const teamMembers = [
  {
    name: "Eshan Vipuil",
    role: "Founder & President",
    grade: "10th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Eshan is a sophomore at West Shore Junior Senior High School with a strong interest in mathematics and computer science. He has won numerous awards in competitive math, including MathCounts, Math Kangaroo, and AMC, and serves as the President and Lead Instructor of the West Shore MathCounts Club. Outside of academics, Eshan is an avid tennis player on the West Shore Varsity Team.",
    image: "/pfps/eshan.png",
    social: {
      email: "eshan@orlandomathcircle.org",
      // github: "alexchen",
      linkedin: "eshan-vipuil-8042952a3",
    },
  },
  {
    name: "Shoaib Ahmed",
    role: "Vice President",
    grade: "10th Grade",
    school: "West Shore Jr/Sr High",
    bio: "Shoaib Ahmed is a West Shore student driven by a passion for igniting curiosity and inspiring others. As an internationally award-winning Future Problem Solver and officially recognized in Math Kangaroo, he excels at tackling challenges with creative thinking. Beyond academics, he enjoys playing basketball and giving back to the community.",
    image: "/pfps/shoaib.png",
    social: {
      email: "shoaib@orlandomathcircle.org",
    },
  },
  {
    name: "Sidharth Patsamatla",
    role: "Volunteer",
    grade: "10th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Sidharth Patsamatla is a dedicated high school student focused on facilitating higher-order student learning. As an ISEF finalist and FPS international qualifier, Sidharth is highly experienced in mathematics, critical thinking, and problem-solving. Outside of academics, Sidharth enjoys playing basketball and board games.",
    image: "/pfps/sid.jpg",
    social: {
      // email: "taylor@melbournemathcircle.org",
      // github: "taylorkim",
      // linkedin: "taylor-kim",
    },
  },
  {
    name: "Faizan Ahmed",
    role: "Website Developer",
    grade: "8th Grade",
    school: "West Shore Jr./Sr. High",
    bio: "Faizan Ahmed is an 8th-grade student at West Shore with a passion for mathematics and its role in solving real-world problems. He conducts independent research at the intersection of mathematics, data science, and technology, focusing on healthcare challenges. Faizan is actively involved in math clubs like STEM Club, where he collaborates with peers to explore and solve complex mathematical problems.",
    image: "/pfps/faizan.png",
    social: {
      email: "hello.faizan@proton.me",
      // github: "jordanpatel",
      linkedin: "thefaizanak",
    },
  },
  {
    name: "Saaketh Kesireddy",
    role: "Alumni Advisor",
    grade: "12th Grade",
    school: "West Shore Jr./Sr. High (Heading to UF for CS)",
    bio: "Saaketh is a freshman at the University of Florida, Class of 2029, with a keen interest in computer science and finance. As a dedicated volunteer at Health First Palm Bay Hospital, he combines his academic pursuits with a passion for community service. Outside of school, Saaketh enjoys tennis and challenges himself with new ways to merge technology and business.",
    image: "/pfps/saaketh.png",
    social: {
      // email: "saakethr.kesiredddy@melbournemathcircle.org",
      // github: "saakethk",
      linkedin: "saaketh-kesireddy",
    },
  },
  // {
  // name: "Margarita Azbel",
  // role: "Advisor",
  // grade: "",
  // school: "",
  // bio: "Margarita brings a wealth of knowledge and guidance as an experienced advisor, helping our students navigate complex math topics and community outreach. She is passionate about inspiring the next generation of problem-solvers.",
  // image: "/placeholder.svg?height=400&width=400&text=MA",
  // social: {
  // email: "margarita@melbournemathcircle.org",
  // github: "",
  // linkedin: "",
  // },
  // },
];

export default function TeamPage() {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background gradients and subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+')] opacity-20 pointer-events-none" />

        {/* Floating animated shape */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 rounded-full blur-3xl opacity-30"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 90, -90, 0], x: [0, -50, 50, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 10 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            >
              Our <span className="text-blue-200">Team</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-2xl md:text-3xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.2,
                duration: shouldReduceMotion ? 0 : 0.8,
              }}
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
          animate={
            shouldReduceMotion
              ? {}
              : { scale: [1, 1.1, 1], rotate: [0, 60, -60, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 15 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2
            className="font-mono text-4xl font-bold tracking-tight mb-16 text-blue-900 text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
          >
            Meet Our <span className="text-blue-600">Leaders</span>
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-transform duration-200 flex flex-col"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
              >
                {/* Member Image */}
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
                <div className="mt-4 flex flex-col gap-1 text-sm text-blue-900/80 leading-relaxed">
                  {member.grade && (
                    <span>
                      <strong className="text-blue-900">Grade:</strong>{" "}
                      {member.grade}
                    </span>
                  )}
                  {member.school && (
                    <span>
                      <strong className="text-blue-900">School:</strong>{" "}
                      {member.school}
                    </span>
                  )}
                  <p className="text-blue-900/90 mt-2">{member.bio}</p>
                </div>

                {/* Social Icons */}
                <div className="mt-auto pt-4 flex items-center gap-3 text-blue-700">
                  {member.social.email && (
                    <Link
                      href={`mailto:${member.social.email}`}
                      className="hover:text-blue-500"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  )}
                  {/* {member.social.github && (
                    <Link
                      href={`https://github.com/${member.social.github}`}
                      className="hover:text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  )} */}
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
