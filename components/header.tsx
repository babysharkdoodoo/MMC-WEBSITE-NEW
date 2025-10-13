"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollPosition > 20);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
        ? "bg-blue-900 backdrop-blur-md border-b border-blue-700/50 shadow-lg shadow-blue-900/20"
        : "bg-blue-900 backdrop-blur-sm border-b border-blue-700/30"
        }`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0 }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        willChange: "transform",
        backgroundColor: "#1e3a8a" // Solid blue-900 background
      }}
    >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <span className="sr-only">Melbourne Math Circle</span>
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-white/50 group-hover:border-cyan-300/60 transition-all duration-300">
                  <Image
                    src="/mmc_logo.jpg"
                    alt="Melbourne Math Circle Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-lg font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors duration-300">
                  Melbourne Math Circle
                </span>
                <span className="font-mono text-xs text-cyan-200/80 group-hover:text-cyan-200 transition-colors duration-300">
                  A Chapter of OMC
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg font-mono text-sm font-medium transition-all duration-300 group ${isActive
                      ? "text-cyan-200 bg-white/10"
                      : "text-white hover:text-cyan-200 hover:bg-white/5"
                      }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Mobile Hamburger */}
          <motion.button
            type="button"
            className="flex lg:hidden items-center p-3 text-white hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-all duration-300"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </nav>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex lg:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Enhanced Backdrop */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-blue-800/80 backdrop-blur-md"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {/* Enhanced Mobile Panel */}
              <motion.div
                className="relative ml-auto w-full max-w-sm h-[100dvh] overflow-y-auto bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-6 py-6 border-l border-blue-700/50 shadow-2xl"
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
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/"
                      className="flex items-center gap-3 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Melbourne Math Circle</span>
                      <div className="relative">
                        <div className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-white/50">
                          <Image
                            src="/mmc_logo.jpg"
                            alt="Melbourne Math Circle Logo"
                            width={30}
                            height={30}
                            className="object-contain"
                            priority
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-base font-bold text-white">
                          MMC
                        </span>
                        <span className="font-mono text-xs text-cyan-200/80">
                          Chapter of OMC
                        </span>
                      </div>
                    </Link>
                  </motion.div>

                  <motion.button
                    type="button"
                    className="p-3 text-white hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.button>
                </div>

                {/* Welcome Message */}
                <motion.div
                  className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0 }}
                >
                  <p className="text-white font-mono text-base leading-relaxed">
                    <span className="text-2xl mr-2">👋</span>
                    Hey there! Where would you like to explore?
                  </p>
                </motion.div>

                {/* Enhanced Navigation Links */}
                <div className="space-y-3">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0 }}
                      >
                        <Link
                          href={item.href}
                          className={`group relative block p-4 rounded-xl font-mono text-base font-medium transition-all duration-300 ${isActive
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border border-cyan-400/30"
                            : "text-white hover:bg-white/10 hover:text-cyan-200 border border-transparent hover:border-white/20"
                            }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <motion.div
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              whileHover={{ x: 5 }}
                            >
                              →
                            </motion.div>
                          </div>
                          {isActive && (
                            <motion.div
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full"
                              layoutId="activeMobileTab"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0 }}
                >
                  <p className="text-center text-cyan-200/60 font-mono text-sm">
                    Igniting mathematical curiosity
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
  );
}
