"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Example interactive icon that gets a little shift (like a well-polished porcelain flush)
function AnimatedArrow(props: any) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </motion.svg>
  );
}

export default function AboutPage() {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col">
      {/* ====== HERO SECTION ====== */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Multi-layered gradient + subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+')] opacity-20 pointer-events-none" />

        {/* Floating shape for extra flair */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 rounded-full blur-3xl opacity-30"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 90, -90, 0], x: [0, -50, 50, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 15 }
          }
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="font-mono text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
              initial={{ y: shouldReduceMotion ? 0 : 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1 }}
            >
              About <span className="text-blue-200">Us</span>
            </motion.h1>
            <motion.p
              className="mt-4 md:mt-6 text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.3,
                duration: shouldReduceMotion ? 0 : 1,
              }}
            >
              The story of Melbourne Math Circle and our mission to make
              mathematics exciting, accessible, and inspiring.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ====== ORIGIN STORY ====== */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
        <motion.div
          className="absolute -top-32 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 blur-3xl opacity-20"
          animate={
            shouldReduceMotion
              ? {}
              : { scale: [1, 1.1, 1], rotate: [0, 60, -60, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 20 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              className="relative aspect-video overflow-hidden rounded-lg"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <Image
                src="/about_1.jpg"
                alt="Melbourne Math Circle Origin Story"
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>

            <div>
              <motion.h2
                className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-900"
                initial={{ x: shouldReduceMotion ? 0 : -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
              >
                Our <span className="text-blue-700">Origin Story</span>
              </motion.h2>
              <motion.p
                className="text-blue-900/80 mb-3 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
              >
                Melbourne Math Circle was founded in 2023 by a group of high
                school students who saw something missing in their math
                education.
              </motion.p>
              <motion.p
                className="text-blue-900/80 mb-3 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
              >
                What started as casual sessions in the school library quickly
                gained momentum, attracting like-minded students from across
                Melbourne.
              </motion.p>
              <motion.p
                className="text-blue-900/80 mb-3 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
              >
                Today, we’re a vibrant community of young thinkers who believe
                math isn’t just about numbers—it’s about curiosity, creativity,
                and seeing the world through a sharper lens.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== OUR MISSION ====== */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-tr from-blue-50 via-cyan-50 to-sky-50 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tl from-blue-400 to-cyan-400 blur-3xl opacity-30"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 60, -60, 0], x: [0, -50, 50, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 18 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <motion.h2
                className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-700"
                initial={{ x: shouldReduceMotion ? 0 : 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
              >
                Our <span className="text-blue-900">Mission</span>
              </motion.h2>
              <motion.p
                className="text-blue-900/80 mb-4 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
              >
                At Melbourne Math Circle, we believe that mathematics is a
                creative, collaborative, and joyful pursuit. Our mission is to:
              </motion.p>
              <ul className="space-y-3 mb-6">
                {[
                  "Create a welcoming space for students to explore mathematics beyond the classroom curriculum",
                  "Foster a community of young mathematicians who support and inspire each other",
                  "Develop problem-solving skills through engaging meetings and collaborative activities",
                  "Share the beauty and relevance of mathematics with our broader community",
                ].map((mission, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1,
                    }}
                  >
                    <span className="text-blue-700 font-mono">→</span>
                    <span className="text-blue-900/80 text-sm md:text-base">
                      {mission}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <Button
                asChild
                className="bg-blue-700 hover:bg-blue-600 text-white"
              >
                <Link href="/join-us">
                  Join Our Mission{" "}
                  <motion.span
                    className="inline-block ml-2"
                    whileHover={shouldReduceMotion ? {} : { x: 4 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </Button>
            </div>
            <motion.div
              className="relative aspect-square max-w-md mx-auto"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur-lg" />
              <Image
                src="/about_2.jpg"
                alt="Our Mission"
                width={400}
                height={400}
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-lg shadow-lg relative"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== BY STUDENTS, FOR STUDENTS ====== */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+')] opacity-30 pointer-events-none" />
        <motion.div
          className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-400 to-cyan-400 blur-3xl opacity-30"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -30, 30, 0], y: [0, 30, -30, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 25 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
            <motion.h2
              className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-4 text-blue-700"
              initial={{ y: shouldReduceMotion ? 0 : 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
            >
              By <span className="text-blue-900">Students</span>, For{" "}
              <span className="text-blue-900">Students</span>
            </motion.h2>
            <motion.p
              className="text-blue-900/80 text-base md:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            >
              What sets Melbourne Math Circle apart is that it’s entirely driven
              and led by high school students. Peer-to-peer learning empowers
              everyone to ask questions, explore new ideas, and take
              intellectual risks.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Student-Led Meetings",
                description:
                  "Our meetings are designed and led by students who are passionate about mathematics, creating an engaging collaborative atmosphere.",
              },
              {
                title: "Peer Collaboration",
                description:
                  "We foster an open environment where students work together, sharing ideas and tackling challenges collectively.",
              },
              {
                title: "Collaborative Problem Solving",
                description:
                  "We explore challenging problems together, learning from one another’s approaches.",
              },
              {
                title: "Community Outreach",
                description:
                  "We organize events to share our love for math with the broader community, inspiring creativity and curiosity.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              >
                <h3 className="font-mono text-base md:text-lg font-bold mb-2 text-blue-900">
                  {item.title}
                </h3>
                <p className="text-blue-900/70 text-xs md:text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 text-white relative overflow-hidden">
        <motion.div
          className="absolute -top-52 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-400 to-teal-400 blur-3xl opacity-40"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 45, -45, 0], y: [0, -40, 40, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 18 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-4"
              initial={{ y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
            >
              Ready to Join the <span className="text-blue-300">Circle</span>?
            </motion.h2>
            <motion.p
              className="text-white/90 mb-6 text-base md:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            >
              Whether you're a math enthusiast or simply curious, we welcome all
              middle and high school students to our vibrant community.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-400 hover:bg-blue-300 text-blue-900 font-medium"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Link href="/join-us">Attend a Meeting</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 text-white bg-transparent transition-all duration-200 hover:border-white hover:bg-white/10 hover:scale-105"
              >
                <Link href="/team" className="text-white">
                  Meet Our Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
