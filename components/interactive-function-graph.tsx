"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Lightbulb,
  Zap,
  RefreshCw,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Trophy,
  Gamepad,
  Target,
  Rocket,
  Star,
  Music,
  Pencil,
  Trash2,
  Check,
} from "lucide-react"
import confetti from "canvas-confetti"

interface InteractiveFunctionGraphProps {
  initialFunc?: string
  height?: number
  className?: string
}

// Available functions with their equations, implementations, and kid-friendly descriptions
const availableFunctions = [
  {
    name: "Wavy Line",
    equation: "f(x) = A × sin(B × x + C) + D",
    func: (x: number, params: FunctionParams) =>
      params.amplitude * Math.sin(params.frequency * x + params.phase) + params.offset,
    color: "#3b82f6", // violet
    defaultParams: { amplitude: 1, frequency: 1, phase: 0, offset: 0 },
    funFact: "Sine waves are found throughout nature, from sound waves to light waves to ocean waves!",
    kidDescription: "The sine wave looks like ocean waves! It goes up and down smoothly forever.",
    icon: "🌊",
  },
  {
    name: "Bouncy Wave",
    equation: "f(x) = A × cos(B × x + C) + D",
    func: (x: number, params: FunctionParams) =>
      params.amplitude * Math.cos(params.frequency * x + params.phase) + params.offset,
    color: "#14b8a6", // teal
    defaultParams: { amplitude: 1, frequency: 1, phase: 0, offset: 0 },
    funFact: "Cosine is just a sine wave shifted by 90 degrees (or π/2 radians)!",
    kidDescription: "The cosine wave is like the sine wave's twin! It starts at the top instead of the middle.",
    icon: "🏄‍♂️",
  },
  {
    name: "Smiley Bowl",
    equation: "f(x) = A × x² + D",
    func: (x: number, params: FunctionParams) => params.amplitude * x * x + params.offset,
    color: "#d97706", // goldenrod
    defaultParams: { amplitude: 0.25, frequency: 1, phase: 0, offset: -2 },
    funFact: "This U-shaped curve is called a parabola - the same shape as the path of a thrown ball!",
    kidDescription:
      "This function makes a U-shape, like a hill or a valley. It's the path a ball follows when you throw it!",
    icon: "⛰️",
  },
  {
    name: "Zoom Curve",
    equation: "f(x) = A × x³ + D",
    func: (x: number, params: FunctionParams) => params.amplitude * x * x * x + params.offset,
    color: "#ef4444", // red
    defaultParams: { amplitude: 0.1, frequency: 1, phase: 0, offset: 0 },
    funFact: "Cubic functions always cross the x-axis at least once!",
    kidDescription: "The cubic function makes an S-shape. It grows really fast as x gets bigger!",
    icon: "🐍",
  },
  {
    name: "Rocket Launch",
    equation: "f(x) = A × eᴮˣ + D",
    func: (x: number, params: FunctionParams) => params.amplitude * Math.exp(params.frequency * x) + params.offset,
    color: "#8b5cf6", // purple
    defaultParams: { amplitude: 0.2, frequency: 0.5, phase: 0, offset: 0 },
    funFact: "Exponential functions model population growth, compound interest, and radioactive decay!",
    kidDescription:
      "This function shows growth - like bacteria multiplying or money growing with interest. It starts slow then zooms up!",
    icon: "📈",
  },
  {
    name: "Mountain Peak",
    equation: "f(x) = A × |x| + D",
    func: (x: number, params: FunctionParams) => params.amplitude * Math.abs(x) + params.offset,
    color: "#ec4899", // pink
    defaultParams: { amplitude: 0.5, frequency: 1, phase: 0, offset: 0 },
    funFact: "The absolute value function creates a V-shape and is used in many optimization problems!",
    kidDescription: "This function makes a V-shape. It's like folding a piece of paper in the middle!",
    icon: "📐",
  },
  {
    name: "Magic Growth",
    equation: "f(x) = A × √x + D",
    func: (x: number, params: FunctionParams) => (x >= 0 ? params.amplitude * Math.sqrt(x) + params.offset : null),
    color: "#22c55e", // green
    defaultParams: { amplitude: 0.5, frequency: 1, phase: 0, offset: 0 },
    funFact: "The square root function grows quickly at first, then slows down - just like many learning curves!",
    kidDescription:
      "The square root function starts steep then flattens out. It's like learning a new skill - fast progress at first, then slower!",
    icon: "🌱",
  },
  {
    name: "Crazy Noodle",
    equation: "f(x) = A × sin(B × x) × cos(x²) + D",
    func: (x: number, params: FunctionParams) =>
      params.amplitude * Math.sin(params.frequency * x) * Math.cos(x * x) + params.offset,
    color: "#f97316", // orange
    defaultParams: { amplitude: 0.5, frequency: 2, phase: 0, offset: 0 },
    funFact: "Complex combinations of functions can create beautiful and unexpected patterns!",
    kidDescription: "This wild function combines multiple waves to create a crazy pattern that never repeats!",
    icon: "🎢",
  },
]

