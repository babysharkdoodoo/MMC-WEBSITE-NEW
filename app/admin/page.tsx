"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FileText,
  Calendar,
  Users,
  Settings,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getSortedPostsData, deletePost, type PostMetadata } from "@/lib/blog"

export default function AdminPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [blogPosts, setBlogPosts] = useState<PostMetadata[]>([])
  const [workshops, setWorkshops] = useState<PostMetadata[]>([])
  const [resources, setResources] = useState<PostMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    setBlogPosts(getSortedPostsData("blog"))
    setWorkshops(getSortedPostsData("workshops"))
    setResources(getSortedPostsData("resources"))
    setIsLoading(false)
  }, [])

  const handleDelete = async (id: string, contentType: "blog" | "workshops" | "resources") => {
    if (window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      // In a real app, this would be an API call
      const success = deletePost(id, contentType)

      if (success) {
        // Update the state to reflect the deletion
        if (contentType === "blog") {
          setBlogPosts(blogPosts.filter((post) => post.id !== id))
        } else if (contentType === "workshops") {
          setWorkshops(workshops.filter((post) => post.id !== id))
        } else if (contentType === "resources") {
          setResources(resources.filter((post) => post.id !== id))
        }
      }
    }
  }

  const filterPosts = (posts: PostMetadata[]) => {
    if (!searchTerm) return posts

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  return (
    <div className="flex min-h-screen bg-navy/5">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-navy text-ivory fixed h-full">
        <div className="p-6">
          <h1 className="font-mono text-xl font-bold mb-6">Admin Dashboard</h1>
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center px-3 py-2 text-ivory bg-navy/30 rounded-md">
              <FileText className="mr-3 h-5 w-5" />
              Content
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center px-3 py-2 text-ivory/70 hover:text-ivory hover:bg-navy/30 rounded-md"
            >
              <Calendar className="mr-3 h-5 w-5" />
              Events
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center px-3 py-2 text-ivory/70 hover:text-ivory hover:bg-navy/30 rounded-md"
            >
              <Users className="mr-3 h-5 w-5" />
              Users
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-3 py-2 text-ivory/70 hover:text-ivory hover:bg-navy/30 rounded-md"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="font-mono text-2xl font-bold text-navy">Content Management</h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-navy/40" />
                <Input
                  placeholder="Search content..."
                  className="pl-10 bg-white border-navy/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-violet hover:bg-violet/90 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Content Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/admin/create/blog")}>Math Bite</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/admin/create/workshops")}>Workshop</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/admin/create/resources")}>Resource</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="bg-navy/5 p-1 mb-8">
              <TabsTrigger value="blog" className="font-mono text-xs">
                Math Bites
              </TabsTrigger>
              <TabsTrigger value="workshops" className="font-mono text-xs">
                Workshops
              </TabsTrigger>
              <TabsTrigger value="resources" className="font-mono text-xs">
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="mt-0">
              {isLoading ? (
                <div className="text-center py-12">Loading...</div>
              ) : filterPosts(blogPosts).length > 0 ? (
                <div className="grid gap-6">
                  {filterPosts(blogPosts).map((post) => (
                    <Card key={post.id} className="bg-white border-navy/10 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="font-serif text-lg">{post.title}</CardTitle>
                            <CardDescription>
                              By {post.author} • {post.date}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => router.push(`/admin/edit/blog/${post.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(post.id, "blog")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-navy/70 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <span className="text-xs text-navy/60">{post.featured ? "Featured" : ""}</span>
                        <Link
                          href={`/math-bites/${post.id}`}
                          className="text-violet hover:text-violet/80 font-mono text-xs flex items-center"
                          target="_blank"
                        >
                          View <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-navy/10">
                  <p className="text-navy/70 mb-4">No math bites found. Create your first one!</p>
                  <Button
                    className="bg-violet hover:bg-violet/90 text-white"
                    onClick={() => router.push("/admin/create/blog")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Math Bite
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="workshops" className="mt-0">
              {isLoading ? (
                <div className="text-center py-12">Loading...</div>
              ) : filterPosts(workshops).length > 0 ? (
                <div className="grid gap-6">
                  {filterPosts(workshops).map((post) => (
                    <Card key={post.id} className="bg-white border-navy/10 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="font-serif text-lg">{post.title}</CardTitle>
                            <CardDescription>
                              By {post.author} • {post.date}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => router.push(`/admin/edit/workshops/${post.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(post.id, "workshops")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-navy/70 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <span className="text-xs text-navy/60">{post.featured ? "Featured" : ""}</span>
                        <Link
                          href={`/workshops/${post.id}`}
                          className="text-violet hover:text-violet/80 font-mono text-xs flex items-center"
                          target="_blank"
                        >
                          View <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-navy/10">
                  <p className="text-navy/70 mb-4">No workshops found. Create your first one!</p>
                  <Button
                    className="bg-violet hover:bg-violet/90 text-white"
                    onClick={() => router.push("/admin/create/workshops")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Workshop
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              {isLoading ? (
                <div className="text-center py-12">Loading...</div>
              ) : filterPosts(resources).length > 0 ? (
                <div className="grid gap-6">
                  {filterPosts(resources).map((post) => (
                    <Card key={post.id} className="bg-white border-navy/10 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="font-serif text-lg">{post.title}</CardTitle>
                            <CardDescription>
                              By {post.author} • {post.date}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => router.push(`/admin/edit/resources/${post.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(post.id, "resources")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-navy/70 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <span className="text-xs text-navy/60">{post.featured ? "Featured" : ""}</span>
                        <Link
                          href={`/resources/${post.id}`}
                          className="text-violet hover:text-violet/80 font-mono text-xs flex items-center"
                          target="_blank"
                        >
                          View <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-navy/10">
                  <p className="text-navy/70 mb-4">No resources found. Create your first one!</p>
                  <Button
                    className="bg-violet hover:bg-violet/90 text-white"
                    onClick={() => router.push("/admin/create/resources")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Resource
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
