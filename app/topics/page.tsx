import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const topics = [
  {
    id: "number-theory",
    title: "Number Theory",
    description: "The study of integers and their properties, from prime numbers to modular arithmetic.",
    image: "/placeholder.svg?height=300&width=300&text=Number Theory",
    example:
      "The Riemann Hypothesis, one of the most famous unsolved problems in mathematics, concerns the distribution of prime numbers.",
    fact: "Every even integer greater than 2 can be expressed as the sum of two primes (Goldbach's Conjecture).",
    color: "primary",
  },
  {
    id: "graph-theory",
    title: "Graph Theory",
    description: "The mathematical study of networks, connections, and relationships between objects.",
    image: "/placeholder.svg?height=300&width=300&text=Graph Theory",
    example: "The famous Seven Bridges of Königsberg problem, solved by Euler, laid the foundation for graph theory.",
    fact: "The Four Color Theorem states that any map can be colored using at most four colors, such that no adjacent regions share the same color.",
    color: "primary",
  },
  {
    id: "topology",
    title: "Topology",
    description: "The study of properties preserved under continuous deformations like stretching and bending.",
    image: "/placeholder.svg?height=300&width=300&text=Topology",
    example:
      "In topology, a coffee mug and a donut (torus) are considered equivalent because they both have exactly one hole.",
    fact: "The Möbius strip is a surface with only one side and one edge, creating a non-orientable surface.",
    color: "primary",
  },
  {
    id: "game-theory",
    title: "Game Theory",
    description: "The study of mathematical models of strategic interaction between rational decision-makers.",
    image: "/placeholder.svg?height=300&width=300&text=Game Theory",
    example:
      "The Prisoner's Dilemma demonstrates why two rational individuals might not cooperate, even when it's in their best interest.",
    fact: "John Nash, whose life was portrayed in 'A Beautiful Mind,' won a Nobel Prize for his work on non-cooperative games.",
    color: "primary",
  },
  {
    id: "fractals",
    title: "Fractals & Chaos",
    description: "The study of infinitely complex patterns that are self-similar across different scales.",
    image: "/placeholder.svg?height=300&width=300&text=Fractals",
    example:
      "The Mandelbrot Set is one of the most famous fractals, created by iterating a simple equation in the complex plane.",
    fact: "The coastline paradox states that the length of a coastline depends on the scale at which it's measured, due to its fractal-like properties.",
    color: "primary",
  },
  {
    id: "combinatorics",
    title: "Combinatorics",
    description: "The study of counting, arrangement, and combination of objects within a set.",
    image: "/placeholder.svg?height=300&width=300&text=Combinatorics",
    example:
      "The famous 'Handshake Problem' asks how many handshakes occur if everyone in a group shakes hands exactly once with everyone else.",
    fact: "Pascal's Triangle contains the binomial coefficients and hides numerous patterns, including the Fibonacci sequence.",
    color: "primary",
  },
  {
    id: "cryptography",
    title: "Cryptography",
    description: "The mathematical foundation of secure communication in the presence of adversaries.",
    image: "/placeholder.svg?height=300&width=300&text=Cryptography",
    example:
      "RSA encryption, used in secure internet communications, relies on the difficulty of factoring large prime numbers.",
    fact: "The one-time pad is the only encryption method that has been mathematically proven to be unbreakable if used correctly.",
    color: "primary",
  },
  {
    id: "probability",
    title: "Probability & Statistics",
    description: "The mathematical study of random phenomena and the analysis of data.",
    image: "/placeholder.svg?height=300&width=300&text=Probability",
    example: "The Monty Hall problem demonstrates how conditional probability can be counterintuitive.",
    fact: "The normal distribution (bell curve) appears naturally in many phenomena, from height distributions to measurement errors.",
    color: "primary",
  },
]

