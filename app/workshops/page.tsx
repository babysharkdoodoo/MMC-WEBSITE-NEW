import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const workshops = [
  {
    id: 1,
    title: "Exploring Number Patterns",
    date: "April 15, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Melbourne High School, Room 203",
    description:
      "Discover the fascinating patterns that emerge in number sequences. We'll explore how to recognize, extend, and create our own patterns.",
    audience: "5th-8th Grade Students",
    upcoming: true,
  },
  {
    id: 2,
    title: "The Magic of Fractals",
    date: "March 18, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Melbourne High School, Room 203",
    description:
      "We explored the infinite complexity of fractals, from the Mandelbrot set to Koch snowflakes, and created our own fractal art.",
    audience: "5th-8th Grade Students",
    upcoming: false,
  },
  {
    id: 3,
    title: "Game Theory Fundamentals",
    date: "February 18, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Melbourne High School, Room 203",
    description:
      "Students learned about strategic decision-making through classic games and puzzles, including the Prisoner's Dilemma.",
    audience: "5th-8th Grade Students",
    upcoming: false,
  },
  {
    id: 4,
    title: "The Fourth Dimension",
    date: "January 21, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Melbourne High School, Room 203",
    description:
      "We ventured beyond our 3D world to understand tesseracts, hypercubes, and how to visualize higher dimensions.",
    audience: "5th-8th Grade Students",
    upcoming: false,
  },
]

export default function WorkshopsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-navy">
              Our <span className="text-violet">Workshops</span>
            </h1>
            <p className="mt-6 text-xl text-navy/80">
              Join us for interactive math workshops designed and led by high school students.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Workshop */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-3xl font-bold tracking-tight mb-8">
            Upcoming <span className="text-violet">Workshop</span>
          </h2>

          {workshops
            .filter((w) => w.upcoming)
            .map((workshop) => (
              <Card key={workshop.id} className="bg-white border-navy/10 shadow-md overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video">
                    <Image
                      src={`/placeholder.svg?height=400&width=600&text=${workshop.title}`}
                      alt={workshop.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-violet text-white px-3 py-1 rounded-full text-xs font-medium">Upcoming</div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="font-serif text-2xl font-bold mb-4 text-navy">{workshop.title}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-navy/70">
                        <Calendar className="h-4 w-4 text-violet" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-navy/70">
                        <Clock className="h-4 w-4 text-violet" />
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-navy/70">
                        <MapPin className="h-4 w-4 text-violet" />
                        <span>{workshop.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-navy/70">
                        <Users className="h-4 w-4 text-violet" />
                        <span>{workshop.audience}</span>
                      </div>
                    </div>
                    <p className="text-navy/80 mb-6">{workshop.description}</p>
                    <Button asChild className="mt-auto bg-violet hover:bg-violet/90 text-white">
                      <Link href="/join-us">Register Now</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Past Workshops */}
      <section className="py-12 bg-navy/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-3xl font-bold tracking-tight mb-8">
            Past <span className="text-violet">Workshops</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops
              .filter((w) => !w.upcoming)
              .map((workshop) => (
                <Card key={workshop.id} className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=500&text=${workshop.title}`}
                      alt={workshop.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">{workshop.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{workshop.date}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy/70 text-sm line-clamp-3 mb-3">{workshop.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12">
              Frequently Asked <span className="text-violet">Questions</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "Do I need to be good at math to attend?",
                  answer:
                    "Not at all! Our workshops are designed for students with varying levels of mathematical background. We focus on making concepts accessible and engaging for everyone. Curiosity is more important than prior knowledge.",
                },
                {
                  question: "How long are the workshops?",
                  answer:
                    "Most workshops run for about 2 hours, with a mix of presentation, discussion, and hands-on activities. We include breaks to keep everyone engaged and energized.",
                },
                {
                  question: "What should I bring to a workshop?",
                  answer:
                    "Just bring a notebook, pencil, and your curiosity! We provide all necessary materials, handouts, and sometimes snacks. If a workshop requires specific materials or preparation, we'll let you know in advance.",
                },
                {
                  question: "Can middle school students attend?",
                  answer:
                    "Yes! Our workshops are designed for students in grades 5-12. We strive to make our content accessible to various age groups.",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-navy/10">
                  <h3 className="font-mono text-lg font-bold mb-2 text-navy">{item.question}</h3>
                  <p className="text-navy/80">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy text-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-6">
              Join Our Next <span className="text-goldenrod">Workshop</span>
            </h2>
            <p className="text-ivory/80 mb-8">
              Experience the joy of collaborative mathematical exploration. Our next workshop is on April 15th, and we'd
              love to see you there!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-goldenrod text-navy hover:bg-goldenrod/90">
                <Link href="/join-us">Register Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-ivory/20 text-ivory hover:bg-ivory/10">
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
