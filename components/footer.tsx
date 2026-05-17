"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[#dcebf5] bg-[#f8fcff]"
      style={{
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-120px] h-[320px] w-[320px] rounded-full bg-[#d9edf8] blur-3xl opacity-70" />
        <div className="absolute bottom-[-160px] left-[-120px] h-[340px] w-[340px] rounded-full bg-[#edf7fc] blur-3xl opacity-90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        {/* Top */}
        <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr_.8fr_.9fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d9eaf5] bg-white shadow-[0_10px_30px_rgba(10,45,68,.06)]">
                <span
                  className="text-[1.6rem] text-[#17689e]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  ∑
                </span>
              </div>

              <div>
                <div
                  className="text-[1.15rem] leading-none text-[#0a2d44]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                  }}
                >
                  Melbourne Math Circle
                </div>

                <div className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#17689e]">
                  Chapter of Orlando Math Circle
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-[0.98rem] leading-8 text-[#537086]">
              A student-led mathematics community in Melbourne, Florida focused
              on problem solving, mathematical exploration, and collaborative
              learning through free events and workshops.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <motion.a
                href="https://www.instagram.com/melbournemathcircle_omc/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e7f1] bg-white text-[#17689e] transition-all duration-200 hover:border-[#17689e] hover:bg-[#17689e] hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[#17689e]">
              Navigation
            </div>

            <ul className="mt-6 space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Team", href: "/team" },
                { name: "Join Us", href: "/join-us" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[0.96rem] text-[#4c6b7f] transition-colors duration-200 hover:text-[#17689e]"
                  >
                    <span>{item.name}</span>

                    <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[#17689e]">
              Explore
            </div>

            <ul className="mt-6 space-y-4">
              {[
                { name: "Gallery", href: "/gallery" },
                { name: "Contact", href: "/contact" },
                { name: "Events", href: "/join-us" },
                { name: "Mission", href: "/about" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[0.96rem] text-[#4c6b7f] transition-colors duration-200 hover:text-[#17689e]"
                  >
                    <span>{item.name}</span>

                    <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

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

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-[2px] rounded-full bg-[#e7f4fb] p-2 text-[#17689e]">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <div className="text-[0.95rem] text-[#0a2d44]">
                    Melbourne, Florida
                  </div>

                  <div className="mt-1 text-sm text-[#6d8798]">
                    Student-led math outreach
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
  <div className="mt-[2px] rounded-full bg-[#e7f4fb] p-2 text-[#17689e]">
    <Mail className="h-4 w-4" />
  </div>

  <div>
    <a
      href="mailto:eshan.mmc@orlandomathcircle.org"
      className="text-[0.95rem] text-[#0a2d44] transition-colors duration-200 hover:text-[#17689e]"
      style={{
        wordBreak: "normal",
        overflowWrap: "normal",
        whiteSpace: "nowrap",
      }}
    >
      eshan.mmc@orlandomathcircle.org
    </a>

    <div className="mt-1 text-sm text-[#6d8798]">
      General inquiries
    </div>
  </div>
</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[#dcebf5] pt-7 md:flex-row">
          <p className="text-sm text-[#6d8798]">
            © {new Date().getFullYear()} Melbourne Math Circle
          </p>

          <div className="flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#8ba5b7]">
            <span>Problem Solving</span>
            <span>•</span>
            <span>Community</span>
            <span>•</span>
            <span>Mathematical Curiosity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}