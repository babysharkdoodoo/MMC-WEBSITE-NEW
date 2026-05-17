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
  { name: "Topics", href: "/topics" },
  { name: "Resources", href: "/resources" },
  { name: "Math Bites", href: "/math-bites" },
  // { name: "Math Problems", href: "/fun-math-problems" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
            ? "border-slate-200 bg-white shadow-[0_10px_30px_rgba(10,45,68,.07)]"
            : "border-slate-200 bg-white"
          }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <nav
          className="flex h-[76px] w-full items-center gap-4 px-4 sm:px-5 lg:px-6"
          aria-label="Main navigation"
        >
          {/* Left brand */}
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image
                src="/mmc_logo.jpg"
                alt="Melbourne Math Circle"
                width={34}
                height={34}
                className="object-contain"
                priority
              />
            </div>

            <div className="min-w-0 leading-tight">
              <div
                className="truncate text-[1.08rem] leading-none text-[#0a2d44] sm:text-[1.16rem]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
              >
                Melbourne Math Circle
              </div>
              <div className="mt-1 truncate text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#17689e] sm:text-[0.68rem]">
                Chapter of Orlando Math Circle
              </div>
            </div>
          </Link>

          {/* Center nav */}
          <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {navigation.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors duration-200",
                    active
                      ? "bg-[#edf6fb] text-[#17689e]"
                      : "text-[#5a7082] hover:bg-slate-50 hover:text-[#17689e]",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right CTA */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/join-us"
              className="hidden rounded-full bg-[#17689e] px-5 py-[11px] text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#0f557f] lg:inline-flex"
            >
              Join Us
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-[#0a2d44] transition-colors duration-200 hover:bg-slate-50 xl:hidden"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#0a2d44]/35 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-dvh w-[88%] max-w-sm flex-col border-l border-slate-200 bg-white shadow-[0_30px_80px_rgba(10,45,68,.18)]"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
                <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image src="/mmc_logo.jpg" alt="Melbourne Math Circle" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div
                      className="truncate text-[1.04rem] text-[#0a2d44]"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                    >
                      Melbourne Math Circle
                    </div>
                    <div className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#17689e]">
                      Student-led math community
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-slate-200 p-2 text-[#0a2d44] hover:bg-slate-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col px-4 py-4">
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const active = isActivePath(pathname, item.href);

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "block rounded-xl px-4 py-3 text-[0.98rem] transition-colors duration-200",
                          active
                            ? "bg-[#edf6fb] font-medium text-[#17689e]"
                            : "text-[#4c6b7f] hover:bg-[#f7fbfe] hover:text-[#17689e]",
                        ].join(" ")}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-auto border-t border-slate-200 pt-5">
                  <Link
                    href="/join-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-full bg-[#17689e] px-5 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#0f557f]"
                  >
                    Join Our Next Event
                  </Link>

                  <p className="mt-4 text-center text-sm leading-7 text-[#6d8798]">
                    Free workshops, discussions, and problem solving events in Melbourne, Florida.
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