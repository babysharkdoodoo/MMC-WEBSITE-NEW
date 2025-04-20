"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
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
    alt: "Monthly Meeting 1",
    caption: "Monthly Meeting #1",
    category: "monthly-meetings",
  },
  {
    id: 2,
    src: "/photos/monthly_meetings/2.png",
    alt: "Monthly Meeting 2",
    caption: "Monthly Meeting #2",
    category: "monthly-meetings",
  },
  {
    id: 3,
    src: "/photos/monthly_meetings/3.png",
    alt: "Monthly Meeting 3",
    caption: "Monthly Meeting #3",
    category: "monthly-meetings",
  },
  {
    id: 4,
    src: "/photos/monthly_meetings/4.png",
    alt: "Monthly Meeting 4",
    caption: "Monthly Meeting #4",
    category: "monthly-meetings",
  },
  {
    id: 5,
    src: "/photos/monthly_meetings/5.png",
    alt: "Monthly Meeting 5",
    caption: "Monthly Meeting #5",
    category: "monthly-meetings",
  },
  {
    id: 6,
    src: "/photos/monthly_meetings/6.png",
    alt: "Monthly Meeting 6",
    caption: "Monthly Meeting #6",
    category: "monthly-meetings",
  },
  {
    id: 7,
    src: "/photos/monthly_meetings/7.png",
    alt: "Monthly Meeting 7",
    caption: "Monthly Meeting #7",
    category: "monthly-meetings",
  },
  {
    id: 8,
    src: "/photos/monthly_meetings/8.png",
    alt: "Monthly Meeting 8",
    caption: "Monthly Meeting #8",
    category: "monthly-meetings",
  },
  {
    id: 9,
    src: "/photos/monthly_meetings/9.png",
    alt: "Monthly Meeting 9",
    caption: "Monthly Meeting #9",
    category: "monthly-meetings",
  },
  {
    id: 10,
    src: "/photos/monthly_meetings/10.png",
    alt: "Monthly Meeting 10",
    caption: "Monthly Meeting #10",
    category: "monthly-meetings",
  },
  {
    id: 11,
    src: "/photos/monthly_meetings/11.png",
    alt: "Monthly Meeting 11",
    caption: "Monthly Meeting #11",
    category: "monthly-meetings",
  },
  {
    id: 12,
    src: "/photos/monthly_meetings/12.png",
    alt: "Monthly Meeting 12",
    caption: "Monthly Meeting #12",
    category: "monthly-meetings",
  },
  {
    id: 13,
    src: "/photos/monthly_meetings/13.png",
    alt: "Monthly Meeting 13",
    caption: "Monthly Meeting #13",
    category: "monthly-meetings",
  },
  {
    id: 14,
    src: "/photos/monthly_meetings/14.png",
    alt: "Monthly Meeting 14",
    caption: "Monthly Meeting #14",
    category: "monthly-meetings",
  },
  {
    id: 15,
    src: "/photos/monthly_meetings/15.png",
    alt: "Monthly Meeting 15",
    caption: "Monthly Meeting #15",
    category: "monthly-meetings",
  },

  // IndiaFest
  {
    id: 16,
    src: "/photos/indiafest/1.png",
    alt: "IndiaFest 1",
    caption: "IndiaFest #1",
    category: "indiafest",
  },
  {
    id: 17,
    src: "/photos/indiafest/2.png",
    alt: "IndiaFest 2",
    caption: "IndiaFest #2",
    category: "indiafest",
  },
  {
    id: 18,
    src: "/photos/indiafest/3.png",
    alt: "IndiaFest 3",
    caption: "IndiaFest #3",
    category: "indiafest",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-blue-800 mb-6 text-center">
        {emoji} {title}
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {galleryImages
          .filter((img) => img.category === category)
          .map((image) => (
            <MotionCard
              key={image.id}
              className={`overflow-hidden border border-blue-100 ${
                isMobile ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => {
                if (!isMobile) openLightbox(image.id);
              }}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CardContent className="p-0">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-2 bg-blue-50">
                  <p className="text-sm text-blue-900/80">{image.caption}</p>
                </div>
              </CardContent>
            </MotionCard>
          ))}
      </motion.div>
    </section>
  );

  return (
    <div className="flex flex-col" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 opacity-80" />
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="font-mono text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Gallery of Our <span className="text-blue-200">Journey</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Tap or click any image to enlarge (disabled on mobile). Swipe or use
            arrow keys to navigate.
          </motion.p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {renderSection("Monthly Meetings", "🗓️", "monthly-meetings")}
          {renderSection("IndiaFest", "🎉", "indiafest")}
        </div>
      </section>

      {/* Submit Photos */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-blue-800 mb-4">
              Submit Your <span className="text-cyan-700">Photos</span>
            </h2>
            <p className="text-blue-900/80 mb-4">
              Share your Monthly Meeting snapshots or IndiaFest highlights!
            </p>
            <Button
              asChild
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
            >
              <Link href="/contact#submit-photos">Submit Photos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
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
              className="absolute left-4 text-white hover:text-gray-300 z-10"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              className="absolute right-4 text-white hover:text-gray-300 z-10"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="w-full max-w-[90vw] md:max-w-4xl">
              <div className="relative w-full aspect-[4/3]">
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
              <div className="mt-4 text-white text-center">
                {galleryImages
                  .filter((img) => img.id === selectedImage)
                  .map((image) => (
                    <p key={image.id}>{image.caption}</p>
                  ))}
              </div>
              <p className="text-white text-center text-sm mt-2">
                Use arrows or ESC to exit.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
