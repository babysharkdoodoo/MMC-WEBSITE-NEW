"use client"

import { useEffect, useRef } from "react"

interface AnimatedMathBackgroundProps {
  density?: number
  speed?: number
  symbols?: string[]
}

export default function AnimatedMathBackground({
  density = 20,
  speed = 1,
  symbols = ["∑", "π", "∞", "∫", "→", "∀", "∃", "∈", "∇", "∂", "θ", "λ", "Δ", "Ω", "≠", "≈", "≤", "≥"],
}: AnimatedMathBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()

    // Clear any existing symbols
    container.innerHTML = ""

    // Create math symbols
    for (let i = 0; i < density; i++) {
      const symbol = document.createElement("div")
      symbol.className = "math-symbols"
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)]

      // Random position
      symbol.style.top = `${Math.random() * 100}%`
      symbol.style.left = `${Math.random() * 100}%`

      // Random size
      const size = 1 + Math.random() * 2
      symbol.style.fontSize = `${size}rem`

      // Random opacity
      symbol.style.opacity = `${0.05 + Math.random() * 0.1}`

      // Random animation duration
      const duration = 15 + Math.random() * 20
      symbol.style.animationDuration = `${duration / speed}s`

      // Random animation delay
      symbol.style.animationDelay = `${Math.random() * 5}s`

      container.appendChild(symbol)
    }

    // Create floating particles
    for (let i = 0; i < density / 2; i++) {
      const particle = document.createElement("div")
      particle.className = "math-particle"

      // Random position
      particle.style.top = `${Math.random() * 100}%`
      particle.style.left = `${Math.random() * 100}%`

      // Random size
      const size = 5 + Math.random() * 15
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random animation duration
      const duration = 10 + Math.random() * 20
      particle.style.animationDuration = `${duration / speed}s`

      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 5}s`

      container.appendChild(particle)
    }

    return () => {
      container.innerHTML = ""
    }
  }, [density, speed, symbols])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />
}
