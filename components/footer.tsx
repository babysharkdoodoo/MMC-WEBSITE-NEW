"use client";

import { Github, Instagram, Mail, MapPin, Pi, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 border-t border-blue-700 text-blue-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo + Blurb */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <Pi className="h-8 w-8 text-cyan-300" />
              <span className="font-mono text-lg font-bold tracking-tight text-white">
                Melbourne Math Circle
              </span>
            </div>
            <p className="text-sm leading-6 text-blue-100/80">
              A monthly, student-led math workshop series in Melbourne, Florida,
              run by high school students.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-6">
              <Link href="#" className="text-blue-100/70 hover:text-cyan-300">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-blue-100/70 hover:text-cyan-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-blue-100/70 hover:text-cyan-300">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-mono text-sm font-semibold leading-6 text-cyan-300">
                  Pages
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Topics", href: "/topics" },
                    { name: "Math Bites", href: "/math-bites" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-blue-100/80 hover:text-cyan-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
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
                        className="text-sm leading-6 text-blue-100/80 hover:text-cyan-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="font-mono text-sm font-semibold leading-6 text-cyan-300">
                  Contact Us
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex gap-x-3">
                    <MapPin
                      className="h-5 w-5 flex-none text-cyan-300"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-6 text-blue-100/80">
                      Melbourne, Florida
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <Mail
                      className="h-5 w-5 flex-none text-cyan-300"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-6 text-blue-100/80">
                      info@melbournemathcircle.org
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-16 border-t border-blue-700 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-blue-100/70">
            &copy; {new Date().getFullYear()} Melbourne Math Circle. All rights
            reserved. Talk nerdy to us.
          </p>
        </div>
      </div>
    </footer>
  );
}
