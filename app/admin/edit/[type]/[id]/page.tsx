"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostData, updatePost } from "@/lib/blog"
import MarkdownEditor from "@/components/markdown-editor"

export default function EditPostPage({ params }: { params: { type: string; id: string } }) {
  const router = useRouter()
  const contentType = params.type as "blog" | "workshops" | "resources"
  const postId = params.id

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")
  const [featured, setFeatured] = useState(false)
  const [category, setCategory] = useState("general")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // In a real app, this would be an API call
        const post = await getPostData(postId, contentType)

        setTitle(post.title)
        setAuthor(post.author)
        setExcerpt(post.excerpt)
        setTags(post.tags.join(", "))
        setImage(post.image)
        setContent(post.content)
        setFeatured(post.featured || false)
        setCategory(post.category || "general")

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading post:", error)
        alert("Failed to load post. Redirecting to admin page.")
        router.push("/admin")
      }
    }

    loadPost()
  }, [postId, contentType, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Split tags by comma and trim whitespace
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      const postData = {
        title,
        author,
        excerpt,
        tags: tagArray,
        image,
        featured,
        category,
        content,
      }

      // In a real app, this would be an API call
      await updatePost(postId, postData, contentType)

      // Redirect to the admin page
      router.push("/admin")
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Failed to update post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getContentTypeLabel = () => {
    switch (contentType) {
      case "blog":
        return "Math Bite"
      case "workshops":
        return "Workshop"
      case "resources":
        return "Resource"
      default:
        return "Content"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy/5 flex items-center justify-center">
        <div className="text-navy">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy/5 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => router.push("/admin")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="font-mono text-2xl font-bold text-navy">Edit {getContentTypeLabel()}</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8">
              <Card className="bg-white border-navy/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input
                        id="title"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="author" className="text-sm font-medium">
                        Author
                      </label>
                      <Input
                        id="author"
                        placeholder="Enter author name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="excerpt" className="text-sm font-medium">
                        Excerpt
                      </label>
                      <Textarea
                        id="excerpt"
                        placeholder="Enter a brief excerpt"
                        rows={3}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="tags" className="text-sm font-medium">
                          Tags (comma separated)
                        </label>
                        <Input
                          id="tags"
                          placeholder="e.g., number-theory, fractals, puzzles"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Category
                        </label>
                        <select
                          id="category"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="general">General</option>
                          <option value="number-theory">Number Theory</option>
                          <option value="geometry">Geometry</option>
                          <option value="algebra">Algebra</option>
                          <option value="calculus">Calculus</option>
                          <option value="probability">Probability & Statistics</option>
                          <option value="discrete">Discrete Mathematics</option>
                          <option value="applied">Applied Mathematics</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="image" className="text-sm font-medium">
                        Featured Image URL
                      </label>
                      <Input
                        id="image"
                        placeholder="Enter image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        id="featured"
                        type="checkbox"
                        className="h-4 w-4 rounded border-navy/30 text-violet focus:ring-violet"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                      />
                      <label htmlFor="featured" className="ml-2 text-sm text-navy/80">
                        Feature this {getContentTypeLabel().toLowerCase()}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-navy/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <MarkdownEditor
                    value={content}
                    onChange={setContent}
                    placeholder={`Write your ${getContentTypeLabel().toLowerCase()} content here...`}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" className="bg-violet hover:bg-violet/90 text-white" disabled={isSubmitting}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
