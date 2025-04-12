"use server"

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

const postsDirectory = path.join(process.cwd(), "content/blog")
const workshopsDirectory = path.join(process.cwd(), "content/workshops")
const resourcesDirectory = path.join(process.cwd(), "content/resources")

type ContentType = "blog" | "workshops" | "resources"

export interface PostMetadata {
  id: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  image: string
  contentType: ContentType
  featured?: boolean
  category?: string
}

export interface Post extends PostMetadata {
  content: string
}

function getDirectory(contentType: ContentType) {
  switch (contentType) {
    case "blog":
      return postsDirectory
    case "workshops":
      return workshopsDirectory
    case "resources":
      return resourcesDirectory
    default:
      return postsDirectory
  }
}

export async function getSortedPostsData(contentType: ContentType = "blog"): Promise<PostMetadata[]> {
  const directory = getDirectory(contentType)

  // Create directory if it doesn't exist
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  // Get file names under the directory
  const fileNames = fs.readdirSync(directory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "")

      // Read markdown file as string
      const fullPath = path.join(directory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the id
      return {
        id,
        contentType,
        ...(matterResult.data as Omit<PostMetadata, "id" | "contentType">),
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getAllPostIds(contentType: ContentType = "blog") {
  const directory = getDirectory(contentType)

  if (!fs.existsSync(directory)) {
    return []
  }

  const fileNames = fs.readdirSync(directory)
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
      }
    })
}

export async function getPostData(id: string, contentType: ContentType = "blog"): Promise<Post> {
  const directory = getDirectory(contentType)
  const fullPath = path.join(directory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(matterResult.content)

  const content = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    content,
    contentType,
    ...(matterResult.data as Omit<PostMetadata, "id" | "contentType">),
  }
}

export async function createPost(
  postData: Omit<PostMetadata, "id" | "contentType"> & { content: string },
  contentType: ContentType = "blog",
) {
  const directory = getDirectory(contentType)

  // Create directory if it doesn't exist
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  // Generate a slug from the title
  const slug = postData.title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")

  // Create the markdown content
  const markdown = matter.stringify(postData.content, {
    title: postData.title,
    date: postData.date,
    author: postData.author,
    excerpt: postData.excerpt,
    tags: postData.tags,
    image: postData.image,
    featured: postData.featured || false,
    category: postData.category || "general",
  })

  // Write the file
  fs.writeFileSync(path.join(directory, `${slug}.md`), markdown)

  return slug
}

export async function updatePost(
  id: string,
  postData: Partial<Omit<PostMetadata, "id" | "contentType"> & { content: string }>,
  contentType: ContentType = "blog",
) {
  const directory = getDirectory(contentType)
  const fullPath = path.join(directory, `${id}.md`)

  // Read existing file
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  // Update data
  const updatedData = {
    ...data,
    ...postData,
    content: undefined,
  }

  // Create the markdown content
  const markdown = matter.stringify(postData.content || content, updatedData)

  // Write the file
  fs.writeFileSync(fullPath, markdown)

  return id
}

export async function deletePost(id: string, contentType: ContentType = "blog") {
  const directory = getDirectory(contentType)
  const fullPath = path.join(directory, `${id}.md`)

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath)
    return true
  }

  return false
}
