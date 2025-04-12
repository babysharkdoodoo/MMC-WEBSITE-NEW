"use client";

import MathEquation from "@/components/math-equation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const mathBites = [
  {
    id: "fibonacci-sequence",
    title: "The Beauty of Fibonacci Sequences",
    date: "April 5, 2023",
    author: "Alex Chen",
    excerpt:
      "Exploring how this famous sequence appears throughout nature and mathematics, from spiral patterns in sunflowers to the golden ratio.",
    tags: ["sequences", "patterns", "golden-ratio"],
    image: "/placeholder.svg?height=300&width=500&text=Fibonacci",
    equation: "F_n = F_{n-1} + F_{n-2}",
  },
  {
    id: "eulers-identity",
    title: "Euler's Identity: The Most Beautiful Equation",
    date: "March 22, 2023",
    author: "Taylor Kim",
    excerpt:
      "A deep dive into the equation that connects five fundamental constants of mathematics in one elegant formula.",
    tags: ["complex-numbers", "constants", "euler"],
    image: "/placeholder.svg?height=300&width=500&text=Euler",
    equation: "e^{i\\pi} + 1 = 0",
  },
  {
    id: "monty-hall-problem",
    title: "The Monty Hall Problem Explained",
    date: "March 10, 2023",
    author: "Jamie Rodriguez",
    excerpt:
      "Why switching doors in this famous probability puzzle actually doubles your chances of winning, contrary to intuition.",
    tags: ["probability", "puzzles", "paradoxes"],
    image: "/placeholder.svg?height=300&width=500&text=Monty Hall",
    equation: "P(\\text{win}|\\text{switch}) = \\frac{2}{3}",
  },
  {
    id: "prime-numbers",
    title: "Prime Numbers: The Building Blocks of Mathematics",
    date: "February 28, 2023",
    author: "Jordan Patel",
    excerpt:
      "Exploring the mysteries of prime numbers, their distribution, and why they're crucial for modern cryptography.",
    tags: ["number-theory", "primes", "cryptography"],
    image: "/placeholder.svg?height=300&width=500&text=Prime Numbers",
    equation: "\\pi(n) \\sim \\frac{n}{\\ln(n)}",
  },
  {
    id: "modular-arithmetic",
    title: "The Surprising Applications of Modular Arithmetic",
    date: "February 15, 2023",
    author: "Alex Chen",
    excerpt:
      "From creating beautiful patterns to securing digital communications, modular arithmetic is everywhere.",
    tags: ["number-theory", "applications", "cryptography"],
    image: "/placeholder.svg?height=300&width=500&text=Modular Arithmetic",
    equation: "a \\equiv b \\pmod{n}",
  },
  {
    id: "four-color-theorem",
    title: "The Four Color Theorem: A Triumph of Computer-Assisted Proof",
    date: "January 30, 2023",
    author: "Taylor Kim",
    excerpt:
      "How a seemingly simple map coloring problem required computational power to solve, changing mathematics forever.",
    tags: ["graph-theory", "topology", "proofs"],
    image: "/placeholder.svg?height=300&width=500&text=Four Color Theorem",
    equation: "\\chi(G) \\leq 4",
  },
  {
    id: "cantors-diagonal",
    title: "Cantor's Diagonal Argument: Infinity Comes in Different Sizes",
    date: "January 18, 2023",
    author: "Jamie Rodriguez",
    excerpt:
      "A beautiful proof that shows not all infinities are created equal, and why the real numbers are 'more infinite' than the natural numbers.",
    tags: ["infinity", "set-theory", "proofs"],
    image: "/placeholder.svg?height=300&width=500&text=Cantor's Diagonal",
    equation: "|\\mathbb{R}| > |\\mathbb{N}|",
  },
  {
    id: "mandelbrot-set",
    title: "The Mandelbrot Set: Infinite Complexity from Simple Rules",
    date: "January 5, 2023",
    author: "Jordan Patel",
    excerpt:
      "How a deceptively simple equation creates one of the most complex and beautiful objects in mathematics.",
    tags: ["fractals", "complex-numbers", "chaos-theory"],
    image: "/placeholder.svg?height=300&width=500&text=Mandelbrot Set",
    equation: "z_{n+1} = z_n^2 + c",
  },
];

const allTags = [
  "sequences",
  "patterns",
  "golden-ratio",
  "complex-numbers",
  "constants",
  "euler",
  "probability",
  "puzzles",
  "paradoxes",
  "number-theory",
  "primes",
  "cryptography",
  "applications",
  "graph-theory",
  "topology",
  "proofs",
  "infinity",
  "set-theory",
  "fractals",
  "chaos-theory",
];

const popularTags = [
  "number-theory",
  "fractals",
  "probability",
  "puzzles",
  "proofs",
  "sequences",
];