// Parameter interface
interface FunctionParams {
  amplitude: number
  frequency: number
  phase: number
  offset: number
}

// Challenge interface
interface Challenge {
  name: string
  description: string
  targetFunction: string
  targetParams: FunctionParams
  difficulty: "easy" | "medium" | "hard"
  hint: string
  icon: React.ReactNode
}

// Predefined challenges
const challenges: Challenge[] = [
  {
    name: "Make a Big Wave",
    description: "Adjust the sine wave to make it twice as tall!",
    targetFunction: "Sine Wave",
    targetParams: { amplitude: 2, frequency: 1, phase: 0, offset: 0 },
    difficulty: "easy",
    hint: "Try increasing the Amplitude (A) to make the wave taller.",
    icon: <Zap size={16} />,
  },
  {
    name: "Double Time",
    description: "Make the sine wave complete two full cycles!",
    targetFunction: "Sine Wave",
    targetParams: { amplitude: 1, frequency: 2, phase: 0, offset: 0 },
    difficulty: "easy",
    hint: "Try adjusting the Frequency (B) to change how fast the wave repeats.",
    icon: <Music size={16} />,
  },
  {
    name: "Floating Hill",
    description: "Make the hill float 2 units above the x-axis!",
    targetFunction: "Hill",
    targetParams: { amplitude: 0.25, frequency: 1, phase: 0, offset: 2 },
    difficulty: "medium",
    hint: "Try changing the Vertical Shift (D) to move the entire function up.",
    icon: <Rocket size={16} />,
  },
  {
    name: "Shifted Wave",
    description: "Shift the sine wave to the right by half a cycle!",
    targetFunction: "Sine Wave",
    targetParams: { amplitude: 1, frequency: 1, phase: -Math.PI / 2, offset: 0 },
    difficulty: "medium",
    hint: "Try adjusting the Phase Shift (C) to move the wave horizontally.",
    icon: <Target size={16} />,
  },
  {
    name: "Super Growth",
    description: "Make the growth function grow twice as fast!",
    targetFunction: "Growth",
    targetParams: { amplitude: 0.2, frequency: 1, phase: 0, offset: 0 },
    difficulty: "hard",
    hint: "Try increasing the Frequency (B) to make the growth function steeper.",
    icon: <Trophy size={16} />,
  },
]

// Function to check if two parameter sets are close enough
const areParamsClose = (params1: FunctionParams, params2: FunctionParams, tolerance = 0.2): boolean => {
  return (
    Math.abs(params1.amplitude - params2.amplitude) <= tolerance &&
    Math.abs(params1.frequency - params2.frequency) <= tolerance &&
    Math.abs(params1.phase - params2.phase) <= tolerance * Math.PI &&
    Math.abs(params1.offset - params2.offset) <= tolerance
  )
}

