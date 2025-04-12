import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import { getAllPostIds, getPostData } from "@/lib/blog"
import MathContent from "@/components/math-content"
import RelatedPosts from "@/components/related-posts"
import InteractiveGeometryExplorer from "@/components/interactive-geometry-explorer"
import InteractiveNumberTheory from "@/components/interactive-number-theory"
import InteractiveFunctionGraph from "@/components/interactive-function-graph"

export async function generateStaticParams() {
  const posts = getAllPostIds("blog")
  return posts
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const post = await getPostData(params.id, "blog")
    return {
      title: `${post.title} | Melbourne Math Circle`,
      description: post.excerpt,
    }
  } catch (error) {
    return {
      title: "Math Bite | Melbourne Math Circle",
      description: "A student-written exploration of a mathematical concept.",
    }
  }
}

export default async function MathBitePage({ params }: { params: { id: string } }) {
  try {
    const post = await getPostData(params.id, "blog")

    // Determine which interactive component to show based on tags or content
    const hasGeometry = post.tags.some((tag) => ["geometry", "shapes", "area", "perimeter"].includes(tag))

    const hasNumberTheory = post.tags.some((tag) => ["number-theory", "primes", "factors", "gcd", "lcm"].includes(tag))

    const hasFunctions = post.tags.some((tag) => ["functions", "graphs", "calculus", "trigonometry"].includes(tag))

    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <Link href="/math-bites" className="inline-flex items-center text-violet hover:text-violet/80 mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Math Bites
              </Link>

              <div className="flex items-center gap-2 text-navy/60 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{post.date}</span>
              </div>

              <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl text-navy mb-6">{post.title}</h1>

              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-violet/20 flex items-center justify-center text-violet font-mono">
                  {post.author.charAt(0)}
                </div>
                <span className="text-navy/80">By {post.author}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/math-bites/tag/${tag}`}
                    className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet hover:bg-violet/20 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={post.image || "/placeholder.svg?height=600&width=1200&text=Math Bite"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="prose prose-lg max-w-none math-content">
                <MathContent content={post.content} />
              </div>

              {/* Interactive Components */}
              {(hasGeometry || hasNumberTheory || hasFunctions) && (
                <div className="mt-12 pt-8 border-t border-navy/10">
                  <h2 className="font-mono text-2xl font-bold tracking-tight mb-6">
                    Interactive <span className="text-violet">Explorer</span>
                  </h2>

                  <div className="bg-navy/5 rounded-lg p-6 mb-8">
                    {hasGeometry && (
                      <div className="mb-8">
                        <h3 className="font-medium text-lg mb-4">Explore Geometric Concepts</h3>
                        <InteractiveGeometryExplorer />
                      </div>
                    )}

                    {hasNumberTheory && (
                      <div className="mb-8">
                        <h3 className="font-medium text-lg mb-4">Explore Number Theory</h3>
                        <InteractiveNumberTheory />
                      </div>
                    )}

                    {hasFunctions && (
                      <div>
                        <h3 className="font-medium text-lg mb-4">Explore Functions</h3>
                        <InteractiveFunctionGraph />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-navy/10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-violet/20 flex items-center justify-center text-violet font-mono">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-navy">About the Author</h3>
                    <p className="text-sm text-navy/70">
                      {post.author} is a student at Melbourne High School and a member of the Melbourne Math Circle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 bg-navy/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-mono text-2xl font-bold tracking-tight mb-8 text-center">
              More <span className="text-violet">Math Bites</span>
            </h2>

            <RelatedPosts currentPostId={post.id} tags={post.tags} contentType="blog" />
          </div>
        </section>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
