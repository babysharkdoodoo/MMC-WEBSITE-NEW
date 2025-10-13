"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import MathParticleSystem from "@/components/math-particle-system";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Interactive Clock icon remains the same
function Clock(props: any) {
  return (
    <motion.svg
      whileHover={{ scale: 1.3, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </motion.svg>
  );
}

// Mathematical symbols for background elements
const mathSymbols = [
  "π",
  "∑",
  "∫",
  "∞",
  "≈",
  "θ",
  "λ",
  "Δ",
  "√",
  "∂",
  "Ω",
  "±",
  "×",
  "÷",
  "σ",
  "μ",
  "φ",
  "Γ",
];

// Impact statistics
const impactStats = [
  { value: "100+", label: "Students Reached" },
  { value: "20+", label: "Events Hosted" },
  { value: "100+", label: "Volunteer Hours Logged" },
  { value: "95%", label: "Student Satisfaction" },
];

// Testimonials (unchanged; currently commented out)
const testimonials = [
  {
    quote:
      "Melbourne Math Circle opened my eyes to the beauty of mathematics beyond the classroom. The events are engaging, challenging, and incredibly fun!",
    name: "Alex Chen",
    grade: "11th Grade, Melbourne High School",
    image: "/placeholder.svg?height=80&width=80&text=AC",
  },
  {
    quote:
      "I never thought math could be so exciting until I attended my first MMC event. Now I look forward to every workshop and have even started competing in math competitions!",
    name: "Jamie Rodriguez",
    grade: "9th Grade, West Shore Jr/Sr High",
    image: "/placeholder.svg?height=80&width=80&text=JR",
  },
  {
    quote:
      "As a parent, I've seen my daughter's confidence in mathematics soar since joining Melbourne Math Circle. The mentors are inspiring and the community is wonderfully supportive.",
    name: "Dr. Sarah Johnson",
    grade: "Parent of 8th Grader",
    image: "/placeholder.svg?height=80&width=80&text=SJ",
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Rotate through testimonials every 8 seconds (if you enable the section)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for in-view animations
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setIsInView(true);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background image with responsive sizes for mobile */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home-screen-photo.jpg"
            alt="Melbourne Math Circle Students"
            fill
            className="object-cover brightness-75 contrast-110 saturate-150" // Enhanced blue tint
            priority
            sizes="(max-width: 768px) 100vw, 1920px"
          />
          {/* Enhanced gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-cyan-800/90 mix-blend-multiply" />
        </div>

        {/* Optional: conditionally render animated particles only on larger screens for performance */}
        {typeof window !== "undefined" && window.innerWidth > 768 && (
          <MathParticleSystem count={100} opacity={0.25} /> // Increased count and slight opacity for more dynamic visuals
        )}

        {/* Subtle floating animated shapes */}
        <motion.div
          className="absolute -bottom-32 -left-24 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-r from-blue-600/20 via-blue-500/15 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 15, -10, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-32 right-16 w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-gradient-to-l from-cyan-400/15 via-blue-500/20 to-blue-600/15 rounded-full blur-3xl"
          animate={{
            x: [0, -25, 15, 0],
            y: [0, -10, 20, 0]
          }}
          transition={{ repeat: Infinity, duration: 25, delay: 5, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Enhanced logo with multiple animated halos */}
              <motion.div
                className="mb-8 relative"
                whileHover={{
                  rotate: 360,
                  scale: 1.1
                }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              >
                <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl overflow-hidden border-2 border-white/50">
                  <Image
                    src="/mmc_logo.jpg"
                    alt="Melbourne Math Circle Logo"
                    width={90}
                    height={90}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Subtle animated halo */}
                <motion.div
                  className="absolute -z-10 inset-0 rounded-full bg-gradient-to-r from-blue-400/40 via-cyan-400/30 to-blue-500/40 blur-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                />
                {/* Additional outer halo for depth */}
                <motion.div
                  className="absolute -z-20 -inset-4 rounded-full bg-gradient-to-br from-cyan-300/20 via-blue-300/15 to-blue-400/20 blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>

              <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Melbourne
                </motion.span>
                <span className="relative inline-block mx-2">
                  <motion.span
                    className="relative z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Math
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-white/50 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  />
                </span>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  Circle
                </motion.span>
              </h1>
              <p className="text-xl md:text-2xl text-white font-semibold drop-shadow-md mb-4">
                A Chapter of Orlando Math Circle (OMC)
              </p>
            </motion.div>

            <motion.p
              className="mt-6 text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.6 }}
            >
              Igniting mathematical curiosity through interactive events,
              collaborative problem-solving, and the{" "}
              <strong>joy of discovery</strong>.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.7, ease: "easeOut" }}
            >
              <Button
                asChild
                size="lg"
                className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-2 hover:scale-105 border-0 overflow-hidden group"
              >
                <Link href="/join-us" className="flex items-center relative z-10">
                  <span>Join Our Next Event</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative bg-white text-black border-2 border-white/30 hover:bg-gray-100 hover:border-white/50 transition-all duration-500 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group"
              >
                <Link href="/about" className="flex items-center relative z-10">
                  <span>Discover Our Mission</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-background relative overflow-hidden">

{/* Floating animated shape */}
<motion.div
  className="absolute -top-32 -right-24 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-gradient-to-tl from-blue-700 to-cyan-500 opacity-40 blur-2xl"
  animate={{ rotate: [0, 60, -60, 0], scale: [1, 1.1, 1, 1] }}
  transition={{ repeat: Infinity, duration: 15 }}
/>

{mathSymbols.slice(0, 6).map((symbol, i) => (
  <motion.div
    key={i}
    className="absolute text-primary/10 font-serif pointer-events-none select-none"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 80 + 40}px`,
    }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 10 + i * 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    }}
  >
    {symbol}
  </motion.div>
))}

<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="max-w-4xl mx-auto text-center"
  >
    <div className="inline-block mb-6">
      <div className="relative">
        <motion.div
          className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500/30 via-blue-400/20 to-cyan-500/30 blur-xl"
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="relative block bg-white/90 backdrop-blur-sm px-8 py-4 rounded-xl font-mono text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Our Mission
        </motion.div>
      </div>
    </div>

    <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tight mb-8 text-blue-900">
      Transforming Mathematics from a{" "}
      <motion.span
        className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        Subject
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.span>{" "}
      into a{" "}
      <motion.span
        className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        Passion
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.span>
    </h2>

    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
      As a chapter of the Orlando Math Circle (OMC), Melbourne Math Circle is dedicated to fostering a love for
      mathematics through engaging, interactive events that challenge students to think creatively, collaborate effectively, and
      discover the beauty of mathematical thinking beyond the classroom. Melbourne Math Circle started as a student initiative inspired by
      experiences at OMC years ago. Seeing the incredible work of older students at OMC sparked the idea to bring similar opportunities to Melbourne.
      Through close collaboration with our parent organization, OMC, we continue to build on that foundation to provide a comprehensive picture of
      mathematical exploration and community impact.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
      {impactStats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30, scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.15, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="flex flex-col items-center group"
        >
          <div className="relative mb-4 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-500">
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-cyan-500/20 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500"
            />
            <span className="relative text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600">
              {stat.value}
            </span>
          </div>
          <span className="text-sm font-medium text-blue-600 text-center group-hover:text-blue-800 transition-colors duration-300">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
</div>
</section>z
      {/* ===== UPCOMING EVENTS (Commented out as no events are planned) ===== */}
      {/*
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-blue-600 via-cyan-600 to-blue-400 blur-3xl opacity-30"
          animate={{ rotate: [0, 45, -45, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.7 }}
              className="inline-block mb-4"
            >
              <div className="flex items-center justify-center gap-2 text-primary font-mono text-lg">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-mono text-4xl font-bold tracking-tight mb-4"
            >
              Join Us for Our Next{" "}
              <span className="text-primary">Mathematical Adventures</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              From workshops to competitions, our events are designed to
              challenge, inspire, and foster a deep appreciation for the beauty
              of mathematics.
            </motion.p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-border bg-card group-hover:scale-[1.02]">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                              {event.category}
                            </span>
                            <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {event.title}
                            </h3>
                          </div>
                          <motion.div
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="bg-primary/10 p-2 rounded-full"
                          >
                            <Calendar className="h-5 w-5 text-primary" />
                          </motion.div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-6">
                          {event.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <Button
                            asChild
                            variant="outline"
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                          >
                            <Link href="/join-us">Register Now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ===== FEATURED YOUTUBE SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 relative overflow-hidden">
        <motion.div
          className="absolute -top-60 -left-48 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/10 via-blue-400/8 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, 20, -15, 0]
          }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-32 w-[250px] h-[250px] bg-gradient-to-l from-cyan-400/8 via-blue-500/10 to-blue-700/8 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 15, -25, 0]
          }}
          transition={{ repeat: Infinity, duration: 35, delay: 5, ease: "easeInOut" }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <motion.h2
                  className="font-mono text-3xl md:text-4xl font-bold text-center mb-6 text-white drop-shadow-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300">
                    Featured
                  </span>{" "}
                  on the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                    Professor Kev Show!
                  </span>
                </motion.h2>
                <motion.p
                  className="text-white/90 text-center mb-8 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Melbourne Math Circle was recently featured on the Professor Kev
                  Show, highlighting our mission and the impact we're making in
                  the community.
                </motion.p>
                <motion.div
                  className="aspect-video relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/30"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full border-0"
                    src="https://www.youtube.com/embed/bwqcqY0FlEE"
                    title="Melbourne Math Circle TV Feature"
                    allowFullScreen
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ===== TESTIMONIALS (currently commented out) ===== */}
      {/*
      <section className="py-24 bg-blue-800 text-blue-100 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-gradient-to-l from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-40"
          animate={{ rotate: [0, 90, -90, 0] }}
          transition={{ repeat: Infinity, duration: 25 }}
        />

        <div className="absolute inset-0">
          {mathSymbols.slice(0, 8).map((symbol, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-100/5 font-serif pointer-events-none select-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 60 + 40}px`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 10 + i,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.7 }}
                className="inline-block mb-4"
              >
                <div className="flex items-center justify-center gap-2 text-blue-100 font-mono text-lg">
                  <Star className="h-5 w-5 text-blue-300" />
                  <span>Testimonials</span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-mono text-4xl font-bold tracking-tight mb-4"
              >
                What Our <span className="text-blue-200">Community</span> Says
              </motion.h2>
            </div>

            <div className="relative h-[350px] md:h-[300px]">
              <AnimatePresence mode="wait">
                {testimonials.map(
                  (testimonial, index) =>
                    activeTestimonial === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <div className="bg-blue-100/10 backdrop-blur-sm p-8 rounded-lg border border-blue-100/30">
                          <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                  <Image
                                    src={testimonial.image || "/placeholder.svg"}
                                    alt={testimonial.name}
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                  />
                                </div>
                                <motion.div
                                  className="absolute -inset-1 rounded-full bg-blue-300/30 blur-sm -z-10"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="text-blue-300 text-4xl font-serif mb-2">
                                "
                              </div>
                              <p className="text-blue-100/90 text-lg italic mb-4">
                                {testimonial.quote}
                              </p>
                              <div>
                                <div className="font-medium text-blue-50">
                                  {testimonial.name}
                                </div>
                                <div className="text-blue-200 text-sm">
                                  {testimonial.grade}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    activeTestimonial === index
                      ? "bg-blue-300 scale-125"
                      : "bg-blue-100/30 hover:bg-blue-100/50"
                  )}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ===== CALL TO ACTION ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-32 left-0 w-[200px] h-[200px] bg-gradient-to-tl from-cyan-500/15 via-blue-500/10 to-blue-600/15 blur-3xl"
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 15, -20, 0]
          }}
          transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-40 -right-32 w-[250px] h-[250px] bg-gradient-to-br from-blue-500/10 via-blue-600/12 to-indigo-600/10 blur-3xl"
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -10, 20, 0]
          }}
          transition={{ repeat: Infinity, duration: 32, delay: 8, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-8">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full blur-lg opacity-50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                />
                <Sparkles className="h-16 w-16 text-yellow-300 mx-auto relative z-10 drop-shadow-lg" />
              </motion.div>
            </div>

            <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tight mb-10 text-white drop-shadow-lg">
              Ready to{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Explore
              </motion.span>{" "}
              the World of Mathematics?
            </h2>

            <motion.p
              className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Join our community of curious minds and discover the joy of
              mathematical exploration through our engaging events and
              activities.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 border-0 overflow-hidden group"
              >
                <Link href="/join-us" className="relative z-10 flex items-center">
                  <span className="text-lg font-semibold">Join Our Next Event</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-white/10 transform hover:-translate-y-1 overflow-hidden group"
              >
                <Link href="/contact" className="relative z-10 flex items-center">
                  <span className="text-lg font-semibold">Contact Us</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}