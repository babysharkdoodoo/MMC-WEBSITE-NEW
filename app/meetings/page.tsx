import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const meetings = [
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

export default function MeetingsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-indigo-900/10 to-purple-800/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2RjEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-indigo-900">
              Our <span className="text-purple-700">Meetings</span>
            </h1>
            <p className="mt-6 text-xl text-indigo-900/80">
              Join us for interactive math meetings designed and led by passionate mathematicians.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Meeting */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="font-mono text-3xl font-bold tracking-tight mb-8">
            Upcoming <span className="text-purple-700">Meeting</span>
          </h2>

          {meetings
            .filter((m) => m.upcoming)
            .map((meeting) => (
              <Card key={meeting.id} className="bg-white border-indigo-100 shadow-md overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video">
                    <Image
                      src={`/placeholder.svg?height=400&width=600&text=${meeting.title}`}
                      alt={meeting.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-purple-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Upcoming
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-2xl font-bold mb-2 text-white">{meeting.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-indigo-900/70">
                        <Calendar className="h-4 w-4 text-purple-700" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-900/70">
                        <Clock className="h-4 w-4 text-purple-700" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-900/70">
                        <MapPin className="h-4 w-4 text-purple-700" />
                        <span>{meeting.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-900/70">
                        <Users className="h-4 w-4 text-purple-700" />
                        <span>{meeting.audience}</span>
                      </div>
                    </div>
                    <p className="text-indigo-900/80 mb-6">{meeting.description}</p>
                    <Button asChild className="mt-auto bg-purple-700 hover:bg-purple-600 text-white">
                      <Link href="/join-us">Register Now</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Past Meetings */}
      <section className="py-12 bg-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="font-mono text-3xl font-bold tracking-tight mb-8">
            Past <span className="text-purple-700">Meetings</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetings
              .filter((m) => !m.upcoming)
              .map((meeting) => (
                <Card
                  key={meeting.id}
                  className="bg-white border-indigo-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=500&text=${meeting.title}`}
                      alt={meeting.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl font-bold text-white">{meeting.title}</h3>
                      <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{meeting.date}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-indigo-900/70 text-sm line-clamp-3">{meeting.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-purple-700 border-purple-200 hover:bg-purple-50"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2RjEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-mono text-3xl font-bold tracking-tight text-center mb-12">
              Frequently Asked <span className="text-purple-700">Questions</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "Do I need to be good at math to attend?",
                  answer:
                    "Not at all! Our meetings are designed for students with varying levels of mathematical background. We focus on making concepts accessible and engaging for everyone. Curiosity is more important than prior knowledge.",
                },
                {
                  question: "How long are the meetings?",
                  answer:
                    "Most meetings run for about 2 hours, with a mix of presentation, discussion, and hands-on activities. We include breaks to keep everyone engaged and energized.",
                },
                {
                  question: "What should I bring to a meeting?",
                  answer:
                    "Just bring a notebook, pencil, and your curiosity! We provide all necessary materials, handouts, and sometimes snacks. If a meeting requires specific materials or preparation, we'll let you know in advance.",
                },
                {
                  question: "Can middle school students attend?",
                  answer:
                    "Yes! Our meetings are designed for students in grades 5-12. We strive to make our content accessible to various age groups.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-mono text-lg font-bold mb-2 text-indigo-900">{item.question}</h3>
                  <p className="text-indigo-900/80">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {["π", "∑", "∫", "∞", "≈", "θ"].map((symbol, i) => (
            <div
              key={i}
              className="absolute text-white/5 font-serif pointer-events-none select-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 60 + 40}px`,
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-mono text-3xl font-bold tracking-tight mb-6">
              Join Our Next <span className="text-yellow-400">Meeting</span>
            </h2>
            <p className="text-white/80 mb-8">
              Experience the joy of collaborative mathematical exploration. Our next meeting is on April 15th, and we'd
              love to see you there!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-medium">
                <Link href="/join-us">Register Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
