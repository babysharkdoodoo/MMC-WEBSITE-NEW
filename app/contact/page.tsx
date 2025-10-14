"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

// Mathematical symbols for subtle background
const mathSymbols = [
  "π", "∑", "∫", "∞", "≈", "θ", "λ", "Δ", "√", "∂", "Ω", "±", "×", "÷",
  "σ", "μ", "φ", "Γ", "α", "β", "γ", "ε", "ζ", "η", "ι", "κ",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    hidden: "", // honeypot
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Spam honeypot
    if (form.hidden.trim() !== "") {
      setErrorMsg("Spam detected.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", hidden: "" });
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Submission failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Network error. Try again later.");
    }
  };

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background gradients and subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+')] opacity-20 pointer-events-none" />

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
              Contact <span className="text-blue-200">Us</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.2,
                duration: shouldReduceMotion ? 0 : 0.8,
              }}
            >
              Have questions or want to learn more about Melbourne Math Circle?
              We’d love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
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
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* ===== CONTACT FORM ===== */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-mono text-3xl md:text-4xl font-bold mb-8 text-blue-800">
                  Get in <span className="text-cyan-600">Touch</span>
                </h2>

                {status === "success" ? (
                  <motion.div
                    className="text-green-600 text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="hidden"
                      value={form.hidden}
                      onChange={handleChange}
                      className="hidden"
                      autoComplete="off"
                      tabIndex={-1}
                    />

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-blue-900">
                        Name
                      </Label>
                      <Input
                        name="name"
                        id="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="border-blue-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-900">
                        Email
                      </Label>
                      <Input
                        name="email"
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className="border-blue-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-blue-900">
                        Subject
                      </Label>
                      <Input
                        name="subject"
                        id="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        className="border-blue-100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-blue-900">
                        Message
                      </Label>
                      <Textarea
                        name="message"
                        id="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        className="min-h-[150px] border-blue-100"
                      />
                    </div>

                    {errorMsg && <p className="text-red-600">{errorMsg}</p>}

                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-blue-700 hover:bg-blue-600 text-white text-lg py-6"
                    >
                      {status === "submitting" ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          Sending...
                        </motion.span>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* ===== CONTACT INFO ===== */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-mono text-3xl md:text-4xl font-bold mb-8 text-blue-800">
                  Contact <span className="text-cyan-600">Information</span>
                </h2>
                <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-mono text-lg font-bold text-blue-900 mb-2">
                          Email
                        </h3>
                        <p className="text-blue-900/80 mb-1">
                          General Inquiries:
                        </p>
                        <a
                          href="mailto:info@melbournemathcircle.org"
                          className="text-blue-700 hover:text-blue-500"
                        >
                          eshan.mmc@orlandomathcircle.org
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-32 bg-gradient-to-tr from-blue-50 via-cyan-50 to-sky-50 relative overflow-hidden">
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="font-mono text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
            >
              Frequently Asked <span className="text-cyan-600">Questions</span>
            </motion.h2>
            <div className="space-y-6">
              {[
                {
                  question: "How can I join Melbourne Math Circle?",
                  answer:
                    "You can join by registering for our next meeting through our website. Simply go to the Join Us page and fill out the registration form.",
                },
                {
                  question: "Is there a fee to attend meetings?",
                  answer:
                    "No, our meetings are completely free! We're a nonprofit organization dedicated to making mathematics accessible to all students.",
                },
                {
                  question: "How can I support Melbourne Math Circle?",
                  answer:
                    "We welcome volunteers and donations. If you're interested in supporting our mission, please contact us directly for more information.",
                },
                {
                  question: "Can parents attend meetings with their children?",
                  answer:
                    "Parents are welcome to attend and observe our meetings. We believe family involvement enhances the learning experience.",
                },
                {
                  question: "Do I need any special background to participate?",
                  answer:
                    "Not at all! Our events cater to various skill levels, from math novices to competition-ready enthusiasts. Everyone is welcome.",
                },
                {
                  question: "Where are the events held?",
                  answer:
                    "Our events take place at a variety of local venues around the city and occasionally online. Check our 'Join Us' page for upcoming locations and formats.",
                },
                {
                  question: "Are events online or in-person?",
                  answer:
                    "We host both! Some sessions are fully online, while others happen in-person. We’ll note the location details in each event listing.",
                },
                {
                  question: "How can I stay updated on future events?",
                  answer:
                    "Simply sign up once on our 'Join Us' page, and we’ll email RSVP links whenever a new event is scheduled.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <h3 className="font-mono text-lg font-bold mb-2 text-blue-900">
                        {item.question}
                      </h3>
                      <p className="text-blue-900/80">{item.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}