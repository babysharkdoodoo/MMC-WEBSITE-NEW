import Link from "next/link"
import Image from "next/image"
import { Calendar, LucideClock, MapPin, Users, ChevronRight, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Mathematical Olympiad Prep Workshop",
    date: "June 15, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Melbourne High School, Room 203",
    description:
      "Prepare for the upcoming Mathematical Olympiad with problem-solving strategies and practice sessions led by experienced coaches.",
    audience: "8th-12th Grade Students",
    category: "Competition Prep",
    image: "/placeholder.svg?height=400&width=600&text=Math+Olympiad",
    featured: true,
    upcoming: true,
  },
  {
    id: 2,
    title: "Fractals & Nature: Exploration Day",
    date: "July 8, 2023",
    time: "1:00 PM - 4:00 PM",
    location: "Wickham Park Pavilion",
    description:
      "Discover the fascinating connection between mathematics and nature as we explore fractal patterns in the natural world through hands-on activities.",
    audience: "5th-12th Grade Students",
    category: "Outdoor Workshop",
    image: "/placeholder.svg?height=400&width=600&text=Fractals+in+Nature",
    featured: false,
    upcoming: true,
  },
  {
    id: 3,
    title: "Coding & Cryptography Camp",
    date: "July 20-22, 2023",
    time: "9:00 AM - 3:00 PM daily",
    location: "Florida Tech Campus, Building 3",
    description:
      "A three-day immersive experience where students will learn the mathematical foundations of cryptography and implement their own encryption algorithms.",
    audience: "9th-12th Grade Students",
    category: "Multi-day Camp",
    image: "/placeholder.svg?height=400&width=600&text=Coding+Camp",
    featured: true,
    upcoming: true,
  },
  {
    id: 4,
    title: "Math Games Night",
    date: "August 5, 2023",
    time: "6:00 PM - 9:00 PM",
    location: "Melbourne Public Library, Community Room",
    description:
      "Join us for a fun evening of mathematical games, puzzles, and challenges. Great for families and students of all ages!",
    audience: "All Ages",
    category: "Social Event",
    image: "/placeholder.svg?height=400&width=600&text=Math+Games",
    featured: false,
    upcoming: true,
  },
  {
    id: 5,
    title: "Geometry in Architecture Workshop",
    date: "March 18, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Melbourne High School, Room 203",
    description:
      "We explored the fascinating intersection of geometry and architecture, examining how mathematical principles inform building design.",
    audience: "6th-12th Grade Students",
    category: "Workshop",
    image: "/placeholder.svg?height=400&width=600&text=Geometry+Architecture",
    featured: false,
    upcoming: false,
  },
  {
    id: 6,
    title: "Pi Day Celebration",
    date: "March 14, 2023",
    time: "3:14 PM - 6:28 PM",
    location: "Wickham Park Pavilion",
    description:
      "Our annual Pi Day celebration featured pi memorization contests, circle-based activities, and of course, plenty of pie!",
    audience: "All Ages",
    category: "Special Event",
    image: "/placeholder.svg?height=400&width=600&text=Pi+Day",
    featured: true,
    upcoming: false,
  },
  {
    id: 7,
    title: "Number Theory Deep Dive",
    date: "February 25, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Melbourne High School, Room 203",
    description:
      "Students explored the fascinating world of number theory, from prime numbers to modular arithmetic and beyond.",
    audience: "9th-12th Grade Students",
    category: "Workshop",
    image: "/placeholder.svg?height=400&width=600&text=Number+Theory",
    featured: false,
    upcoming: false,
  },
  {
    id: 8,
    title: "Mathematical Art Exhibition",
    date: "January 20, 2023",
    time: "5:00 PM - 8:00 PM",
    location: "Melbourne Art Gallery",
    description:
      "A showcase of student-created mathematical art, featuring fractals, geometric designs, and visualizations of mathematical concepts.",
    audience: "All Ages",
    category: "Exhibition",
    image: "/placeholder.svg?height=400&width=600&text=Math+Art",
    featured: true,
    upcoming: false,
  },
]

