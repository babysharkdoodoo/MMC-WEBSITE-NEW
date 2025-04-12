"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import MathParticleSystem from "@/components/math-particle-system";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Interactive Clock icon
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
];

// Impact statistics
const impactStats = [
  { value: "100+", label: "Students Reached" },
  { value: "20+", label: "Events Hosted" },
  { value: "100+", label: "Volunteer Hours Logged" },
  { value: "95%", label: "Student Satisfaction" },
];

// Upcoming events (2 events => 2-column layout)
const upcomingEvents = [
  {
    id: 1,
    title: "STEM Discovery Day",
    date: "June 1, 2023",
    time: "2:00 PM - 3:30 PM",
    location: "Nana's House Foster Care, Melbourne, FL",
    description:
      "Join us for STEM Discovery Day, where we promote STEM in underprivileged communities through interactive games and hands-on activities designed to boost mathematical curiosity and inspire creative problem-solving.",
    category: "STEM Outreach",
  },
  {
    id: 2,
    title: "Interactive STEM & Math Workshop",
    date: "June 13, 2023",
    time: "2:00 PM - 3:30 PM",
    location: "Nana's House Foster Care, Melbourne, FL",
    description:
      "Engage in an interactive workshop featuring fun math games and creative challenges that increase mathematical curiosity while promoting STEM education in underprivileged communities.",
    category: "STEM Outreach",
  },
];

// Testimonials
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
        {/* Dark-blue-themed background image + gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home-screen-photo.jpg"
            alt="Melbourne Math Circle Students"
            fill
            className="object-cover"
            priority
          />
          {/* Keep a dark blue overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 mix-blend-multiply" />
        </div>

        {/* Animated Math Particles */}
        <MathParticleSystem count={50} opacity={0.15} />

        {/* Floating shape (blue tones, removing pink/purple/yellow) */}
        <motion.div
          className="absolute -bottom-28 -left-20 w-[400px] h-[400px] bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 rounded-full blur-3xl opacity-50"
          animate={{ x: [0, 50, -50, 0], y: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
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
              <motion.div
                className="mb-8 relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              >
                <div className="h-24 w-24 rounded-full bg-card flex items-center justify-center shadow-xl">
                  <span className="text-5xl font-serif text-primary">π</span>
                </div>
                <motion.div
                  className="absolute -z-10 inset-0 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 blur-lg opacity-70"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
                Melbourne
                <span className="relative inline-block mx-2">
                  Math
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-2 bg-blue-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.4 }}
                  />
                </span>
                Circle
              </h1>
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
                className="bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Link href="/join-us" className="flex items-center">
                  <span>Join Our Next Event</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Link href="/about" className="flex items-center">
                  Discover Our Mission
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== MISSION STATEMENT ===== */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Another shape (blue) */}
        <motion.div
          className="absolute -top-32 -right-24 w-[300px] h-[300px] rounded-full bg-gradient-to-tl from-blue-700 to-cyan-500 opacity-40 blur-2xl"
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
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 opacity-75 blur-lg"
                  animate={{
                    background: [
                      "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 50%, #06B6D4 100%)",
                      "linear-gradient(180deg, #3B82F6 0%, #06B6D4 50%, #1E3A8A 100%)",
                      "linear-gradient(270deg, #06B6D4 0%, #1E3A8A 50%, #3B82F6 100%)",
                      "linear-gradient(0deg, #1E3A8A 0%, #3B82F6 50%, #06B6D4 100%)",
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <span className="relative block bg-background px-6 py-3 rounded-lg font-mono text-lg text-primary">
                  Our Mission
                </span>
              </div>
            </div>

            <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Transforming Mathematics from a{" "}
              <span className="text-primary">Subject</span> into a{" "}
              <span className="text-primary">Passion</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Melbourne Math Circle is dedicated to fostering a love for
              mathematics through engaging, interactive events that challenge
              students to think creatively, collaborate effectively, and
              discover the beauty of mathematical thinking beyond the classroom.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-2">
                    <motion.div
                      className="absolute -inset-2 rounded-full bg-primary/20 blur-sm"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <span className="relative text-4xl md:text-5xl font-bold text-primary">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Blue floating gradient behind container */}
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

          {/* Dynamically choose number of columns: 1 for single event, 2 for exactly two, 3 otherwise */}
          <div
            className={
              upcomingEvents.length === 1
                ? "grid gap-8 md:grid-cols-1 lg:grid-cols-1"
                : upcomingEvents.length === 2
                ? "grid gap-8 md:grid-cols-2 lg:grid-cols-2"
                : "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            }
          >
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
                      {/* Top gradient bar */}
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

                        {/* Date/time/location */}
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

                        {/* Registration button */}
                        <div className="flex justify-between items-center">
                          <Button
                            asChild
                            variant="outline"
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                          >
                            <Link href="/join-us">Register Now</Link>
                          </Button>

                          {/* If you want a details link, uncomment:
                          <Link
                            href={`/events/${event.id}`}
                            className="text-primary hover:text-primary/80 font-mono text-sm flex items-center"
                          >
                            Details <ChevronRight className="ml-1 h-4 w-4" />
                          </Link> */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            {/* Optional "View All Events" button */}
            {/* <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              <Link href="/events" className="flex items-center">
                View All Events
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* ===== FEATURED YOUTUBE SECTION ===== */}
      <section className="py-24 bg-background relative overflow-hidden">
        <motion.div
          className="absolute -top-52 -left-40 w-[400px] h-[400px] bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full blur-2xl opacity-30"
          animate={{ x: [0, 100, -100, 0] }}
          transition={{ repeat: Infinity, duration: 18 }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-border shadow-md">
              <h2 className="font-mono text-2xl font-bold text-center mb-4 text-primary drop-shadow">
                Featured on the Professor Kev Show!
              </h2>
              <p className="text-foreground/80 text-center mb-6">
                Melbourne Math Circle was recently featured on the Professor Kev
                Show, highlighting our mission and the impact we're making in
                the community.
              </p>
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  src="https://www.youtube.com/embed/bwqcqY0FlEE"
                  title="Melbourne Math Circle TV Feature"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-blue-800 text-blue-100 relative overflow-hidden">
        {/* Subtle floating shapes in blue tones */}
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
                                    src={
                                      testimonial.image || "/placeholder.svg"
                                    }
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

      {/* ===== CALL TO ACTION ===== */}
      <section className="py-24 bg-background relative overflow-hidden">
        <motion.div
          className="absolute -bottom-28 left-0 w-[300px] h-[300px] bg-gradient-to-tl from-blue-600 to-cyan-600 blur-2xl opacity-30"
          animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="h-12 w-12 text-blue-600 mx-auto" />
              </motion.div>
            </div>

            <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Ready to <span className="text-blue-600">Explore</span> the World
              of Mathematics?
            </h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join our community of curious minds and discover the joy of
              mathematical exploration through our engaging events and
              activities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white group relative overflow-hidden"
              >
                <Link href="/join-us">
                  <span className="relative z-10">Join Our Next Event</span>
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
