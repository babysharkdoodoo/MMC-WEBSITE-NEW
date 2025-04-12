"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

// Your existing gallery images:
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800&text=Workshop+1",
    alt: "Students collaborating on a math problem",
    caption: "Exploring fractals workshop - March 2023",
    category: "workshops",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800&text=Whiteboard+1",
    alt: "Mathematical equations on a whiteboard",
    caption: "Number theory proofs from our February session",
    category: "whiteboards",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800&text=Doodle+1",
    alt: "Mathematical doodle of a fractal pattern",
    caption: "Student-created Sierpinski triangle artwork",
    category: "doodles",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800&text=Workshop+2",
    alt: "Students presenting at a workshop",
    caption: "Game theory workshop presentation - January 2023",
    category: "workshops",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800&text=Whiteboard+2",
    alt: "Complex graph theory diagram on a whiteboard",
    caption: "Exploring the Four Color Theorem",
    category: "whiteboards",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800&text=Doodle+2",
    alt: "Mathematical doodle of a Mandelbrot set",
    caption: "Hand-drawn Mandelbrot set exploration",
    category: "doodles",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800&text=Workshop+3",
    alt: "Group photo from a workshop",
    caption: "December 2022 cryptography workshop participants",
    category: "workshops",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=800&text=Whiteboard+3",
    alt: "Probability diagrams on a whiteboard",
    caption: "Visualizing the Monty Hall problem",
    category: "whiteboards",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=800&text=Doodle+3",
    alt: "Mathematical doodle of number spirals",
    caption: "Ulam spiral patterns from a number theory session",
    category: "doodles",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=600&width=800&text=Workshop+4",
    alt: "Students working with 3D models",
    caption: "Exploring the fourth dimension with physical models",
    category: "workshops",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=600&width=800&text=Whiteboard+4",
    alt: "Complex calculus equations on a whiteboard",
    caption: "Advanced calculus from an upper-level session",
    category: "whiteboards",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=600&width=800&text=Doodle+4",
    alt: "Mathematical doodle of a tessellation pattern",
    caption: "Escher-inspired tessellation created by a student",
    category: "doodles",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = galleryImages.findIndex(
      (img) => img.id === selectedImage
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    } else {
      newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(galleryImages[newIndex].id);
  };

  // Keyboard navigation for the lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === "ArrowLeft") {
      navigateImage("prev");
    } else if (e.key === "ArrowRight") {
      navigateImage("next");
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <div className="flex flex-col" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Blue-themed gradient + subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEEzRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 pointer-events-none" />

        {/* Floating shape animation (blue theme) */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 rounded-full blur-3xl opacity-30"
          animate={{ rotate: [0, 60, -60, 0], x: [0, -40, 40, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Gallery of Our <span className="text-blue-200">Journey</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Click any image to enlarge. Use arrow keys or on-screen arrows to
            navigate, and press ESC to exit.
          </motion.p>
        </div>
      </section>

      {/* ===== GALLERY SECTION (TABS) ===== */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Subtle radial background flair */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
        <motion.div
          className="absolute -top-32 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 blur-3xl opacity-20"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 60, -60, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Tabs defaultValue="all" className="w-full">
            {/* Tabs Navigation */}
            <div className="flex justify-center mb-8">
              <TabsList className="bg-blue-50 p-1 rounded-md shadow-sm border border-blue-100">
                <TabsTrigger
                  value="all"
                  className="font-mono text-sm text-blue-800 hover:text-blue-900"
                >
                  All Photos
                </TabsTrigger>
                <TabsTrigger
                  value="workshops"
                  className="font-mono text-sm text-blue-800 hover:text-blue-900"
                >
                  Workshops
                </TabsTrigger>
                <TabsTrigger
                  value="whiteboards"
                  className="font-mono text-sm text-blue-800 hover:text-blue-900"
                >
                  Whiteboards
                </TabsTrigger>
                <TabsTrigger
                  value="doodles"
                  className="font-mono text-sm text-blue-800 hover:text-blue-900"
                >
                  Math Doodles
                </TabsTrigger>
              </TabsList>
            </div>

            {/* All Photos */}
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                  <Card
                    key={image.id}
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border border-blue-100"
                    onClick={() => openLightbox(image.id)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 bg-blue-50">
                        <p className="text-sm text-blue-900/80">
                          {image.caption}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Workshops / Whiteboards / Doodles */}
            {["workshops", "whiteboards", "doodles"].map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages
                    .filter((img) => img.category === cat)
                    .map((image) => (
                      <Card
                        key={image.id}
                        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border border-blue-100"
                        onClick={() => openLightbox(image.id)}
                      >
                        <CardContent className="p-0">
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 bg-blue-50">
                            <p className="text-sm text-blue-900/80">
                              {image.caption}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ===== INSTAGRAM SECTION (OPTIONAL) ===== */}
      <section className="py-16 bg-blue-50 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tl from-blue-400 to-cyan-400 blur-3xl opacity-30"
          animate={{ rotate: [0, 60, -60, 0], x: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 18 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-4 text-blue-800">
              Follow Us on <span className="text-cyan-700">Instagram</span>
            </h2>
            <p className="text-blue-900/80 max-w-2xl mx-auto">
              Check out our feed for behind-the-scenes math moments and
              community highlights.
            </p>
            <Link
              href="https://instagram.com/melbournemathcircle"
              className="inline-flex items-center mt-4 text-cyan-700 hover:text-cyan-500"
            >
              <Instagram className="h-5 w-5 mr-2" />
              <span className="font-mono">@melbournemathcircle</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md bg-white"
              >
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Insta+${i}`}
                  alt={`Instagram post ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUBMIT PHOTOS SECTION ===== */}
      <section className="py-16 bg-white relative overflow-hidden">
        <motion.div
          className="absolute -top-32 right-0 w-[400px] h-[400px] bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 60, -60, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-mono text-3xl font-bold tracking-tight mb-6 text-blue-800">
                Submit Your <span className="text-cyan-700">Photos</span>
              </h2>
              <p className="text-blue-900/80 mb-4">
                Have workshop pictures or math artwork you'd like to share?
              </p>
              <p className="text-blue-900/80 mb-6">
                Whether it's a whiteboard full of equations, a creative doodle,
                or a fun group shot, your submissions help us document our
                community’s mathematical adventures.
              </p>
              <Button
                asChild
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
              >
                <Link href="/contact#submit-photos">Submit Photos</Link>
              </Button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Share+Your+Photos"
                alt="Collage of mathematical images"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX OVERLAY ===== */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
          </button>
          {/* Prev */}
          <button
            className="absolute left-4 text-white hover:text-gray-300 z-10"
            onClick={() => navigateImage("prev")}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          {/* Next */}
          <button
            className="absolute right-4 text-white hover:text-gray-300 z-10"
            onClick={() => navigateImage("next")}
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Selected Image Display */}
          <div className="max-w-4xl w-full">
            <div className="relative aspect-[4/3] w-full">
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
              Use arrow keys or on-screen arrows to navigate. Press ESC to exit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
