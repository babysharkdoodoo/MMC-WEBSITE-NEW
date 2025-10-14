"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MotionCard = motion(Card);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" },
  tap: { scale: 0.95 },
};

// Mathematical symbols for subtle background
const mathSymbols = [
  "π", "∑", "∫", "∞", "≈", "θ", "λ", "Δ", "√", "∂", "Ω", "±", "×", "÷",
  "σ", "μ", "φ", "Γ", "α", "β", "γ", "ε", "ζ", "η", "ι", "κ",
];

type Category = "monthly-meetings" | "indiafest";

const galleryImages: Array<{
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: Category;
}> = [
  // Monthly Meetings
  {
    id: 1,
    src: "/photos/monthly_meetings/1.png",
    alt: "Monthly Meeting Photo #1",
    caption: "Monthly Meeting Photo #1",
    category: "monthly-meetings",
  },
  {
    id: 2,
    src: "/photos/monthly_meetings/2.png",
    alt: "Monthly Meeting Photo #2",
    caption: "Monthly Meeting Photo #2",
    category: "monthly-meetings",
  },
  {
    id: 3,
    src: "/photos/monthly_meetings/3.png",
    alt: "Monthly Meeting Photo #3",
    caption: "Monthly Meeting Photo #3",
    category: "monthly-meetings",
  },
  {
    id: 4,
    src: "/photos/monthly_meetings/4.png",
    alt: "Monthly Meeting Photo #4",
    caption: "Monthly Meeting Photo #4",
    category: "monthly-meetings",
  },
  {
    id: 5,
    src: "/photos/monthly_meetings/5.png",
    alt: "Monthly Meeting Photo #5",
    caption: "Monthly Meeting Photo #5",
    category: "monthly-meetings",
  },
  {
    id: 6,
    src: "/photos/monthly_meetings/6.png",
    alt: "Monthly Meeting Photo #6",
    caption: "Monthly Meeting Photo #6",
    category: "monthly-meetings",
  },
  {
    id: 7,
    src: "/photos/monthly_meetings/7.png",
    alt: "Monthly Meeting Photo #7",
    caption: "Monthly Meeting Photo #7",
    category: "monthly-meetings",
  },
  {
    id: 8,
    src: "/photos/monthly_meetings/8.png",
    alt: "Monthly Meeting Photo #8",
    caption: "Monthly Meeting Photo #8",
    category: "monthly-meetings",
  },
  {
    id: 9,
    src: "/photos/monthly_meetings/9.png",
    alt: "Monthly Meeting Photo #9",
    caption: "Monthly Meeting Photo #9",
    category: "monthly-meetings",
  },
  {
    id: 10,
    src: "/photos/monthly_meetings/10.png",
    alt: "Monthly Meeting Photo #10",
    caption: "Monthly Meeting Photo #10",
    category: "monthly-meetings",
  },
  {
    id: 11,
    src: "/photos/monthly_meetings/11.png",
    alt: "Monthly Meeting Photo #11",
    caption: "Monthly Meeting Photo #11",
    category: "monthly-meetings",
  },
  {
    id: 12,
    src: "/photos/monthly_meetings/12.png",
    alt: "Monthly Meeting Photo #12",
    caption: "Monthly Meeting Photo #12",
    category: "monthly-meetings",
  },
  {
    id: 13,
    src: "/photos/monthly_meetings/13.png",
    alt: "Monthly Meeting Photo #13",
    caption: "Monthly Meeting Photo #13",
    category: "monthly-meetings",
  },
  {
    id: 14,
    src: "/photos/monthly_meetings/14.png",
    alt: "Monthly Meeting Photo #14",
    caption: "Monthly Meeting Photo #14",
    category: "monthly-meetings",
  },
  {
    id: 15,
    src: "/photos/monthly_meetings/15.png",
    alt: "Monthly Meeting Photo #15",
    caption: "Monthly Meeting Photo #15",
    category: "monthly-meetings",
  },

  // IndiaFest
  {
    id: 16,
    src: "/Photos/IndiaFest/1.png",
    alt: "IndiaFest Photo #1",
    caption: "IndiaFest Photo #1",
    category: "indiafest",
  },
  {
    id: 17,
    src: "/Photos/IndiaFest/2.png",
    alt: "IndiaFest Photo #2",
    caption: "IndiaFest Photo #2",
    category: "indiafest",
  },
  {
    id: 18,
    src: "/Photos/IndiaFest/3.png",
    alt: "IndiaFest Photo #3",
    caption: "IndiaFest Photo #3",
    category: "indiafest",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openLightbox = (id: number) => setSelectedImage(id);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const idx = galleryImages.findIndex((img) => img.id === selectedImage);
    const nextIdx =
      direction === "prev"
        ? (idx + galleryImages.length - 1) % galleryImages.length
        : (idx + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIdx].id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectedImage === null) return;
    if (e.key === "ArrowLeft") navigateImage("prev");
    if (e.key === "ArrowRight") navigateImage("next");
    if (e.key === "Escape") closeLightbox();
  };

  const renderSection = (title: string, emoji: string, category: Category) => (
    <section key={category}>
      <motion.h2
        className="text-3xl md:text-4xl font-mono font-bold text-blue-800 mb-8 text-center"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
      >
        {emoji} {title}
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {galleryImages
          .filter((img) => img.category === category)
          .map((image) => (
            <MotionCard
              key={image.id}
              className={`overflow-hidden border border-blue-100 bg-gradient-to-b from-white to-blue-50/50 shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 relative group ${
                isMobile ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => {
                if (!isMobile) openLightbox(image.id);
              }}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              whileHover={shouldReduceMotion ? {} : "hover"}
              whileTap="tap"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <CardContent className="p-0">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* <div className="p-4 bg-blue-50">
                  <p className="text-sm text-blue-900/80 text-center">{image.caption}</p>
                </div> */}
              </CardContent>
            </MotionCard>
          ))}
      </motion.div>
    </section>
  );

  return (
    <div className="flex flex-col" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Hero */}
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

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            >
              Gallery of Our <span className="text-blue-200">Journey</span>
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
              Tap or click any image to enlarge (disabled on mobile). Swipe or use
              arrow keys to navigate.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
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

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 space-y-24 relative z-10">
          {renderSection("Monthly Meetings", "", "monthly-meetings")}
          {renderSection("IndiaFest", "", "indiafest")}
        </div>
      </section>

      {/* Submit Photos */}
      <section className="py-24 bg-gradient-to-tr from-blue-50 via-cyan-50 to-sky-50 relative overflow-hidden">
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

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              Submit Your <span className="text-cyan-700">Photos</span>
            </h2>
            <p className="text-blue-900/80 mb-6 text-lg">
              Share your Monthly Meeting snapshots or IndiaFest highlights!
            </p>
            <Button
              asChild
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-lg px-8 py-3"
            >
              <Link href="/contact#submit-photos">Submit Photos</Link>
            </Button>
          </motion.div>
          <motion.div
            className="hidden md:block relative w-full h-64"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/placeholder.svg?height=256&width=512&text=Your+Photos+Here"
              alt="Submit photos placeholder"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 text-white hover:text-gray-300 z-10 hidden md:block"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              className="absolute right-4 text-white hover:text-gray-300 z-10 hidden md:block"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="w-full max-w-[90vw] md:max-w-5xl">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
                {galleryImages
                  .filter((img) => img.id === selectedImage)
                  .map((image) => (
                    <Image
                      key={image.id}
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                    />
                  ))}
              </div>
              {/* <div className="mt-4 text-white text-center">
                {galleryImages
                  .filter((img) => img.id === selectedImage)
                  .map((image) => (
                    <p key={image.id} className="text-lg">{image.caption}</p>
                  ))}
              </div>
              <p className="text-white text-center text-sm mt-2">
                Use arrows or ESC to exit.
              </p>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}