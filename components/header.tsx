"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  // { name: "Topics", href: "/topics" },
  // { name: "Math Bites", href: "/math-bites" },
  { name: "Team", href: "/team" },
  { name: "Join Us", href: "/join-us" },
  { name: "Photo Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-900/80 backdrop-blur-sm transition-all duration-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <span className="sr-only">Melbourne Math Circle</span>
            {/* Logo / Icon */}
            <div className="relative">
              {/* Blue bubble for the "π" icon */}
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-xl font-bold">π</span>
              </div>
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Melbourne Math Circle
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:text-cyan-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-mono text-sm font-medium leading-6 text-white hover:text-cyan-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Uncomment if you want the ThemeToggle on desktop:
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div> */}
      </nav>

      {/* ===== MOBILE MENU ===== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Dim background */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Slide-out menu */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-blue-700">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="-m-1.5 p-1.5 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Melbourne Math Circle</span>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-lg font-bold">π</span>
                </div>
                <span className="font-mono text-lg font-bold tracking-tight text-white">
                  MMC
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white hover:text-cyan-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-blue-700/50">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-base font-medium leading-7 text-white hover:bg-blue-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 flex justify-end">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
