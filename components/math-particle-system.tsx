"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion } from "framer-motion"

interface MathParticleSystemProps {
  count?: number
  colors?: string[]
  className?: string
  symbols?: boolean
  opacity?: number
  size?: [number, number] // [min, max]
  speed?: number
}

// Math symbols
const MATH_SYMBOLS = [
  "π",
  "∑",
  "∫",
  "√",
  "∞",
  "≠",
  "≈",
  "±",
  "÷",
  "×",
  "∂",
  "∇",
  "∀",
  "∃",
  "∈",
  "∉",
  "⊂",
  "⊃",
  "∩",
  "∪",
  "θ",
  "λ",
  "Δ",
  "Ω",
  "φ",
  "γ",
  "μ",
  "σ",
  "τ",
  "ψ",
]

export default function MathParticleSystem({
  count = 30,
  colors = ["#3b82f6", "#14b8a6", "#d97706"],
  className = "",
  symbols = true,
  opacity = 0.4,
  size = [10, 30],
  speed = 1,
}: MathParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Memoize the colors array to prevent unnecessary re-renders
  const memoizedColors = useMemo(() => colors, [colors.join(",")])

  // Generate particles only when necessary dimensions change
  const particles = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return []

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: size[0] + Math.random() * (size[1] - size[0]),
      color: memoizedColors[Math.floor(Math.random() * memoizedColors.length)],
      symbol: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
      rotation: Math.random() * 360,
      duration: (10 + Math.random() * 20) / speed,
      delay: Math.random() * 2,
      moveX: Math.random() * 40 - 20,
      moveY: Math.random() * 40 - 20,
    }))
  }, [dimensions.width, dimensions.height, count, memoizedColors, size, speed])

  // Initialize dimensions
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()

    // Add resize listener
    window.addEventListener("resize", updateDimensions)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute font-serif"
          style={{
            left: particle.x,
            top: particle.y,
            color: particle.color,
            fontSize: particle.size,
            opacity: opacity,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: opacity,
            scale: 1,
            x: [0, particle.moveX, 0],
            y: [0, particle.moveY, 0],
            rotate: [particle.rotation, particle.rotation + 10, particle.rotation],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {symbols ? particle.symbol : "•"}
        </motion.div>
      ))}
    </div>
  )
}
