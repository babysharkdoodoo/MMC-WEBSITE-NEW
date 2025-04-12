"use client";

import RegistrationForm from "@/components/registration-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, ClockIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export default function JoinUsPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        {/* Multi-layered gradient + subtle pattern (blue theme) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEEzRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none" />

        {/* Floating shape animation */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 rounded-full blur-3xl opacity-30"
          animate={{ rotate: [0, 60, -60, 0], x: [0, -40, 40, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Join <span className="text-blue-200">Us</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Sign up once and get free RSVP links for every upcoming event.
          </motion.p>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS SECTION ===== */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
        <motion.div
          className="absolute -top-24 right-0 w-[400px] h-[400px] bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 30, -30, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12 text-blue-900">
              Upcoming <span className="text-cyan-700">Events</span>
            </h2>

            {/* Display minimal event details, no more "Event Details" button */}
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden border border-blue-100 bg-white shadow-sm"
                >
                  <div className="p-6 space-y-4">
                    <Badge className="mb-2 bg-blue-600 text-white">
                      {event.category}
                    </Badge>
                    <h3 className="font-serif text-xl font-bold text-blue-900">
                      {event.title}
                    </h3>

                    <div className="space-y-1 text-blue-700/80">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-blue-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-blue-900/80">{event.description}</p>

                    {/* Single CTA: sign up to attend */}
                    <Button
                      asChild
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-500 text-white mt-4"
                    >
                      <a href="#register">Sign Up to Attend</a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== REGISTRATION FORM SECTION ===== */}
      <section
        id="register"
        className="py-16 bg-gradient-to-tr from-blue-50 via-cyan-50 to-sky-50 relative overflow-hidden"
      >
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tl from-blue-400 to-cyan-400 blur-3xl opacity-30"
          animate={{ rotate: [0, 60, -60, 0], x: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 18 }}
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

              <h2 className="font-mono text-3xl font-bold tracking-tight mb-4 text-blue-800">
                RSVP <span className="text-blue-600">One Time</span>
              </h2>

              <p className="text-blue-900/80 max-w-2xl mx-auto">
                Complete this form once, and we'll email you RSVP links for all
                future Melbourne Math Circle events. It’s free and open to
                anyone who loves math!
              </p>
            </div>

            <Card className="shadow-md border border-blue-100">
              <CardContent className="p-6">
                <RegistrationForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 text-white relative overflow-hidden">
        <motion.div
          className="absolute -top-52 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-400 to-teal-400 blur-3xl opacity-40"
          animate={{ rotate: [0, 45, -45, 0], y: [0, -40, 40, 0] }}
          transition={{ repeat: Infinity, duration: 18 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Already Signed Up?
            </motion.h2>
            <motion.p
              className="text-white/90 mb-8 text-lg md:text-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
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
