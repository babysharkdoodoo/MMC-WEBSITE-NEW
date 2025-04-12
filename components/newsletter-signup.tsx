"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email)
    setSubmitted(true)
  }

  return (
    <div className="text-center">
      <h3 className="font-mono text-2xl font-bold text-indigo-900 mb-2">Stay Updated</h3>
      <p className="text-indigo-900/70 mb-6">
        Subscribe to our newsletter to receive updates about upcoming meetings and mathematical activities.
      </p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg border border-green-100">
          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
          <h4 className="font-mono text-lg font-bold text-green-700">Thank You!</h4>
          <p className="text-green-600">You've been successfully subscribed to our newsletter.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
              <Input
                type="email"
                placeholder="Your email address"
                className="pl-10 bg-white border-indigo-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-indigo-900/60 mt-2">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      )}
    </div>
  )
}
