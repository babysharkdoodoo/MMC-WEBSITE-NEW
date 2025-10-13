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

// Mathematical symbols for subtle background
const mathSymbols = [
  "π", "∑", "∫", "∞", "≈", "θ", "λ", "Δ", "√", "∂", "Ω", "±", "×", "÷",
  "σ", "μ", "φ", "Γ", "α", "β", "γ", "ε", "ζ", "η", "ι", "κ",
];

// 6 team members, with last two replaced
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
      // github: "alexchen",
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
    social: {
      // email: "taylor@melbournemathcircle.org",
      // github: "taylorkim",
      // linkedin: "taylor-kim",
    },
  },
  // {
  //   name: "Faizan Ahmed",
  //   role: "Website Developer",
  //   grade: "9th Grade",
  //   school: "West Shore Jr./Sr. High",
  //   bio: "Faizan Ahmed is a 9th-grade student at West Shore with a passion for mathematics and its role in solving real-world problems. He conducts independent research at the intersection of mathematics, data science, and technology, focusing on healthcare challenges. Faizan is actively involved in math clubs like STEM Club, where he collaborates with peers to explore and solve complex mathematical problems.",
  //   image: "/pfps/faizan.png",
  //   social: {
  //     email: "hello.faizan@proton.me",
  //     // github: "jordanpatel",
  //     linkedin: "thefaizanak",
  //   },
  // },
  {
    name: "Saaketh Kesireddy",
    role: "Alumni Advisor",
    grade: "Freshman",
    school: "University of Florida",
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
      <section className="py-32 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
        {/* Subtle background with math symbols */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {mathSymbols.slice(0, 8).map((symbol, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-900 font-serif text-[200px] select-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>

        {/* Floating gradient shapes */}
        <motion.div
          className="absolute -top-48 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/20 via-cyan-300/25 to-teal-300/20 rounded-full blur-3xl pointer-events-none"
          animate={
            shouldReduceMotion
              ? {}
              : { scale: [1, 1.1, 1], rotate: [0, 60, -60, 0], opacity: [0.2, 0.3, 0.2] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 20 }
          }
        />
        <motion.div
          className="absolute -bottom-48 left-0 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-300/25 to-blue-400/20 rounded-full blur-3xl pointer-events-none"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -45, 45, 0], y: [0, 30, -30, 0], opacity: [0.25, 0.35, 0.25] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 18 }
          }
        />

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.h2
            className="font-mono text-5xl md:text-6xl font-bold tracking-tight mb-20 text-gray-900 text-center drop-shadow-md"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
          >
            Meet Our <span className="text-cyan-600">Leaders</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-white to-blue-50/50 p-8 rounded-3xl shadow-xl border border-blue-100/50 hover:shadow-cyan-500/30 transition-all duration-500 flex flex-col group relative overflow-hidden"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              >
                {/* Subtle hover gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />

                {/* Member Image with enhanced animations */}
                <div className="relative aspect-square mb-8 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-cyan-500/40 transition-shadow duration-500">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Name and Role with fade in */}
                <motion.h3
                  className="font-mono text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {member.social.linkedin ? (
                    <a
                      href={`https://linkedin.com/in/${member.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer"
                    >
                      {member.name}
                    </a>
                  ) : (
                    member.name
                  )}
                </motion.h3>
                <motion.p
                  className="text-cyan-600 text-lg font-medium mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {member.role}
                </motion.p>

                {/* Grade and School */}
                <motion.div
                  className="flex flex-col gap-3 text-gray-700 text-base leading-relaxed font-light mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {member.grade && (
                    <span>
                      <strong className="text-gray-900 font-medium">Grade:</strong>{" "}
                      {member.grade}
                    </span>
                  )}
                  {member.school && (
                    <span>
                      <strong className="text-gray-900 font-medium">School:</strong>{" "}
                      {member.school}
                    </span>
                  )}
                </motion.div>

                {/* Bio without word animation */}
                <motion.p
                  className="text-gray-800 text-base leading-relaxed flex-grow"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {member.bio}
                </motion.p>

                {/* Social Icons with bounce in */}
                <motion.div
                  className="mt-8 pt-6 flex items-center gap-6 text-blue-700 border-t border-blue-100/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {member.social.email && (
                    <motion.a
                      href={`mailto:${member.social.email}`}
                      className="hover:text-cyan-600 transition-colors duration-300 cursor-pointer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Mail className="h-6 w-6" />
                    </motion.a>
                  )}
                  {member.social.linkedin && (
                    <motion.a
                      href={`https://linkedin.com/in/${member.social.linkedin}`}
                      className="hover:text-cyan-600 transition-colors duration-300 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Linkedin className="h-6 w-6" />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}