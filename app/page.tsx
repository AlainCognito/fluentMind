"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, BrainCircuit, Lightbulb, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("challengeProgress")
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCompletedCount(progress.length)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-sky-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-sky-100">
        <div className="flex items-center justify-center mb-6">
          <BrainCircuit className="h-10 w-10 text-sky-600 mr-2" />
          <h1 className="text-3xl font-bold text-sky-700">FluentMind</h1>
        </div>

        <p className="text-center text-slate-600 mb-8">
          Elevate your English skills through interactive challenges designed to enhance your language mastery.
        </p>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="flex items-start p-3 bg-sky-50 rounded-lg">
            <Sparkles className="h-5 w-5 text-sky-500 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-slate-700">Interactive fill-in-the-blank exercises to test your knowledge</p>
          </div>

          <div className="flex items-start p-3 bg-sky-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-sky-500 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-slate-700">Learn from articles and videos with real-world context</p>
          </div>

          <div className="flex items-start p-3 bg-sky-50 rounded-lg">
            <Lightbulb className="h-5 w-5 text-sky-500 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-slate-700">Helpful hints when you need a little guidance</p>
          </div>
        </div>

        <Button asChild className="w-full bg-sky-600 hover:bg-sky-700 h-12 text-base">
          <Link href="/challenges">Start Your Journey</Link>
        </Button>
      </div>
    </main>
  )
}
