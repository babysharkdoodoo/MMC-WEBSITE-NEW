"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Compass, Star, Lightbulb, RefreshCw } from "lucide-react"

interface InteractiveGeometryExplorerProps {
  height?: number
}

export default function InteractiveGeometryExplorer({ height = 400 }: InteractiveGeometryExplorerProps) {
  const [shapeType, setShapeType] = useState("circle")
  const [parameter1, setParameter1] = useState(100) // radius for circle, side for square, etc.
  const [parameter2, setParameter2] = useState(80) // second side for rectangle, etc.
  const [showHint, setShowHint] = useState(false)
  const [stars, setStars] = useState(0)
  const [funFact, setFunFact] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const geometryFacts = [
    "The sum of the angles in any triangle is always 180 degrees.",
    "A circle has the largest area for a given perimeter among all closed curves.",
    "The diagonal of a square with side length s is s√2.",
    "The area of a regular hexagon with side length s is (3√3/2)s².",
    "The volume of a sphere is (4/3)πr³, where r is the radius.",
  ]

  useEffect(() => {
    setFunFact(geometryFacts[Math.floor(Math.random() * geometryFacts.length)])
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up coordinate system with origin at center
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Draw grid
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 0.5

    // Vertical grid lines
    for (let x = 0; x <= canvas.width; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = 0; y <= canvas.height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(canvas.width, centerY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, canvas.height)
    ctx.stroke()

    // Draw shape
    ctx.strokeStyle = "#8b5cf6"
    ctx.fillStyle = "rgba(139, 92, 246, 0.2)"
    ctx.lineWidth = 2

    switch (shapeType) {
      case "circle":
        ctx.beginPath()
        ctx.arc(centerX, centerY, parameter1, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        break
      case "square":
        const halfSide = parameter1 / 2
        ctx.beginPath()
        ctx.rect(centerX - halfSide, centerY - halfSide, parameter1, parameter1)
        ctx.fill()
        ctx.stroke()
        break
      case "rectangle":
        const halfWidth = parameter1 / 2
        const halfHeight = parameter2 / 2
        ctx.beginPath()
        ctx.rect(centerX - halfWidth, centerY - halfHeight, parameter1, parameter2)
        ctx.fill()
        ctx.stroke()
        break
      case "triangle":
        // Equilateral triangle
        const height = (parameter1 * Math.sqrt(3)) / 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY - (2 * height) / 3)
        ctx.lineTo(centerX - parameter1 / 2, centerY + height / 3)
        ctx.lineTo(centerX + parameter1 / 2, centerY + height / 3)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break
    }

    // Display shape information
    ctx.fillStyle = "#1e293b"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"

    let area = 0
    let perimeter = 0

    switch (shapeType) {
      case "circle":
        area = Math.PI * parameter1 * parameter1
        perimeter = 2 * Math.PI * parameter1
        ctx.fillText(`Radius: ${parameter1}`, 10, 10)
        break
      case "square":
        area = parameter1 * parameter1
        perimeter = 4 * parameter1
        ctx.fillText(`Side: ${parameter1}`, 10, 10)
        break
      case "rectangle":
        area = parameter1 * parameter2
        perimeter = 2 * (parameter1 + parameter2)
        ctx.fillText(`Width: ${parameter1}`, 10, 10)
        ctx.fillText(`Height: ${parameter2}`, 10, 30)
        break
      case "triangle":
        // Equilateral triangle
        area = (Math.sqrt(3) / 4) * parameter1 * parameter1
        perimeter = 3 * parameter1
        ctx.fillText(`Side: ${parameter1}`, 10, 10)
        break
    }

    ctx.fillText(`Area: ${area.toFixed(2)}`, 10, 50)
    ctx.fillText(`Perimeter: ${perimeter.toFixed(2)}`, 10, 70)
  }, [shapeType, parameter1, parameter2])

  // Resize canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const container = canvas.parentElement
        if (container) {
          canvas.width = container.clientWidth
          canvas.height = height || 400
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [height])

  const handleParameter1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setParameter1(isNaN(value) ? 0 : Math.min(Math.max(value, 10), 200))
  }

  const handleParameter2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setParameter2(isNaN(value) ? 0 : Math.min(Math.max(value, 10), 200))
  }

  const handleChallenge = () => {
    // Simple challenge: create a shape with a specific area
    let targetArea = 0
    let currentArea = 0

    switch (shapeType) {
      case "circle":
        targetArea = 10000
        currentArea = Math.PI * parameter1 * parameter1
        break
      case "square":
        targetArea = 10000
        currentArea = parameter1 * parameter1
        break
      case "rectangle":
        targetArea = 10000
        currentArea = parameter1 * parameter2
        break
      case "triangle":
        targetArea = 1000
        currentArea = (Math.sqrt(3) / 4) * parameter1 * parameter1
        break
    }

    if (Math.abs(currentArea - targetArea) < targetArea * 0.05) {
      setStars((prev) => prev + 1)
      alert(`Great job! You created a ${shapeType} with an area close to ${targetArea}!`)
    } else {
      alert(`Try to create a ${shapeType} with an area of approximately ${targetArea}!`)
    }
  }

  const resetShape = () => {
    setParameter1(100)
    setParameter2(80)
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="circle" onValueChange={setShapeType} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="circle">Circle</TabsTrigger>
          <TabsTrigger value="square">Square</TabsTrigger>
          <TabsTrigger value="rectangle">Rectangle</TabsTrigger>
          <TabsTrigger value="triangle">Triangle</TabsTrigger>
        </TabsList>

        <TabsContent value="circle">
          <div className="text-sm text-navy/70 mb-2">
            A circle is the set of all points equidistant from a center point.
          </div>
        </TabsContent>
        <TabsContent value="square">
          <div className="text-sm text-navy/70 mb-2">A square has four equal sides and four right angles.</div>
        </TabsContent>
        <TabsContent value="rectangle">
          <div className="text-sm text-navy/70 mb-2">
            A rectangle has four right angles and opposite sides are equal.
          </div>
        </TabsContent>
        <TabsContent value="triangle">
          <div className="text-sm text-navy/70 mb-2">
            An equilateral triangle has three equal sides and three equal angles.
          </div>
        </TabsContent>

        <div className="relative bg-white rounded-lg overflow-hidden mb-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={height}
            className="w-full"
            style={{ height: `${height}px` }}
          ></canvas>
        </div>

        <div className="grid gap-4">
          <div>
            <Label htmlFor="parameter1">
              {shapeType === "circle"
                ? "Radius"
                : shapeType === "square"
                  ? "Side Length"
                  : shapeType === "rectangle"
                    ? "Width"
                    : "Side Length"}
              : {parameter1}
            </Label>
            <Input
              id="parameter1"
              type="range"
              min="10"
              max="200"
              value={parameter1}
              onChange={handleParameter1Change}
              className="mt-1"
            />
          </div>

          {shapeType === "rectangle" && (
            <div>
              <Label htmlFor="parameter2">Height: {parameter2}</Label>
              <Input
                id="parameter2"
                type="range"
                min="10"
                max="200"
                value={parameter2}
                onChange={handleParameter2Change}
                className="mt-1"
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)} className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-1 text-goldenrod" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>

            <div className="flex items-center">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-goldenrod fill-goldenrod" />
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetShape} className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="default" size="sm" onClick={handleChallenge} className="flex items-center">
                <Compass className="h-4 w-4 mr-1" />
                Challenge
              </Button>
            </div>
          </div>

          {showHint && (
            <motion.div
              className="bg-goldenrod/10 p-3 rounded-lg text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {shapeType === "circle" && (
                <p>
                  <span className="font-bold">Hint:</span> The area of a circle is πr², where r is the radius. The
                  perimeter (circumference) is 2πr.
                </p>
              )}
              {shapeType === "square" && (
                <p>
                  <span className="font-bold">Hint:</span> The area of a square is s², where s is the side length. The
                  perimeter is 4s.
                </p>
              )}
              {shapeType === "rectangle" && (
                <p>
                  <span className="font-bold">Hint:</span> The area of a rectangle is width × height. The perimeter is 2
                  × (width + height).
                </p>
              )}
              {shapeType === "triangle" && (
                <p>
                  <span className="font-bold">Hint:</span> The area of an equilateral triangle with side length s is
                  (√3/4)s². The perimeter is 3s.
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            className="bg-teal/5 p-3 rounded-lg text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>
              <span className="font-bold text-teal">Fun Fact:</span> {funFact}
            </p>
          </motion.div>
        </div>
      </Tabs>
    </div>
  )
}
