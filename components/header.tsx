"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  // { name: "Join Us", href: "/join-us" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 14);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#dbe9f3] bg-white/88 shadow-[0_10px_30px_rgba(10,45,68,.05)] backdrop-blur-xl"
            : "bg-white/72 backdrop-blur-lg"
        }`}
        style={{
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <nav
          className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-6 lg:px-10"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[#d9eaf5] bg-white shadow-[0_6px_18px_rgba(10,45,68,.05)] transition-all duration-200 group-hover:border-[#bfd9ea]">
              <Image
                src="/mmc_logo.jpg"
                alt="Melbourne Math Circle"
                width={34}
                height={34}
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-tight">
              <div
                className="text-[1.2rem] leading-none text-[#0a2d44]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                }}
              >
                Melbourne Math Circle
              </div>

              <div className="mt-[3px] text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#17689e]">
                Chapter of Orlando Math Circle
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#edf6fb] text-[#17689e]"
                      : "text-[#557284] hover:bg-[#f4f9fc] hover:text-[#17689e]"
                  }`}
                >
                  {item.name}

                  {active && (
                    <motion.div
                      layoutId="header-active"
                      className="absolute inset-0 -z-10 rounded-lg border border-[#d6e8f3]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link
              href="/join-us"
              className="hidden rounded-full bg-[#17689e] px-5 py-[11px] text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:bg-[#0f557f] lg:inline-flex"
            >
              Join Us
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-lg border border-[#dcebf5] bg-white p-2 text-[#0a2d44] transition-all duration-200 hover:bg-[#f4f9fc] lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#0a2d44]/30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l border-[#dcebf5] bg-white"
            >
              {/* Top */}
              <div className="flex items-center justify-between border-b border-[#eef5f9] px-6 py-5">
                <div>
                  <div
                    className="text-[1.15rem] text-[#0a2d44]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    Melbourne Math Circle
                  </div>

                  <div className="mt-[2px] text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#17689e]">
                    Student-led math community
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-[#dcebf5] p-2 text-[#0a2d44]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-1 flex-col px-4 py-5">
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-[1rem] transition-all duration-200 ${
                          active
                            ? "bg-[#edf6fb] font-medium text-[#17689e]"
                            : "text-[#4c6b7f] hover:bg-[#f7fbfe] hover:text-[#17689e]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-auto border-t border-[#eef5f9] pt-5">
                  <Link
                    href="/join-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-full bg-[#17689e] px-5 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:bg-[#0f557f]"
                  >
                    Join Our Next Event
                  </Link>

                  <p className="mt-4 text-center text-sm leading-7 text-[#6d8798]">
                    Free workshops, discussions, and problem solving events in
                    Melbourne, Florida.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}