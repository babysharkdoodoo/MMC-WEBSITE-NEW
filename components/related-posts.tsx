import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getSortedPostsData } from "@/lib/blog"

interface RelatedPostsProps {
  currentPostId: string
  tags: string[]
  contentType: "blog" | "workshops" | "resources"
  limit?: number
}

export default async function RelatedPosts({
  currentPostId,
  tags,
  contentType,
  limit = 3,
}: RelatedPostsProps) {
  const allPostsRaw = await getSortedPostsData(contentType)
  const allPosts = Array.isArray(allPostsRaw) ? allPostsRaw : []

  const relatedPosts = allPosts
    .filter((post) => post.id !== currentPostId)
    .map((post) => {
      const postTags = post.tags || []
      const matchingTags = postTags.filter((tag) => tags.includes(tag))
      return {
        ...post,
        relevance: matchingTags.length,
      }
    })
    .filter((post) => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)

  if (relatedPosts.length < limit) {
    const recentPosts = allPosts
      .filter(
        (post) =>
          post.id !== currentPostId &&
          !relatedPosts.some((relatedPost) => relatedPost.id === post.id)
      )
      .slice(0, limit - relatedPosts.length)

    relatedPosts.push(...recentPosts)
  }

  if (relatedPosts.length === 0) return null

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((post) => (
        <Card
          key={post.id}
          className="bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="aspect-video relative">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="font-serif text-lg">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-navy/70 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
            <div className="flex flex-wrap gap-1">
              {(post.tags || []).slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  href={`/${contentType === "blog" ? "math-bites" : contentType}/tag/${tag}`}
                  className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet hover:bg-violet/20 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
              {(post.tags || []).length > 2 && (
                <span className="inline-flex items-center rounded-md bg-navy/10 px-2 py-1 text-xs font-medium text-navy">
                  +{(post.tags || []).length - 2}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href={`/${contentType === "blog" ? "math-bites" : contentType}/${post.id}`}
              className="text-violet hover:text-violet/80 font-mono text-xs flex items-center"
            >
              Read More <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
