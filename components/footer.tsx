"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, ArrowRight } from "lucide-react";

const footerNav = [
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Topics", href: "/topics" },
      { name: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Math Bites", href: "/math-bites" },
      // { name: "Math Problems", href: "/fun-math-problems" },
      { name: "Team", href: "/team" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { name: "Join Us", href: "/join-us" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[#dcebf5] bg-[#f8fcff]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-120px] h-[320px] w-[320px] rounded-full bg-[#d9edf8] blur-3xl opacity-70" />
        <div className="absolute bottom-[-160px] left-[-120px] h-[340px] w-[340px] rounded-full bg-[#edf7fc] blur-3xl opacity-90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d9eaf5] bg-white shadow-[0_10px_30px_rgba(10,45,68,.06)]">
                <span
                  className="text-[1.6rem] text-[#17689e]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ∑
                </span>
              </div>

              <div className="min-w-0">
                <div
                  className="text-[1.15rem] leading-none text-[#0a2d44] sm:text-[1.2rem]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                >
                  Melbourne Math Circle
                </div>
                <div className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#17689e] sm:text-[0.72rem]">
                  Chapter of Orlando Math Circle
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-[0.96rem] leading-8 text-[#537086] sm:text-[0.98rem]">
              A student-led mathematics community in Melbourne, Florida focused on
              problem solving, mathematical exploration, and collaborative learning
              through free events and workshops.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <motion.a
                href="https://www.instagram.com/melbournemathcircle_omc/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e7f1] bg-white text-[#17689e] transition-colors duration-200 hover:border-[#17689e] hover:bg-[#17689e] hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation blocks */}
          {footerNav.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * (idx + 1) }}
              viewport={{ once: true }}
            >
              <div className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[#17689e]">
                {section.title}
              </div>

              <ul className="mt-5 space-y-2">
                {section.links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl px-3 py-3 text-[0.96rem] text-[#4c6b7f] transition-colors duration-200 hover:bg-[#eef7fb] hover:text-[#17689e] sm:px-2"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[#17689e]">
              Contact
            </div>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-[2px] rounded-full bg-[#e7f4fb] p-2 text-[#17689e]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[0.95rem] text-[#0a2d44]">Melbourne, Florida</div>
                  <div className="mt-1 text-sm text-[#6d8798]">Student-led math outreach</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-[2px] rounded-full bg-[#e7f4fb] p-2 text-[#17689e]">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <a
                    href="mailto:eshan.mmc@orlandomathcircle.org"
                    className="break-words text-[0.95rem] leading-7 text-[#0a2d44] transition-colors duration-200 hover:text-[#17689e]"
                  >
                    eshan.mmc@orlandomathcircle.org
                  </a>
                  <div className="mt-1 text-sm text-[#6d8798]">General inquiries</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-[#dcebf5] pt-6 sm:mt-14 sm:pt-7">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#6d8798]">
              © {new Date().getFullYear()} Melbourne Math Circle
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#8ba5b7]">
              <span>Problem Solving</span>
              <span>•</span>
              <span>Community</span>
              <span>•</span>
              <span>Mathematical Curiosity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}