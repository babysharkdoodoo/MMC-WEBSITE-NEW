"use client";

import RegistrationForm from "@/components/registration-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// No flyer logic – each event has its own card, as you originally had.
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

// Mathematical symbols for subtle background
const mathSymbols = [
  "π", "∑", "∫", "∞", "≈", "θ", "λ", "Δ", "√", "∂", "Ω", "±", "×", "÷",
  "σ", "μ", "φ", "Γ", "α", "β", "γ", "ε", "ζ", "η", "ι", "κ",
];

export default function JoinUsPage() {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Multi-layered gradient + subtle pattern (blue theme) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEEzRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none" />

        {/* Floating animated shapes */}
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
        <motion.div
          className="absolute -top-52 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-300/25 to-blue-400/20 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -45, 45, 0], y: [0, 30, -30, 0], opacity: [0.25, 0.35, 0.25] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 18 }
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
              Join <span className="text-blue-200">Us</span>
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
              Sign up once and get free RSVP links for every upcoming event.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS SECTION =====
      <section className="py-32 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
        Subtle background with math symbols
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

        Floating gradient shapes 
        <motion.div
          className="absolute -top-48 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/20 via-cyan-300/25 to-teal-300/20 rounded-full blur-3xl"
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
          className="absolute -bottom-48 left-0 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-300/25 to-blue-400/20 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -45, 45, 0], y: [0, 30, -30, 0], opacity: [0.25, 0.35, 0.25] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 18 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            className="font-mono text-5xl md:text-6xl font-bold tracking-tight mb-20 text-blue-900 text-center drop-shadow-md"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
          >
            Upcoming <span className="text-cyan-600">Events</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-gradient-to-b from-white to-blue-50/50 p-8 rounded-3xl shadow-xl border border-blue-100/50 hover:shadow-cyan-500/30 transition-all duration-500 flex flex-col group relative overflow-hidden"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -5 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              >
                Subtle hover gradient overlay
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge className="mb-2 bg-blue-600 text-white">
                    {event.category}
                  </Badge>
                  <h3 className="font-serif text-xl font-bold text-blue-900 group-hover:text-cyan-600 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <div className="space-y-1 text-blue-700/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-blue-900/80">{event.description}</p>

                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    <a href="#register">Sign Up to Attend</a>
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== REGISTRATION FORM SECTION ===== */}
      <section
        id="register"
        className="py-32 bg-gradient-to-tr from-blue-50 via-cyan-50 to-sky-50 relative overflow-hidden transition-colors duration-700"
      >
        {/* Floating animated shapes */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tl from-blue-400 to-cyan-400 blur-3xl opacity-30"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 90, -90, 0], x: [0, -50, 50, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 10 }
          }
        />
        <motion.div
          className="absolute -top-52 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-300/25 to-blue-400/20 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -45, 45, 0], y: [0, 30, -30, 0], opacity: [0.25, 0.35, 0.25] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 18 }
          }
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-block mb-4"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-75 blur-lg"></div>
                  <div className="relative bg-white px-6 py-3 rounded-full font-mono text-lg text-blue-900">
                    Join the Circle
                  </div>
                </div>
              </motion.div>

              <motion.h2
                className="font-mono text-5xl md:text-6xl font-bold tracking-tight mb-4 text-blue-800"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
              >
                RSVP <span className="text-blue-600">One Time</span>
              </motion.h2>

              <motion.p
                className="text-blue-900/80 max-w-2xl mx-auto text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.2,
                  duration: shouldReduceMotion ? 0 : 0.8,
                }}
              >
                Complete this form once, and we'll email you RSVP links for all
                future Melbourne Math Circle events. It’s free and open to
                anyone who loves math!
              </motion.p>
            </div>

            <motion.div
              className="shadow-md border border-blue-100 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Card>
                <CardContent className="p-6">
                  <RegistrationForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 text-white relative overflow-hidden transition-colors duration-700">
        {/* Floating animated shapes */}
        <motion.div
          className="absolute -top-52 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-400 to-teal-400 blur-3xl opacity-40"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, 90, -90, 0], x: [0, -50, 50, 0] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 10 }
          }
        />
        <motion.div
          className="absolute -bottom-52 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-blue-400/20 to-cyan-400/25 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: [0, -45, 45, 0], y: [0, 30, -30, 0], opacity: [0.25, 0.35, 0.25] }
          }
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 18 }
          }
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
            >
              Already Signed Up?
            </motion.h2>
            <motion.p
              className="text-white/90 mb-8 text-lg md:text-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.2,
                duration: shouldReduceMotion ? 0 : 0.8,
              }}
            >
              Check your email for RSVP links. If you have any questions, reach
              out below!
            </motion.p>
            <Button
              asChild
              size="lg"
              className="bg-blue-400 hover:bg-blue-300 text-blue-900 font-medium"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}