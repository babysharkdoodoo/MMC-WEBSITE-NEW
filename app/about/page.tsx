"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



export default function AboutPage() {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col">
      {/* ====== ENHANCED HERO SECTION ====== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Cinematic background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-cyan-900/20" />

        {/* Enhanced floating geometric shapes */}
        <motion.div
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/20 via-blue-500/25 to-blue-600/20 rounded-full blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, 120, -60, 0],
                x: [0, -80, 60, 0],
                scale: [1, 1.2, 0.9, 1]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 20, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -top-48 right-0 w-[500px] h-[500px] bg-gradient-to-l from-blue-400/25 via-cyan-500/20 to-indigo-500/25 rounded-[25%] blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, -90, 45, 0],
                scale: [1, 1.3, 0.8, 1],
                y: [0, 40, -30, 0]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 25, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-gradient-to-br from-blue-300/15 via-cyan-400/20 to-blue-500/15 rounded-[40%] blur-2xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, 180, 360],
                scale: [1, 1.4, 0.7, 1],
                x: [0, 30, -20, 0]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 30, ease: "easeInOut" }
          }
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              className="mb-12"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1.2, type: "spring", stiffness: 100 }}
            >
              <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl overflow-hidden border-2 border-white/50">
                  <Image
                    src="/mmc_logo.jpg"
                    alt="Melbourne Math Circle Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight mb-8"
              initial={{ y: shouldReduceMotion ? 0 : 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1.5, delay: 0.3, type: "spring", stiffness: 80 }}
            >
              About{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-100">
                  Us
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1.5, delay: 1.5 }}
                />
              </span>
            </motion.h1>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, delay: 1 }}
            >
              <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
                <p className="text-lg md:text-xl text-cyan-100 font-medium">
                  A Chapter of Orlando Math Circle (OMC)
                </p>
              </div>

              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Discover the story of Melbourne Math Circle and our mission to make
                mathematics <span className="text-cyan-200 font-semibold">exciting</span>,
                <span className="text-blue-200 font-semibold"> accessible</span>, and
                <span className="text-white font-bold"> inspiring</span>.
              </p>
            </motion.div>
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
        <motion.div
          className="absolute -bottom-40 left-0 w-[350px] h-[350px] bg-gradient-to-bl from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-25"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -45, 45, 0], y: [0, 30, -30, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 16 }
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
                className="object-cover rounded-lg shadow-lg brightness-90 contrast-125 saturate-200"
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
                Melbourne Math Circle, a chapter of the Orlando Math Circle (OMC), was founded in 2023 by a group of high school students inspired by their experiences at OMC.
              </motion.p>
              <motion.p
                className="text-blue-900/80 mb-3 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
              >
                It all started years ago as a student at OMC, witnessing the incredible work and dedication of older students. This inspired the creation of a similar community in Melbourne to bring those opportunities closer to home.
              </motion.p>
              <motion.p
                className="text-blue-900/80 mb-3 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
              >
                Through close collaboration with our parent organization, OMC, we've built a vibrant community of young thinkers who believe math isn’t just about numbers—it’s about curiosity, creativity, and seeing the world through a sharper lens.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ENHANCED MISSION SECTION ====== */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-gradient-to-tl from-blue-400/20 to-cyan-400/25 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, 90, -45, 0],
                x: [0, -60, 40, 0],
                scale: [1, 1.3, 0.8, 1]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 22, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute top-0 right-20 w-[400px] h-[400px] bg-gradient-to-br from-cyan-300/25 to-blue-500/20 rounded-full blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                scale: [1, 1.2, 0.9, 1],
                rotate: [0, -60, 30, 0],
                y: [0, 30, -20, 0]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 28, ease: "easeInOut" }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ x: shouldReduceMotion ? 0 : -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, type: "spring", stiffness: 100 }}
            >
              <div>
                <motion.div
                  className="inline-block mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
                >
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
                    <span className="text-cyan-200 font-mono text-sm font-semibold">Our Purpose</span>
                  </div>
                </motion.div>

                <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Mission</span>
                </h2>

                <p className="text-white/90 mb-8 text-xl leading-relaxed">
                  At Melbourne Math Circle, we believe that mathematics is a
                  <span className="text-cyan-200 font-semibold"> creative</span>,
                  <span className="text-blue-200 font-semibold"> collaborative</span>, and
                  <span className="text-white font-bold"> joyful pursuit</span>.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "🌟",
                    text: "Create a welcoming space for students to explore mathematics beyond the classroom curriculum"
                  },
                  {
                    icon: "🤝",
                    text: "Foster a community of young mathematicians who support and inspire each other"
                  },
                  {
                    icon: "🧠",
                    text: "Develop problem-solving skills through engaging meetings and collaborative activities"
                  },
                  {
                    icon: "💡",
                    text: "Share the beauty and relevance of mathematics with our broader community"
                  }
                ].map((mission, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
                      duration: 0.5
                    }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 10 }}
                  >
                    <span className="text-2xl">{mission.icon}</span>
                    <span className="text-white/90 text-base leading-relaxed">
                      {mission.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.8 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/join-us" className="flex items-center">
                    Join Our Mission
                    <motion.span
                      className="inline-block ml-2"
                      whileHover={shouldReduceMotion ? {} : { x: 5, rotate: -15 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: shouldReduceMotion ? 0 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-8 bg-gradient-to-r from-cyan-400/20 via-blue-400/25 to-indigo-500/20 rounded-3xl blur-2xl"
                  animate={
                    shouldReduceMotion ? {} : {
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2],
                      rotate: [0, 5, -5, 0]
                    }
                  }
                  transition={
                    shouldReduceMotion ? {} : { repeat: Infinity, duration: 6, ease: "easeInOut" }
                  }
                />
                <div className="relative aspect-square max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/about_2.jpg"
                    alt="Our Mission"
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover w-full h-full brightness-95 contrast-110 saturate-110 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== ENHANCED BY STUDENTS, FOR STUDENTS ====== */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-blue-100 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-48 left-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/20 to-cyan-400/25 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, -45, 30, 0],
                y: [0, 40, -30, 0],
                scale: [1, 1.2, 0.9, 1]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 30, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute top-20 right-20 w-[350px] h-[350px] bg-gradient-to-tr from-cyan-400/25 to-blue-500/20 rounded-[30%] blur-2xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                scale: [1, 1.15, 0.85, 1],
                rotate: [0, 60, -45, 0],
                x: [0, -20, 15, 0]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 25, ease: "easeInOut" }
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

      {/* ====== ENHANCED CONTACT SECTION ======
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 relative overflow-hidden">
        <motion.div
          className="absolute -top-40 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-blue-400/20 to-cyan-500/25 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, 60, -30, 0],
                scale: [1, 1.2, 0.9, 1],
                x: [0, 30, -20, 0]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 24, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-400/25 to-blue-500/20 rounded-full blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, -45, 45, 0],
                y: [0, 25, -35, 0],
                scale: [1, 0.9, 1.1, 1]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 26, ease: "easeInOut" }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ y: shouldReduceMotion ? 0 : 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1 }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">✉</span>
                </div>
              </div>
            </motion.div>

            <h2 className="font-mono text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Us</span>
            </h2>

            <motion.p
              className="text-white/90 mb-12 text-xl leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
            >
              We use <span className="text-cyan-200 font-semibold">OMC organizational emails</span> for all communications.
              Reach out to us using the following contacts:
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
            >
              {[
                {
                  // icon: "📧",
                  title: "General Inquiries",
                  email: "eshan.mmc@orlandomathcircle.org",
                  description: "Questions about meetings, events, or general information"
                },
                {
                  // icon: "👨‍💼",
                  title: "Team Lead",
                  email: "shoaib.mmc@orlandomathcircle.org",
                  description: "Leadership inquiries and organizational matters"
                },
                {
                  // icon: "🤝",
                  title: "Volunteer Coordinator",
                  email: "volunteer@orlandomathcircle.org",
                  description: "Volunteer opportunities and community involvement"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.7 + index * 0.1 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -5 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                    />
                    <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl h-full flex flex-col min-h-[280px]">
                      <div className="text-4xl mb-6">{contact.icon}</div>
                      <h3 className="font-mono text-xl font-bold mb-4 text-white group-hover:text-cyan-200 transition-colors">
                        {contact.title}
                      </h3>
                      <p className="text-white/80 text-base mb-6 flex-grow leading-relaxed">
                        {contact.description}
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-cyan-300 hover:text-cyan-200 font-medium text-sm transition-colors duration-300 hover:underlinene"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section> */}

      {/* ====== ENHANCED CTA SECTION ====== */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white relative overflow-hidden">
        <motion.div
          className="absolute -top-60 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-400/25 to-blue-400/30 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                rotate: [0, 60, -45, 0],
                y: [0, -50, 40, 0],
                scale: [1, 1.2, 0.9, 1]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 25, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-gradient-to-tl from-blue-500/30 to-cyan-600/25 rounded-full blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                scale: [1, 1.15, 0.85, 1],
                rotate: [0, -45, 30, 0],
                x: [0, 30, -20, 0]
              }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 28, ease: "easeInOut" }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ y: shouldReduceMotion ? 0 : 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1 }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl overflow-hidden border-2 border-white/50">
                  <Image
                    src="/mmc_logo.jpg"
                    alt="Melbourne Math Circle Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <h2 className="font-mono text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Ready to Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Circle
              </span>?
            </h2>

            <motion.p
              className="text-white/90 mb-12 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
            >
              Whether you're a <span className="text-cyan-200 font-semibold">math enthusiast</span> or simply
              <span className="text-blue-200 font-semibold"> curious</span>, we welcome all
               school students to our vibrant community.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 shadow-2xl hover:shadow-cyan-500/30 px-8 py-4 text-lg font-semibold"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <Link href="/join-us" className="flex items-center">
                    Attend a Meeting
                    <motion.div
                      className="ml-2"
                      animate={hovered && !shouldReduceMotion ? { x: [0, 5, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/40 text-white bg-white/5 backdrop-blur-md hover:border-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300"
                >
                  <Link href="/team">
                    Meet Our Team
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}