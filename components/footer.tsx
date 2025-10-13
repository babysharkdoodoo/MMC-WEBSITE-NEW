"use client";

import { Instagram, Mail, MapPin, Pi } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-blue-900 border-t border-blue-700 text-blue-100 relative overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent opacity-50 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 relative">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo + Blurb */}
          <motion.div 
            className="space-y-8 xl:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Pi className="h-8 w-8 text-cyan-300" />
              </motion.div>
              <span className="font-mono text-lg font-bold tracking-tight text-white">
                Melbourne Math Circle
              </span>
            </div>
            <p className="text-sm leading-6 text-blue-100/80">
              A free, student-led math outreach program in Melbourne, Florida,
              organized by high school students to foster curiosity and
              excitement about mathematics, as a chapter of Orlando Math Circle (OMC).
            </p>
            {/* Social Icons */}
            <div className="flex space-x-6">
              <motion.a
                href="https://www.instagram.com/melbournemathcircle_omc/"
                className="text-blue-100/70 hover:text-cyan-300"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </motion.a>
              {/* Add more social links if needed */}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-mono text-sm font-semibold leading-6 text-cyan-300">
                  Pages
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-blue-100/80 hover:text-cyan-300 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="mt-10 md:mt-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-mono text-sm font-semibold leading-6 text-cyan-300">
                  More
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: "Team", href: "/team" },
                    { name: "Join Us", href: "/join-us" },
                    { name: "Gallery", href: "/gallery" },
                    { name: "Contact", href: "/contact" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-blue-100/80 hover:text-cyan-300 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <motion.div 
              className="md:grid md:grid-cols-1 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div>
                <h3 className="font-mono text-sm font-semibold leading-6 text-cyan-300">
                  Contact Us
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex gap-x-3 items-center">
                    <MapPin
                      className="h-5 w-5 flex-none text-cyan-300"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-6 text-blue-100/80">
                      Melbourne, Florida
                    </span>
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <Mail
                      className="h-5 w-5 flex-none text-cyan-300"
                      aria-hidden="true"
                    />
                    <a
                      href="mailto:eshan.mmc@orlandomathcircle.org"
                      className="text-sm leading-6 text-blue-100/80 hover:text-cyan-300 transition-colors duration-200"
                    >
                      eshan.mmc@orlandomathcircle.org (General Inquiries)
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-16 border-t border-blue-700 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-blue-100/70 text-center">
            &copy; {new Date().getFullYear()} Melbourne Math Circle. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}