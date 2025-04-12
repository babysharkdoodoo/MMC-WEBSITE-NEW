"use client"

import { useState, useEffect, useRef } from "react"
import { Lightbulb, Check, X, Award, Sparkles, Brain, ChevronRight, ChevronLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

// Middle school friendly math puzzles
const puzzles = [
  {
    id: 1,
    question: "If you have 3 quarters, 4 dimes, and 2 nickels, how much money do you have in total?",
    hint: "A quarter is 25¢, a dime is 10¢, and a nickel is 5¢.",
    answer: "$1.15",
    alternateAnswers: ["1.15", "115 cents", "115¢", "115"],
    explanation:
      "3 quarters = 3 × 25¢ = 75¢\n4 dimes = 4 × 10¢ = 40¢\n2 nickels = 2 × 5¢ = 10¢\nTotal: 75¢ + 40¢ + 10¢ = 125¢ = $1.15",
    funFact: "The word 'nickel' comes from the German word 'kupfernickel', which means 'devil's copper'!",
    difficulty: "easy",
    category: "money",
  },
  {
    id: 2,
    question: "What comes next in this pattern? 2, 4, 8, 16, ___",
    hint: "Each number is related to the one before it by the same operation.",
    answer: "32",
    explanation:
      "Each number is doubled to get the next number in the sequence.\n2 × 2 = 4\n4 × 2 = 8\n8 × 2 = 16\n16 × 2 = 32",
    funFact:
      "This is a geometric sequence with a common ratio of 2. These sequences appear in many places in nature, like the growth of bacteria!",
    difficulty: "easy",
    category: "patterns",
  },
  {
    id: 3,
    question: "A recipe calls for 3/4 cup of flour. If you want to make 1/2 of the recipe, how much flour do you need?",
    hint: "To find half of a fraction, you can multiply it by 1/2.",
    answer: "3/8",
    alternateAnswers: ["3/8 cup", "0.375", "0.375 cup", "3/8 cups"],
    explanation: "Half of 3/4 is (3/4) × (1/2) = 3/8 cup of flour.",
    funFact:
      "Fractions were first used by ancient Egyptians around 1800 BCE, but they only used unit fractions (with 1 as the numerator)!",
    difficulty: "medium",
    category: "fractions",
  },
  {
    id: 4,
    question: "If a square has a perimeter of 20 inches, what is its area?",
    hint: "The perimeter is the sum of all sides. In a square, all sides are equal.",
    answer: "25",
    alternateAnswers: ["25 square inches", "25 in²", "25 sq in"],
    explanation:
      "If the perimeter is 20 inches, then each side is 20 ÷ 4 = 5 inches.\nThe area of a square is side × side = 5 × 5 = 25 square inches.",
    funFact: "The square is the only regular polygon where the perimeter equals 4 times the square root of the area!",
    difficulty: "medium",
    category: "geometry",
  },
  {
    id: 5,
    question: "A train travels 120 miles in 2 hours. How far will it travel in 5 hours at the same speed?",
    hint: "First find the speed of the train, then use that to calculate the distance for 5 hours.",
    answer: "300",
    alternateAnswers: ["300 miles", "300mi"],
    explanation:
      "Speed = Distance ÷ Time = 120 miles ÷ 2 hours = 60 miles per hour\nDistance = Speed × Time = 60 miles per hour × 5 hours = 300 miles",
    funFact: "The world's fastest train is the Shanghai Maglev in China, which can reach speeds of 268 miles per hour!",
    difficulty: "medium",
    category: "rate problems",
  },
  {
    id: 6,
    question: "If today is Tuesday, what day of the week will it be 100 days from now?",
    hint: "Think about how many complete weeks are in 100 days, and what's left over.",
    answer: "Thursday",
    explanation:
      "There are 7 days in a week. 100 ÷ 7 = 14 remainder 2.\nSo 100 days = 14 weeks and 2 days.\n14 weeks later would still be Tuesday, and 2 more days would be Thursday.",
    funFact: "The 7-day week originated in ancient Babylon and was adopted by many cultures around the world!",
    difficulty: "medium",
    category: "calendar math",
  },
  {
    id: 7,
    question: "What is the missing number? 7, 12, 17, 22, ___, 32",
    hint: "Look at how much each number increases from the previous one.",
    answer: "27",
    explanation: "Each number increases by 5:\n7 + 5 = 12\n12 + 5 = 17\n17 + 5 = 22\n22 + 5 = 27\n27 + 5 = 32",
    funFact:
      "This is an arithmetic sequence with a common difference of 5. Arithmetic sequences were studied by ancient Greek mathematicians over 2,500 years ago!",
    difficulty: "easy",
    category: "patterns",
  },
  {
    id: 8,
    question:
      "If 3 cats can catch 3 mice in 3 minutes, how many cats would be needed to catch 100 mice in 100 minutes?",
    hint: "Think about how many mice one cat can catch in one minute.",
    answer: "3",
    explanation:
      "If 3 cats can catch 3 mice in 3 minutes, then 1 cat can catch 1 mouse in 3 minutes, or each cat catches 1/3 of a mouse per minute.\nSo 3 cats catch 3 × (1/3) = 1 mouse per minute.\nIn 100 minutes, they would catch 100 mice.\nSo we still need just 3 cats!",
    funFact:
      "This is a classic 'rate problem' that shows how important it is to find the right relationship between quantities!",
    difficulty: "hard",
    category: "logic",
  },
  {
    id: 9,
    question: "A pizza was cut into 8 equal slices. If 3 people each ate 2 slices, how much of the pizza is left?",
    hint: "First find how many slices were eaten in total, then compare to the whole pizza.",
    answer: "1/4",
    alternateAnswers: ["0.25", "25%", "2/8", "two slices", "2 slices"],
    explanation:
      "3 people × 2 slices each = 6 slices eaten\nTotal slices = 8\nSlices left = 8 - 6 = 2\nFraction of pizza left = 2/8 = 1/4",
    funFact: "The world's largest pizza was made in Rome, Italy in 2012 and measured over 13,580 square feet!",
    difficulty: "easy",
    category: "fractions",
  },
  {
    id: 10,
    question: "If the sum of two numbers is 20 and their difference is 4, what are the two numbers?",
    hint: "Let's call the numbers a and b. We know that a + b = 20 and a - b = 4.",
    answer: "12 and 8",
    alternateAnswers: ["12, 8", "8, 12", "8 and 12", "(12,8)", "(8,12)"],
    explanation:
      "Let's call the numbers a and b.\nWe know that a + b = 20 and a - b = 4.\nFrom the first equation: b = 20 - a\nSubstituting into the second equation: a - (20 - a) = 4\nSolving: a - 20 + a = 4\n2a - 20 = 4\n2a = 24\na = 12\nThen b = 20 - 12 = 8\nSo the numbers are 12 and 8.",
    funFact:
      "This type of problem is called a 'system of equations' and has been solved by mathematicians for thousands of years!",
    difficulty: "hard",
    category: "algebra",
  },
]

// Fun math jokes for kids
const mathJokes = [
  "Why was the equal sign so humble? Because it knew it wasn't greater than or less than anyone else!",
  "What do you call a number that can't keep still? A roamin' numeral!",
  "Why was the math book sad? Because it had too many problems!",
  "What did the zero say to the eight? Nice belt!",
  "Why is 6 afraid of 7? Because 7 8 9!",
  "What's a math teacher's favorite dessert? Pi!",
  "Why did the two fours skip lunch? They already 8!",
  "What do you call a hen who counts her eggs? A mathema-chicken!",
  "Why did the student do multiplication problems on the floor? The teacher told them not to use tables!",
  "What's the best way to serve pi? A la mode. Anything else is mean!",
  "Why did the triangle go to the beach? To get a tan!",
  "What's a mathematician's favorite snake? A pi-thon!",
  "Why did the obtuse angle go to the beach? Because it was over 90 degrees!",
  "What do you call friends who love math? Algebros!",
  "Why couldn't the angle get a loan? Its parents wouldn't cosine!",
  "What do mathematicians eat on Halloween? Pumpkin Pi!",
]

export default function MathPuzzle() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showJoke, setShowJoke] = useState(false)
  const [currentJoke, setCurrentJoke] = useState("")
  const [difficultyLevel, setDifficultyLevel] = useState<"easy" | "medium" | "hard" | "all">("all")
  const [timerActive, setTimerActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [partyMode, setPartyMode] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const currentPuzzle = puzzles[currentPuzzleIndex]
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Focus the input field when puzzle changes
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Reset timer when puzzle changes
    if (timerActive) {
      setTimeRemaining(30)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentPuzzleIndex, timerActive])

  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setFeedback("incorrect")
      setStreak(0)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timerActive, timeRemaining])

  const checkAnswer = () => {
    const isCorrect = checkIfCorrect(userAnswer, currentPuzzle)
    setIsCorrect(userAnswer.trim() === currentPuzzle.answer)

    if (isCorrect) {
      setFeedback("correct")
      setShowExplanation(true)
      setStreak(streak + 1)

      // Stop timer if active
      if (timerActive) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }

      // Show confetti for correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#14B8A6", "#F59E0B"],
      })

      // Show random joke after a correct answer
      const randomJoke = mathJokes[Math.floor(Math.random() * mathJokes.length)]
      setCurrentJoke(randomJoke)
      setShowJoke(true)

      // Activate party mode after 3 correct answers in a row
      if (streak >= 2) {
        setPartyMode(true)
        setTimeout(() => setPartyMode(false), 3000)
      }
    } else {
      setFeedback("incorrect")
      // Reset streak on wrong answer
      setStreak(0)
    }
  }

  const checkIfCorrect = (userAnswer: string, puzzle: (typeof puzzles)[0]) => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase()

    if (normalizedUserAnswer === puzzle.answer.toLowerCase()) {
      return true
    }

    // Check alternate answers if they exist
    if (puzzle.alternateAnswers) {
      return puzzle.alternateAnswers.some((alt) => normalizedUserAnswer === alt.toLowerCase())
    }

    return false
  }

  const nextPuzzle = () => {
    // Filter puzzles by difficulty if needed
    let filteredPuzzles = puzzles

    if (difficultyLevel !== "all") {
      filteredPuzzles = filteredPuzzles.filter((p) => p.difficulty === difficultyLevel)
    }

    if (filteredPuzzles.length === 0) {
      // If no puzzles match the filter, reset to all
      setDifficultyLevel("all")
      setCurrentPuzzleIndex((prev) => (prev + 1) % puzzles.length)
    } else {
      // Find the index of the current puzzle in the filtered list
      const currentFilteredIndex = filteredPuzzles.findIndex((p) => p.id === currentPuzzle.id)

      // Get the next puzzle in the filtered list
      const nextFilteredIndex = (currentFilteredIndex + 1) % filteredPuzzles.length
      const nextPuzzleId = filteredPuzzles[nextFilteredIndex].id

      // Find this puzzle in the original list
      const nextIndex = puzzles.findIndex((p) => p.id === nextPuzzleId)
      setCurrentPuzzleIndex(nextIndex)
    }

    setShowHint(false)
    setUserAnswer("")
    setFeedback(null)
    setShowExplanation(false)
    setShowJoke(false)
    setIsCorrect(null)

    // Reset timer if active
    if (timerActive) {
      setTimeRemaining(30)
    }
  }

  const previousPuzzle = () => {
    // Similar to nextPuzzle but going backwards
    let filteredPuzzles = puzzles

    if (difficultyLevel !== "all") {
      filteredPuzzles = filteredPuzzles.filter((p) => p.difficulty === difficultyLevel)
    }

    if (filteredPuzzles.length === 0) {
      setDifficultyLevel("all")
      setCurrentPuzzleIndex((prev) => (prev - 1 + puzzles.length) % puzzles.length)
    } else {
      const currentFilteredIndex = filteredPuzzles.findIndex((p) => p.id === currentPuzzle.id)
      const prevFilteredIndex = (currentFilteredIndex - 1 + filteredPuzzles.length) % filteredPuzzles.length
      const prevPuzzleId = filteredPuzzles[prevFilteredIndex].id
      const prevIndex = puzzles.findIndex((p) => p.id === prevPuzzleId)
      setCurrentPuzzleIndex(prevIndex)
    }

    setShowHint(false)
    setUserAnswer("")
    setFeedback(null)
    setShowExplanation(false)
    setShowJoke(false)
    setIsCorrect(null)

    // Reset timer if active
    if (timerActive) {
      setTimeRemaining(30)
    }
  }

  const changeDifficulty = (level: "easy" | "medium" | "hard" | "all") => {
    setDifficultyLevel(level)

    // Find a puzzle with the selected difficulty
    if (level !== "all" && currentPuzzle.difficulty !== level) {
      const filteredPuzzles = puzzles.filter((p) => p.difficulty === level)
      if (filteredPuzzles.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredPuzzles.length)
        const newPuzzleId = filteredPuzzles[randomIndex].id
        const newIndex = puzzles.findIndex((p) => p.id === newPuzzleId)
        setCurrentPuzzleIndex(newIndex)

        // Reset state for new puzzle
        setShowHint(false)
        setUserAnswer("")
        setFeedback(null)
        setShowExplanation(false)
        setShowJoke(false)
        setIsCorrect(null)

        // Reset timer if active
        if (timerActive) {
          setTimeRemaining(30)
        }
      }
    }
  }

  const toggleTimer = () => {
    setTimerActive(!timerActive)
    if (!timerActive) {
      setTimeRemaining(30)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "hard":
        return "text-red-500"
      default:
        return "text-navy"
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        {/* Difficulty selector */}
        <div className="inline-flex bg-violet/10 rounded-full p-1">
          {["easy", "medium", "hard", "all"].map((level) => (
            <button
              key={level}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                difficultyLevel === level ? "bg-violet text-white font-medium" : "text-navy/70 hover:bg-violet/20"
              }`}
              onClick={() => changeDifficulty(level as any)}
            >
              {level === "all" ? "All" : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Timer toggle */}
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-colors ${
            timerActive ? "bg-violet text-white" : "bg-violet/10 text-navy/70 hover:bg-violet/20"
          }`}
        >
          <Clock className="h-3 w-3" />
          {timerActive ? "Timer: ON" : "Timer: OFF"}
        </button>
      </div>

      {/* Puzzle card */}
      <motion.div
        className={`bg-white p-5 rounded-lg border ${partyMode ? "border-violet animate-pulse" : "border-navy/10"} shadow-sm`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={currentPuzzle.id}
      >
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs font-medium ${getDifficultyColor(currentPuzzle.difficulty)}`}>
            {currentPuzzle.difficulty.charAt(0).toUpperCase() + currentPuzzle.difficulty.slice(1)}
          </span>

          <div className="flex items-center gap-2">
            {timerActive && (
              <motion.div
                className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                  timeRemaining > 10 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
                animate={{ scale: timeRemaining <= 5 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5, repeat: timeRemaining <= 5 ? Number.POSITIVE_INFINITY : 0 }}
              >
                <Clock className="h-3 w-3" />
                <span className="text-xs font-medium">{timeRemaining}s</span>
              </motion.div>
            )}

            {streak > 0 && (
              <motion.div
                className="flex items-center gap-1 bg-violet/10 px-2 py-1 rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="h-3 w-3 text-violet" />
                <span className="text-xs font-medium text-violet">Streak: {streak}</span>
              </motion.div>
            )}
          </div>
        </div>

        <h3 className="text-navy font-medium mb-4">{currentPuzzle.question}</h3>

        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer..."
              className={`${
                feedback === "correct"
                  ? "border-green-500 focus-visible:ring-green-500"
                  : feedback === "incorrect"
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
              }`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  checkAnswer()
                }
              }}
            />
            <Button
              onClick={checkAnswer}
              className="bg-violet hover:bg-violet/90 text-white transition-all duration-300"
            >
              Check
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-2 text-sm ${feedback === "correct" ? "text-green-600" : "text-red-600"}`}
              >
                {feedback === "correct" ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" />
                    <span>Try again!</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!showHint && !showExplanation && (
            <Button
              variant="ghost"
              size="sm"
              className="text-violet hover:bg-violet/10 hover:text-violet p-0 h-auto flex items-center gap-1"
              onClick={() => setShowHint(true)}
            >
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs">Need a hint?</span>
            </Button>
          )}

          <AnimatePresence>
            {showHint && !showExplanation && (
              <motion.div
                className="bg-violet/10 p-3 rounded-md"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-navy/80">
                  <span className="font-medium text-violet">Hint:</span> {currentPuzzle.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="bg-green-50 p-3 rounded-md border border-green-100">
                  <p className="text-sm text-navy/80 whitespace-pre-line">
                    <span className="font-medium text-green-600">Solution:</span> {currentPuzzle.explanation}
                  </p>
                </div>

                <AnimatePresence>
                  {currentPuzzle.funFact && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-violet/10 p-3 rounded-md"
                    >
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 text-violet flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-navy/80">
                          <span className="font-medium text-violet">Fun Fact:</span> {currentPuzzle.funFact}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showJoke && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-goldenrod/10 p-3 rounded-md"
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-goldenrod flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-navy/80">
                          <span className="font-medium text-goldenrod">Math Joke:</span> {currentJoke}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {streak >= 3 && (
                      <div className="flex items-center gap-1 text-xs">
                        <Award className="h-3 w-3 text-goldenrod" />
                        <span className="text-goldenrod font-medium">
                          {streak >= 10 ? "Math Genius!" : streak >= 5 ? "Math Wizard!" : "On Fire!"}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-violet hover:bg-violet/10 border-violet/20"
                    onClick={nextPuzzle}
                  >
                    Next Puzzle
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between text-xs text-navy/40">
        <button onClick={previousPuzzle} className="flex items-center hover:text-violet transition-colors">
          <ChevronLeft className="h-3 w-3" /> Previous
        </button>
        <span>
          Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
        </span>
        <button onClick={nextPuzzle} className="flex items-center hover:text-violet transition-colors">
          Next <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {isCorrect !== null && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-lg ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {isCorrect ? "Correct! Well done!" : "Not quite right. Try again!"}
        </motion.div>
      )}
    </div>
  )
}

// Add the Clock component that was missing
function Clock(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
