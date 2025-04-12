"use client"

import { useEffect, useRef } from "react"

interface MathContentProps {
  content: string
}

export default function MathContent({ content }: MathContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if MathJax is already loaded
    if (typeof window !== "undefined" && !window.MathJax) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        if (window.MathJax && containerRef.current) {
          window.MathJax.typeset([containerRef.current])
        }
      }
    } else if (window.MathJax && containerRef.current) {
      // If MathJax is already loaded, typeset the current element
      window.MathJax.typeset([containerRef.current])
    }
  }, [content])

  return (
    <div
      ref={containerRef}
      className="math-content prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

// Add this to global.d.ts or a similar file
declare global {
  interface Window {
    MathJax: any
  }
}
