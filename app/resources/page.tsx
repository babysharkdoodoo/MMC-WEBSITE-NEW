import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Book, Video, Gamepad2, Globe, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const resources = {
  books: [
    {
      title: "The Joy of X",
      author: "Steven Strogatz",
      description:
        "A guided tour through the power of math, revealing how it connects to literature, philosophy, law, medicine, art, business, and even pop culture.",
      level: "Beginner",
      link: "https://example.com/joy-of-x",
      image: "/placeholder.svg?height=300&width=200&text=Joy of X",
      why: "Strogatz makes complex mathematical concepts accessible through engaging storytelling and real-world connections.",
    },
    {
      title: "Fermat's Enigma",
      author: "Simon Singh",
      description:
        "The epic quest to solve the world's greatest mathematical problem - Fermat's Last Theorem, which remained unsolved for over 350 years.",
      level: "Beginner",
      link: "https://example.com/fermats-enigma",
      image: "/placeholder.svg?height=300&width=200&text=Fermat's Enigma",
      why: "A thrilling mathematical detective story that shows the human side of mathematical discovery.",
    },
    {
      title: "How to Solve It",
      author: "George Pólya",
      description:
        "A timeless guide to problem-solving that outlines a systematic approach to tackling mathematical challenges.",
      level: "Intermediate",
      link: "https://example.com/how-to-solve-it",
      image: "/placeholder.svg?height=300&width=200&text=How to Solve It",
      why: "Pólya's heuristic approach has helped generations of students develop stronger problem-solving skills.",
    },
    {
      title: "Gödel, Escher, Bach",
      author: "Douglas Hofstadter",
      description:
        "An exploration of the common themes in the lives and works of logician Kurt Gödel, artist M.C. Escher, and composer Johann Sebastian Bach.",
      level: "Advanced",
      link: "https://example.com/godel-escher-bach",
      image: "/placeholder.svg?height=300&width=200&text=Gödel, Escher, Bach",
      why: "This Pulitzer Prize-winning book beautifully connects mathematics to art, music, and consciousness.",
    },
  ],
  videos: [
    {
      title: "3Blue1Brown",
      creator: "Grant Sanderson",
      description:
        "Animated math videos that focus on the essence and intuition behind mathematical concepts, with stunning visualizations.",
      level: "All Levels",
      link: "https://www.youtube.com/c/3blue1brown",
      image: "/placeholder.svg?height=300&width=200&text=3Blue1Brown",
      why: "Grant's visual approach to mathematics helps build intuition for complex concepts like calculus and linear algebra.",
    },
    {
      title: "Numberphile",
      creator: "Brady Haran",
      description:
        "Videos featuring mathematicians discussing fascinating numbers, theorems, and mathematical curiosities.",
      level: "All Levels",
      link: "https://www.youtube.com/user/numberphile",
      image: "/placeholder.svg?height=300&width=200&text=Numberphile",
      why: "These videos showcase the excitement and passion mathematicians have for their field.",
    },
    {
      title: "Mathologer",
      creator: "Burkard Polster",
      description:
        "In-depth explorations of mathematical concepts, paradoxes, and historical problems with clear explanations.",
      level: "Intermediate",
      link: "https://www.youtube.com/c/Mathologer",
      image: "/placeholder.svg?height=300&width=200&text=Mathologer",
      why: "Burkard dives deep into fascinating mathematical topics with clarity and enthusiasm.",
    },
    {
      title: "PBS Infinite Series",
      creator: "PBS",
      description:
        "Though no longer producing new content, this series covers advanced mathematical concepts in an accessible way.",
      level: "Intermediate to Advanced",
      link: "https://www.youtube.com/pbsinfiniteseries",
      image: "/placeholder.svg?height=300&width=200&text=PBS Infinite",
      why: "This series tackles advanced topics like topology and category theory in ways that high school students can understand.",
    },
  ],
  games: [
    {
      title: "Euclidea",
      creator: "Horis International",
      description:
        "A geometric construction puzzle game that challenges players to create geometric shapes using only a compass and straightedge.",
      level: "All Levels",
      link: "https://www.euclidea.xyz/",
      image: "/placeholder.svg?height=300&width=200&text=Euclidea",
      why: "This game builds intuition for geometric constructions and proofs in an engaging way.",
    },
    {
      title: "Brilliant.org",
      creator: "Brilliant",
      description:
        "An interactive learning platform with courses and daily challenges in mathematics, science, and computer science.",
      level: "All Levels",
      link: "https://brilliant.org/",
      image: "/placeholder.svg?height=300&width=200&text=Brilliant",
      why: "Their interactive approach to problem-solving helps develop mathematical thinking skills.",
    },
    {
      title: "Set",
      creator: "Set Enterprises",
      description:
        "A card game that challenges players to identify sets of three cards based on four features, each with three variations.",
      level: "All Levels",
      link: "https://www.setgame.com/",
      image: "/placeholder.svg?height=300&width=200&text=Set Game",
      why: "This game develops pattern recognition and combinatorial thinking in a fun, competitive format.",
    },
    {
      title: "Desmos Geometry",
      creator: "Desmos",
      description: "A free online tool for creating and exploring geometric constructions with interactive features.",
      level: "Intermediate",
      link: "https://www.desmos.com/geometry",
      image: "/placeholder.svg?height=300&width=200&text=Desmos Geometry",
      why: "This tool makes geometric exploration accessible and visually engaging.",
    },
  ],
  websites: [
    {
      title: "Art of Problem Solving",
      creator: "AoPS Inc.",
      description:
        "A comprehensive resource for challenging math problems, online classes, and discussion forums for mathematically talented students.",
      level: "Intermediate to Advanced",
      link: "https://artofproblemsolving.com/",
      image: "/placeholder.svg?height=300&width=200&text=AoPS",
      why: "AoPS provides rigorous mathematical training and a supportive community for students seeking challenges beyond school curriculum.",
    },
    {
      title: "Mathigon",
      creator: "Mathigon",
      description:
        "An interactive mathematics textbook with courses on various topics, featuring beautiful visualizations and interactive elements.",
      level: "All Levels",
      link: "https://mathigon.org/",
      image: "/placeholder.svg?height=300&width=200&text=Mathigon",
      why: "Their interactive approach makes learning mathematics feel like an adventure.",
    },
    {
      title: "Cut-the-Knot",
      creator: "Alexander Bogomolny",
      description:
        "A vast collection of mathematical problems, puzzles, and interactive demonstrations covering various areas of mathematics.",
      level: "All Levels",
      link: "https://www.cut-the-knot.org/",
      image: "/placeholder.svg?height=300&width=200&text=Cut-the-Knot",
      why: "This site offers a treasure trove of mathematical curiosities and insights.",
    },
    {
      title: "Project Euler",
      creator: "Project Euler",
      description:
        "A series of challenging mathematical and computational problems that require creative problem-solving approaches.",
      level: "Intermediate to Advanced",
      link: "https://projecteuler.net/",
      image: "/placeholder.svg?height=300&width=200&text=Project Euler",
      why: "These problems combine mathematical insight with programming skills, offering a unique challenge.",
    },
  ],
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-navy">
              <span className="text-violet">Appendix</span>: Resources
            </h1>
            <p className="mt-6 text-xl text-navy/80">
              Our curated collection of books, videos, games, and websites to continue your mathematical journey.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="books" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-navy/5 p-1">
                <TabsTrigger value="books" className="font-mono text-xs flex items-center gap-1">
                  <Book className="h-4 w-4" />
                  Books
                </TabsTrigger>
                <TabsTrigger value="videos" className="font-mono text-xs flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="games" className="font-mono text-xs flex items-center gap-1">
                  <Gamepad2 className="h-4 w-4" />
                  Games
                </TabsTrigger>
                <TabsTrigger value="websites" className="font-mono text-xs flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  Websites
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Books Tab */}
            <TabsContent value="books" className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {resources.books.map((book, index) => (
                  <Card
                    key={index}
                    className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="aspect-[2/3] relative">
                      <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">{book.title}</CardTitle>
                      <CardDescription>by {book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-navy/70 text-sm mb-3 line-clamp-3">{book.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet">
                          {book.level}
                        </span>
                      </div>
                      <div className="bg-navy/5 p-3 rounded-md">
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-goldenrod flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-navy/70">
                            <span className="font-medium text-navy">Why we love it:</span> {book.why}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Learn More <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {resources.videos.map((video, index) => (
                  <Card
                    key={index}
                    className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="aspect-video relative">
                      <Image src={video.image || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-navy/30 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center">
                          <div className="h-0 w-0 border-y-8 border-y-transparent border-l-12 border-l-violet ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">{video.title}</CardTitle>
                      <CardDescription>by {video.creator}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-navy/70 text-sm mb-3 line-clamp-3">{video.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet">
                          {video.level}
                        </span>
                      </div>
                      <div className="bg-navy/5 p-3 rounded-md">
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-goldenrod flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-navy/70">
                            <span className="font-medium text-navy">Why we love it:</span> {video.why}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Watch Channel <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Games Tab */}
            <TabsContent value="games" className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {resources.games.map((game, index) => (
                  <Card
                    key={index}
                    className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="aspect-video relative">
                      <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">{game.title}</CardTitle>
                      <CardDescription>by {game.creator}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-navy/70 text-sm mb-3 line-clamp-3">{game.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet">
                          {game.level}
                        </span>
                      </div>
                      <div className="bg-navy/5 p-3 rounded-md">
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-goldenrod flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-navy/70">
                            <span className="font-medium text-navy">Why we love it:</span> {game.why}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link
                          href={game.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Play Now <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Websites Tab */}
            <TabsContent value="websites" className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {resources.websites.map((website, index) => (
                  <Card
                    key={index}
                    className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={website.image || "/placeholder.svg"}
                        alt={website.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">{website.title}</CardTitle>
                      <CardDescription>by {website.creator}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-navy/70 text-sm mb-3 line-clamp-3">{website.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet">
                          {website.level}
                        </span>
                      </div>
                      <div className="bg-navy/5 p-3 rounded-md">
                        <div className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-goldenrod flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-navy/70">
                            <span className="font-medium text-navy">Why we love it:</span> {website.why}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link
                          href={website.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Visit Site <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16 bg-navy/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12">
            Downloadable <span className="text-violet">Resources</span>
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Problem Sets",
                description: "A collection of challenging problems organized by topic and difficulty level.",
                icon: <Download className="h-8 w-8 text-violet" />,
                link: "#",
              },
              {
                title: "Workshop Materials",
                description: "Handouts and worksheets from our past workshops, available for self-study.",
                icon: <Download className="h-8 w-8 text-violet" />,
                link: "#",
              },
              {
                title: "Math Competition Guide",
                description: "Tips and strategies for preparing for various mathematics competitions.",
                icon: <Download className="h-8 w-8 text-violet" />,
                link: "#",
              },
            ].map((resource, index) => (
              <Card key={index} className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-violet/10 p-3">{resource.icon}</div>
                  <div>
                    <CardTitle className="font-mono text-lg">{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-navy/70 text-sm">{resource.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={resource.link} className="flex items-center justify-center gap-1">
                      Download <Download className="h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended by Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12">
            Recommended by Our <span className="text-violet">Team</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                quote:
                  "The Princeton Companion to Mathematics is my go-to reference. It provides accessible introductions to a wide range of mathematical topics with beautiful explanations.",
                name: "Alex Chen",
                role: "Founder & Lead Organizer",
                image: "/placeholder.svg?height=64&width=64&text=AC",
              },
              {
                quote:
                  "I love Vi Hart's YouTube videos on mathematical doodling. They show how playful and creative mathematics can be, and they inspired me to start making my own math art.",
                name: "Taylor Kim",
                role: "Outreach Coordinator",
                image: "/placeholder.svg?height=64&width=64&text=TK",
              },
              {
                quote:
                  "The book 'Proofs from THE BOOK' by Aigner and Ziegler presents elegant proofs of beautiful theorems. It's like a gallery of mathematical masterpieces.",
                name: "Jamie Rodriguez",
                role: "Workshop Coordinator",
                image: "/placeholder.svg?height=64&width=64&text=JR",
              },
              {
                quote:
                  "The Mandelbrot Set Explorer app helped me visualize and understand complex dynamics. It's both mathematically rich and visually stunning.",
                name: "Jordan Patel",
                role: "Content Developer",
                image: "/placeholder.svg?height=64&width=64&text=JP",
              },
            ].map((recommendation, index) => (
              <Card key={index} className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <div className="text-goldenrod text-4xl font-serif">"</div>
                  </div>
                  <p className="text-navy/80 mb-6 italic">{recommendation.quote}</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={recommendation.image || "/placeholder.svg"}
                        alt={recommendation.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-navy">{recommendation.name}</h4>
                      <p className="text-sm text-navy/60">{recommendation.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Suggest a Resource */}
      <section className="py-16 bg-navy text-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-6">
              Suggest a <span className="text-goldenrod">Resource</span>
            </h2>
            <p className="text-ivory/80 mb-8">
              Have a book, video, game, or website that you think should be included in our collection? We'd love to
              hear your recommendations!
            </p>
            <Button asChild size="lg" className="bg-goldenrod text-navy hover:bg-goldenrod/90">
              <Link href="/contact#suggest-resource">Suggest a Resource</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
