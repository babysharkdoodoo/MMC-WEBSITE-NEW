"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Calculator, Star, Lightbulb } from "lucide-react"

export default function InteractiveNumberTheory() {
  const [number, setNumber] = useState(12)
  const [result, setResult] = useState<number[]>([])
  const [operation, setOperation] = useState("factors")
  const [showHint, setShowHint] = useState(false)
  const [stars, setStars] = useState(0)
  const [funFact, setFunFact] = useState("")

  const numberTheoryFacts = [
    "Every even integer greater than 2 can be expressed as the sum of two primes (Goldbach's Conjecture).",
    "The sum of the first n odd numbers is always n².",
    "The difference of two perfect squares is always the product of their sum and difference.",
    "The number 6174 is known as Kaprekar's constant. Try this: Take any four-digit number, arrange its digits in descending and ascending order, and subtract. Repeat the process and you'll always reach 6174.",
    "Prime numbers greater than 3 can be expressed in the form of 6n+1 or 6n-1, where n is a natural number.",
  ]

  useEffect(() => {
    calculateResult()
    setFunFact(numberTheoryFacts[Math.floor(Math.random() * numberTheoryFacts.length)])
  }, [number, operation])

  const calculateResult = () => {
    if (isNaN(number) || number <= 0 || number > 1000) {
      setResult([])
      return
    }

    switch (operation) {
      case "factors":
        setResult(getFactors(number))
        break
      case "primes":
        setResult(getPrimesUpTo(number))
        break
      case "gcd-lcm":
        // For GCD/LCM we'll just show some examples with the number
        const examples = []
        for (let i = 1; i <= 5; i++) {
          examples.push(number + i)
        }
        setResult(examples)
        break
    }
  }

  const getFactors = (num: number): number[] => {
    const factors = []
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i)
      }
    }
    return factors
  }

  const getPrimesUpTo = (num: number): number[] => {
    const primes = []
    for (let i = 2; i <= num; i++) {
      if (isPrime(i)) {
        primes.push(i)
      }
    }
    return primes
  }

  const isPrime = (num: number): boolean => {
    if (num <= 1) return false
    if (num <= 3) return true
    if (num % 2 === 0 || num % 3 === 0) return false

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false
    }
    return true
  }

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setNumber(isNaN(value) ? 0 : value)
  }

  const handleChallenge = () => {
    // Simple challenge: find a number with exactly 4 factors
    if (operation === "factors" && getFactors(number).length === 4) {
      setStars((prev) => prev + 1)
      alert("Great job! You found a number with exactly 4 factors!")
    } else if (operation === "primes" && isPrime(number)) {
      setStars((prev) => prev + 1)
      alert("Excellent! You found a prime number!")
    } else {
      alert("Try again! Keep exploring!")
    }
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="factors" onValueChange={setOperation} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="factors">Factors</TabsTrigger>
          <TabsTrigger value="primes">Prime Numbers</TabsTrigger>
          <TabsTrigger value="gcd-lcm">GCD & LCM</TabsTrigger>
        </TabsList>

        <TabsContent value="factors">
          <div className="text-sm text-navy/70 mb-2">
            Factors are numbers that divide evenly into another number with no remainder.
          </div>
        </TabsContent>
        <TabsContent value="primes">
          <div className="text-sm text-navy/70 mb-2">Prime numbers have exactly two factors: 1 and themselves.</div>
        </TabsContent>
        <TabsContent value="gcd-lcm">
          <div className="text-sm text-navy/70 mb-2">
            GCD is the largest number that divides two numbers. LCM is the smallest number that is divisible by both.
          </div>
        </TabsContent>

        <div className="space-y-4 mt-2">
          <div>
            <Label htmlFor="number-input">Enter a number (1-1000):</Label>
            <Input
              id="number-input"
              type="number"
              min="1"
              max="1000"
              value={number}
              onChange={handleNumberChange}
              className="mt-1"
            />
          </div>

          <div className="bg-violet/5 p-4 rounded-lg">
            {operation === "factors" && (
              <div>
                <h3 className="font-medium mb-2">Factors of {number}:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.length > 0 ? (
                    result.map((factor) => (
                      <motion.span
                        key={factor}
                        className="inline-block bg-violet/10 px-2 py-1 rounded-md text-violet text-sm"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {factor}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-navy/60">Enter a valid number</span>
                  )}
                </div>
                {result.length > 0 && (
                  <p className="mt-2 text-sm text-navy/70">
                    {number} has {result.length} factors.
                    {isPrime(number) && " This is a prime number!"}
                  </p>
                )}
              </div>
            )}

            {operation === "primes" && (
              <div>
                <h3 className="font-medium mb-2">Prime numbers up to {number}:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.length > 0 ? (
                    result.map((prime) => (
                      <motion.span
                        key={prime}
                        className="inline-block bg-teal/10 px-2 py-1 rounded-md text-teal text-sm"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {prime}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-navy/60">Enter a valid number</span>
                  )}
                </div>
                {result.length > 0 && (
                  <p className="mt-2 text-sm text-navy/70">
                    There are {result.length} prime numbers up to {number}.
                  </p>
                )}
              </div>
            )}

            {operation === "gcd-lcm" && (
              <div>
                <h3 className="font-medium mb-2">GCD and LCM with {number}:</h3>
                <div className="space-y-2">
                  {result.length > 0 ? (
                    result.map((num) => (
                      <motion.div
                        key={num}
                        className="bg-goldenrod/10 p-2 rounded-md"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-between text-sm">
                          <span>
                            GCD({number}, {num}) = {gcd(number, num)}
                          </span>
                          <span>
                            LCM({number}, {num}) = {lcm(number, num)}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <span className="text-navy/60">Enter a valid number</span>
                  )}
                </div>
              </div>
            )}
          </div>

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

            <Button variant="default" size="sm" onClick={handleChallenge} className="flex items-center">
              <Calculator className="h-4 w-4 mr-1" />
              Challenge
            </Button>
          </div>

          {showHint && (
            <motion.div
              className="bg-goldenrod/10 p-3 rounded-lg text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {operation === "factors" && (
                <p>
                  <span className="font-bold">Hint:</span> Try to find a number that has exactly 4 factors. Perfect
                  squares often have an odd number of factors!
                </p>
              )}
              {operation === "primes" && (
                <p>
                  <span className="font-bold">Hint:</span> Prime numbers greater than 3 often follow the pattern 6n±1.
                  Try numbers like 5, 7, 11, 13, 17, 19...
                </p>
              )}
              {operation === "gcd-lcm" && (
                <p>
                  <span className="font-bold">Hint:</span> The product of two numbers equals the product of their GCD
                  and LCM: a × b = GCD(a,b) × LCM(a,b)
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            className="bg-violet/5 p-3 rounded-lg text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>
              <span className="font-bold text-violet">Fun Fact:</span> {funFact}
            </p>
          </motion.div>
        </div>
      </Tabs>
    </div>
  )
}