export default function MathBitesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter math bites based on search term and selected tag
  const filteredMathBites = mathBites.filter((bite) => {
    const matchesSearch =
      bite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bite.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bite.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag ? bite.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-muted/50">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Math{" "}
              <span className="text-primary relative inline-block">
                Insights
              </span>
              <motion.div
                className="absolute -top-6 -right-6 text-yellow-500 dark:text-yellow-400"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: 1 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.5,
                }}
              >
                <span className="text-2xl">∞</span>
              </motion.div>
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Explore our collection of concise, engaging mathematical
              explorations
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Categories
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-4">
              Explore by <span className="text-primary">Category</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive into our collection of mathematical insights organized by
              topic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="#" onClick={() => setSelectedTag("number-theory")}>
              <div className="bg-card rounded-xl shadow-md border border-border p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">
                  Number Theory
                </h3>
                <p className="text-muted-foreground text-sm">
                  Explore the fascinating properties of numbers, from primes to
                  patterns.
                </p>
              </div>
            </Link>

            <Link href="#" onClick={() => setSelectedTag("topology")}>
              <div className="bg-card rounded-xl shadow-md border border-border p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">Geometry</h3>
                <p className="text-muted-foreground text-sm">
                  Discover the elegant world of shapes, spaces, and
                  transformations.
                </p>
              </div>
            </Link>

            <Link href="#" onClick={() => setSelectedTag("sequences")}>
              <div className="bg-card rounded-xl shadow-md border border-border p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-serif text-primary">∑</span>
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">Algebra</h3>
                <p className="text-muted-foreground text-sm">
                  Uncover the power of variables, equations, and abstract
                  structures.
                </p>
              </div>
            </Link>

            <Link href="#" onClick={() => setSelectedTag("calculus")}>
              <div className="bg-card rounded-xl shadow-md border border-border p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-serif text-primary">∫</span>
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">Calculus</h3>
                <p className="text-muted-foreground text-sm">
                  Explore the mathematics of change, motion, and infinite
                  processes.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Search and Filter
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search math bites..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <span className="text-sm font-medium text-muted-foreground self-center">
                Popular Tags:
              </span>
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTag(selectedTag === tag ? null : tag);
                  }}
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  } transition-colors`}
                >
                  #{tag}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10"
                onClick={() => setSelectedTag(null)}
              >
                All Tags
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Math Bite */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold tracking-tight mb-6">
            Today's Brain <span className="text-primary">Snack</span> 🍭
          </h2>

          <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-video">
                <Image
                  src={mathBites[0].image || "/placeholder.svg"}
                  alt={mathBites[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{mathBites[0].date}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {mathBites[0].title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {mathBites[0].excerpt}
                </p>
                <div className="mt-2 mb-4">
                  <MathEquation equation={mathBites[0].equation} />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mathBites[0].tags.map((tag) => (
                    <Link
                      key={tag}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTag(tag);
                      }}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono">
                    {mathBites[0].author.charAt(0)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    By {mathBites[0].author}
                  </span>
                </div>
                <Button
                  asChild
                  className="mt-4 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
                >
                  <Link
                    href={`/math-bites/${mathBites[0].id}`}
                    className="flex items-center"
                  >
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Math Bites */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold tracking-tight mb-6">
            Fresh Math <span className="text-primary">Treats</span> 🍪
          </h2>

          {filteredMathBites.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMathBites.slice(1).map((bite) => (
                <Card
                  key={bite.id}
                  className="bg-card border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={bite.image || "/placeholder.svg"}
                      alt={bite.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs">{bite.date}</span>
                    </div>
                    <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors">
                      {bite.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {bite.excerpt}
                    </p>
                    <div className="mb-3">
                      <MathEquation equation={bite.equation} />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {bite.tags.slice(0, 2).map((tag) => (
                        <Link
                          key={tag}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTag(tag);
                          }}
                          className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                      {bite.tags.length > 2 && (
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                          +{bite.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-xs">
                        {bite.author.charAt(0)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {bite.author}
                      </span>
                    </div>
                    <Link
                      href={`/math-bites/${bite.id}`}
                      className="text-primary hover:text-primary/80 font-mono text-xs flex items-center"
                    >
                      Read More <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground mb-4">
                No math bites found matching your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTag(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Submit Your Own */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-mono text-3xl font-bold tracking-tight mb-6">
                Got a Cool Math <span className="text-primary">Idea</span>? 💡
              </h2>
              <p className="text-muted-foreground mb-4">
                Did you discover something awesome about math? Share your "AHA!"
                moment with other math adventurers!
              </p>
              <p className="text-muted-foreground mb-6">
                Your Math Bite could explore an elegant proof, explain a
                counterintuitive result, or connect mathematics to the world
                around us. We'll help you refine your ideas and format your
                mathematical notation.
              </p>
              <Button asChild>
                <Link href="mailto:eshan@orlandomathcircle.org">
                  Submit Your Idea by Emailing Us!
                </Link>
              </Button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Share Your Ideas"
                alt="Student writing mathematical equations"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