export default function TopicsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-muted/50">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Fields We <span className="text-primary">Orbit</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Explore the diverse and fascinating branches of mathematics that we cover in our meetings and discussions.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topics.map((topic, index) => (
              <Card
                key={index}
                className="bg-card border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className={`h-2 bg-primary`} />
                <CardHeader>
                  <CardTitle className="font-mono text-lg">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video relative">
                    <Image src={topic.image || "/placeholder.svg"} alt={topic.title} fill className="object-cover" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-4">
                  <Link
                    href={`/topics/${topic.id}`}
                    className={`text-primary hover:text-primary/80 font-mono text-sm flex items-center`}
                  >
                    Explore <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Topic */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12">
            Featured Topic: <span className="text-primary">Fractals & Chaos</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=400&width=400&text=Mandelbrot Set"
                alt="Mandelbrot Set"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">The Beauty of Infinite Complexity</h3>
              <p className="text-muted-foreground mb-4">
                Fractals are infinitely complex patterns that are self-similar across different scales. They are created
                by repeating a simple process over and over in an ongoing feedback loop.
              </p>
              <p className="text-muted-foreground mb-4">
                The term "fractal" was coined by mathematician Benoit Mandelbrot in 1975. He recognized that many
                natural phenomena exhibit fractal-like properties, from the branching patterns of trees to the structure
                of our lungs.
              </p>
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <h4 className="font-mono text-primary font-bold mb-2">Did You Know?</h4>
                <p className="text-muted-foreground text-sm">
                  The Mandelbrot Set, despite its infinite complexity, can be generated from an extremely simple
                  equation: z = z² + c, where z and c are complex numbers.
                </p>
              </div>
              <Button asChild>
                <Link href="/topics/fractals">
                  Explore Fractals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Connections */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12">
            Mathematical <span className="text-primary">Connections</span>
          </h2>

          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-muted-foreground">
              One of the most beautiful aspects of mathematics is how different fields connect and overlap, revealing
              unexpected relationships and insights.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h3 className="font-mono text-lg font-bold mb-3">Number Theory & Cryptography</h3>
              <p className="text-muted-foreground mb-4">
                The properties of prime numbers form the foundation of modern encryption systems like RSA, protecting
                our digital communications.
              </p>
              <div className="flex justify-between">
                <Link href="/topics/number-theory" className="text-primary hover:text-primary/80 font-mono text-sm">
                  Number Theory
                </Link>
                <Link href="/topics/cryptography" className="text-primary hover:text-primary/80 font-mono text-sm">
                  Cryptography
                </Link>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h3 className="font-mono text-lg font-bold mb-3">Topology & Graph Theory</h3>
              <p className="text-muted-foreground mb-4">
                Both fields study connections and relationships, with topology focusing on continuous deformations and
                graph theory on discrete structures.
              </p>
              <div className="flex justify-between">
                <Link href="/topics/topology" className="text-primary hover:text-primary/80 font-mono text-sm">
                  Topology
                </Link>
                <Link href="/topics/graph-theory" className="text-primary hover:text-primary/80 font-mono text-sm">
                  Graph Theory
                </Link>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h3 className="font-mono text-lg font-bold mb-3">Fractals & Probability</h3>
              <p className="text-muted-foreground mb-4">
                Chaos theory and fractals reveal how deterministic systems can produce seemingly random outcomes,
                connecting to probability in surprising ways.
              </p>
              <div className="flex justify-between">
                <Link href="/topics/fractals" className="text-primary hover:text-primary/80 font-mono text-sm">
                  Fractals
                </Link>
                <Link href="/topics/probability" className="text-primary hover:text-primary/80 font-mono text-sm">
                  Probability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Connection */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-6">
              Explore These Topics in Our <span className="text-yellow-400">Meetings</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Our monthly meetings dive deep into these mathematical fields, with hands-on activities and collaborative
              problem-solving.
            </p>
            <Button asChild size="lg" className="bg-yellow-400 text-primary hover:bg-yellow-300">
              <Link href="/join-us">Join Our Next Meeting</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