export default function InteractiveFunctionGraph({
  initialFunc = "Sine Wave",
  height = 300,
  className = "",
}: InteractiveFunctionGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const drawingRef = useRef<{ isDrawing: boolean; points: { x: number; y: number }[] }>({
    isDrawing: false,
    points: [],
  })

  const [width, setWidth] = useState(0)
  const [selectedFunction, setSelectedFunction] = useState(
    availableFunctions.find((f) => f.name === initialFunc) || availableFunctions[0],
  )
  const [params, setParams] = useState<FunctionParams>(selectedFunction.defaultParams)
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number; value: number } | null>(null)
  const [showControls, setShowControls] = useState(true)
  const [showFunFact, setShowFunFact] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [partyMode, setPartyMode] = useState(false)
  const [xRange, setXRange] = useState<[number, number]>([-Math.PI * 2, Math.PI * 2])
  const [yRange, setYRange] = useState<[number, number]>([-2, 2])
  const [showHelp, setShowHelp] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [gameMode, setGameMode] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [challengeComplete, setChallengeComplete] = useState(false)
  const [challengesCompleted, setChallengesCompleted] = useState<number[]>([])
  const [drawMode, setDrawMode] = useState(false)
  const [userDrawing, setUserDrawing] = useState<{ x: number; y: number }[]>([])
  const [mascotMessage, setMascotMessage] = useState<string | null>(null)
  const [mascotMood, setMascotMood] = useState<"happy" | "neutral" | "excited">("neutral")

  // Update width on resize
  useEffect(() => {
    if (!svgRef.current) return

    const updateWidth = () => {
      if (svgRef.current) {
        setWidth(svgRef.current.clientWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  // Initialize audio context
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Update y-range when function or parameters change
  useEffect(() => {
    // Calculate appropriate y-range based on function and parameters
    const samples = 100
    const step = (xRange[1] - xRange[0]) / samples
    let minY = Number.POSITIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY

    for (let i = 0; i <= samples; i++) {
      const x = xRange[0] + i * step
      const y = selectedFunction.func(x, params)

      if (y !== null && !isNaN(y) && isFinite(y)) {
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }

    // Add some padding
    const padding = Math.max(0.5, (maxY - minY) * 0.2)
    setYRange([
      minY === Number.POSITIVE_INFINITY ? -2 : minY - padding,
      maxY === Number.NEGATIVE_INFINITY ? 2 : maxY + padding,
    ])
  }, [selectedFunction, params, xRange])

  // Check challenge completion
  useEffect(() => {
    if (gameMode && currentChallenge) {
      const targetFunction = availableFunctions.find((f) => f.name === currentChallenge.targetFunction)
      if (targetFunction && selectedFunction.name === targetFunction.name) {
        if (areParamsClose(params, currentChallenge.targetParams)) {
          if (!challengeComplete) {
            setChallengeComplete(true)
            // Trigger celebration
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#3b82f6", "#14b8a6", "#d97706", "#ec4899"],
            })

            // Update completed challenges
            if (!challengesCompleted.includes(challenges.indexOf(currentChallenge))) {
              setChallengesCompleted([...challengesCompleted, challenges.indexOf(currentChallenge)])
            }

            // Show mascot celebration
            setMascotMessage("Amazing job! You completed the challenge! 🎉")
            setMascotMood("excited")

            // Reset mascot after delay
            setTimeout(() => {
              setMascotMessage(null)
              setMascotMood("happy")
            }, 5000)
          }
        } else {
          setChallengeComplete(false)
        }
      } else {
        setChallengeComplete(false)
      }
    }
  }, [gameMode, currentChallenge, selectedFunction, params, challengeComplete, challengesCompleted])

  // Mapping functions for coordinates
  const mapX = (x: number): number => {
    return ((x - xRange[0]) / (xRange[1] - xRange[0])) * width
  }

  const mapY = (y: number): number => {
    return height - ((y - yRange[0]) / (yRange[1] - yRange[0])) * height
  }

  const unmapX = (x: number): number => {
    return xRange[0] + (x / width) * (xRange[1] - xRange[0])
  }

  const unmapY = (y: number): number => {
    return yRange[1] - (y / height) * (yRange[1] - yRange[0])
  }

  // Generate path for the function
  const generatePath = (funcToUse = selectedFunction, paramsToUse = params): string => {
    if (width === 0) return ""

    const points: { x: number; y: number }[] = []
    const step = (xRange[1] - xRange[0]) / 200
    const pathParts: string[] = []
    let currentPath = ""

    for (let x = xRange[0]; x <= xRange[1]; x += step) {
      const y = funcToUse.func(x, paramsToUse)

      if (y !== null && !isNaN(y) && isFinite(y)) {
        const mappedX = mapX(x)
        const mappedY = mapY(y)

        if (currentPath === "") {
          currentPath = `M ${mappedX} ${mappedY}`
        } else {
          currentPath += ` L ${mappedX} ${mappedY}`
        }
      } else if (currentPath !== "") {
        // If we hit a discontinuity, end the current path and start a new one
        pathParts.push(currentPath)
        currentPath = ""
      }
    }

    if (currentPath !== "") {
      pathParts.push(currentPath)
    }

    return pathParts.join(" ")
  }

  // Generate path for user drawing
  const generateDrawingPath = (): string => {
    if (userDrawing.length < 2) return ""

    return userDrawing.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`
      } else {
        return `${path} L ${point.x} ${point.y}`
      }
    }, "")
  }

  // Handle mouse movement for interactive exploration
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return

    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (drawMode && drawingRef.current.isDrawing) {
      // Add point to drawing
      const newPoints = [...userDrawing, { x, y }]
      setUserDrawing(newPoints)
      return
    }

    const mappedX = unmapX(x)
    const funcY = selectedFunction.func(mappedX, params)

    if (funcY !== null && !isNaN(funcY) && isFinite(funcY)) {
      setHoverPoint({
        x: mapX(mappedX),
        y: mapY(funcY),
        value: funcY,
      })

      // Update sound if enabled
      if (soundEnabled) {
        updateSound(funcY)
      }
    } else {
      setHoverPoint(null)
      if (soundEnabled && gainNodeRef.current) {
        gainNodeRef.current.gain.value = 0
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (drawMode) {
      drawingRef.current.isDrawing = true
      const rect = svgRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setUserDrawing([{ x, y }])
      }
    }
  }

  const handleMouseUp = () => {
    if (drawMode) {
      drawingRef.current.isDrawing = false
    }
  }

  const handleMouseLeave = () => {
    setHoverPoint(null)
    if (soundEnabled && gainNodeRef.current) {
      gainNodeRef.current.gain.value = 0
    }
    if (drawMode) {
      drawingRef.current.isDrawing = false
    }
  }

  // Sound generation based on function value
  const updateSound = (y: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      oscillatorRef.current = audioContextRef.current.createOscillator()
      gainNodeRef.current = audioContextRef.current.createGain()

      oscillatorRef.current.connect(gainNodeRef.current)
      gainNodeRef.current.connect(audioContextRef.current.destination)

      oscillatorRef.current.type = "sine"
      oscillatorRef.current.start()
    }

    if (oscillatorRef.current && gainNodeRef.current) {
      // Map y value to frequency between 220Hz and 880Hz (A3 to A5)
      const normalizedY = (y - yRange[0]) / (yRange[1] - yRange[0])
      const frequency = 220 + normalizedY * 660
      oscillatorRef.current.frequency.value = Math.max(110, Math.min(1320, frequency))

      // Set volume
      gainNodeRef.current.gain.value = 0.2
    }
  }

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    if (!soundEnabled && hoverPoint) {
      updateSound(hoverPoint.value)
    } else if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = 0
    }
  }

  // Handle function change
  const changeFunction = (funcName: string) => {
    const newFunc = availableFunctions.find((f) => f.name === funcName)
    if (newFunc) {
      setSelectedFunction(newFunc)
      setParams(newFunc.defaultParams)
      setShowFunFact(true)

      // Show mascot message
      setMascotMessage(`Wow! Check out this ${newFunc.kidDescription} It's SUPER cool!`)

      setMascotMood("happy")

      // Hide fun fact and mascot message after delay
      setTimeout(() => {
        setShowFunFact(false)
        setMascotMessage(null)
      }, 6000)
    }
  }

  // Reset parameters to default
  const resetParams = () => {
    setParams(selectedFunction.defaultParams)

    // Show mascot message
    setMascotMessage("All reset! Let's start fresh!")
    setTimeout(() => setMascotMessage(null), 3000)
  }

  // Toggle party mode
  const togglePartyMode = () => {
    setPartyMode(!partyMode)

    if (!partyMode) {
      // Trigger confetti
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
      })

      // Trigger math party mode event
      const partyEvent = new CustomEvent("mathPartyMode")
      window.dispatchEvent(partyEvent)

      // Show mascot message
      setMascotMessage("WOOHOO! MATH PARTY TIME! 🎉🎊🎈 Everything is AWESOME!")
      setMascotMood("excited")
    } else {
      setMascotMessage("Party's over... for now!")
      setMascotMood("neutral")
    }

    // Reset mascot after delay
    setTimeout(() => setMascotMessage(null), 3000)
  }

  // Toggle game mode
  const toggleGameMode = () => {
    setGameMode(!gameMode)
    if (!gameMode) {
      // Start with first challenge
      setCurrentChallenge(challenges[0])
      setChallengeComplete(false)

      // Show mascot message
      setMascotMessage("GAME MODE ACTIVATED! 🎮 Complete challenges to earn SUPER COOL stars! ⭐⭐⭐")
      setMascotMood("excited")
    } else {
      setCurrentChallenge(null)

      // Show mascot message
      setMascotMessage("Back to exploration mode!")
      setMascotMood("neutral")
    }

    // Reset mascot after delay
    setTimeout(() => setMascotMessage(null), 4000)
  }

  // Select a challenge
  const selectChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge)
    setChallengeComplete(false)

    // Set function to match challenge
    const targetFunction = availableFunctions.find((f) => f.name === challenge.targetFunction)
    if (targetFunction) {
      setSelectedFunction(targetFunction)
      setParams(targetFunction.defaultParams)
    }

    // Show mascot message
    setMascotMessage(`New challenge: ${challenge.description}`)
    setMascotMood("excited")

    // Reset mascot after delay
    setTimeout(() => setMascotMessage(null), 4000)
  }

  // Toggle draw mode
  const toggleDrawMode = () => {
    setDrawMode(!drawMode)
    if (!drawMode) {
      setUserDrawing([])

      // Show mascot message
      setMascotMessage("Draw mode activated! Try drawing your own function!")
      setMascotMood("excited")
    } else {
      // Show mascot message
      setMascotMessage("Nice drawing! Back to function mode.")
      setMascotMood("happy")
    }

    // Reset mascot after delay
    setTimeout(() => setMascotMessage(null), 4000)
  }

  // Clear drawing
  const clearDrawing = () => {
    setUserDrawing([])

    // Show mascot message
    setMascotMessage("All clear! Draw something new!")
    setTimeout(() => setMascotMessage(null), 3000)
  }

  // Parameter labels with kid-friendly descriptions
  const paramLabels = {
    amplitude: {
      label: "Height Knob 📏",
      description: "Makes the function taller or shorter",
    },
    frequency: {
      label: "Speed Dial 🏎️",
      description: "Makes the function repeat faster or slower",
    },
    phase: {
      label: "Slide Control 🛝",
      description: "Moves the function left or right",
    },
    offset: {
      label: "Elevator Button 🛗",
      description: "Moves the whole function up or down",
    },
  }

  // Tutorial steps
  const tutorialSteps = [
    {
      title: "Welcome to the AWESOME Function Explorer! 🚀",
      content:
        "This magical tool lets you play with math functions and see them come to life! Let's learn how to use it!",
      highlight: null,
    },
    {
      title: "Pick a Function! 🎯",
      content:
        "Start by choosing a cool function from the buttons at the top. Each one makes a different squiggly shape!",
      highlight: "function-buttons",
    },
    {
      title: "Twist the Knobs! 🎛️",
      content:
        "Use these super cool sliders to change how the function looks. Slide them around and watch the magic happen!",
      highlight: "parameter-controls",
    },
    {
      title: "Explore the Graph! 🔍",
      content: "Move your mouse over the graph to see the exact values. It's like having X-ray vision for math!",
      highlight: "graph-area",
    },
    {
      title: "Try the SUPER FUN Modes! 🎪",
      content:
        "Enable sound to HEAR your function, or try PARTY MODE for extra awesomeness! You can also play games or draw your own crazy functions!",
      highlight: "fun-buttons",
    },
    {
      title: "You're a MATH SUPERHERO Now! 🦸‍♂️",
      content: "Now you know how to use the Function Explorer! Go forth and discover the amazing world of math!",
      highlight: null,
    },
  ]

  return (
    <div className={`function-explorer ${className} relative`}>
      {/* Math Mascot */}
      <AnimatePresence>
        {mascotMessage && (
          <motion.div
            className="absolute -top-16 right-0 z-10 max-w-xs"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", damping: 12 }}
          >
            <div className="bg-white rounded-lg p-3 shadow-lg border-2 border-violet relative">
              <p className="text-sm">{mascotMessage}</p>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-violet transform rotate-45"></div>
            </div>
            <div className="flex justify-end mt-2 mr-8">
              <div className="w-12 h-12 bg-violet rounded-full flex items-center justify-center text-white text-xl">
                {mascotMood === "happy" ? "😊" : mascotMood === "excited" ? "🤩" : "🧐"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode toggles */}
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <Button
          variant={gameMode ? "default" : "outline"}
          size="sm"
          className={`text-xs flex items-center gap-1 ${gameMode ? "bg-violet text-white" : ""}`}
          onClick={toggleGameMode}
        >
          <Gamepad size={14} />
          {gameMode ? "Exit Game Mode" : "Game Mode"}
          {challengesCompleted.length > 0 && (
            <span className="ml-1 bg-yellow-400 text-navy rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {challengesCompleted.length}
            </span>
          )}
        </Button>

        <Button
          variant={drawMode ? "default" : "outline"}
          size="sm"
          className={`text-xs flex items-center gap-1 ${drawMode ? "bg-teal text-white" : ""}`}
          onClick={toggleDrawMode}
        >
          <Pencil size={14} />
          {drawMode ? "Exit Draw Mode" : "Draw Mode"}
        </Button>

        <Button
          variant={partyMode ? "default" : "outline"}
          size="sm"
          className={`text-xs flex items-center gap-1 ${partyMode ? "bg-gradient-to-r from-violet to-teal text-white" : ""}`}
          onClick={togglePartyMode}
        >
          <Sparkles size={14} />
          Party Mode
        </Button>

        <Button
          variant={soundEnabled ? "default" : "outline"}
          size="sm"
          className={`text-xs flex items-center gap-1 ${soundEnabled ? "bg-goldenrod text-white" : ""}`}
          onClick={toggleSound}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          Sound
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={() => setShowTutorial(true)}
        >
          <Lightbulb size={14} />
          Tutorial
        </Button>
      </div>

      {/* Game mode challenges */}
      {gameMode && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="bg-violet/10 rounded-lg p-3 border border-violet/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-navy flex items-center gap-1">
                <Trophy size={16} className="text-violet" />
                Function Challenges
              </h3>
              <div className="text-xs text-navy/60">
                {challengesCompleted.length}/{challenges.length} completed
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {challenges.map((challenge, index) => (
                <Button
                  key={index}
                  variant={currentChallenge === challenge ? "default" : "outline"}
                  size="sm"
                  className={`text-xs flex items-center gap-1 ${
                    challengesCompleted.includes(index)
                      ? "border-green-500 text-green-600"
                      : currentChallenge === challenge
                        ? "bg-violet text-white"
                        : ""
                  }`}
                  onClick={() => selectChallenge(challenge)}
                >
                  {challenge.icon}
                  {challenge.name}
                  {challengesCompleted.includes(index) && (
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  )}
                </Button>
              ))}
            </div>

            {currentChallenge && (
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-navy">{currentChallenge.name}</h4>
                  <div
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      currentChallenge.difficulty === "easy"
                        ? "bg-green-100 text-green-600"
                        : currentChallenge.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {currentChallenge.difficulty}
                  </div>
                </div>
                <p className="text-sm text-navy/80 mb-2">{currentChallenge.description}</p>

                {/* Target function visualization */}
                <div className="relative h-20 bg-navy/5 rounded-md mb-2 overflow-hidden">
                  <svg width="100%" height="100%">
                    {/* Target function */}
                    {(() => {
                      const targetFunc = availableFunctions.find((f) => f.name === currentChallenge.targetFunction)
                      if (targetFunc) {
                        return (
                          <path
                            d={generatePath(targetFunc, currentChallenge.targetParams)}
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                            fill="none"
                            opacity="0.5"
                          />
                        )
                      }
                      return null
                    })()}
                  </svg>
                  <div className="absolute top-2 left-2 text-xs text-navy/60">Target function</div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs flex items-center gap-1"
                    onClick={() => {
                      // Show hint
                      setMascotMessage(`Hint: ${currentChallenge.hint}`)
                      setTimeout(() => setMascotMessage(null), 5000)
                    }}
                  >
                    <Lightbulb size={14} />
                    Hint
                  </Button>

                  {challengeComplete ? (
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <Check size={16} />
                      Challenge Complete!
                    </div>
                  ) : (
                    <div className="text-xs text-navy/60">Adjust the function to match the target</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Function selection */}
      {!gameMode && !drawMode && (
        <div className="mb-4 flex flex-wrap gap-2 justify-center" id="function-buttons">
          {availableFunctions.map((func) => (
            <Button
              key={func.name}
              variant={selectedFunction.name === func.name ? "default" : "outline"}
              size="sm"
              className={`text-xs ${selectedFunction.name === func.name ? "bg-" + func.name.toLowerCase().replace(/\s+/g, "-") : ""}`}
              style={{
                backgroundColor: selectedFunction.name === func.name ? func.color : "",
                color: selectedFunction.name === func.name ? "white" : "",
                borderColor: selectedFunction.name !== func.name ? func.color : "",
              }}
              onClick={() => changeFunction(func.name)}
            >
              <span className="mr-1">{func.icon}</span>
              {func.name}
            </Button>
          ))}
        </div>
      )}

      {/* Function equation */}
      {!drawMode && (
        <div className="text-center mb-4">
          <motion.div
            className="inline-block bg-white/80 px-4 py-2 rounded-full shadow-sm font-mono text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedFunction.name}
          >
            {selectedFunction.equation}
          </motion.div>
        </div>
      )}

      {/* Graph */}
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden border border-navy/10" id="graph-area">
        {/* Party mode background */}
        {partyMode && (
          <div className="absolute inset-0 bg-gradient-to-r from-violet via-teal to-goldenrod opacity-20 animate-pulse"></div>
        )}

        <svg
          ref={svgRef}
          width="100%"
          height={height}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`coordinate-system ${drawMode ? "cursor-crosshair" : ""}`}
        >
          {/* Grid lines */}
          <g className="grid-lines">
            {/* X-axis grid lines */}
            {Array.from({ length: 9 }, (_, i) => {
              const x = xRange[0] + ((i + 1) * (xRange[1] - xRange[0])) / 10
              return (
                <line
                  key={`x-grid-${i}`}
                  x1={mapX(x)}
                  y1="0"
                  x2={mapX(x)}
                  y2={height}
                  stroke="hsl(var(--navy) / 0.1)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              )
            })}

            {/* Y-axis grid lines */}
            {Array.from({ length: 5 }, (_, i) => {
              const y = yRange[0] + ((i + 1) * (yRange[1] - yRange[0])) / 6
              return (
                <line
                  key={`y-grid-${i}`}
                  x1="0"
                  y1={mapY(y)}
                  x2={width}
                  y2={mapY(y)}
                  stroke="hsl(var(--navy) / 0.1)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              )
            })}
          </g>

          {/* X-axis */}
          <line x1="0" y1={mapY(0)} x2={width} y2={mapY(0)} stroke="hsl(var(--navy) / 0.3)" strokeWidth="1.5" />

          {/* Y-axis */}
          <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={height} stroke="hsl(var(--navy) / 0.3)" strokeWidth="1.5" />

          {/* Function path or user drawing */}
          {drawMode ? (
            <path
              d={generateDrawingPath()}
              stroke="#22c55e"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <motion.path
              d={generatePath()}
              stroke={selectedFunction.color}
              strokeWidth="3"
              fill="none"
              className="function-path"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}

          {/* Target function in game mode */}
          {gameMode &&
            currentChallenge &&
            !challengeComplete &&
            (() => {
              const targetFunc = availableFunctions.find((f) => f.name === currentChallenge.targetFunction)
              if (targetFunc) {
                return (
                  <path
                    d={generatePath(targetFunc, currentChallenge.targetParams)}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    fill="none"
                    opacity="0.5"
                  />
                )
              }
              return null
            })()}

          {/* Hover point */}
          {hoverPoint && !drawMode && (
            <g>
              <motion.circle
                cx={hoverPoint.x}
                cy={hoverPoint.y}
                r={partyMode ? 8 : 6}
                fill={selectedFunction.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <line
                x1={hoverPoint.x}
                y1={mapY(0)}
                x2={hoverPoint.x}
                y2={hoverPoint.y}
                stroke={selectedFunction.color}
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <line
                x1={mapX(0)}
                y1={hoverPoint.y}
                x2={hoverPoint.x}
                y2={hoverPoint.y}
                stroke={selectedFunction.color}
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* Coordinates */}
              <g transform={`translate(${hoverPoint.x + 10}, ${hoverPoint.y - 10})`}>
                <rect
                  x="-5"
                  y="-20"
                  width="110"
                  height="25"
                  rx="4"
                  fill="white"
                  fillOpacity="0.9"
                  stroke={selectedFunction.color}
                  strokeWidth="1"
                />
                <text x="0" y="-5" fontSize="12" fontFamily="monospace" fill="hsl(var(--navy))">
                  f({unmapX(hoverPoint.x).toFixed(2)}) = {hoverPoint.value.toFixed(2)}
                </text>
              </g>
            </g>
          )}

          {/* Party mode particles */}
          {partyMode && (
            <g className="particles">
              {Array.from({ length: 20 }, (_, i) => {
                const x = Math.random() * width
                const y = Math.random() * height
                const size = 2 + Math.random() * 4
                return (
                  <motion.circle
                    key={`particle-${i}`}
                    cx={x}
                    cy={y}
                    r={size}
                    fill={availableFunctions[i % availableFunctions.length].color}
                    opacity={0.6}
                    animate={{
                      cx: [x, x + 20 * Math.random() - 10, x],
                      cy: [y, y + 20 * Math.random() - 10, y],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                )
              })}
            </g>
          )}
        </svg>

        {/* Value ranges */}
        <div className="absolute bottom-2 left-2 text-xs text-navy/60 font-mono">
          x: [{xRange[0].toFixed(1)}, {xRange[1].toFixed(1)}] | y: [{yRange[0].toFixed(1)}, {yRange[1].toFixed(1)}]
        </div>

        {/* Controls toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Fun fact popup */}
      <AnimatePresence>
        {showFunFact && (
          <motion.div
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-md z-10 border-2 border-goldenrod"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: [0.95, 1.02, 1] }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-goldenrod flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium mb-1 text-goldenrod">Fun Fact:</div>
                <p className="text-navy">{selectedFunction.funFact}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <AnimatePresence>
        {showControls && !drawMode && (
          <motion.div
            className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-navy/10 shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="parameter-controls"
          >
            <div className="grid gap-4">
              {/* Parameter sliders */}
              {Object.entries(params).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-sm font-medium text-navy">
                        {paramLabels[key as keyof typeof paramLabels].label}
                      </label>
                      <p className="text-xs text-navy/60">{paramLabels[key as keyof typeof paramLabels].description}</p>
                    </div>
                    <span className="text-xs font-mono bg-navy/5 px-2 py-1 rounded">{value.toFixed(2)}</span>
                  </div>
                  <Slider
                    value={[value]}
                    min={key === "amplitude" ? -3 : -10}
                    max={key === "amplitude" ? 3 : 10}
                    step={0.1}
                    onValueChange={(newValue) => {
                      setParams({
                        ...params,
                        [key]: newValue[0],
                      })
                    }}
                  />
                </div>
              ))}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 justify-between mt-2" id="fun-buttons">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetParams} className="flex items-center gap-1">
                    <RefreshCw size={14} />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draw mode controls */}
      <AnimatePresence>
        {drawMode && (
          <motion.div
            className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-navy/10 shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-navy">Drawing Mode</h3>
              <Button variant="outline" size="sm" onClick={clearDrawing} className="flex items-center gap-1">
                <Trash2 size={14} />
                Clear
              </Button>
            </div>
            <p className="text-sm text-navy/70 mt-2">Click and drag on the graph to draw your own function!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutorial overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-navy mb-2">{tutorialSteps[tutorialStep].title}</h2>
              <p className="text-navy/80 mb-6">{tutorialSteps[tutorialStep].content}</p>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (tutorialStep > 0 ? setTutorialStep(tutorialStep - 1) : setShowTutorial(false))}
                >
                  {tutorialStep > 0 ? "Previous" : "Close"}
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  className="bg-violet text-white"
                  onClick={() => {
                    if (tutorialStep < tutorialSteps.length - 1) {
                      setTutorialStep(tutorialStep + 1)
                    } else {
                      setShowTutorial(false)
                    }
                  }}
                >
                  {tutorialStep < tutorialSteps.length - 1 ? "Next" : "Finish"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
