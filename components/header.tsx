"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="sr-only">Melbourne Math Circle</span>
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-xl font-bold">π</span>
          </div>
          <span className="font-mono text-lg font-bold tracking-tight text-white">
            Melbourne Math Circle
          </span>
        </Link>

        {/* Desktop links */}
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

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex lg:hidden items-center p-2.5 text-white hover:text-cyan-300 -m-2.5"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile menu animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Animated panel */}
            <motion.div
              className="relative ml-auto w-full max-w-sm h-[100dvh] overflow-y-auto bg-blue-900 px-6 py-6 ring-1 ring-blue-700 shadow-2xl"
              initial={{ x: "100%", opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "100%", opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                bounce: 0.25,
                duration: 0.6,
                delay: 0.05,
              }}
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Melbourne Math Circle</span>
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-lg font-bold">π</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-white">
                    MMC
                  </span>
                </Link>
                <button
                  type="button"
                  className="p-2.5 -m-2.5 text-white hover:text-cyan-300 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-4 text-white font-mono text-base">
                👋 Hey there! Where would you like to go?
              </p>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-blue-700/50">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block -mx-3 px-3 py-2 rounded-lg font-mono text-base font-medium leading-7 text-white hover:bg-blue-800 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