const categories = [
  "All Categories",
  "Workshop",
  "Competition Prep",
  "Multi-day Camp",
  "Social Event",
  "Special Event",
  "Exhibition",
  "Outdoor Workshop",
]

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/20 to-primary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Our <span className="text-primary relative inline-block">Events</span>
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/20"></div>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Join us for interactive mathematical experiences designed to inspire, challenge, and delight students of
              all ages.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <span className="text-sm font-medium text-muted-foreground self-center">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map((category) => (
                  <Badge
                    key={category}
                    variant={category === "All Categories" ? "default" : "outline"}
                    className={category === "All Categories" ? "bg-primary" : "hover:bg-primary/10"}
                  >
                    {category}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-3 w-3" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Event */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold tracking-tight mb-6">
            Featured <span className="text-primary">Event</span>
          </h2>

          {events
            .filter((e) => e.upcoming && e.featured)
            .slice(0, 1)
            .map((event) => (
              <Card key={event.id} className="bg-card border-border shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <Badge variant="outline" className="self-start mb-2 border-primary/50 text-primary">
                      {event.category}
                    </Badge>
                    <h3 className="font-serif text-2xl font-bold mb-4">{event.title}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <LucideClock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{event.audience}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{event.description}</p>
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/join-us">Register Now</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/events/${event.id}`}>Event Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold tracking-tight mb-6">
            Upcoming <span className="text-primary">Events</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.upcoming && !e.featured)
              .map((event) => (
                <Card
                  key={event.id}
                  className="bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="outline" className="bg-black/50 text-white border-white/20 mb-2">
                        {event.category}
                      </Badge>
                      <h3 className="font-serif text-xl font-bold text-white">{event.title}</h3>
                      <div className="flex items-center gap-2 text-white/90 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <LucideClock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                  </CardContent>
                  <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
                    <Button asChild variant="outline" size="sm" className="text-primary border-primary/50">
                      <Link href="/join-us">Register</Link>
                    </Button>
                    <Link
                      href={`/events/${event.id}`}
                      className="text-primary hover:text-primary/80 font-mono text-xs flex items-center"
                    >
                      Details <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold tracking-tight mb-6">
            Past <span className="text-primary">Events</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => !e.upcoming)
              .slice(0, 6)
              .map((event) => (
                <Card
                  key={event.id}
                  className="bg-card border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                        Past Event
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl font-bold text-white">{event.title}</h3>
                      <div className="flex items-center gap-2 text-white/90 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                  </CardContent>
                  <CardFooter className="px-4 pb-4 pt-0 flex justify-end">
                    <Link
                      href={`/events/${event.id}`}
                      className="text-primary hover:text-primary/80 font-mono text-xs flex items-center"
                    >
                      View Recap <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              <Link href="/events/archive">View All Past Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "Do I need to be good at math to attend?",
                  answer:
                    "Not at all! Our events are designed for students with varying levels of mathematical background. We focus on making concepts accessible and engaging for everyone. Curiosity is more important than prior knowledge.",
                },
                {
                  question: "How long are the events?",
                  answer:
                    "Event durations vary based on the type of activity. Workshops typically run for 2-3 hours, while special events like Math Games Night might be longer. Multi-day camps run for several hours each day across multiple days. The exact times are always listed in the event details.",
                },
                {
                  question: "What should I bring to an event?",
                  answer:
                    "Just bring a notebook, pencil, and your curiosity! We provide all necessary materials, handouts, and sometimes snacks. If an event requires specific materials or preparation, we'll let you know in advance.",
                },
                {
                  question: "How do I register for events?",
                  answer:
                    "Registration is simple! Click the 'Register' button on any event that interests you, and you'll be directed to our registration form. Some popular events have limited capacity, so we recommend registering early.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-mono text-lg font-bold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-6">
              Join Our Next <span className="text-yellow-400">Event</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Experience the joy of mathematical exploration and discovery. Our events are designed to inspire
              curiosity, build confidence, and foster a love for mathematics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-400 text-primary hover:bg-yellow-300">
                <Link href="/join-us">Register Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
